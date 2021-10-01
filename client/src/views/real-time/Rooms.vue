<template>
    <PageTitle/>
    <p class="page has-text-weight-bold"><span class="title is-size-1">28</span> &nbsp; Rooms Available</p>
    <br>
    <Table/>
</template>

<script>
import PageTitle from '../../components/PageTitle.vue'
import Table from '../../components/RoomTable.vue'

export default {
    components: {
        PageTitle,
        Table
    }
}
</script>