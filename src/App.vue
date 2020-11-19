<template>
  <div id="app">
    <fuck-offer-operation v-for="operation in $store.state.operations" v-bind:key="operation.name"
                          v-bind:operation="operation" />
  </div>
</template>

<script>
import FuckOfferOperation from './components/FuckOfferOperation.vue'
import Axios from 'axios'

export default {
  name: 'App',
  mounted () {
    console.log(this.$store.state)
    Axios.get(`${this.$store.state.baseUrl}/operations`)
         .then((response) => this.$store.state.operations = response.data
                                                           .filter((o) => o.name !== "Version"))
  },
  components: {
    FuckOfferOperation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
