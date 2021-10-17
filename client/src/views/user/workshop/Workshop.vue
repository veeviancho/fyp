<template>
<div>
    <Filter/>
    <WorkshopEvent/>
</div>
</template>

<script>
import Filter from '@/components/general/Filter.vue'
import WorkshopEvent from '@/components/student/workshop/WorkshopEvent.vue'

export default {
    components: {
        Filter,
        WorkshopEvent
    }
}
</script>
