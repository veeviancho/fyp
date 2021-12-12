<template>
    <div>
        <div v-for="item in workshop" :key="item.id">
            <div><WorkshopEvent :workshopItem="item"/></div>
        </div>
    </div>
</template>

<script>
import WorkshopEvent from './WorkshopEvent.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        WorkshopEvent
    },
    computed: {
        ...mapGetters(['workshop'])
    },
    methods: {
        ...mapActions(['getWorkshop'])
    },
    created() {
        this.getWorkshop();
    }
}
</script>
