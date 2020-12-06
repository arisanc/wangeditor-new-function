import func from '../config/functions'
export interface command {
    func: Function
    args?: Array<any>
    cls: Function
}

var defaultHotKey: { [key: string]: { [key: string]: command } } = {
    _ctrl: {
        '1': func.h1,
        '2': func.h2,
        '3': func.h3,
        '4': func.h4,
        '5': func.h5,
        '6': func.h6,
        '0': func.p,
        b: func.bold,
        q: func.quote,
        i: func.italic,
        u: func.underline,
        h: func.highlight,
        l: func.link,
    },
    _shift: {
        t: func.table,
    },
    _ctrl_shift: {
        '{': func.li,
        '}': func.ul,
        '<': func.code,
        d: func.delline,
    },
}

export var defaultElementHotKey: {
    [key: string]: { [key: string]: { [key: string]: command } }
} = {}

export default defaultHotKey
