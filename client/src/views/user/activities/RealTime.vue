<template>
<div>
    <PageTitle/>
    <!-- <Time/> -->
    <Table/>
</div>
</template>

<script>
import PageTitle from '@/components/general/PageTitle.vue'
// import Time from '@/components/Time.vue'
import Table from '@/components/student/activities/ActivitiesTable.vue'

export default {
    components: {
        PageTitle,
        // Time,
        Table
    }
}
</script>