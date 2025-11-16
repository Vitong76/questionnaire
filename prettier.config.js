export default {
    printWidth: 240, // 每行代码最大长度（超过自动换行）
    tabWidth: 4, // 每个缩进级别的空格数
    useTabs: false, // 使用空格代替制表符
    semi: true, // 语句末尾添加分号
    singleQuote: true, // 使用单引号代替双引号
    quoteProps: 'as-needed', // 对象属性引号使用（仅在必需时添加）
    jsxSingleQuote: false, // JSX 中使用双引号
    trailingComma: 'none', // 多行时尽可能添加尾随逗号
    bracketSpacing: true, // 对象花括号间添加空格（如：{ foo: bar }）
    bracketSameLine: false, // 将 HTML/JSX 元素的闭合标签放在新行
    arrowParens: 'avoid', // 箭头函数参数始终加括号（如：(x) => x）
    endOfLine: 'lf', // 换行符使用 Linux 风格（\n）
    proseWrap: 'preserve', // Markdown 文本按原样换行
    htmlWhitespaceSensitivity: 'css', // HTML 空格敏感度（遵循 CSS 规则）

    // 针对特定文件的覆盖规则
    overrides: [
        {
            files: '*.md',
            options: {
                printWidth: 80 // Markdown 文件每行最大长度
            }
        },
        {
            files: '*.json',
            options: {
                printWidth: 200 // JSON 文件允许更长行宽
            }
        }
    ]
};
