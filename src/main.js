import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Axios from 'axios'
import AsyncComputed from 'vue-async-computed'
import { SpeechConfig, SpeechSynthesizer, SpeechRecognizer, AudioConfig } from 'microsoft-cognitiveservices-speech-sdk'

Vue.use(AsyncComputed)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    baseUrl: "https://www.foaas.com",
    operations: undefined,
    avalaibleLocales: ['fr', 'ar', 'ru', 'es', 'gr'],
    parameters: ['Mister', 'Me'],
    translation: {
      endpoint: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0",
      key: 'ea799cf50b1646a2a7de2ccf6e760acd',
      locale: 'fr',
      message: undefined,
      rawMessage: undefined
    },
    speech: {
      defaultSpeechLocale: 'fr-FR',
      key: 'ac1ea54be432432ab3b146c6d5b0e175',
      region: 'westeurope',
      voices: { 'fr': 'fr-FR', 'ru': 'ru-RU', 'es': 'es-ES', 'ar': 'ar-EG', 'gr': 'el-GR' },
      userPhrase: undefined
    }
  },
  mutations: {
    updateMessage(state, message) {
      state.translation.rawMessage = message
    },
    translate(state) {
      Axios.post(`${state.translation.endpoint}&Subscription-Key=${state.translation.key}&to=${state.translation.locale}`,
        [{ 'Text': state.translation.rawMessage }], {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => state.translation.message = response.data[0].translations[0].text) 
    },
    updateLocale(state, newLocale) {
      state.translation.locale = newLocale
    },
    textToSpeech(state) {
      const speechConfig = SpeechConfig.fromSubscription(state.speech.key, state.speech.region)
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
    },
    speechToText(state) {
      const speechConfig = SpeechConfig.fromSubscription(state.speech.key, state.speech.region);
      speechConfig.speechRecognitionLanguage = state.speech.voices[state.translation.locale]

      let audioConfig = AudioConfig.fromDefaultMicrophoneInput();
      let recognizer = new SpeechRecognizer(speechConfig, audioConfig);

      recognizer.recognizeOnceAsync(result => {
        if (result.text !== undefined) {
          state.speech.userPhrase = result.text
        }
        console.log(state.speech.userPhrase)
      });
    }
  },
  actions: {
    translate({ commit }, message) {
      commit('updateMessage', message)
      commit('translate')
    },
    changeLocale({ commit }, locale) {
      commit('updateLocale', locale)
      commit('translate')
    },
    say({ commit }) {
      commit('textToSpeech')
    },
    listen({ commit }) {
      commit('speechToText')
    }
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
