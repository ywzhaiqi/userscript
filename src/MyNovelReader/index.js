
import './meta'
import './lang'

import Setting from './Setting'
import { toggleConsole } from './lib'
import App from './app'
import BookLinkMe from './booklinkme'

toggleConsole(Setting.debug);

document.addEventListener('DOMContentLoaded', () => {
  if (location.host.indexOf('booklink.me') > -1) {
    BookLinkMe.init();
  } else {
    App.init();
  }
})