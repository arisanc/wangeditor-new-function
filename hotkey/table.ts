import Editor from '../../editor/index'
import $ from '../../utils/dom-core'
import getNode from '../../menus/table/bind-event/event/getNode'
import operatingEvent from '../../menus/table/bind-event/event/operating-event'


export class TableHotKey {
    getnode: getNode
    addLine: Function
    delTable: Function
    delLine: Function
    addColumn: Function
    addTableHead: Function
    delTableHead: Function
    delColumn: Function
    constructor(editor: Editor) {
        this.getnode = new getNode(editor)
        this.addLine = (editor: Editor, $node: HTMLElement) => {
            // 禁止多选操作
            let isMore = isMoreRowAction(editor)
            if (isMore) {
                return true
            }
            //当前元素
            let selectDom = $(editor.selection.getSelectionStartElem())
            //当前行
            let $currentRow = this.getnode.getRowNode(selectDom.elems[0])
            if (!$currentRow) {
                return true
            }
            //获取当前行的index
            const index = Number(this.getnode.getCurrentRowIndex($node, $currentRow))
            //生成要替换的html
            let htmlStr = this.getnode.getTableHtml($node)
            //生成新的table
            let newdom: string = this.getnode.getTableHtml(
                operatingEvent.ProcessingRow($(htmlStr), index).elems[0]
            )
            // 选中table
            editor.selection.createRangeByElem($($node))
            editor.selection.restoreSelection()

            editor.cmd.do('insertHTML', newdom)

            return true
        }
        this.delTable = (editor: Editor, $node: HTMLElement) => {
            // 选中img元素
            editor.selection.createRangeByElem($($node))
            editor.selection.restoreSelection()
            editor.cmd.do('insertHTML', '<p><br></p>')
            // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
            return true
        }

        this.delLine = (editor: Editor, $node: HTMLElement) => {
            // 禁止多选操作
            let isMore = isMoreRowAction(editor)
            if (isMore) {
                return true
            }
            //当前元素
            let selectDom = $(editor.selection.getSelectionStartElem())
            //当前行
            let $currentRow = this.getnode.getRowNode(selectDom.elems[0])
            if (!$currentRow) {
                return true
            }
            //获取当前行的index
            const index = Number(this.getnode.getCurrentRowIndex($node, $currentRow))
            //生成要替换的html
            let htmlStr = this.getnode.getTableHtml($node)
            //获取新生成的table 判断是否是最后一行被删除 是 删除整个table
            const trLength: number = operatingEvent.DeleteRow($(htmlStr), index).elems[0]
                .childNodes[0].childNodes.length
            //生成新的table
            let newdom: string = ''
            // 选中table
            editor.selection.createRangeByElem($($node))
            editor.selection.restoreSelection()

            if (trLength === 0) {
                newdom = '<p><br></p>'
            } else {
                newdom = this.getnode.getTableHtml(
                    operatingEvent.DeleteRow($(htmlStr), index).elems[0]
                )
            }
            editor.cmd.do('insertHTML', newdom)
            return true
        }
        this.delColumn = (editor: Editor, $node: HTMLElement) => {
            // 禁止多选操作
            let isMore = isMoreRowAction(editor)
            if (isMore) {
                return true
            }
            //当前元素
            let selectDom = $(editor.selection.getSelectionStartElem())
            //当前列的index
            const index = this.getnode.getCurrentColIndex(selectDom.elems[0])
            //生成要替换的html
            let htmlStr = this.getnode.getTableHtml($node)
            //获取新生成的table 判断是否是最后一列被删除 是 删除整个table
            const tdLength: number = operatingEvent.DeleteCol($(htmlStr), index).elems[0]
                .childNodes[0].childNodes[0].childNodes.length
            //生成新的table
            let newdom: string = ''
            // 选中table
            editor.selection.createRangeByElem($($node))
            editor.selection.restoreSelection()

            if (tdLength === 1) {
                newdom = '<p><br></p>'
            } else {
                newdom = this.getnode.getTableHtml(
                    operatingEvent.DeleteCol($(htmlStr), index).elems[0]
                )
            }

            editor.cmd.do('insertHTML', newdom)

            return true
        }
        ;(this.addTableHead = (editor: Editor, $node: HTMLElement) => {
            // 禁止多选操作
            let isMore = isMoreRowAction(editor)
            if (isMore) {
                return true
            }
            //当前元素
            let selectDom = $(editor.selection.getSelectionStartElem())
            //当前行
            let $currentRow = this.getnode.getRowNode(selectDom.elems[0])
            if (!$currentRow) {
                return true
            }
            //获取当前行的index
            let index = Number(this.getnode.getCurrentRowIndex($node, $currentRow))
            if (index !== 0) {
                //控制在table的第一行
                index = 0
            }
            //生成要替换的html
            let htmlStr = this.getnode.getTableHtml($node)
            //生成新的table
            let newdom: string = this.getnode.getTableHtml(
                operatingEvent.setTheHeader($(htmlStr), index, 'th').elems[0]
            )
            // 选中table
            editor.selection.createRangeByElem($($node))
            editor.selection.restoreSelection()

            editor.cmd.do('insertHTML', newdom)

            return true
        }),
            (this.delTableHead = (editor: Editor, $node: HTMLElement) => {
                //当前元素
                let selectDom = $(editor.selection.getSelectionStartElem())
                //当前行
                let $currentRow = this.getnode.getRowNode(selectDom.elems[0])
                if (!$currentRow) {
                    return true
                }
                //获取当前行的index
                let index = Number(this.getnode.getCurrentRowIndex($node, $currentRow))
                if (index !== 0) {
                    //控制在table的第一行
                    index = 0
                }
                //生成要替换的html
                let htmlStr = this.getnode.getTableHtml($node)
                //生成新的table
                let newdom: string = this.getnode.getTableHtml(
                    operatingEvent.setTheHeader($(htmlStr), index, 'td').elems[0]
                )
                // 选中table
                editor.selection.createRangeByElem($($node))
                editor.selection.restoreSelection()

                editor.cmd.do('insertHTML', newdom)

                return true
            })
        this.addColumn = (editor: Editor, $node: HTMLElement) => {
            // 禁止多选操作
            let isMore = isMoreRowAction(editor)
            if (isMore) {
                return true
            }
            //当前元素
            let selectDom = $(editor.selection.getSelectionStartElem())
            //当前列的index
            const index = this.getnode.getCurrentColIndex(selectDom.elems[0])
            //生成要替换的html
            let htmlStr = this.getnode.getTableHtml($node)
            //生成新的table
            let newdom: string = this.getnode.getTableHtml(
                operatingEvent.ProcessingCol($(htmlStr), index).elems[0]
            )
            // 选中table
            editor.selection.createRangeByElem($($node))
            editor.selection.restoreSelection()

            editor.cmd.do('insertHTML', newdom)

            return true
        }
    }
}

function isMoreRowAction(editor: Editor): boolean {
    const $startElem = editor.selection.getSelectionStartElem()
    const $endElem = editor.selection.getSelectionEndElem()
    if ($startElem?.elems[0] !== $endElem?.elems[0]) {
        return true
    } else {
        return false
    }
}
