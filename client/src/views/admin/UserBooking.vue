<template>
<div class="modal is-active" v-if="userItem">
  <div class="modal-background" @click="close()"></div>
  <div class="modal-content">
    
    <div class="box">
        <div class="field">
            <label class="label">Past Workshops</label>
            <div v-if="pastWorkshop.length > 0">
                <table>
                    <tr v-for="item in pastWorkshop" :key="item._id">
                        <td>{{ item.date }}</td>
                        <td>{{ item.startTime }}-{{ item.endTime }}</td>
                        <td>{{ item.title }}</td>
                    </tr>
                </table>
            </div>
            <div v-else>No workshop found.</div>
        </div>
        <div class="field">
            <label class="label">Upcoming Workshops</label>
            <div v-if="workshop.length > 0">
                <table>
                        <tr v-for="item in workshop" :key="item._id">
                            <td>{{ item.date }}</td>
                            <td>{{ item.start }}-{{ item.end}}</td>
                            <td><router-link class="has-text-info" :to="'/workshop/' + item._id">{{ item.title }}</router-link></td>
                        </tr>
                </table>
            </div>
            <div v-else>No workshop found.</div>
        </div>
        <div class="field">
            <label class="label">Past Bookings</label>
            <div v-if="pastBooking.length > 0">
                <table>
                    <tr v-for="item in pastBooking" :key="item._id">
                        <td>{{ item.date }}</td>
                        <td>{{ item.start }}-{{ item.end }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.bookRoom ? "Full Room Booking" : "Seat Booking"}}</td>
                    </tr>
                </table>
            </div>
            <div v-else>No booking found.</div>
        </div>
        <div class="field">
            <label class="label">Upcoming Bookings</label>
            <div v-if="booking.length > 0">
                <table>
                    <tr v-for="item in booking" :key="item._id">
                        <td>{{ item.date }}</td>
                        <td>{{ item.start }}-{{ item.end }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.bookRoom ? "Full Room Booking" : "Seat Booking"}}</td>
                    </tr>
                </table>
            </div>
            <div v-else>No booking found.</div>
        </div>
    </div>

  </div>
</div>
</template>

<script>
export default {
    props: ['userItem', 'workshop', 'pastWorkshop', 'booking', 'pastBooking'],
    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
.box {
    padding: 2rem 3rem;
}

table {
    width: 100%;
}
</style>
