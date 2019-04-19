import React, { Component } from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate';

// import initialValue from './initialValue';
import initialValue from './value.json'
import plugins from './plugins';
import EditorHeader from './EditorHeader';
import { isKeyHotkey } from 'is-hotkey'
import './index.scss'

// Define a React component renderer for our code blocks.
const CodeNode = (props) => {
  console.log('CodeNode props ', props)
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}


const DEFAULT_NODE = 'paragraph';

const isBoldHotkey = isKeyHotkey('mod+b')
// const isItalicHotkey = isKeyHotkey('mod+i')
// const isUnderlinedHotkey = isKeyHotkey('mod+u')
// const isCodeHotkey = isKeyHotkey('mod+`')

class CustomEditor extends Component {

  state = {
    value: Value.fromJSON(initialValue),
    isBold: false
  }

  onChange = ({ value }) => {
    // Save the value to Local Storage.
    if (value.document != this.state.value.document) {
      const content = JSON.stringify(value.toJSON())
      localStorage.setItem('content', content)
    }
    this.setState({ value })
  }

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
      default:
        return next()
    }
  }

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props
    console.log('mark.type ', mark.type)
    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underline':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  // onKeyDown = (event, editor, next) => {
  //     const { key, type } = this.state.currentKeyType
  //     // If it doesn't match our `key`, let other plugins handle it.
  //     // if (!event.ctrlKey || event.key != key) return next()

  //     // Prevent the default characters from being inserted.
  //     //event.preventDefault()

  //     // Toggle the mark `type`.
  //     editor.toggleMark(type)
  // }

  onClickMark = (event, type) => {
    console.log('click--- ')
    console.log('event ', event)
    console.log('type ', type)
    // const { currentKeyType, isBold } =  this.state
    // const setType = DEFAULT_NODE
    // if (currentKeyType) {
    //     setType = currentKeyType.type === type ? DEFAULT_NODE : type
    // }
    event.preventDefault()
    this.editor.toggleMark(type)
    // this.setState({
    //     isBold: !isBold,
    //     currentKeyType: { key: 'b', type: setType }
    // })
  }

  ref = editor => {
    this.editor = editor
    console.log('init ', this.editor)

  }


  onKeyDown = (event, editor, next) => {
    let mark
    console.log('down--- v ', isBoldHotkey(event))
    console.log('editor ', editor)
    if (isBoldHotkey(event)) {
      console.log('---come000000000')
      mark = 'bold'
      // } else if (isItalicHotkey(event)) {
      //   mark = 'italic'
      // } else if (isUnderlinedHotkey(event)) {
      //   mark = 'underlined'
      // } else if (isCodeHotkey(event)) {
      //   mark = 'code'
    } else {
      return next()
    }

    event.preventDefault()
    editor.toggleMark(mark)
  }

  render() {
    const { isBold } = this.state
    return (
      <div className="custom">
        <EditorHeader isBold={isBold} onClickMark={this.onClickMark} />
        <div className="editor-contain ">
          <Editor
            plugins={plugins}
            spellCheck
            autoFocus
            placeholder="Enter some rich text..."
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderNode={this.renderNode}
            renderMark={this.renderMark}
            ref={this.ref}
          />
        </div>
      </div>
    )
  }
}

export default CustomEditor