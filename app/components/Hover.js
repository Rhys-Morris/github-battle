import React from "react";

export default class Hover extends React.Component {
  state = { hovering: false };

  onMouseEnter = () => {
    this.setState({
      hovering: true,
    });
  };

  onMouseLeave = () => {
    this.setState({
      hovering: false,
    });
  };

  render() {
    return (
      <div onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {/* Invokes the JSX from the component Hover is wrapping */}
        {/* Expects to receive the hovering state as an argument */}
        {this.props.children(this.state.hovering)}
      </div>
    );
  }
}
