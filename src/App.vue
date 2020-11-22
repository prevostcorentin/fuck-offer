<template>
  <div id="app">
    <div class="container">
      <h1 class="title">Greumeur</h1>
      <h1 class="subtitle">Apprenez le gueux en toutes langues !</h1>
      <h3 class="title">
        Structures
      </h3>
      <operation v-for="operation in operations" v-bind:key="operation.name"
                 v-bind:operation="operation" 
                 v-bind:translationEndpoint="`${translation.endpoint}&Subscription-Key=${translation.key}&to=${translation.locale}`"
                 v-bind:availableLocales="availableLocales"/>
    </div>
  </div>
</template>

<script>
  import Operation from './components/Operation.vue'
  import Axios from 'axios'

  export default {
    name: 'App',
    data () {
      return {
        fooasUrl: "https://www.foaas.com",
        operations: undefined,
        availableLocales: ['fr', 'ar', 'ru', 'es', 'en', 'hr', 'zh-Hant'],
        flagLocale: { 'fr': 'fr', 'ar': 'ar', 'ru': 'ru', 'es': 'es', 'en': 'gb', 'hr': 'hr', 'zh-Hant': 'hk' },
        translation: {
          endpoint: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0",
          key: process.env.VUE_APP_AZURE_TRANSLATOR_API_KEY,
          message: undefined,
          rawMessage: undefined
        },
        speech: {
          defaultSpeechLocale: 'fr-FR',
          key: process.env.VUE_APP_AZURE_SPEECH_API_KEY,
          region: 'westeurope',
          voices: { 'fr': 'fr-FR', 'ru': 'ru-RU', 'es': 'es-ES', 'ar': 'ar-EG', 'en': 'en-US', 'hr': 'hr-HR', 'zh-Hant': 'zh-HK' },
          userPhrase: undefined
        }
      }
    },
    mounted() {
      Axios.get(`${this.fooasUrl}/operations`)
        .then((response) => this.operations = response.data
          .filter((o) => o.name !== "Version"))
    },
    components: {
      Operation
    }
  }
</script>
