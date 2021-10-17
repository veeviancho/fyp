<template>
<div class="">
<div class="columns">
    <div class="column is-one-quarter">
        <div class="card available">
        <div class="card-image">
            <figure class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="content">
                <p class="subtitle has-text-weight-bold">Room #1 <span class="tag is-primary is-light">Available</span></p>
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. </p> 
            </div>
        </div>
        </div>
    </div>

    <div class="column is-one-quarter">
        <div class="card not-available">
        <div class="card-image">
            <figure class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="content">
                <p class="subtitle has-text-weight-bold">Room #2 <span class="tag is-danger is-light">Occupied</span></p> 
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. </p> 
            </div>
        </div>
        </div>
    </div>

    <div class="column is-one-quarter">
        repeat
    </div>

    <div class="column is-one-quarter">
        repeat
    </div>
</div>
</div>
</template>

<script>
export default {
    name: 'Room'
}
</script>

<style lang="scss" scoped>
.available:hover {
    border: 0.2em solid #3c7a89;
    border-radius: 0.5rem;
}

.not-available:hover {
    border: 0.2em solid #893c68;
    border-radius: 0.5rem;
}
</style>