import React from 'react'
import { Editor, getEventTransfer } from 'slate-react'
import { Value, Block } from 'slate'
// import {Button} from 'antd'
import initialValue from './initialValue'
import { isKeyHotkey } from 'is-hotkey'
import { Button, Toolbar, Icon } from './common'
import { Icon as AIcon, message, Popover, Input } from 'antd'
import isUrl from 'is-url'
import Plain from 'slate-plain-serializer'
import imageExtensions from 'image-extensions'

// import plugins from './plugins';
import {
    BoldMark, CodeNode, LinkNode, SuperScriptMark,
    ItalicMark, ContentEditableMark, UnderLinedMark,
    GenericElement
} from "./markAndNodes";

import {
    InsertWordHotKey,
    MarkHotKey,
    BlockHotKey,
    BlockColorHotKey,
    WrapInlineHotKey
} from "./editor-plugins";
import { validURL, generateTable } from './utils';
import TableSettings from './TableSettings';

const plugins = [
    InsertWordHotKey({ char: "&", word: "and" }),
    MarkHotKey({ type: "bold", key: "b" }),
    MarkHotKey({ type: "backspace", key: 8 }),
    MarkHotKey({ type: 'superscript', key: 'q', }),
    MarkHotKey({ type: 'italic', key: 'i', }),
    MarkHotKey({ type: 'contentEditable', key: 'e', }),
    MarkHotKey({ type: 'underlined', key: 'u', }),
    MarkHotKey({ type: 'emoji', key: 'j', }),
    MarkHotKey({ type: 'undo', key: 'z', }),
    MarkHotKey({ type: 'redo', key: 'y', }),
    BlockHotKey({ type: "code", normalType: "paragraph", key: "`" }),
    BlockColorHotKey({ key: "g", color: "green" }),
    //WrapInlineHotKey({ type: "link", key: "u" }),
];


/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = 'paragraph'

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

// const isBoldHotkey = isKeyHotkey('mod+b')
// const isSubHotkey = isKeyHotkey('mod+q')
// const isContentEditableHotkey = isKeyHotkey('mod+e')
// const isBackSpaceHotKey = isKeyHotkey('backspace')
// const isItalicHotkey = isKeyHotkey('mod+i')
// const isUnderlinedHotkey = isKeyHotkey('mod+u')
// const isCodeHotkey = isKeyHotkey('mod+`')

/**
 * The rich text example.
 *
 * @type {Component}
 */
const wrapLink = (editor, href) => {
    editor.wrapInline({
        type: 'link',
        data: { href },
    })

    editor.moveToEnd()
}

/**
 * A change helper to standardize unwrapping links.
 *
 * @param {Editor} editor
 */

const unwrapLink = (editor) => {
    editor.unwrapInline('link')
}

const isImage = (url) => {
    return imageExtensions.includes(getExtension(url))
}

const getExtension = (url) => {
    return new URL(url).pathname.split('.').pop()
}


class RichTextExample extends React.Component {

    schema = {
        document: {
            last: { type: 'paragraph' },
            normalize: (editor, { code, node, child }) => {
                switch (code) {
                    case 'last_child_type_invalid': {
                        const paragraph = Block.create('paragraph')
                        return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
                    }
                }
            },
        },
        blocks: {
            image: {
                isVoid: true,
            },
        },
        inlines: {
            emoji: {
                isVoid: true,
            },
        },
    }

    /**
     * Deserialize the initial editor value.
     *
     * @type {Object}
     */

    state = {
        value: Value.fromJSON(initialValue),
        showTableConfig: false
    }


    /**
     * Check if the current selection has a mark with `type` in it.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasMark = type => {
        const { value } = this.state
        return value.activeMarks.some(mark => mark.type === type)
    }

    /**
     * Check if the any of the currently selected blocks are of `type`.
     *
     * @param {String} type
     * @return {Boolean}
     */

    hasBlock = type => {
        const { value } = this.state
        return value.blocks.some(node => node.type === type)
    }

    /**
     * Store a reference to the `editor`.
     *
     * @param {Editor} editor
     */

    ref = editor => {
        this.editor = editor
    }

    hasLinks = () => {
        const { value } = this.state
        return value.inlines.some(inline => inline.type === 'link')
    }

    onPaste = (event, editor, next) => {
        if (editor.value.selection.isCollapsed) return next()

        const transfer = getEventTransfer(event)
        const { type, text } = transfer
        if (type !== 'text' && type !== 'html') return next()
        if (!isUrl(text)) return next()

        if (this.hasLinks()) {
            editor.command(unwrapLink)
        }

        editor.command(wrapLink, text)
    }

    insertImage = (editor, src, target) => {
        if (target) {
            editor.select(target)
        }

        editor.insertBlock({
            type: 'image',
            data: { src },
        })
    }

    onBlankTableShow = () => {
        const rows = this.initialRowRef.state.value
        const cols = this.initialColRef.state.value
        this.setState({
            showTableConfig: false,
        }, () => {
            this.editor.insertBlock(generateTable(rows, cols))
            this.editor.toggleMark('table')
            this.initialRowRef.state.value = ''
            this.initialColRef.state.value = ''
        })
    }



    /**
     * Render.
     *
     * @return {Element}
     */

    render() {
        const focusBlockType = this.editor &&
            this.editor.controller.value.focusBlock
            && this.editor.controller.value.focusBlock.type
        return (
            <div>
                <Toolbar>
                    {this.renderMarkButton('bold', <AIcon type="bold" />)}
                    {this.renderMarkButton('superscript', 'superscript')}
                    {this.renderMarkButton('contentEditable', 'contentEditable')}
                    {this.renderMarkButton('italic', <AIcon type="italic" />)}
                    {this.renderMarkButton('underlined', <AIcon type="underline" />)}
                    {this.renderMarkButton('code', <AIcon type="code" />)}
                    {this.renderBlockButton('heading-one', 'H1')}
                    {this.renderBlockButton('heading-two', 'H2')}
                    {this.renderBlockButton('block-quote', 'format_quote')}
                    {this.renderBlockButton('numbered-list', <AIcon type="ordered-list" />)}
                    {this.renderBlockButton('bulleted-list', <AIcon type="bars" />)}
                    {this.renderBlockButton('emoji', '😃')}
                    {this.renderMarkButton('link', 'link')}
                    {this.renderBlockButton('image', 'Image')}
                    {this.renderBlockButton('table', 'Table')}
                </Toolbar>
                {focusBlockType === 'table-cell' ? <TableSettings editor={this.editor} /> : <div style={{ height: '40px' }}></div>}
                <Editor
                    plugins={plugins}
                    spellCheck
                    autoFocus
                    placeholder="enter ..."
                    ref={this.ref}
                    value={this.state.value}
                    onChange={this.onChange}
                    // onKeyDown={this.onKeyDown}
                    // onPaste={this.onPaste}
                    renderNode={this.renderNode}
                    renderMark={this.renderMark}
                    schema={this.schema}

                />
            </div>
        )
    }

    /**
     * Render a mark-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type)

        return (
            <Button
                active={isActive}
                onMouseDown={event => this.onClickMark(event, type)}
            >
                <Icon>{icon}</Icon>
            </Button>
        )
    }



    /**
     * Render a block-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderBlockButton = (type, icon) => {
        let isActive = this.hasBlock(type)
        if (['numbered-list', 'bulleted-list'].includes(type)) {
            const { value: { document, blocks } } = this.state

            if (blocks.size > 0) {
                const parent = document.getParent(blocks.first().key)
                isActive = this.hasBlock('list-item') && parent && parent.type === type
            }
        }
        const content = (
            <div className="flex">
                <Input ref={e => { this.initialRowRef = e }} placeholder="row" className="item-input" />
                <Input ref={e => { this.initialColRef = e }} placeholder="column" className="item-input" />
                <Button className="ok" onClick={this.onBlankTableShow}>Ok</Button>
            </div>
        );

        return (
            <>
                {type === 'table' ? (
                    <Popover content={content} title="Select Table Row and Column" trigger="click" visible={this.state.showTableConfig}
                    >
                        <Button
                            active={isActive}
                            onMouseDown={event => this.onClickBlock(event, type)}
                        >
                            <Icon>{icon}</Icon>
                        </Button>
                    </Popover>
                ) : (<Button
                    active={isActive}
                    onMouseDown={event => this.onClickBlock(event, type)}
                >
                    <Icon>{icon}</Icon>
                </Button>)}
            </>
        )
    }



    onClickImage = event => {
        event.preventDefault()
        const src = window.prompt('Enter the URL of the image:')
        if (!src) return
        this.editor.command(this.insertImage, src)
    }

    /**
     * Render a Slate node.
     *
     * @param {Object} props
     * @return {Element}
     */

    renderNode = (props, editor, next) => {
        const { attributes, children, node, isFocused } = props
        const activeFocus = isFocused
        switch (props.node.type) {
            case "code":
                // ----> REPLACE CodeNode with glamorous Span and get memory leak <----
                // I actually can't save it with the Span since it crashes
                return <CodeNode {...props} />;
            // case "link":
            //     return <LinkNode {...props} />;
            case "paragraph":
                const { isSelected, isFocused, ...rest } = props
                return (
                    <div {...rest} style={{ color: rest.node.data.get("color") }}>
                        {rest.children}
                    </div>
                );
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>
            case 'list-item':
                return <li {...attributes}>{children}</li>
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>
            case 'emoji':
                return <span
                    style={activeFocus ? { outline: '2px solid black' } : {}}>😍</span>
            case 'image':
                console.log('image----')
                const src = node.data.get('src')
                return <img src={src} selected={activeFocus} {...attributes}
                    style={{
                        display: 'block',
                        maxWidth: '100%',
                        maxHeight: '20em',
                        boxShadow: activeFocus ? '0 0 0 2px blue' : 'none'
                    }} />
            case 'table':
                return (
                    <table>
                        <tbody {...attributes}>{children}</tbody>
                    </table>
                )
            case 'table-row':
                return <tr {...attributes}>{children}</tr>
            case 'table-cell':
                return <td {...attributes}>{children}</td>
            default:
                return next()
        }
    };

    /**
     * Render a Slate mark.
     *
     * @param {Object} props
     * @return {Element}
     */

    renderMark = (props, editor, next) => {
        switch (props.mark.type) {
            case "bold":
                return <GenericElement elementType="b">{props.children}</GenericElement>
            case 'superscript':
                return <GenericElement elementType="sup">{props.children}</GenericElement>
            case 'italic':
                return <GenericElement elementType="em" >{props.children}</GenericElement>
            case 'contentEditable':
                return <ContentEditableMark {...props} />
            case 'underlined':
                return <GenericElement elementType="u">{props.children}</GenericElement>
            case "link":
                return <LinkNode {...props} />;
            default:
                return next()
        }
    };

    /**
     * On change, save the new `value`.
     *
     * @param {Editor} editor
     */

    onChange = ({ value }) => {
        // const plainText = Plain.serialize(value)
        if (value.document != this.state.value.document) {
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('content', content)
        }
        this.setState({ value })
    }

    /**
     * On key down, if it's a formatting command toggle a mark.
     *
     * @param {Event} event
     * @param {Editor} editor
     * @return {Change}
     */

    // onKeyDown = (event, editor, next) => {
    //     let mark
    //     if (isBoldHotkey(event)) {
    //         mark = 'bold'
    //     } else if (isItalicHotkey(event)) {
    //         mark = 'italic'
    //     } else if (isUnderlinedHotkey(event)) {
    //         mark = 'underlined'
    //     } else if (isCodeHotkey(event)) {
    //         mark = 'code'
    //     } else if (isSubHotkey(event)) {
    //         console.log('doun A called----')
    //         mark = 'q'
    //     } else if (isContentEditableHotkey(event)) {
    //         mark = 'e'
    //     } else if (isBackSpaceHotKey(event)) {
    //         mark = 'backspace'
    //         console.log('backspace call---')
    //         next()
    //     }
    //     else {
    //         return next()
    //     }

    //     event.preventDefault()
    //     editor.toggleMark(mark)
    // }

    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickMark = (event, type) => {
        event.preventDefault()
        this.editor.toggleMark(type)
        if (type === 'link') {
            this.onLinkClick(event)
            this.editor.toggleMark(type)
        }
    }

    onLinkClick = event => {
        event.preventDefault()
        const { editor } = this
        const text = window.prompt('Enter the text for the link:')
        const valid = validURL(text)
        if (valid) {
            editor
                .insertText(text)
                .moveFocusBackward(text.length)
                .command(wrapLink, text)
        }
    }

    /**
     * When a block button is clicked, toggle the block type.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickBlock = (event, type) => {

        event.preventDefault()

        const { editor } = this
        const { value } = editor
        const { document } = value

        if (type === 'emoji') {
            event.preventDefault()
            const code = '😍'
            return this.editor
                .insertInline({ type: 'emoji', data: { code } })
                .moveToStartOfNextText()
                .focus()
        }

        if (type === "table") {
            return this.setState({
                showTableConfig: !this.state.showTableConfig
            }, () => {
                this.editor.toggleMark(type)
            })
        }

        if (type === 'image') {
            return this.onClickImage(event)
        }

        // Handle everything but list buttons.
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type)
            const isList = this.hasBlock('list-item')

            if (isList) {
                editor
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else {
                editor.setBlocks(isActive ? DEFAULT_NODE : type)
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock('list-item')
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            })

            if (isList && isType) {
                editor
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else if (isList) {
                editor
                    .unwrapBlock(
                        type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                    )
                    .wrapBlock(type)
            } else {
                editor.setBlocks('list-item').wrapBlock(type)
            }
        }
    }
}

/**
 * Export.
 */

export default RichTextExample