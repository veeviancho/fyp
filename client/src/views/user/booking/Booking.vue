<template>
<body>
<div class="hero is-fullheight">
    <section class="section is-small">
        <form class="field has-navbar-fixed-top">
            <div class="columns">
                <div class="column mx-5">
                    <label class="has-text-white py-1">DATE</label>
                    <input class="input" type="date" placeholder="Find Workshops">
                </div>
                <div class="column mx-5">
                    <div class="columns">
                        <div class="column">
                            <label class="has-text-white py-1">START TIME</label>
                            <input class="input" type="time">
                        </div>
                        <div class="column">
                            <label class="has-text-white py-1">END TIME</label>
                            <input class="input" type="time">
                        </div>
                    </div>
                </div>
            </div>
            <button class="button ml-5 mb-2">Show Results</button>
            <button class="button ml-5 mb-2">Show Current</button>
        </form>
    </section>

    <div style="margin: 3rem auto; max-width: 92%;">
        <h1 class="has-text-white">
            <span class="results">SHOWING RESULTS FOR:</span>
            <span class="subtitle has-text-white">
                <b class="results">01/01/2021 Tuesday</b>
                <b class="results">12:00PM - 1:00PM</b>
            </span>
        </h1>

        <div class="columns my-5">
            <div class="column is-one-quarter">
                <div class="card available">
                <div class="card-image">
                    <figure class="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        <p class="subtitle has-text-weight-bold">Room #1 <span class="tag is-primary is-light">Available</span></p>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. </p> 
                    </div>
                </div>
                </div>
            </div>

            <div class="column is-one-quarter">
                <div class="card not-available">
                <div class="card-image">
                    <figure class="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        <p class="subtitle has-text-weight-bold">Room #2 <span class="tag is-danger is-light">Occupied</span></p> 
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. </p> 
                    </div>
                </div>
                </div>
            </div>

            <div class="column is-one-quarter">
                <div class="card available">
                <div class="card-image">
                    <figure class="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        <p class="subtitle has-text-weight-bold">Room #3 <span class="tag is-primary is-light">Available</span></p>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. </p> 
                    </div>
                </div>
                </div>
            </div>

            <div class="column is-one-quarter">
                <div class="card available">
                <div class="card-image">
                    <figure class="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        <p class="subtitle has-text-weight-bold">Room #4 <span class="tag is-primary is-light">Available</span></p>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. </p> 
                    </div>
                </div>
                </div>
            </div>
        </div>

        <Timetable/>
    </div>
</div>
</body>
</template>

<script>
import Timetable from '@/components/student/booking/Timetable.vue'

export default {
    name: 'Room',
    components: {
        Timetable
    }
}
</script>

<style lang="scss" scoped>
.section {
    background-color: #161C20;
}

.results {
    margin-right: 3vw;
}

@media (max-width: 600px) {
    .results {
        font-size: 1rem;
    }
}

// .column {
//     display: flex;
//     justify-content: center;
// }

// .available:hover {
//     border: 0.2em solid #3c7a89;
//     border-radius: 0.5rem;
// }

// .not-available:hover {
//     border: 0.2em solid #893c68;
//     border-radius: 0.5rem;
// }
</style>