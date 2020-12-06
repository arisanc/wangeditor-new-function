import MenuConstructorList from '../menus/menu-list'
import Editor from '../editor/index'
import { TableHotKey } from '../editor/hotkey/table'


export class HotKeyInstances {
    editor: Editor
    form: TableHotKey
    constructor(editor: Editor) {
        this.editor = editor
        this.form = new TableHotKey(editor)
    }
}

export default {
    p: {
        func: MenuConstructorList.head.prototype.command,
        args: ['<p>'],
        cls: MenuConstructorList.head,
    },
    h1: {
        func: MenuConstructorList.head.prototype.command,
        args: ['<h1>'],
        cls: MenuConstructorList.head,
    },
    h2: {
        func: MenuConstructorList.head.prototype.command,
        args: ['<h2>'],
        cls: MenuConstructorList.head,
    },
    h3: {
        func: MenuConstructorList.head.prototype.command,
        args: ['<h3>'],
        cls: MenuConstructorList.head,
    },
    h4: {
        func: MenuConstructorList.head.prototype.command,
        args: ['<h4>'],
        cls: MenuConstructorList.head,
    },
    h5: {
        func: MenuConstructorList.head.prototype.command,
        args: ['<h5>'],
        cls: MenuConstructorList.head,
    },
    h6: {
        func: MenuConstructorList.head.prototype.command,
        args: ['<h6>'],
        cls: MenuConstructorList.head,
    },
    bold: { func: MenuConstructorList.bold.prototype.clickHandler, cls: MenuConstructorList.bold },
    ul: {
        func: MenuConstructorList.list.prototype.command,
        args: ['insertUnorderedList'],
        cls: MenuConstructorList.list,
    },
    li: {
        func: MenuConstructorList.list.prototype.command,
        args: ['insertOrderedList'],
        cls: MenuConstructorList.list,
    },
    table: {
        func: MenuConstructorList.table.prototype.clickHandler,
        cls: MenuConstructorList.table,
    },
    quote: {
        func: MenuConstructorList.quote.prototype.clickHandler,
        cls: MenuConstructorList.quote,
    },
    code: { func: MenuConstructorList.code.prototype.clickHandler, cls: MenuConstructorList.code },
    italic: {
        func: MenuConstructorList.italic.prototype.clickHandler,
        cls: MenuConstructorList.italic,
    },
    underline: {
        func: MenuConstructorList.underline.prototype.clickHandler,
        cls: MenuConstructorList.underline,
    },
    delline: {
        func: MenuConstructorList.strikeThrough.prototype.clickHandler,
        cls: MenuConstructorList.strikeThrough,
    },
    link: { func: MenuConstructorList.link.prototype.clickHandler, cls: MenuConstructorList.link },
    highlight: {
        func: MenuConstructorList.backColor.prototype.command,
        cls: MenuConstructorList.backColor,
        args: ['#ffff00'],
    },
}
