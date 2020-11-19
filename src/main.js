import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    baseUrl: "https://www.foaas.com",
    operations: undefined, 
    translation: {
      endpoint: "https://api.cognitive.microsofttranslator.com/",
      key: '',
      language: 'fr',
      originalMessage: undefined,
      message: undefined
    }
  },
  mutations: {
    translate (state) {
      Axios.post(`${state.translation.endpoint}?to=${state.translation.language}`,
                 [{'Text': state.originalMessage }], {
                     headers: {
                         'Ocp-Apim-Subscription-Key': state.translation.key,
                         'Content-Type': 'application/json'
                    }
                  }
      )
    }
  }
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
