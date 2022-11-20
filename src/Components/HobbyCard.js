import React, { Component } from "react";
//import {Helmet} from "react-helmet";


export class HobbyCard extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}

	}

	render() {
        

        return (
			<section className="main-card-shadow-wrapper 
								hobby-shadow-wrapper
								fade-in">
				<section className={"card main-card main-card-animation hobby-card " + this.props.animationVersion }>
                    <picture className={"project-image hobby-image " + this.props.imageClass }>
                        <img    src={ this.props.image } 
                                className={ "card-img-top "  } 
                                alt={ this.props.title }/>
                    </picture>

                    <section className="card-body">
                        <h5 className="card-title hobby-card-title">{ this.props.title } </h5>
                    </section>
                    


                </section>
			</section>
		);
	}
}

export default HobbyCard;