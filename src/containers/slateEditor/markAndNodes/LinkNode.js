import React from "react";
export class LinkNode extends React.Component {
  updateHref = () => {
    let href = window.prompt("Enter URL");
    this.props.editor.change(change => {
      change.setNodeByKey(this.props.node.key, { data: { href } });
    });
  };
  render() {
    return (
      <span>
        <a
          {...this.props.attributes}
          href={this.props.node.data && this.props.node.data.get("href") || ""}
        >
          {this.props.children}
        </a>
        {/* <sup
          role="button"
          onClick={this.updateHref}
          contentEditable={false}
          style={{ cursor: "pointer" }}
        >
          <span role="img" aria-label="Link">
            🔗
          </span>
        </sup> */}
      </span>
    );
  }
}
