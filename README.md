# wangeditor-new-function
增加文字数统计和快捷键功能

## 快捷键包括以下内容
```javascript

var defaultHotKey: { [key: string]: { [key: string]: command } } = {
    _ctrl: {        //ctrl+key可以调用
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
    _shift: {       //shift+key可以调用
        t: func.table,
    },
    _ctrl_shift: {  //ctrl+shift+key可以调用
        '{': func.li,
        '}': func.ul,
        '<': func.code,
        d: func.delline,
    },
}

```

## 使用方法
直接调用dst目录下的wangEditor.js