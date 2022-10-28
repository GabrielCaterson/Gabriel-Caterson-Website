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
                    <picture className={"project-images " + this.props.imageClass }>
                        <img src={ this.props.image } className={ "card-img-top "  } alt={ this.props.title }/>
                    </picture>

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