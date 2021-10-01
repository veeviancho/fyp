<template>
    <PageTitle/>
    <Filter/>
    <WorkshopEvent/>
</template>

<script>
import WorkshopEvent from '../../components/WorkshopEvent.vue'
import PageTitle from '../../components/PageTitle.vue'
import Filter from '../../components/Filter.vue'

export default {
    components: {
        PageTitle,
        WorkshopEvent,
        Filter
    }
}
</script>
