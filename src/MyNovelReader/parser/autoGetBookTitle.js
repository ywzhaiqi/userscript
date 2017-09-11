import Rule from '../rule'
import { C } from '../lib'

const autoBookTitleSelector = Rule.bookTitleSelector

function autoGetBookTitle($doc) {
    let bookTitle = '';
    // 依次获取
    for (let s of autoBookTitleSelector) {
        let $node = $doc.find(s)
        if ($node.length === 1) {
            bookTitle = $node.text()
            break
        }
    }

    // 排除一些无效的？
    C.log('autoGetBookTitle', bookTitle)

    return bookTitle
}

export default autoGetBookTitle