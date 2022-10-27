import React, { Component } from "react";
//import {Helmet} from "react-helmet";


export class Card extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	render() {
		return (
			<div>
				<div className="card main-card">
                    <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp" className="card-img-top" alt="Fissure in Sandstone"/>

                    <div className="card-body">
                        <h5 className="card-title">{ this.props.title } </h5>
                        <p className="card-text">{ this.props.info }</p>
                        <a href="#!" className="btn btn-primary">{ this.props.linkText }</a>
                    </div>
                </div>
			</div>
		);
	}
}

export default Card;