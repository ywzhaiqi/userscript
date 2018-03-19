// 参考 https://github.com/madrobby/zepto/blob/master/src/detect.js

const ua = navigator.userAgent
const platform = navigator.platform

export const isFirefox = ua.match(/Firefox\/([\d.]+)/)

export const isChrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)

export const isWindows = /Win\d{2}|Windows/.test(platform)