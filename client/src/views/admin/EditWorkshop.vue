<template>
<div class="modal is-active" v-if="workshopItem">
  <div class="modal-background"></div>
  <div class="modal-content">
    
    <form class="box" @submit.prevent="updateWorkshop">

        <div class="field">
            <label class="label">Title</label>
            <div class="control">
            <input class="input is-warning" type="text" placeholder="Lifelong Learning Workshop" v-model="title">
            </div>
        </div> 

        <div class="field">
            <label class="label">Description</label>
            <div class="control">
            <textarea class="textarea is-warning" type="textarea" placeholder="Enter information about the workshop." v-model="description"></textarea>
            </div>
        </div>

        <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Date</label>
                <div class="control">
                <input class="input is-warning" type="date" v-model="date">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">Venue</label>
                <div class="control">
                <input class="input is-warning" type="text" placeholder="Enter a room" v-model="venue">
                </div>
            </div>
        </div>
        </div>

        <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Start Time</label>
                <div class="control">
                <input class="input is-warning" type="time" v-model="startTime">
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">End Time</label>
                <div class="control">
                <input class="input is-warning" type="time" v-model="endTime">
                </div>
            </div>
        </div>
        </div>

        <div class="field">
            <label class="label">Organiser</label>
            <div class="control">
            <input class="input is-warning" type="text" id="organiser" name="organiser" placeholder="Enter the oganiser's name" v-model="organiser">
            </div>
        </div>

        <div class="field">
            <label class="label">Programme</label>
            <div class="select is-fullwidth is-warning">
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

        <div class="field">
            <label class="label">Category</label>
            <div class="control">
            <input class="input is-warning" type="text" placeholder="Category" v-model="category">
            </div>
        </div>

        <div class="field">
            <label class="label">Maximum number of participants</label>
            <div class="control">
            <input class="input is-warning" type="number" id="maxUsers" name="maxUsers" placeholder="Enter a number" v-model="maxUsers">
            </div>
        </div>

        <button type="submit" class="button is-outlined is-fullwidth">Update</button>

    </form>

  </div>
  <button class="modal-close is-large" aria-label="close" @click="close()"></button>
</div>
</template>

<script>
export default {
    computed: {
        title: {
            get: function() { return this.workshopItem.title },
            set: function() { return this.title }
        },
        description: {
            get: function() { return this.workshopItem.description },
            set: function() { return this.description }
        },
        date: {
            get: function() { return this.workshopItem.date },
            set: function() { return this.date }
        },
        startTime: {
            get: function() { return this.workshopItem.startTime },
            set: function() { return this.startTime }
        },
        endTime: {
            get: function() { return this.workshopItem.endTime },
            set: function() { return this.endTime }
        },
        venue: {
            get: function() { return this.workshopItem.venue },
            set: function() { return this.venue }
        },
        organiser: {
            get: function() { return this.workshopItem.organiser },
            set: function() { return this.organiser }
        },
        programme: {
            get: function() { return this.workshopItem.programme },
            set: function() { return this.programme }
        },
        category: {
            get: function() { return this.workshopItem.category },
            set: function() { return this.category }
        },
        maxUsers: {
            get: function() { return this.workshopItem.maxUsers },
            set: function() { return this.maxUsers }
        }
    },
    props: ['workshopItem'],
    methods: {
        close() {
            this.$emit('close')
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
</style>