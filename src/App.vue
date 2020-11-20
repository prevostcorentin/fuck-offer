<template>
  <div id="app">
    <div id="locales">
      <locale-picker v-for="locale in $store.state.avalaibleLocales" v-bind:key="locale"
                     v-bind:locale="locale" />
    </div>
    <div v-if="!isNaN(score)">
      Score: {{ score }}
    </div>
    <div class="content is-medium" v-if="$store.state.translation.message != undefined">
      Le gueux: {{ $store.state.translation.message }}
    </div>
    <div class="content is-medium" v-if="$store.state.speech.userPhrase != undefined">
      Vous: {{ $store.state.speech.userPhrase }}
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
    computed: {
      score () {
        let apiMessageLength = (this.$store.state.translation.message != undefined) ? this.$store.state.translation.message.length : 0
        let userMessageLength = (this.$store.state.speech.userPhrase != undefined) ? this.$store.state.speech.userPhrase.length : 0
        let matches = 0
        let maxLength = (apiMessageLength > userMessageLength) ? userMessageLength : apiMessageLength
        for (let i = 0; i < maxLength; i++) {
          if (this.$store.state.translation.message[i] === this.$store.state.speech.userPhrase[i]) {
            matches += 1
          }
        }
        let score = (matches / maxLength) * 100
        return score
      }
    },
    components: {
      FuckOfferOperation,
      LocalePicker
    }
  }
</script>
