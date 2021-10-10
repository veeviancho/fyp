<template>
    <div>
        <PageTitle/>
        <Room/>
    </div>
</template>

<script>
import PageTitle from '@/components/general/PageTitle.vue'
import Room from '@/components/student/booking/Room.vue'

export default {
    components: {
        PageTitle,
        Room
    }
}
</script>