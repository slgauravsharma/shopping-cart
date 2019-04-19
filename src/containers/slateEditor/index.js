import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
// import {Button} from 'antd'
import initialValue from './initialValue'
import { isKeyHotkey } from 'is-hotkey'
import { Button, Toolbar, Icon } from './common'
import { Icon as AIcon } from 'antd'
import Plain from 'slate-plain-serializer'
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

const plugins = [
    InsertWordHotKey({ char: "&", word: "and" }),
    MarkHotKey({ type: "bold", key: "b" }),
    MarkHotKey({ type: "backspace", key: 8 }),
    MarkHotKey({ type: 'superscript', key: 'q', }),
    MarkHotKey({ type: 'italic', key: 'i', }),
    MarkHotKey({ type: 'contentEditable', key: 'e', }),
    MarkHotKey({ type: 'underlined', key: 'u', }),
    BlockHotKey({ type: "code", normalType: "paragraph", key: "`" }),
    BlockColorHotKey({ key: "g", color: "green" }),
    WrapInlineHotKey({ type: "link", key: "u" })
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

class RichTextExample extends React.Component {
    /**
     * Deserialize the initial editor value.
     *
     * @type {Object}
     */

    state = {
        value: Value.fromJSON(initialValue),
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

    /**
     * Render.
     *
     * @return {Element}
     */

    render() {
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
                </Toolbar>

                <Editor
                    plugins={plugins}
                    spellCheck
                    autoFocus
                    placeholder="enter ..."
                    ref={this.ref}
                    value={this.state.value}
                    onChange={this.onChange}
                    // onKeyDown={this.onKeyDown}
                    renderNode={this.renderNode}
                    renderMark={this.renderMark}
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

        return (
            <Button
                active={isActive}
                onMouseDown={event => this.onClickBlock(event, type)}
            >
                <Icon>{icon}</Icon>
            </Button>
        )
    }

    /**
     * Render a Slate node.
     *
     * @param {Object} props
     * @return {Element}
     */

    renderNode = (props, editor, next) => {
        const { attributes, children, node } = props
        switch (props.node.type) {
            case "code":
                // ----> REPLACE CodeNode with glamorous Span and get memory leak <----
                // I actually can't save it with the Span since it crashes
                return <CodeNode {...props} />;
            case "link":
                return <LinkNode {...props} />;
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