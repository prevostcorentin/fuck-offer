<template>
  <span :class=locale>
		<a href="#" v-on:click="$store.commit('updateLocale', locale)"><img :src=imageUrl></a>
  </span>
</template>

<script>

	export default {
		computed: {
			imageUrl () {
        return `https://www.countryflags.io/${this.locale}/shiny/64.png`
      }
		},
		props: {
			locale: String
    }
	}

</script>
