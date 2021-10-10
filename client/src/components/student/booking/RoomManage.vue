<template>
<!-- <div class="field page">
  <p class="control has-icons-left has-icons-right">
    <input class="input" type="text" placeholder="Find">
    <span class="icon is-small is-left"><fa icon="search"/></span>
  </p>
</div> -->

<a>
<article class="media page">
    <figure class="media-left">
        <p class="image is-128x128 is-square">
            <img src="https://bulma.io/images/placeholders/128x128.png">
        </p>
    </figure>
    <div class="media-content mr-3">
        <div class="content">
        <p>
            <strong class="has-text-info">Area One</strong>
            <br>
            <strong>Reserved Time: </strong>1400-1500
            <br>
            <strong>Purpose: </strong>Arrange for a study session with study group
            <br>
            <strong>Next Reservation: </strong>1600-1700
            <br>
            <small>*Please make sure to leave <i>before</i> the next reservation.</small>
            
        </p>
    </div>
    <!-- <small class="is-size-7">Tags: 
        <span class="tag is-small">education</span> &nbsp;
        <span class="tag is-small">skillz</span>
    </small> -->
    </div>
</article>
</a>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style lang="scss" scoped>
.media {
  border: 1px solid #e6e7e9;
  padding: 1em 1.5em;
  border-radius: 0.3em;
  color: gray;
}

.media:hover {
  border: 0.15em solid #3c7a89;
}
</style>