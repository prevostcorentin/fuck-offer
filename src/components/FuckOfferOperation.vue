<template>
  <div class="operation">
    <form action="GET">
      {{ name }}
      <div v-for="(field, i) in fields" v-bind:key="i">
        <label :for="name + '_' + field.name">
          {{ field.name }}
        </label>
        <input type="text" v-model="filledFields[i].value" :name="field.name" :id="name + '_' + field.name">
      </div>
      <div>
        {{ message }}
      </div>
      <a href="#" v-on:click="send">Send</a>
    </form>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      filledFields: [],
    }
  },
  methods: {
    send() {
      let route = this.templateRoute
      this.filledFields.forEach(function (f) {
        route = route.replace(':' + f.name, f.value)
      })
      console.log("querying " + this.baseUrl + route)
      Axios.get(this.baseUrl + route).then(response => this.$store.state.message = response.data.message)
      this.$store.commit('translate')
    }
  },
  props: {
    operation: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
