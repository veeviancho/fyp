<template>
    <PageTitle/>
    <Filter/>
    <Room/>
</template>

<script>
import PageTitle from '../../components/PageTitle.vue'
import Filter from '../../components/Filter.vue'
import Room from '../../components/Room.vue'

export default {
    components: {
        PageTitle,
        Filter,
        Room
    }
}
</script>