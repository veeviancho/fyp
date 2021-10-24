<template>
<div>
    <section class="section is-medium">
    <p class="has-text-grey-light mt-5">ARTICLE OF THE DAY</p>
    <h1>The Importance of Lifelong Learning</h1>
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
                        <!-- <span class="icon is-small is-right"><fa icon="search"/></span> -->
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
                        <input type="date" value="2021-10-22">

                        <p class="menu-label">
                            Time
                        </p>
                        <input type="time" value="2021-10-22">

                        <p class="menu-label">
                            Venue
                        </p>
                        <ul class="menu-list">
                            <li><input type="checkbox"> Space #1</li>
                            <li><input type="checkbox"> Space #2</li>
                            <li><input type="checkbox"> Space #3</li>
                        </ul>

                        <p class="menu-label">
                            Organiser
                        </p>
                        <ul class="menu-list">
                            <li><input type="checkbox"> Organiser #1</li>
                            <li><input type="checkbox"> Organiser #2</li>
                            <li><input type="checkbox"> Organiser #3</li>
                        </ul>

                        <p class="menu-label">
                            Programme
                        </p>
                        <ul class="menu-list">
                            <li><input type="checkbox"> Communications Engineering</li>
                            <li><input type="checkbox"> Computer Control & Automation</li>
                            <li><input type="checkbox"> Electronic</li>
                            <li><input type="checkbox"> Power Engineering</li>
                            <li><input type="checkbox"> Signal Processing</li>
                            <li><input type="checkbox"> Green Electronics</li>
                            <li><input type="checkbox"> Integrated Circuit Design</li>
                        </ul>

                        <p class="menu-label">
                            Category
                        </p>
                        <ul class="menu-list">
                            <li><input type="checkbox"> Technical Skills</li>
                            <li><input type="checkbox"> Soft Skills</li>
                            <li><input type="checkbox"> Career Advice</li>
                        </ul>
                        </aside>    
                    </div>
                </div>

                <!-- Right -->
                <div class="column">
                    <div class="pb-3" style="margin-top: 2em;">
                        Sort by:
                        <div class="select is-small">
                            <select>
                                <option>None</option>
                                <option>Title (Ascending)</option>
                                <option>Title (Descending)</option>
                                <option>Popularity (Ascending)</option>
                                <option>Popularity (Descending)</option>
                                <option>No of Reviews (Ascending)</option>
                                <option>No of Reviews (Descending)</option>
                            </select>
                        </div>
                    </div>
                    <div class=""><Article/></div>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import Article from '@/components/public/Articles.vue'

export default {
    components: {
        Article
    }
}
</script>

<style scoped>
li {
    font-size: 0.89rem;
    margin: 0.2rem 0;
}

section {
    background: linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.7)), url('https://designinc.com.au/cms_uploads/images/1003_fbe-2.jpg') no-repeat center center/cover;
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
</style>