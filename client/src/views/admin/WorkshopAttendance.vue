<template>
    <div class="admin-content" v-if="workshopItem">
        <button class="button router ml-6" @click="makePDF()">Export List</button>
        <div id="report" ref="report">

            <h1 class="title">List of Users registered for {{ workshopItem.title }}
            </h1>
            <p>Total number of participants: {{ users.length }}/{{ workshopItem.maxUsers }}</p>
            
            <table class="table is-hoverable" style="width:800px">
            <thead>
                <tr id="head">
                    <th>No</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email Address</th>
                    <th>Programme</th>
                    <th>Attendance</th>
                </tr>
            </thead>
            
            <tbody>
            <tr v-for="user in users" :key="user._id">
                <td>{{ users.indexOf(user) + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>@{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.programme }}</td>
                <td><input type="checkbox" disabled></td>
            </tr>
            </tbody>

            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default {
    data() {
        return {
            users: []
        }
    },
    props: ['id'],
    computed: {
        ...mapGetters(['workshopItem', 'userById'])
    },
    methods: {
        ...mapActions(['getWorkshop', 'getWorkshopFromId', 'getAllUsers', 'getUserFromId', 'deregisterFromWorkshop']),
        makePDF() {

            window.html2canvas = html2canvas;
            const pageWidth = 900;
            // const pageHeight = 1273;
            const pageHeight = this.$refs.report.clientHeight > 1273 ? this.$refs.report.clientHeight : 1273;

            const doc = new jsPDF({
                orientation: "p",
                unit: "px",
                hotfixes: ["px_scaling"],
                format: [pageWidth, pageHeight],
                compressPdf: true,
            });

            doc.html(document.querySelector('#report'), {
                callback: function(pdf) {
                    pdf.save("AttendanceList.pdf")
                }
            })
        },
    },
    created() {
        this.getAllUsers().then( () => {
            this.getWorkshop().then( () => {
                this.getWorkshopFromId(this.id)
                let workshopUsers = this.workshopItem.users
                for (let i=0; i<workshopUsers.length; i++) {
                    this.getUserFromId(workshopUsers[i])
                    this.users.push(this.userById)
                }
            })
        })
    }
}
</script>

<style scoped>
#report {
    font-family: Arial, Helvetica, sans-serif;
    background-color: white;
    padding: 2.5rem 3.5rem;
    width: 100%;
}

.table {
    width: 100%;
    margin: 2rem 0;
}

.workshop {
    color: #329AA0;
}

.router {
    color: black;
    margin-bottom: 2rem;
}
</style>