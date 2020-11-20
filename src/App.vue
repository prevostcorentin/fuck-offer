<template>
  <div id="app">
    <h1 class="title">Greumeur</h1>
    <h1 class="subtitle">Apprenez la grammaire des gueux !</h1>
    <div id="locales">
      <h3 class="title">Choisissez un langage pour votre gueux</h3>
      <locale-picker v-for="locale in $store.state.avalaibleLocales" v-bind:key="locale"
                     v-bind:locale="locale" />
    </div>
    <div class="container" v-if="!isNaN(score)">
      <h3 class="title">
        Votre score !
      </h3>
      <div class="notification is-info">
        Score: {{ score }}
      </div>
    </div>
    <div class="container" v-if="$store.state.translation.message != undefined">
      <div class="notification is-danger">
        Le gueux: {{ $store.state.translation.message }}
      </div>
    </div>
    <div class="content" v-if="$store.state.speech.userPhrase != undefined">
      <div class="notification is-primary">
        Vous: {{ $store.state.speech.userPhrase }}
      </div>
    </div>
    <div class="content">
      <h3 class="title">
        Structures
      </h3>
      <fuck-offer-operation v-for="operation in $store.state.operations" v-bind:key="operation.name"
                            v-bind:operation="operation" />
    </div>
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
