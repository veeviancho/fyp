<template>
<a>

<article class="media">
  <div class="media-content">

    <div class="content">
        <h1 class="title">The Importance of Lifelong Learning</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim tortor at auctor urna. Congue eu consequat ac felis donec et odio pellentesque. Pharetra diam sit amet nisl suscipit adipiscing bibendum est. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Magna eget est lorem ipsum. Pellentesque massa placerat duis ultricies lacus.</p>
    </div>

    <small class="is-size-7">Tags: 
        <span class="tag is-small">education</span>
        <span class="tag is-small">skillz</span>
    </small>

  </div>
</article>

</a>
</template>

<script>
export default {
    name: 'Article'
}
</script>

<style lang="scss" scoped>
.media {
  padding: 1.5em 2.0em;
  border-radius: 0.4em;
  color: white;
  border: 0.3em solid #33CDC4;
}

.tag {
  background-color: #329AA0;
  color: white;
  margin-left: 0.5rem;
}

.title {
  color: white;
}

.media:hover {
  background-color: rgba(0, 0, 0, 0.25);
}

</style>