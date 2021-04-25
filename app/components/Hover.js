import React from "react";

export default class Hover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({
      hovering: true,
    });
  }

  onMouseLeave() {
    this.setState({
      hovering: false,
    });
  }

  render() {
    console.log(this.props.children);
    return (
      <div onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {/* Invokes the JSX from the component Hover is wrapping */}
        {/* Expects to receive the hovering state as an argument */}
        {this.props.children(this.state.hovering)}
      </div>
    );
  }
}
