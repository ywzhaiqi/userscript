
const synth = window.speechSynthesis

class Speech {
  constructor() {
    this.$root = $('#speech-dialog')
    this.$root.on('click', this.handleClick.bind(this))

    this.init()
  }

  init() {
    this.voices = synth.getVoices()
  }

  handleClick(e) {
    const targetNode = e.target
    switch(targetNode.id) {
      case 'speech-dialog-close':
        this.$root.hide()
        break;
      case 'speech-dialog-start':
        break;
      case 'speech-dialog-stop':
        break;
    }
  }

  show() {
    this.$root.show()
  }


}