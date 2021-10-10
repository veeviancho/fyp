<template>
<div>
    <PageTitle/>
    <Filter/>
    <WorkshopEvent/>
</div>
</template>

<script>
import PageTitle from '@/components/general/PageTitle.vue'
import Filter from '@/components/general/Filter.vue'
import WorkshopEvent from '@/components/student/workshop/WorkshopEvent.vue'

export default {
    components: {
        PageTitle,
        Filter,
        WorkshopEvent
    }
}
</script>
