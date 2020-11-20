<template>
	<div class="card">
		<header class="card-header" v-on:click="revealed = !revealed">
			<p class="card-header-title">
				{{ translationPayload.data[0].translations[0].text }}
			</p>
			<a href="#" class="card-header-icon" aria-label="more options">
				<span class="icon">
					<i class="fas fa-angle-down" aria-hidden="true"></i>
				</span>
			</a>
		</header>
		<div class="card-content" v-if="revealed">
			<div class="content">
				<div class="field" v-for="(field, i) in operation.fields" v-bind:key="i">
					<div class="control">
						<input class="input" type="text" v-model="values[field.field]" :name="field.name" :placeholder="field.name"/>
					</div>
				</div>
			</div>
			<div class="message" v-if="message != undefined">
				{{ message }}
			</div>
			<footer class="card-footer">
				<a href="#" class="card-footer-item" v-on:click="fetch">Fetch</a>
				<a href="#" class="card-footer-item" v-on:click="$store.dispatch('say')">Say</a>
				<a href="#" class="card-footer-item" v-on:click="$store.dispatch('listen')">Listen</a>
			</footer>
		</div>
	</div>
</template>

<script>
import Axios from 'axios'

	export default {
		data() {
			return {
				values: {},
				message: undefined,
				revealed: false
			}
		},
		created() {
			this.operation.fields.forEach((o, i) => this.values[o.field] = this.$store.state.parameters[i])
		},
		asyncComputed: {
      translationPayload() {
        return Axios.post(`${this.$store.state.translation.endpoint}&Subscription-Key=${this.$store.state.translation.key}&to=${this.$store.state.translation.locale}`,
          [{ 'Text': this.operation.name }], {
          headers: {
            'Content-Type': 'application/json'
          }
				})
      }
    },
		methods: {
			fetch () {
        let route = this.operation.url
				for (let name in this.values) {
					route = route.replace(':' + name, this.values[name])
          Axios.get(`${this.$store.state.baseUrl}${route}`)
            .then((response) => {
              this.$store.dispatch('translate', response.data.message)
            })
				}
			},
		},
		props: {
			operation: Object
		}
	}

</script>
