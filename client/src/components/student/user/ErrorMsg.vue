<template>
    <div class="modal is-active">
        <div class="modal-background" @click="close()"></div>
        <div class="modal-card">

            <header class="modal-card-head">
                <p class="modal-card-title">Why can't I register?</p>
                <button class="delete" aria-label="close" @click="close()"></button>
            </header>

            <section class="modal-card-body">
                <div v-if="error.info">
                    <li class="list-item" v-for="item in error.info" :key="item.msg">{{ item.msg }}</li>
                </div>
            </section>

            <footer class="modal-card-foot">
                <button class="button is-black" @click="close()">Okay</button>
            </footer>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Error Message',
  computed: {
    ...mapGetters(['error'])
  },
  methods: {
    close() {
        this.$emit('close');
    }
  }
}
</script>
