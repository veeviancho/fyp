<template>
<div class="modal is-active" v-if="workshopItem">
  <div class="modal-background" @click="close()"></div>
  <div class="modal-content">
    
    <form class="box" @submit.prevent="editWorkshop">

        <div class="columns">
        <div class="column">
        <div class="field">
            <label class="label">Title &nbsp;&nbsp;
                <small class="edit-btn" v-if="!show[0]" @click="show[0]=true;">Edit</small>
                <small class="edit-btn" v-if="show[0]" @click="this.title=''; show[0]=false">Cancel</small>
            </label>
            <div class="control">
                <p v-if="!show[0]">{{ workshopItem.title }}</p>
                <input class="input is-warning" type="text" placeholder="Lifelong Learning Workshop" v-if="show[0]" v-model="title">
            </div>
        </div> 
        </div>
        <div class="column">
        <div class="field">
            <label class="label">Points</label>
            <div class="control">
                <p>{{ workshopItem.points }}</p>
            </div>
        </div>
        </div> 
        </div>

        <div class="field">
            <label class="label">Description &nbsp;&nbsp;
                <small class="edit-btn" v-if="!show[1]" @click="show[1]=true">Edit</small>
                <small class="edit-btn" v-if="show[1]" @click="this.description=''; show[1]=false">Cancel</small>
            </label>
            <div class="control">
                <p v-if="!show[1]">{{ workshopItem.description }}</p>
                <textarea class="textarea is-warning" type="textarea" placeholder="Enter information about the workshop." v-if="show[1]" v-model="description"></textarea>
            </div>
        </div>

        <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Date &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!show[2]" @click="show[2]=true">Edit</small>
                    <small class="edit-btn" v-if="show[2]" @click="this.date=null; show[2]=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!show[2]">{{ workshopItem.date }}</p>
                    <input class="input is-warning" type="date" v-if="show[2]" v-model="date">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">Venue &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!show[3]" @click="show[3]=true">Edit</small>
                    <small class="edit-btn" v-if="show[3]" @click="this.venue=''; show[3]=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!show[3]">{{ workshopItem.venue }}</p>
                    <input class="input is-warning" type="text" placeholder="Enter a room" v-if="show[3]" v-model="venue">
                </div>
            </div>
        </div>
        </div>

        <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Start Time &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!show[4]" @click="show[4]=true">Edit</small>
                    <small class="edit-btn" v-if="show[4]" @click="this.startTime=null; show[4]=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!show[4]">{{ workshopItem.startTime }}</p>
                    <input class="input is-warning" type="time" v-if="show[4]" v-model="startTime">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">End Time &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!show[5]" @click="show[5]=true">Edit</small>
                    <small class="edit-btn" v-if="show[5]" @click="this.endTime=null; show[5]=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!show[5]">{{ workshopItem.endTime }}</p>
                    <input class="input is-warning" type="time" v-if="show[5]" v-model="endTime">
                </div>
            </div>
        </div>
        </div>

        <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Organiser &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!show[6]" @click="show[6]=true">Edit</small>
                    <small class="edit-btn" v-if="show[6]" @click="this.organiser=''; show[6]=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!show[6]">{{ workshopItem.organiser }}</p>
                    <input class="input is-warning" type="text" placeholder="Enter the oganiser's name" v-if="show[6]" v-model="organiser">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">Programme  &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!show[7]" @click="show[7]=true">Edit</small>
                    <small class="edit-btn" v-if="show[7]" @click="this.programme=''; show[7]=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!show[7]">{{ workshopItem.programme }}</p>
                    <div class="select is-fullwidth is-warning" v-if="show[7]">
                    <select name="programme" v-model="programme">
                        <option disabled>Change Programme</option>
                        <option>Communications Engineering</option>
                        <option>Computer Control & Automation</option>
                        <option>Electronics</option>
                        <option>Power Engineering</option>
                        <option>Signal Processing</option>
                        <option>Green Electronics</option>
                        <option>Integrated Circuit Design</option>
                    </select>
                </div>
                </div>
            </div>
        </div>
        </div>

        <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Category &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!show[8]" @click="show[8]=true">Edit</small>
                    <small class="edit-btn" v-if="show[8]" @click="this.category=''; show[8]=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!show[8]">{{ workshopItem.category }}</p>
                    <input class="input is-warning" type="text" placeholder="Category" v-if="show[8]" v-model="category">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">Max no of participants &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!show[9]" @click="show[9]=true">Edit</small>
                    <small class="edit-btn" v-if="show[9]" @click="this.maxUsers=''; show[9]=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!show[9]">{{ workshopItem.maxUsers }}</p>
                    <input class="input is-warning" type="number" id="maxUsers" name="maxUsers" placeholder="Enter a number" v-if="show[9]" v-model="maxUsers">
                </div>
            </div>
        </div>
        </div>

        <!-- Error message -->
        <p class="has-text-danger has-text-centered mb-3" v-if="workshopError.update">{{ workshopError.update }}</p>

        <button type="submit" class="button is-outlined is-fullwidth" v-if="showBtn()">
            Update
        </button>

    </form>

  </div>
  <button class="modal-close is-large" aria-label="close" @click="close()"></button>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            title: '',
            description: '',
            date: null,
            startTime: null,
            endTime: null,
            venue: '',
            organiser: '',
            programme: '',
            category: '',
            maxUsers: 0,

            show: [false, false, false, false, false, false, false, false, false, false]
        }
    },
    computed: {
        ...mapGetters(['workshopError']),
        id: {
            get: function() { return this.workshopItem._id }
        }
    },
    props: ['workshopItem'],
    methods: {
        ...mapActions(['updateWorkshop']),
        close() {
            this.$emit('close')
        },
        showBtn() {
            for (let i=0; i<this.show.length; i++) {
                if (this.show[i] == true) {
                    return true
                }
            }
        },
        editWorkshop() {
            let workshop = {
                id: this.id,
                title: this.title,
                description: this.description,
                date: this.date,
                startTime: this.startTime,
                endTime: this.endTime,
                venue: this.venue,
                organiser: this.organiser,
                programme: this.programme,
                category: this.category,
                maxUsers: this.maxUsers
            }
            console.log(workshop)
            this.updateWorkshop(workshop)
            .then(res => {
                if (res.data.success) {
                    // console.log("success!")
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err)
            })

        }
    }
}
</script>


<style scoped>
.box {
    padding: 2rem 3rem;
    /* width: ; */
}

.modal-content {
    min-width: 55vw;
}

.button {
    color: black;
}

.select {
    font-size: 1rem;
}

.edit-btn {
    color: #329AA0;
    font-weight: normal;
    cursor: pointer;
    text-decoration: underline;
}

.edit-btn:hover {
    color: #184f52;
    /* font-weight: bold; */
    text-decoration: none;
}
</style>