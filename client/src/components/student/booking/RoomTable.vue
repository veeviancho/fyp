<template>
<table class="table page is-fullwidth is-hoverable">
    <thead>
    <tr id="head">
      <th>No</th>
      <th>Time</th>
      <th>Agenda</th>
    </tr>
    </thead>

    <tbody>
    <tr>
      <td>1</td>
      <td>0900-1000</td>
      <td>Project Group Meeting</td>
    </tr>
    <tr>
      <td>2</td>
      <td>1000-1100</td>
      <td><a>Workshop #1</a></td>
    </tr>
    <tr>
      <td>3</td>
      <td>1100-1200</td>
      <td><a>Workshop #2</a></td>
    </tr>
    <tr>
      <td>4</td>
      <td>1100-1200</td>
      <td><a class="is-danger" @click="something">No bookings. Book now!</a></td>
    </tr>
    </tbody>
</table>
</template>

<script>
export default {
    name: 'Table'
}
</script>

<style lang="scss" scoped>
</style>