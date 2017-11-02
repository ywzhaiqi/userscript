<template>
  <div class="speech">
    <button v-if="isSpeeking" @click="stop">停止朗读</button>
    <div v-else>
      <button @click="start">开始朗读</button>
      <button class="close-btn" @click="closeSpeech">X</button>
    </div>

    <pulse-loader v-if="isSpeeking"></pulse-loader>
    <div v-else>
      <div>
          <label for="speech-dialog-rate">语速</label>
          <input type="range" min="0.5" max="2" value="1" step="0.1" id="speech-dialog-rate" v-model="rate" />
          <span class="rate-value">{{rate}}</span>
      </div>
      <div>
          <label for="speech-dialog-pitch">音高</label>
          <input type="range" min="0" max="2" value="1" step="0.1" id="speech-dialog-pitch" v-model="pitch" />
          <span class="pitch-value">{{pitch}}</span>
      </div>
      <div>
        <select class="voices" v-model="selectedVoice">
          <option v-for="(voice, index) in voiceList" :value="index" :key="index">
            {{voice.name}} {{voice.lang}}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import PulseLoader from '../../../common/components/spinner/PulseLoader.vue'
import oldApp from '../../app.js'

function getToSpeekText(startIndex) {
  // 这是 jQuery 对象
  let text = oldApp.scrollItems
    .toArray()
    .filter((elem, i) => {
      return i >= startIndex
    })
    .map(elem => elem.textContent)
    .join('\n')

  return text
}

export default {
  name: 'speech',
  data() {
    return {
      text: '',
      isSpeeking: false,
      selectedVoice: 0,
      voiceList: [],
      // speech
      rate: 1,
      pitch: 1,

      synth: window.speechSynthesis,
      speech: new window.SpeechSynthesisUtterance(),
    }
  },
  components: {
    PulseLoader
  },
  mounted() {
    this.voiceList = this.synth.getVoices()
    this.synth.onvoiceschanged = () => {
      this.voiceList = this.synth.getVoices()
    }
  },
  methods: {
    closeSpeech() {
      this.$emit('closeSpeech')
    },
    start() {
      // 获取当前所在的章节
      let speekIndex = oldApp.curFocusIndex
      let toSpeekText = getToSpeekText(speekIndex)

      this.speech = new SpeechSynthesisUtterance()
      this.listenForSpeechEvents(() => {  // 继续阅读下一章
        speekIndex += 1;
        let nextText = getToSpeekText(speekIndex)
        if (nextText) {
          this.speech.text = nextText
          this.synth.speak(this.speech)
        }
      })

      this.speech.text = toSpeekText
      this.speech.voice = this.voiceList[this.selectedVoice]
      this.speech.pitch = this.pitch
      this.speech.rate = this.rate
      this.synth.speak(this.speech)
    },
    listenForSpeechEvents (endFn) {
      this.speech.onstart = () => {
        this.isSpeeking = true
      }
      this.speech.onend = () => {
        this.isSpeeking = false
        if (endFn) {
          endFn()
        }
      }
    },
    stop() {
      this.synth.cancel()
    }
  }
}
</script>

<style lang="less">
.speech {
  .close-btn {
    position: absolute;
    top: 2px;
    right: 4px;
  }
}
</style>

