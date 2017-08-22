
import './meta'
// 采用 Object.defineProperty(String.prototype 方式，需要直接导入而且要放在一开始
import './lang'

import Setting from './Setting'
import { toggleConsole } from './lib'
import App from './app'
import BookLinkMe from './booklinkme'

toggleConsole(Setting.debug);

if (location.host.indexOf('booklink.me') > -1) {
  BookLinkMe.init();
} else {
  App.init();
}