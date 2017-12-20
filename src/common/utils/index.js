
export { isFirefox, isChrome } from './detect'

export { GM_request } from './GM_request'

export { $x } from './selector'

export function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}