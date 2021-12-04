<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">

            <header class="modal-card-head">
                <p class="modal-card-title">Validation Rules</p>
                <button class="delete" aria-label="close" @click="close()"></button>
            </header>

            <section class="modal-card-body">
                <div v-if="info">
                    <div v-for="item in info" :key="item.msg">{{ item.msg }}</div>
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
    ...mapGetters(['info'])
  },
  methods: {
    close() {
        this.$emit('close');
    }
  }
}
</script>
