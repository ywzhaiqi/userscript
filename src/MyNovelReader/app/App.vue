<template>
  <div id="app">
    <speech
      class="speech"
      v-if="speechDialogVisible"
      v-on:closeSpeech="hideSpeech"
    >
    </speech>
  </div>
</template>

<script>
import bus from './bus'
import Speech from './components/Speech.vue'

export default {
  data() {
    return {
      speechDialogVisible: false,
    }
  },
  components: {
    Speech,
  },
  created() {
    bus.$on('show-speech', this.showSpeech)
  },
  beforeDestory() {
    bus.$off('show-speech', this.hideSpeech)
  },
  methods: {
    showSpeech() {
      this.speechDialogVisible = true
    },
    hideSpeech() {
      this.speechDialogVisible = false
    }
  }
}
</script>

<style lang="less">
.speech {
  position: fixed;
  z-index: 100;
  background-color: white;
  top: 10px;
  right: 35px;


}
</style>
