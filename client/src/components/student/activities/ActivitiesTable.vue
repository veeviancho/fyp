<template>
<table class="table page is-hoverable">
    <thead>
    <tr id="head">
      <th>No</th>
      <th>Time</th>
      <th>Title</th>
      <th>Short Description</th>
      <th>Category</th>
      <th>Venue</th>
      <th>Attendance</th>
    </tr>
    </thead>

    <tbody>
    <tr>
      <td>1</td>
      <td>1500-1800</td>
      <td><a>Workshop #1</a></td>
      <td class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
      <td>Tech Skills</td>
      <td>TR1</td>
      <td><strong class="vacancy">23</strong>/25</td>
    </tr>
    <tr>
      <td>2</td>
      <td>1500-1800</td>
      <td><a>Workshop #2</a></td>
      <td class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
      <td>Tech Skills</td>
      <td>TR1</td>
      <td><strong class="vacancy">3</strong>/20</td>
    </tr>
    <tr>
      <td>3</td>
      <td>1500-1800</td>
      <td><a>Workshop #3</a></td>
      <td class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
      <td>Tech Skills</td>
      <td>TR1</td>
      <td><strong class="no-vacancy">15</strong>/15</td>
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
.vacancy {
  color: green;
}

.no-vacancy {
  color: red;
}
</style>