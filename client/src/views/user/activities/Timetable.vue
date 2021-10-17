<template>
    <div id="rooms">
        <div class="">
            <div>
            <input type="date" class="mb-2">
            </div>
            <div class="select mb-6">
            <select class="">
                <option>Room 1</option>
                <option>Room 2</option>
                <option>Room 3</option>
            </select>
            </div>
            <div>
            <Table/>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
import Table from '@/components/student/booking/RoomTable.vue'

export default {
    components: {
        Table
    }
}
</script>