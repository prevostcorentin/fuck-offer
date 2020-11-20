<template>
  <div class="operation">
		<form action="GET">
			{{ operation.name }}
			<div v-for="(field, i) in operation.fields" v-bind:key="i">
			<label>
				{{ field.name }}
			</label>
			<input type="text" v-model="values[field.field]" :name="field.name">
			</div>
			<a href="#" v-on:click="send">Send</a>
		</form>
  </div>
</template>

<script>
import Axios from 'axios'

	export default {
		data() {
			return {
				values: {}
			}
		},
		created() {
			this.operation.fields.forEach((o) => this.values[o.field] = "")
		},
		methods: {
			send() {
        let route = this.operation.url
				for (let name in this.values) {
					route = route.replace(':' + name, this.values[name])
				}
				Axios.get(`${this.$store.state.baseUrl}${route}`)
					.then((response) => this.$store.dispatch('speak', response.data.message))
			}
		},
		props: {
			operation: Object
		}
	}

</script>
