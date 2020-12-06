/**
 * @description 配置热键
 * @author arisan
 */

import Editor from '../../editor/index'
import defaultHotKey, { command } from '../../config/hotkey'
import { TableHotKey } from './table'
import { setFullScreen, setUnFullScreen } from '../init-fns/set-full-screen'

export interface callHotkey {
    element: Array<Element>
    func: Function
    args: Array<string>
    cls: Function
}

class HotKey {
    private editor: Editor
    public elementHotKeyHook: { [key: string]: { [key: string]: { [key: string]: callHotkey } } }
    public HotKey: { [key: string]: { [key: string]: command } }
    public defaultHotKey: { [key: string]: { [key: string]: command } }
    private readonly reg: RegExp = /^(_control)?(_shift)?(_alt)?(_window)?$/
    private elementHotKeyInstance: {
        table: TableHotKey
    }
    constructor(
        editor: Editor,
        hotkey?: { [key: string]: { [key: string]: command } },
        elementHotKey?: { [key: string]: { [key: string]: { [key: string]: command } } }
    ) {
        this.editor = editor
        //this.$textContainer = editor.$textContainerElem
        //this.$bar = $('<div class="w-e-progress"></div>')
        this.elementHotKeyHook = {}
        this.HotKey = {}
        this.defaultHotKey = hotkey ? hotkey : defaultHotKey
        this.elementHotKeyInstance = {
            table: new TableHotKey(editor),
        }
        this._init()
    }

    _init() {
        //const editor = this.editor
        this.setHotKeys(this.defaultHotKey)
        this.setHotKeys({
            _alt: {
                x: { func: this.changeScreen, args: [this.editor], cls: HotKey },
            },
        })
        setTimeout(() => {
            this.addEventListener()
        }, 0)
        this.initDefaultHotKey()
    }

    changeScreen(editor: Editor) {
        console.log(editor)
        if (editor.isFullScreen) {
            setUnFullScreen(editor)
        } else {
            setFullScreen(editor)
        }
    }

    //当创建的元素需要监听时使用
    pushElementHook(element: HTMLElement) {
        //没有绑定事件的一律return
        /*let tagName = element.tagName.toLowerCase()
        if(!this.elementHotKeyHook[tagName]){
            //this.elementHotKeyHook[tagName] = {}
            return
        }
        var elementEventHook = this.elementHotKeyHook[tagName]
        if(!elementEventHook){
            return
        }
        for(let keyName in elementEventHook){
            element.addEventListener('change',e=>{
                e.stopPropagation()
                e.preventDefault()
                let combineKey = this.parse_combine_key(e)
                if(elementEventHook[combineKey]){
                    return
                }
                for(let key in elementEventHook[combineKey]){
                    if(e.key==key){
                        let task = elementEventHook[combineKey][key]
                        task.func.call(task.cls,task.args)
                        return false
                    }
                }    
            })
        }*/
    }

    parse_combine_key(e: KeyboardEvent): string {
        var arr: Array<string> = new Array(4)
        var result = ''
        arr[0] = e.ctrlKey ? 'ctrl' : ''
        arr[1] = e.shiftKey ? 'shift' : ''
        arr[2] = e.metaKey ? 'win' : ''
        arr[3] = e.altKey ? 'alt' : ''
        for (var i = 0; i < 4; i++) {
            if (arr[i]) {
                result += '_' + arr[i]
            }
        }
        return result
    }

    dispatchEvent(): HTMLElement | null {
        let selectedStart = this.editor.selection.getSelectionStartElem()?.elems[0]
        let selectedEnd = this.editor.selection.getSelectionEndElem()?.elems[0]
        if (selectedEnd && selectedEnd == selectedStart) {
            //表格
            let tagName = selectedEnd.tagName.toLowerCase()
            switch (tagName) {
                case 'th':
                    if (selectedEnd.parentElement && selectedEnd.parentElement.parentElement) {
                        return selectedEnd.parentElement.parentElement.parentElement
                    }
                    break
                case 'td':
                    if (selectedEnd.parentElement && selectedEnd.parentElement.parentElement) {
                        return selectedEnd.parentElement.parentElement.parentElement
                    }
                    break
                default:
                    return null
            }
        }
        return null
    }

    private addEventListener() {
        const editor = this.editor
        var _menu_instance = editor.menus.menuMap
        editor.$textContainerElem.elems[0].addEventListener('keydown', e => {
            if (e.key == 'Control' || e.key == 'Shift' || e.key == 'Alt' || e.key == 'Window') {
                e.preventDefault()
                return
            }
            const key = e.key.toLowerCase()
            const index = this.parse_combine_key(e)
            const item = this.HotKey[index]
            let element = this.dispatchEvent()
            let tagName = element?.tagName.toLowerCase()
            let hasElementEvent = tagName && this.elementHotKeyHook[tagName]?.[index]?.[key]
            console.log(index)
            if (hasElementEvent) {
                //调用element事件
                hasElementEvent.func.call(hasElementEvent.cls, ...[editor, element])
                e.preventDefault()
                return false
            } else if (item && item[key]) {
                //调用全局事件
                let handler = item[key]
                if (!handler.args) {
                    handler.args = []
                }
                handler.func.call(_menu_instance[handler.cls.name], ...handler.args)
                e.preventDefault()
                return false
            }
        })
        //如果已有内容，则需要监听
        /*for (let tag in this.elementHotKeyHook) {
            let ele = editor.$textContainerElem.elems[0].getElementsByTagNameNS(
                'http://www.w3.org/1999/xhtml',
                tag
            )
            if (ele.length) {
                for (let i = 0; i < ele.length; i++) {
                    for (let key in this.elementHotKeyHook[tag]) {
                        this.pushElementHook(ele[i])
                    }
                }
            }
        }*/
    }

    setUserHotKey(key: string, code: string, func: command, type?: string) {
        if (this.reg.test(key)) {
            this.HotKey[key][code] = func
        }
        return
    }

    setHotKeys(hotkeys: { [key: string]: { [key: string]: command } }) {
        for (let combineKeys in hotkeys) {
            if (!this.HotKey[combineKeys]) {
                this.HotKey[combineKeys] = {}
            }
            for (let key in hotkeys[combineKeys]) {
                this.HotKey[combineKeys][key] = hotkeys[combineKeys][key]
                if (!this.HotKey[combineKeys][key].args) {
                    this.HotKey[combineKeys][key].args = []
                }
            }
        }
    }

    setElementHotKeys(elementHotKey: {
        [key: string]: { [key: string]: { [key: string]: command } }
    }) {
        for (let tagName in elementHotKey) {
            if (!this.elementHotKeyHook[tagName]) {
                this.elementHotKeyHook[tagName] = {}
            }
            for (let combineKey in elementHotKey[tagName]) {
                //let keys = elementHotKey[tagName][combineKey]
                if (!this.elementHotKeyHook[tagName][combineKey]) {
                    this.elementHotKeyHook[tagName][combineKey] = {}
                }
                for (let key in elementHotKey[tagName][combineKey]) {
                    let task = elementHotKey[tagName][combineKey][key]
                    if (!this.elementHotKeyHook[tagName][combineKey][key]) {
                        let args = task?.args ? task.args : []
                        this.elementHotKeyHook[tagName][combineKey][key] = {
                            func: task.func,
                            cls: task.cls,
                            element: [],
                            args: args,
                        }
                    }
                }
                /* if(!this.elementHotKeyHook[tagName][combineKey]){
                    let args = command.value?command.value:[]
                    this.elementHotKeyHook[tagName][combineKey] = {func:command.func,cls:command.cls,element:[],args: args}
                }*/
            }
        }
    }

    private initDefaultHotKey() {
        console.log('this.editor :>> ', this.elementHotKeyInstance.table.addLine)
        this.setElementHotKeys({
            table: {
                _ctrl: {
                    '+': { func: this.elementHotKeyInstance.table.addLine, cls: TableHotKey },
                    '-': { func: this.elementHotKeyInstance.table.delLine, cls: TableHotKey },
                },
            },
        })
    }

    setEvent() {}

    CreateObject(obj: Object) {
        if (!obj) {
            obj = {}
        }
    }
}

export default HotKey
