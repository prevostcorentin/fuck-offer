<template>
	<div class="card">
		<header class="card-header" v-on:click="revealed = !revealed">
			<p class="card-header-title">
				{{ operation.name }}
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
						<input class="input" type="text" v-model="parameters[field.field]" :name="field.name" :placeholder="field.name" />
					</div>
				</div>
				<locale-picker v-for="availablelocale in availableLocales" v-bind:key="availablelocale" 
                       v-bind:definedLocale="locale" v-bind:locale="availableLocale" />
			</div>
			<div class="message">
				{{ message }}
			</div>
			<footer class="card-footer">
				<a href="#" class="card-footer-item" v-on:click="console.log('To implement')">Fetch</a>
				<a href="#" class="card-footer-item" v-on:click="console.log('To implement')">Say</a>
				<a href="#" class="card-footer-item" v-on:click="console.log('To implement')">Listen</a>
			</footer>
		</div>
	</div>
</template>

<script>
	import LocalePicker from './LocalePicker'
  import { SpeechConfig, SpeechSynthesizer, SpeechRecognizer, AudioConfig } from 'microsoft-cognitiveservices-speech-sdk'

	export default {
		data() {
			return {
				parameters: {},
				userPhrase: undefined,
				revealed: false,
				locale: 'fr'
			}
		},
		computed: {
			message() {
				return "To implement"
			}
    },
		methods: {
			textToSpeech () {
				const speechConfig = SpeechConfig.fromSubscription(this.$store.state.speech.key, this.$store.state.speech.region)
				speechConfig.speechRecognitionLanguage = this.$store.state.speech.voices[this.$store.state.translation.locale]
				speechConfig.speechSynthesisLanguage = this.$store.state.speech.voices[this.$store.state.translation.locale]
				const audioConfig = AudioConfig.fromDefaultSpeakerOutput()

				const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig)
				synthesizer.speakTextAsync(
					this.message,
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
			speechToText() {
        const speechConfig = SpeechConfig.fromSubscription(this.$store.state.speech.key, this.$store.state.speech.region);
        speechConfig.speechRecognitionLanguage = this.$store.state.speech.voices[this.$store.state.state.translation.locale]

        let audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        let recognizer = new SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync(result => {
          if (result.text !== undefined) {
            this.userPhrase = result.text
          }
        });
      }
		},
		props: {
			operation: Object,
			availableLocales: Array
		},
		components: {
			LocalePicker
    }
	}

</script>
