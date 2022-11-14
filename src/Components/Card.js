import React, { Component } from "react";
//import {Helmet} from "react-helmet";


export class Card extends Component {
	constructor(props) {
		super(props);

		this.state = {
            //skills: []
		}

        //this.splitSkills = this.splitSkills.bind(this);
	}

    splitSkills() {
        if (!this.props.skillsUsed) return;
        let skillElements = [];
        let skillsArray = this.props.skillsUsed.split(" ");
        
        for (const skill of skillsArray) {
            skillElements.push(
                <p className="skill-text">{ skill } </p> 
            );
        }
        
        return skillElements;
    }




    

	render() {
        

        return (
			<section className="main-card-shadow-wrapper main-card-shadow-wrapper-responsive">
				<section className={"card main-card main-card-responsive main-card-animation " + this.props.animationVersion }>
                    <picture className={"project-image " + this.props.imageClass }>
                        <img    src={ this.props.image } 
                                className={ "card-img-top "  } 
                                alt={ this.props.title }/>
                    </picture>

                    <section className="card-body">
                        <h5 className="card-title">{ this.props.title } </h5>
                        <p className="card-text">{ this.props.info }</p>
                    </section>
                    
                    <section className="skill-text-box">
                        { this.splitSkills() }
                    </section>

                    <a  href={ this.props.link } 
                        className="btn btn-primary card-button" 
                        target="_blank" rel="noopener noreferrer"> 
                        { this.props.linkText }
                    </a>



                </section>
			</section>
		);
	}
}

export default Card;