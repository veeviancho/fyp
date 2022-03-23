<template>
    <div class="hero is-fullwidth">
        <section class="section is-small">
            <div class="has-navbar-fixed-top">
                <h1 class="title has-text-white has-text-centered" v-if="user"><i>{{ user.name }}'s Profile Report</i></h1>
            </div>
        </section>

        <div class="section content">

            <form @submit.prevent="showCategory()" class="has-text-white">
                <b>Display options:</b> <br>
                <label class="checkbox mr-4 mb-5 mt-1" v-for="category in workshopCategory" :key="category._id">
                    <input type="checkbox" :value="category" v-model="selectedCategory" @change="displayCategory"> {{ category }}
                </label>
            </form>

            <button class="button is-fullwidth mb-5" @click="makePDF">Download as PDF</button>
         
            <div id="report" ref="report">
                <div class="columns">
                    <div class="column">
                        <small>EEE Lifelong Learning Space</small>
                    </div>
                    <div class="column right">
                        <small v-if="today">Retrieved {{ today }}</small>
                    </div>
                </div>
                <h1 class="is-size-5"><b>{{ user.name }}'s Profile Report</b></h1>
                <div class="columns">
                    <div class="column">
                        <b>Email</b>: {{ user.email }} <br>
                        <b>Programme</b>: {{ user.programme }}
                    </div>
                    <div class="column">
                        <b>Username</b>: {{ user.username }} <br>
                        <b>No of workshops attended</b>: {{ pastUserWorkshop.length }}
                    </div>
                </div>

                <div>
                    <div class="table mb-5" v-for="(category, index) in selectedCategory" :key="index">
                    <div class="column">
                        <div class="columns">
                            <div class="column">

                                <span class="title is-4 category py-2">{{ category }}</span> &nbsp;
                                <span class="description">Student has attended <strong>{{ pastUserWorkshop.filter(item => item.category === category).length }}</strong> {{ category }} workshop(s)</span>

                                <table class="mt-5">

                                    <colgroup>
                                        <col span="1" style="width: 15%;">
                                        <col span="1" style="width: 20%;">
                                        <col span="1" style="width: 65%;">
                                    </colgroup>

                                    <tr v-for="workshopItem in pastUserWorkshop.filter(item => item.category === category)" :key="workshopItem._id">
                                        <td>{{ workshopItem.date }}</td>
                                        <td><b>{{ workshopItem.title }}</b></td>
                                        <td class="has-text-grey"><div class="fixed">{{ workshopItem.description }}</div></td>
                                    </tr>

                                </table>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            
            <!-- <button class="button is-fullwidth mt-4" @click="makePDF">Download as PDF</button> -->

        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default {
    data() {
        return {
            workshopCategory: [],
            selectedCategory: [],
        }
    },
    computed: {
        ...mapGetters(['user', 'pastUserWorkshop']),
        today() {
            const today = new Date()
            return today.format('DD/MM/YYYY')
        }
    },
    methods: {
        ...mapActions(['getProfile', 'getWorkshop', 'getUserWorkshop']),
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
                    pdf.save("ProfileReport.pdf")
                }
            })
        },
        getCategory() {
            let temp = this.pastUserWorkshop
            temp = temp.filter((el, index, arr) => {
                return el.category != '' &&  index === arr.findIndex(ele => (ele.category === el.category))
            })
            temp.forEach(item => this.workshopCategory.push(item.category))
            temp.forEach(item => this.selectedCategory.push(item.category))
        }
    },
    created() {
        this.getProfile()
        this.getWorkshop().then( () => {
            this.getUserWorkshop(localStorage.getItem('userId')).then(() => {
                this.getCategory()
            })
        })
    }
}
</script>

<style scoped>
.section {
    background-color: #161C20;
}

.content {
    margin: 3rem 15%;
}

#report {
    font-family: Arial, Helvetica, sans-serif;
    background-color: white;
    padding: 2.5rem 3.5rem;
    width: 100%;
}

.right {
    text-align: right;
}

tr {
    border-top: 1px solid lightgray;
}

#pageBreak {
    height: 200px;
}

.fixed {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
          line-clamp: 5; 
  -webkit-box-orient: vertical;
}
</style>
