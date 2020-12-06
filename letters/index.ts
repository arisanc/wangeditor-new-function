import Editor from '../index'
import { addCss } from '../../utils/util'

const englishWord = /(?<=(^|([^a-zA-Z_])))[a-zA-Z_]+(?=[^a-zA-Z_]|$)/g
const japense = /[\u30a1-\u30f6\u3041-\u3093\uFF00-\uFFFF\u4e00-\u9fa5]/g
/**
 * 统计字数
 * @author arisan
 */
export class CountLetters {
    editor: Editor
    fontCountElement: HTMLStyleElement | undefined
    afterCountHook: Function | undefined

    constructor(editor: Editor) {
        this.editor = editor
        this.init()
    }
    public setAfterCountHook(func: Function) {
        this.afterCountHook = func
    }
    public init() {
        //显示字数
        setTimeout(() => {
            this.countLetters()
        }, 0)
        this.addListenerLetters()
    }

    private addListenerLetters() {
        const editor = this.editor
        editor.txt.eventHooks.changeEvents.push(() => {
            this.countLetters()
        })
    }

    public countLetters(): void {
        let text = this.editor.txt.text().replace(/&nbsp;/g, '')
        let engMatch = text.match(englishWord)
        let japMatch = text.match(japense)
        let engCount = 0
        let japCount = 0
        if (engMatch) {
            engCount = engMatch.length
        }
        if (japMatch) {
            japCount = japMatch.length
        }
        var count = engCount + japCount + '字'
        if (this.afterCountHook) {
            this.afterCountHook(engCount + japCount)
        }
        //统计完成后回调
        if (this.fontCountElement) {
            this.fontCountElement.remove()
            this.fontCountElement = addCss(
                ".w-e-text-container::after{content:'" +
                    count +
                    "';position: absolute;left: 90%;top: 90%;color:#999;}"
            )
        } else {
            this.fontCountElement = addCss(
                ".w-e-text-container::after{content:'" +
                    count +
                    "';position: absolute;left: 90%;top: 90%;color:#999;}"
            )
        }
    }
}
