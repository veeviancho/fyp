<template>
<div class="field page">
  <p class="control has-icons-left has-icons-right">
    <input class="input" type="text" placeholder="Find">
    <span class="icon is-small is-left"><fa icon="search"/></span>
    <!-- <span class="icon is-small is-right"><fa icon="search"/></span> -->
  </p>

<!-- Advanced Search -->
<fa icon="caret-right"/>&nbsp; <small>Advanced Search</small>
<!-- <fa icon="caret-down"/> -->
<div class="field" style="margin-left: 1em">
    <small><label class="checkbox">
        <input type="checkbox"> Infocomm
        <input type="checkbox"> Skills
        <input type="checkbox"> Education
        <input type="checkbox"> ???
        Select timing for booking room???
    </label></small>
</div>

<!-- Sorting -->
<div class="sorting" style="margin-top: 2em;">
    Sort by:
    <div class="select is-small">
        <select>
            <option>None</option>
            <option>Title (Ascending)</option>
            <option>Title (Descending)</option>
            <option>Popularity (Ascending)</option>
            <option>Popularity (Descending)</option>
            <option>No of Reviews (Ascending)</option>
            <option>No of Reviews (Descending)</option>
        </select>
    </div>
</div>


</div>
</template>



<script>
export default {
    name: 'Filter'
}
</script>

<style lang="scss" scoped>
</style>