<template>
  <div id="app">
    <div id="locales">
      <locale-picker v-for="locale in $store.state.avalaibleLocales" v-bind:key="locale"
                     v-bind:locale="locale" />
    </div>
    <div class="content is-medium">
      {{ $store.state.translation.message }}
    </div>
    <div class="content is-medium">
      {{ $store.state.speech.userPhrase }}
    </div>
    <fuck-offer-operation v-for="operation in $store.state.operations" v-bind:key="operation.name"
                          v-bind:operation="operation" />
  </div>
</template>

<script>
  import FuckOfferOperation from './components/FuckOfferOperation.vue'
  import LocalePicker from './components/LocalePicker.vue'
  import Axios from 'axios'

  export default {
    name: 'App',
    mounted() {
      Axios.get(`${this.$store.state.baseUrl}/operations`)
        .then((response) => this.$store.state.operations = response.data
          .filter((o) => o.name !== "Version"))
    },
    components: {
      FuckOfferOperation,
      LocalePicker
    }
  }
</script>
