import React, { Component } from "react";

//import { Parallax } from 'react-parallax';
//var reactScrollParallax = require("react-scroll-parallax");
import { Parallax } from 'react-scroll-parallax';




export class BackgroundBox extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}

	}

	render() {
        

        return (
			<section className="background">
                blah

				<div className="floater parallax bg"></div>
				<div className="no-parallax floater floater-2"></div>

                {/*<Parallax speed={10} className="background-image">
					Content goes here. Parallax height grows with content height.
				</Parallax>*/}
				

				
			</section>
		);
	}
}

export default BackgroundBox;