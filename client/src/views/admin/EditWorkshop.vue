<template>
<div class="modal is-active" v-if="workshopItem">
  <div class="modal-background"></div>
  <div class="modal-content">
    
    <form class="box" @submit.prevent="editWorkshop">

        <div class="field">
            <label class="label">Title &nbsp;&nbsp;
                <small class="edit-btn" v-if="!showTitle" @click="showTitle=true">Edit</small>
                <small class="edit-btn" v-if="showTitle" @click="this.title=''; showTitle=false">Cancel</small>
            </label>
            <div class="control">
                <p v-if="!showTitle">{{ workshopItem.title }}</p>
                <input class="input is-warning" type="text" placeholder="Lifelong Learning Workshop" v-if="showTitle" v-model="title">
            </div>
        </div> 

        <div class="field">
            <label class="label">Description &nbsp;&nbsp;
                <small class="edit-btn" v-if="!showDescription" @click="showDescription=true">Edit</small>
                <small class="edit-btn" v-if="showDescription" @click="this.description=''; showDescription=false">Cancel</small>
            </label>
            <div class="control">
                <p v-if="!showDescription">{{ workshopItem.description }}</p>
                <textarea class="textarea is-warning" type="textarea" placeholder="Enter information about the workshop." v-if="showDescription" v-model="description"></textarea>
            </div>
        </div>

        <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Date &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!showDate" @click="showDate=true">Edit</small>
                    <small class="edit-btn" v-if="showDate" @click="this.date=null; showDate=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!showDate">{{ workshopItem.date }}</p>
                    <input class="input is-warning" type="date" v-if="showDate" v-model="date">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">Venue &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!showVenue" @click="showVenue=true">Edit</small>
                    <small class="edit-btn" v-if="showVenue" @click="this.venue=''; showVenue=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!showVenue">{{ workshopItem.venue }}</p>
                    <input class="input is-warning" type="text" placeholder="Enter a room" v-if="showVenue" v-model="venue">
                </div>
            </div>
        </div>
        </div>

        <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Start Time &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!showStartTime" @click="showStartTime=true">Edit</small>
                    <small class="edit-btn" v-if="showStartTime" @click="this.startTime=null; showStartTime=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!showStartTime">{{ workshopItem.startTime }}</p>
                    <input class="input is-warning" type="time" v-if="showStartTime" v-model="startTime">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">End Time &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!showEndTime" @click="showEndTime=true">Edit</small>
                    <small class="edit-btn" v-if="showEndTime" @click="this.endTime=null; showEndTime=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!showEndTime">{{ workshopItem.endTime }}</p>
                    <input class="input is-warning" type="time" v-if="showEndTime" v-model="endTime">
                </div>
            </div>
        </div>
        </div>

        <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Organiser &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!showOrganiser" @click="showOrganiser=true">Edit</small>
                    <small class="edit-btn" v-if="showOrganiser" @click="this.organiser=''; showOrganiser=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!showOrganiser">{{ workshopItem.organiser }}</p>
                    <input class="input is-warning" type="text" placeholder="Enter the oganiser's name" v-if="showOrganiser" v-model="organiser">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">Programme  &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!showProgramme" @click="showProgramme=true">Edit</small>
                    <small class="edit-btn" v-if="showProgramme" @click="this.programme=''; showProgramme=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!showProgramme">{{ workshopItem.programme }}</p>
                    <div class="select is-fullwidth is-warning" v-if="showProgramme">
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
                    <small class="edit-btn" v-if="!showCategory" @click="showCategory=true">Edit</small>
                    <small class="edit-btn" v-if="showCategory" @click="this.category=''; showCategory=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!showCategory">{{ workshopItem.category }}</p>
                    <input class="input is-warning" type="text" placeholder="Category" v-if="showCategory" v-model="category">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">Max no of participants &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!showMaxUsers" @click="showMaxUsers=true">Edit</small>
                    <small class="edit-btn" v-if="showMaxUsers" @click="this.maxUsers=''; showMaxUsers=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!showMaxUsers">{{ workshopItem.maxUsers }}</p>
                    <input class="input is-warning" type="number" id="maxUsers" name="maxUsers" placeholder="Enter a number" v-if="showMaxUsers" v-model="maxUsers">
                </div>
            </div>
        </div>
        </div>

        <!-- Error message -->
        <p class="has-text-danger has-text-centered mb-3" v-if="workshopError.update">{{ workshopError.update }}</p>

        <button type="submit" class="button is-outlined is-fullwidth">Update</button>

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

            showTitle: false,
            showDescription: false,
            showDate: false,
            showStartTime: false,
            showEndTime: false,
            showVenue: false,
            showOrganiser: false,
            showProgramme: false,
            showCategory: false,
            showMaxUsers: false
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