<template>
    <div>
    <PageTitle/>
    <div class="page">
    <div class="columns">
        <div class="column is-half">
            <h1 class="title is-4">Address:</h1>
            <p>Lorem ipsum dolor sit amet, <br>consectetur adipiscing elit, <br>sed do eiusmod tempor</p>
        </div>
        <div class="column is-half">
            <h1 class="title is-4">Contact Info:</h1>
            <p>
                <span class="icon"><fa icon="envelope"/></span> lifelonglearning@ntu.edu.sg
                <br>
                <span class="icon"><fa icon="mobile-alt"/></span> 1234 5678
            </p>
        </div>
    </div>
    </div>
    <div class="section">
        <h1 class="title is-4">Map:</h1>
    </div>
    </div>
</template>

<script>
import PageTitle from '@/components/general/PageTitle.vue'

export default {
    components: {
        PageTitle
    }
}
</script>