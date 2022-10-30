import React, { Component } from "react";
//import {Helmet} from "react-helmet";


export class SkillCard extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}

	render() {
		return (
			<section className="main-card-shadow-wrapper skill-card-shadow-wrapper">
				<section className={"card main-card main-card-animation skill-card " + this.props.animationVersion }>
                    <picture className={"project-image skill-image " + this.props.imageClass }>
                        <img    src={ this.props.image } 
                                className={ "card-img-top "  } 
                                alt={ this.props.title }/>
                    </picture>

                    <section className="card-body skill-card-body">
                        <h5 className="card-title skill-card-title">{ this.props.title } </h5>
                    </section>

                </section>
			</section>
		);
	}
}

export default SkillCard;