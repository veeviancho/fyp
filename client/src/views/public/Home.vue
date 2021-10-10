<template>
    <div>
        <PageTitle/>
        <Home/>
    </div>
</template>

<script>
import PageTitle from '@/components/general/PageTitle.vue'
import Home from '@/components/public/Home.vue'

export default {
    components: {
        PageTitle,
        Home
    }
}
</script>