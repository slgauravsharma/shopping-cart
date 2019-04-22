import React, { Fragment } from 'react'
import { Editor } from 'slate-react'
import { Value, Block } from 'slate'
// import {Button} from 'antd'
//import initialValue from './initialValue'
import { isKeyHotkey } from 'is-hotkey'
import { Button, Toolbar, Icon } from './common'
import { Icon as AIcon, Popover, Input } from 'antd'
import Plain from 'slate-plain-serializer'
import './RichTextExample.scss'
import initialValueAsJson, { tableData, generateTable, textBlock } from './tableValue'
import TableSettings from './TableSettings';

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

const isBoldHotkey = isKeyHotkey('mod+b')
const isSubHotkey = isKeyHotkey('shift+q')
const isContentEditableHotkey = isKeyHotkey('mod+e')
const isTableHotKey = isKeyHotkey('alt+t')
const isBackSpaceHotKey = isKeyHotkey('backspace')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

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
    value: Value.fromJSON(initialValueAsJson),
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
      <div className="rich-text-example">
        <Toolbar>
          {this.renderMarkButton('bold', <AIcon type="bold" />)}
          {this.renderMarkButton('q', 'superscript ')}
          {this.renderMarkButton('e', 'contentEditable ')}
          {this.renderMarkButton('italic', <AIcon type="italic" />)}
          {this.renderMarkButton('underlined', <AIcon type="underline" />)}
          {this.renderMarkButton('code', <AIcon type="code" />)}
          {this.renderMarkButton('table', 'Table')}
          {this.renderBlockButton('heading-one', 'H1')}
          {this.renderBlockButton('heading-two', 'H2')}
          {this.renderBlockButton('block-quote', 'format_quote')}
          {this.renderBlockButton('numbered-list', <AIcon type="ordered-list" />)}
          {this.renderBlockButton('bulleted-list', <AIcon type="bars" />)}
        </Toolbar>
        {focusBlockType === 'table-cell' ? <TableSettings editor={this.editor} /> : <div style={{ height: '40px' }}></div>}
        <div className="editor">
          <Editor
            spellCheck
            autoFocus
            placeholder="enter ..."
            ref={this.ref}
            value={this.state.value}
            onChange={this.onChange}
            // onKeyDown={this.onKeyDown}
            renderNode={this.renderNode}
            renderMark={this.renderMark}
            onClick={this.onEditorClick}
          // onMouseDown={this.onEditorMouseDown}
          />
        </div>
      </div>
    )
  }

  onEditorMouseDown = e => {
    console.log('mouse down e ', e)
    console.log(' this.editor ', this.editor)
    //const focusBlockType = this.editor.controller.value.focusBlock.type
  }

  onEditorClick = () => {
    console.log('this.editor ', this.editor)
    // const focusBlockType = this.editor.controller.value.focusBlock.type
    //console.log('type ', focusBlockType)
    // const updated = { document: { ...this.state.value.toJSON().document, nodes: [...this.state.value.toJSON().document.nodes, textBlock] } }
    // this.setState({
    //   value: Value.fromJSON(updated)
    // })
  }

  onBlankTableShow = (e) => {
    const rows = this.initialRowRef.state.value
    console.log('r ', rows)
    const cols = this.initialColRef.state.value
    console.log('v ', cols)
    console.log('this.state.value', this.state.value.toJSON())
    const { document: { nodes } } = this.state.value.toJSON()
    console.log('nodes ', nodes)
    console.log('generateTable(rows, cols) ', generateTable(rows, cols))
    const updated = { document: { ...this.state.value.toJSON().document, nodes: [...this.state.value.toJSON().document.nodes, generateTable(rows, cols)] } }
    console.log('updated ', updated)
    this.setState({
      showTableConfig: false,
      value: Value.fromJSON(updated)
    }, () => {
      this.editor.toggleMark('table')
      this.initialRowRef.state.value = ''
      this.initialColRef.state.value = ''
    })
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
              onMouseDown={event => this.onClickMark(event, type)}
            >
              <Icon>{icon}</Icon>
            </Button>
          </Popover>
        ) : (<Button
          active={isActive}
          onMouseDown={event => this.onClickMark(event, type)}
        >
          <Icon>{icon}</Icon>
        </Button>)}
      </>
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

    switch (node.type) {
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
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'q':
        return <sup {...attributes}>{children}</sup>
      case 'e':
        return <span contentEditable={false} suppressContentEditableWarning="true" style={{
          display: 'inline-block',
          background: '#e5e5e5',
          cursor: 'pointer',
        }} {...attributes} >{children}</span>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  /**
   * On change, save the new `value`.
   *
   * @param {Editor} editor
   */

  onChange = ({ value }) => {
    const plainText = Plain.serialize(value)

    // if (value.document != this.state.value.document) {
    //   const content = JSON.stringify(value.toJSON())
    //   localStorage.setItem('content', content)
    // }
    this.setState({ value })
  }

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @return {Change}
   */

  onKeyDown = (event, editor, next) => {
    console.log('down--')
    console.log('event', event)
    console.log('editor ', editor)

    // console.log('event onKeyDown  ', event)
    // let mark
    // if (isBoldHotkey(event)) {
    //   mark = 'bold'
    // } else if (isItalicHotkey(event)) {
    //   mark = 'italic'
    // } else if (isUnderlinedHotkey(event)) {
    //   mark = 'underlined'
    // } else if (isCodeHotkey(event)) {
    //   mark = 'code'
    // } else if (isSubHotkey(event)) {
    //   console.log('doun A called----')
    //   mark = 'q'
    // } else if (isContentEditableHotkey(event)) {
    //   mark = 'e'
    // } else if (isBackSpaceHotKey(event)) {
    //   mark = 'backspace'
    //   console.log('backspace call---')
    //   next()
    // } else if (isTableHotKey(event)) {
    //   mark = 'table'
    // }
    // else {
    //   return next()
    // }

    // event.preventDefault()
    // editor.toggleMark(mark)

    // const { value } = editor
    // const { document, selection } = value
    // const { start, isCollapsed } = selection
    // const startNode = document.getDescendant(start.key)

    // if (isCollapsed && start.isAtStartOfNode(startNode)) {
    //   const previous = document.getPreviousText(startNode.key)

    //   if (!previous) {
    //     return next()
    //   }

    //   const prevBlock = document.getClosestBlock(previous.key)

    //   if (prevBlock && prevBlock.type === 'table-cell') {
    //     if (['Backspace', 'Delete', 'Enter'].includes(event.key)) {
    //       event.preventDefault()
    //     } else {
    //       return next()
    //     }
    //   }
    // }

    // if (value.startBlock && value.startBlock.type !== 'table-cell') {
    //   return next()
    // }

    // switch (event.key) {
    //   case 'Backspace':
    //     return this.onBackspace(event, editor, next)
    //   case 'Delete':
    //     return this.onDelete(event, editor, next)
    //   case 'Enter':
    //     return this.onEnter(event, editor, next)
    //   default:
    //     return next()
    // }
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    if (type === "table") {
      this.setState({
        showTableConfig: !this.state.showTableConfig
      }, () => {
        this.editor.toggleMark(type)
      })
    } else {
      event.preventDefault()
      this.editor.toggleMark(type)
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

  /**
 * On backspace, do nothing if at the start of a table cell.
 *
 * @param {Event} event
 * @param {Editor} editor
 */

  onBackspace = (event, editor, next) => {
    const { value } = editor
    const { selection } = value
    if (selection.start.offset !== 0) return next()
    event.preventDefault()
  }

  /**
   * On delete, do nothing if at the end of a table cell.
   *
   * @param {Event} event
   * @param {Editor} editor
   */

  onDelete = (event, editor, next) => {
    const { value } = editor
    const { selection } = value
    if (selection.end.offset !== value.startText.text.length) return next()
    event.preventDefault()
  }

  /**
   * On return, do nothing if inside a table cell.
   *
   * @param {Event} event
   * @param {Editor} editor
   */

  onEnter = (event, editor, next) => {
    event.preventDefault()
  }
}

/**
 * Export.
 */

export default RichTextExample