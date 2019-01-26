import React, { Component } from "react";

class Leap extends Component {
	render() {
		const {sec ,millis}=this.props;
		return (
			<ul className="list-group">
                <li className="list-group-item">
                  You Leap {sec} seconds and
                  {millis} miliseconds
                </li>
              </ul>
		);
	}
}

export default Leap;
