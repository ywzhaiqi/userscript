<template>
  <div class="speech">
    <span v-if="playState == STATE.playing">
      <button @click="pause">暂停朗读</button>
      <button @click="stop">停止朗读</button>
    </span>
    <span v-else>
      <button @click="start" v-if="playState == STATE.stoping">开始朗读</button>
      <button @click="resume" v-if="playState == STATE.pausing">继续朗读</button>
      <span v-if="elapsedTime">已朗读 {{ formatMillisencod(elapsedTime) }}</span>
      <span v-else class="tips">Tips: 可从选择文本处开始朗读</span>
      <button class="close-btn" @click="closeSpeech">X</button>
    </span>

    <div class="loader" v-if="playState == STATE.playing">
      <pulse-loader></pulse-loader>
    </div>
    <div v-else>
      <div>
        <label><input type="radio" v-model="autoStop" value="time" />
          定时朗读：
          <input type="text" v-model="autoStopTime" class="auto-stop-input" />
          <select v-model="autoStopTimeUnit">
            <option value="minute">分钟</option>
            <option value="hour">小时</option>
          </select>
          后停止
        </label><br>
        <label><input type="radio" v-model="autoStop" value="chapter" />
          定章朗读：
          <input type="text" v-model="autoStopChapter" class="auto-stop-input" />章后停止
        </label><br>
        <label><input type="radio" v-model="autoStop" value="" />一直朗读</label>
      </div>
      <div>
          <label for="speech-dialog-rate">语速</label>
          <input type="range" min="0.5" max="3" step="0.1" id="speech-dialog-rate" v-model="rate" />
          <span class="rate-value">{{rate}}</span>
      </div>
      <div>
          <label for="speech-dialog-pitch">音高</label>
          <input type="range" min="0" max="2" step="0.1" id="speech-dialog-pitch" v-model="pitch" />
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
import bus, { APPEND_NEXT_PAGE } from '../bus.js'
import { locations, formatMillisencod } from '../../utils'

const STATE = {
  playing: 1,
  pausing: 2,
  stoping: 0,
}

export default {
  name: 'speech',
  data() {
    return {
      text: '',
      // 播放状态
      STATE,
      playState: STATE.stoping,  // 监控朗读的状态
      isPlaying: false,  // 按钮的状态
      elapsedTime: 0,

      voiceList: [],
      selectedVoice: 0,
      rate: 1,
      pitch: 1,

      autoStop: '',
      autoStopTime: 2,  // 2 小时
      autoStopTimeUnit: 'hour',
      autoStopChapter: 5,  // 5章

      synth: window.speechSynthesis,
      utterance: new SpeechSynthesisUtterance(),
    }
  },
  components: {
    PulseLoader
  },
  mounted() {
    // 载入语音列表
    this.voiceList = this.synth.getVoices()
    this.synth.onvoiceschanged = () => {
      this.voiceList = this.synth.getVoices()
    }

    this.loadSetting()
  },
  beforeDestory() {
    clearTimeout(this.autoStopTimeId)
  },
  methods: {
    formatMillisencod,
    closeSpeech() {
      this.$emit('closeSpeech')
    },
    loadSetting() {
      this.rate = GM_getValue('speech.rate', 1)
      this.pitch = GM_getValue('speech.pitch', 1)
      this.selectedVoice = GM_getValue('speech.selectedVoice', 0)

      this.autoStop = GM_getValue('speech.autoStop', '')
      this.autoStopTime = GM_getValue('speech.autoStopTime', 2)
      this.autoStopTimeUnit = GM_getValue('speech.autoStopTimeUnit', 'hour')
      this.autoStopChapter = GM_getValue('speech.autoStopChapter', 5)
    },
    saveSetting() {
      GM_setValue('speech.rate', this.rate)
      GM_setValue('speech.pitch', this.pitch)
      GM_setValue('speech.selectedVoice', this.selectedVoice)

      GM_setValue('speech.autoStop', this.autoStop)
      GM_setValue('speech.autoStopTime', this.autoStopTime)
      GM_setValue('speech.autoStopTimeUnit', this.autoStopTimeUnit)
      GM_setValue('speech.autoStopChapter', this.autoStopChapter)
    },
    start() {
      this.isPlaying = true

      // 获取当前所在的章节
      this.speakIndex = oldApp.curFocusIndex
      this.startSpeakIndex = oldApp.curFocusIndex
      let toSpeekText = this.getToSpeekText(true)

      bus.$off(APPEND_NEXT_PAGE, this.waitForNext)
      bus.$on(APPEND_NEXT_PAGE, this.waitForNext)

      // fix 可能的问题：点击开始朗读无效，需要 cancel 才有效
      window.speechSynthesis.cancel()

      this.speak(toSpeekText, this.checkNext)

      if (this.autoStop == 'time') {
        clearTimeout(this.autoStopTimeId)
        this.autoStopTimeId = setTimeout(this.stop, this.getAutoStopMillisecond())
      }

      // 保存设置
      this.saveSetting()
    },
    getAutoStopMillisecond() {
      if (this.autoStopTimeUnit == 'minute') {
        return this.autoStopTime * 60 * 1000
      } else {
        return this.autoStopTime * 3600 * 1000
      }
    },
    checkNext() {
      if (!this.isPlaying) return

      this.speakIndex += 1;
      this.checkAgin()
    },
    checkAgin() {
      let speakedChapters = this.speakIndex - this.startSpeakIndex
      if (this.autoStop == 'chapter' && speakedChapters >= this.autoStopChapter) {
        this.stop()
        return
      }

      // 是否有新章节
      let nextText = this.getToSpeekText()
      if (nextText) {
        this.isFindingNext = false
        this.speak(nextText, this.checkNext)

        this.scrollToNext()
      } else {
        this.isFindingNext = true
        // 加载下一章
        oldApp.scrollForce()
      }
    },
    waitForNext() {
      if (this.isFindingNext && this.isPlaying) {
        this.checkAgin()
      }
    },
    scrollToNext() {
      let elem = oldApp.scrollItems.get(this.speakIndex)
      if (elem) {
        oldApp.scrollToArticle(elem)
      }
    },
    getToSpeekText(fromSelection=false) {
      let startIndex = this.speakIndex

      // 这是 jQuery 对象
      let text = oldApp.scrollItems
        .toArray()
        .filter((elem, i) => {
          return i == startIndex
        })
        // .map(elem => elem.textContent.slice(0, 10))  // debug
        .map(elem => elem.textContent)
        .join('\n')

      if (fromSelection) {
        let newText = this.getSelectionAfterText(text)
        if (newText) {
          return newText
        }
      }

      return text
    },
    getSelectionAfterText(text) {
      const selObj = getSelection()
      const selStr = selObj.toString()
      let afterText;

      if (!selStr) return

      let indexes = locations(selStr, text)
      if (indexes.length == 0) {
        return
      } else if (indexes.length == 1) {
        afterText = text.substring(indexes[0])
      } else {  // 多个
        indexes = locations(selObj.anchorNode.data, text)
        if (indexes.length == 0) return
        else if (indexes.length == 1) {
          let start = indexes[0] + selObj.anchorOffset
          afterText = text.substring(start)
        } else {
          console.error('getSelectionAfterText() 无法判断唯一')
        }
      }

      selObj.removeAllRanges()
      return afterText
    },
    speak(text, endFn) {
      this.utterance = new SpeechSynthesisUtterance(text);
      this.utterance.voice = this.voiceList[this.selectedVoice]
      this.utterance.pitch = this.pitch
      this.utterance.rate = this.rate

      this.listenForSpeechEvents(endFn)

      this.synth.speak(this.utterance);
    },
    listenForSpeechEvents (endFn) {
      this.utterance.onstart = () => {
        this.playState = STATE.playing
      }
      this.utterance.onpause = (event) => {
        this.playState = STATE.pausing
        this.elapsedTime = event.elapsedTime
      }
      this.utterance.onresume = (e) => {
        this.playState = STATE.playing
      }
      this.utterance.onend = (event) => {
        this.playState = STATE.stoping
        // this.elapsedTime = event.elapsedTime
        this.elapsedTime = null

        if (endFn) {
          endFn()
        }
      }
    },
    pause() {
      this.isPlaying = false

      this.synth.pause()
    },
    resume() {
      this.isPlaying = true

      this.synth.resume()
    },
    stop() {
      this.isPlaying = false

      this.synth.cancel()

      clearTimeout(this.autoStopTimeId)
    }
  }
}
</script>

<style lang="less">
.speech {
  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
  }

  .loader {
    text-align: center;
  }

  .auto-stop-input {
    width: 30px;
  }

  .tips {
    font-size: 0.8em;
  }
}
</style>

