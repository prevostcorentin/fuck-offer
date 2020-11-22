<template>
  <span :class=locale>
		<a href="#" v-on:click="locale = locale"><img :src=imageUrl></a>
  </span>
</template>

<script>

	export default {
		computed: {
			imageUrl () {
        return `https://www.countryflags.io/${this.locale}/shiny/32.png`
      }
		},
		props: {
			definedLocale: String,
			locale: String
    }
	}

</script>
