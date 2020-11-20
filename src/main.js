import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { SpeechConfig, SpeechSynthesizer, AudioConfig } from 'microsoft-cognitiveservices-speech-sdk'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    baseUrl: "https://www.foaas.com",
    operations: undefined,
    avalaibleLocales: [ 'fr', 'ar', 'ru', 'es', 'gr' ],
    translation: {
      endpoint: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0",
      key: '',
      locale: 'fr',
      message: undefined
    },
    speech: {
      voices: { 'fr': 'fr-FR', 'en': 'en-US', 'ru': 'ru-RU', 'es': 'es-ES', 'ar': 'ar-EG', 'gr': 'el-GR' }
    }
  },
  mutations: {
    translate(state, message) {
      Axios.post(`${state.translation.endpoint}&Subscription-Key=${state.translation.key}&to=${state.translation.locale}`,
        [{ 'Text': message }], {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => state.translation.message = response.data[0].translations[0].text)
    },
    updateLocale(state, newLocale) {
      state.translation.locale = newLocale
    },
    textToSpeech(state) {
      const speechConfig = SpeechConfig.fromSubscription("", "westeurope")
      speechConfig.locale = "fr-FR"
      speechConfig.speechRecognitionLanguage = state.speech.voices[state.translation.locale]
      speechConfig.speechSynthesisLanguage = state.speech.voices[state.translation.locale]
      const audioConfig = AudioConfig.fromDefaultSpeakerOutput()

      const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig)
      synthesizer.speakTextAsync(
        state.translation.message,
        result => {
          if (result) {
            console.log(JSON.stringify(result))
          }
          synthesizer.close()
        },
        error => {
          console.log(error)
          synthesizer.close()
        });
    }
  },
  actions: {
    speak({ commit }, message) {
      commit('translate', message)
      commit('textToSpeech')
    }
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
