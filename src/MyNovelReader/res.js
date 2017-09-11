import { fontawesomeWoff } from './config'
import tpl_mainCss from './res/main.css'
import tpl_preferencesHTML from './res/preferences.html'
import tpl_preferencesCSS from './res/preferences.css'

var Res = {
  CSS_MAIN: tpl_mainCss
      .replace('{fontawesomeWoff}', fontawesomeWoff),
  CSS_FONT_AWESOME: 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css',

  preferencesHTML: tpl_preferencesHTML
      .uiTrans().replace(/\\n/g, '\n'),

  preferencesCSS: tpl_preferencesCSS,
};

export default Res