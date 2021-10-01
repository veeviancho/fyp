<template>
    <PageTitle/>
    <Time/>
    <Table/>
</template>

<script>
import PageTitle from '../../components/PageTitle.vue'
import Time from '../../components/Time.vue'
import Table from '../../components/ActivitiesTable.vue'

export default {
    components: {
        PageTitle,
        Time,
        Table
    }
}
</script>