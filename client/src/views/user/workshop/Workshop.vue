<template>
<div class="hero is-fullheight">
    <section class="section is-medium">
        <p class="has-text-grey-light mt-5">POPULAR WORKSHOP</p>
        <h1>Workshop Title</h1>
        <p class="has-text-grey-light">by <i>Entrepreneur</i></p>
        <p class="has-text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <br>
        <button class="button">Read More</button>
    </section>

    <div style="margin: 3rem auto; max-width: 92%;">
    <div class="columns">
        <div class="column">
            <div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Find Workshops">
                        <span class="icon is-small is-left"><fa icon="search"/></span>
                    </p>
                </div>
            </div>
        
            <div class="columns">
                <!-- Left -->
                <div class="column is-one-quarter" style="margin-top: 2em;">
                    <div class="notification">
                        <aside class="menu">
                        <p class="menu-label">
                            Date
                        </p>
                        <ul><input class="" type="date" value="2021-10-22"></ul>

                        <p class="menu-label">
                            Time
                        </p>
                        <ul><input class="" type="time" value="2021-10-22"></ul>

                        <p class="menu-label">
                            Venue
                        </p>
                        <ul class="menu-list">
                            <li><input type="checkbox"><span class="check-name">Space #1</span></li>
                            <li><input type="checkbox"><span class="check-name">Space #2</span></li>
                            <li><input type="checkbox"><span class="check-name">Space #3</span></li>
                        </ul>

                        <p class="menu-label">
                            Organiser
                        </p>
                        <ul class="menu-list">
                            <li><input type="checkbox"><span class="check-name">Orgnaniser #1</span></li>
                            <li><input type="checkbox"><span class="check-name">Organiser #2</span></li>
                            <li><input type="checkbox"><span class="check-name">Organiser #3</span></li>
                        </ul>

                        <p class="menu-label">
                            Programme
                        </p>
                        <ul class="menu-list">
                            <li><input type="checkbox"><span class="check-name">Communications Engineering</span></li>
                            <li><input type="checkbox"><span class="check-name">Computer Control & Automation</span></li>
                            <li><input type="checkbox"><span class="check-name">Electronic</span></li>
                            <li><input type="checkbox"><span class="check-name">Power Engineering</span></li>
                            <li><input type="checkbox"><span class="check-name">Signal Processing</span></li>
                            <li><input type="checkbox"><span class="check-name">Green Electronics</span></li>
                            <li><input type="checkbox"><span class="check-name">Integrated Circuit Design</span></li>
                        </ul>

                        <p class="menu-label">
                            Category
                        </p>
                        <ul class="menu-list">
                            <li><input type="checkbox"><span class="check-name">Technical Skills</span></li>
                            <li><input type="checkbox"><span class="check-name">Soft Skills</span></li>
                            <li><input type="checkbox"><span class="check-name">Career Advice</span></li>
                        </ul>
                        </aside>    
                    </div>
                </div>

                <!-- Right -->
                <div class="column">
                    <div class="pb-4" style="margin-top: 2em;">
                        <span class="pr-3 has-text-white">Sort by:</span>
                        <div class="select is-small">
                            <select>
                                <option>Date created (Ascending)</option>
                                <option>Date created (Descending)</option>
                                <option>Date of workshop (Ascending)</option>
                                <option>Date of workshop (Descending)</option>
                                <option>Title (Ascending)</option>
                                <option>Title (Descending)</option>
                                <option>Popularity (Ascending)</option>
                                <option>Popularity (Descending)</option>
                                <option>No of Reviews (Ascending)</option>
                                <option>No of Reviews (Descending)</option>
                            </select>
                        </div>
                    </div>

                    <div class=""><WorkshopEvent/></div>

                </div>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import WorkshopEvent from '@/components/student/workshop/WorkshopEvent.vue'

export default {
    components: {
        WorkshopEvent
    }
}
</script>

<style scoped>
li {
    font-size: 0.89rem;
    margin: 0.2rem 0;
}

section {
    background: linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.7)), url('https://www.demcointeriors.com/wp-content/uploads/2017/05/Richland-Library-Sandhills-Interior-Rendering-1024x569.jpg') no-repeat center center/cover;
}

h1 {
  font-size: 4.5vw;
  font-weight: bold;
  color: white;
}

button {
  background-color: rgba(0,0,0,0);
  color: white;
  width: 10rem;
}

button:hover {
  background-color: rgba(255,255,255,0.3);
  color: white;
}

.notification {
    background-color: #329AA0;
}

.menu-label {
    color: black;
}

li {
    color: white;
    font-size: 1.5vh;
}

.check-name {
    margin-left: 0.5vw;
}

ul {
    margin: 0 0 2rem 0;
}

</style>