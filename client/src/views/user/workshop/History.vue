<template>
<div>
    <PageTitle/>
    <WorkshopEvent/>
</div>
</template>

<script>
import PageTitle from '@/components/general/PageTitle.vue'
import WorkshopEvent from '@/components/student/workshop/WorkshopEvent.vue'

export default {
    components: {
        PageTitle,
        WorkshopEvent
    }
}
</script>