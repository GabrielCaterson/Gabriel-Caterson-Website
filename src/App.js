import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap-5-dark-theme-main/css/mdb.dark.min.css';
import './App.css';
import './FunkyColors.css';
//import './ParallaxTheme.css';





import { Card } from './Components/Card.js';
import { SkillCard } from './Components/SkillCard.js';
import { HobbyCard } from './Components/HobbyCard.js';
import { BackgroundBox } from './Components/BackgroundBox.js';




function App() {
  return (
    <div className="App">

      <BackgroundBox />
      
      <h1 className="name-box">
        Gabriel Caterson
      </h1>



      <section className="socials-box">
        <picture className="socials-image-box">
          <a className="socials-link" href="https://github.com/GabrielCaterson" 
            target="_blank" rel="noopener noreferrer"></a>
          <img src="./images/socials/GitHub.png" className="socials-image"></img>
        </picture>

        <picture className="socials-image-box">
          <a className="socials-link" href="https://www.linkedin.com/in/gabrielcaterson" 
            target="_blank" rel="noopener noreferrer"></a>
          <img src="./images/socials/LinkedIn.png" className="socials-image"></img>
        </picture>

        <picture className="socials-image-box">
          <a className="socials-link" href="https://www.linkedin.com/in/gabrielcaterson" 
            target="_blank" rel="noopener noreferrer"></a>
          <img src="./images/socials/email.png" className="socials-image"></img>
        </picture>

      </section>



      <section className="about-me">
        I am a full stack computer programmer based in Lithia, Florida. I enjoy programming, playing piano, and reading academic philosophy papers and books on philosophy of mind, ethics, animal rights, and the future.
      </section>



      <section className="card-box projects-box">
        <p className="section-title">Featured Projects</p>

        <Card title="Peripheral" 
              info="A website that allows you to create optical illusions of motion." 
              linkText="visit" 
              image="./images/peripheral.png"
              imageClass="peripheral-image"
              link="https://gabrielcaterson.github.io/peripheral-motion/"
              animationVersion="card-animation-3"
              skillsUsed="HTML CSS JavaScript React.js"/>

        <Card title="Deckscalibur" 
              info="A website that hosts a genetic algorithm that can build strong decks for the game Clash Royale." 
              linkText="visit"
              image="./images/deckscalibur.png"
              imageClass="deckscalibur-image"
              link="http://www.deckscalibur.com"
              animationVersion="card-animation-2"
              skillsUsed="HTML CSS JavaScript React.js Node.js AWS"/>

        <Card title="botZaya" 
              info="A discord bot with a variety of features including a GPT-2 based chatbot." 
              linkText="see code"
              image="./images/discord.png"
              imageClass="discord-image"
              link="https://github.com/GabrielCaterson/talkToGabe"
              animationVersion="card-animation-5"
              skillsUsed="JavaScript Node.js"/>

        <Card title="Sentiment-Analysis" 
              info="A neural network trained for sentiment analysis on the IMDB database." 
              linkText="see jupyter notebook"
              image="./images/sentiment.png"
              imageClass="sentiment-analysis-image"
              link="https://github.com/GabrielCaterson/Sentiment-Analysis/blob/main/discord_sentiment.ipynb"
              animationVersion="card-animation-1"
              skillsUsed="Python PyTorch fast.ai"/>
        
        <Card title="Chad Botro" 
              info="A twitch chatbot for the streamer Chad Potro." 
              linkText="see code"
              image="./images/twitch.png"
              imageClass="chad-botro-image"
              link="https://github.com/GabrielCaterson/Twitch-Bot-Chad-Botro"
              animationVersion="card-animation-4"
              skillsUsed="JavaScript Node.js"/>
        
      </section>



      <section className="card-box skills-box">
        <p className="section-title">Skills</p>

        <SkillCard title="HTML" 
              image="./images/skills/html.png"
              animationVersion="card-animation-7"/>
        <SkillCard title="CSS" 
              image="./images/skills/CSS.png"
              animationVersion="card-animation-8"/>
        <SkillCard title="JavaScript" 
              image="./images/skills/JS.png"
              animationVersion="card-animation-2"/>
        <SkillCard title="React.js" 
              image="logo192.png"
              animationVersion="card-animation-6"/>
        <SkillCard title="Node.js" 
              image="./images/skills/node.png"
              imageClass="node-image"
              animationVersion="card-animation-4"/>
        <SkillCard title="AWS" 
              image="./images/skills/aws.png"
              imageClass="aws-image"
              animationVersion="card-animation-1"/>
        <SkillCard title="Python" 
              image="./images/skills/python.png"
              animationVersion="card-animation-3"/>
        <SkillCard title="fast.ai" 
              image="./images/skills/fastai.svg"
              imageClass="fastai-image"
              animationVersion="card-animation-9"/>
        <SkillCard title="PyTorch" 
              image="./images/skills/pytorch.png"
              imageClass="pytorch-image"
              animationVersion="card-animation-5"/>
        
      </section>


      <section className="card-box interests-box">
        <p className="section-title">Interests</p>
        
        <HobbyCard title="Programming" 
              image="./images/hobbies/programming.png"
              imageClass="sentiment-analysis-image"
              animationVersion="card-animation-3"/>
        <HobbyCard title="Philosophy" 
              image="./images/hobbies/philosophy.png"
              imageClass="sentiment-analysis-image"
              animationVersion="card-animation-9"/>
        <HobbyCard title="Music" 
              image="./images/hobbies/music.png"
              imageClass="music-image"
              animationVersion="card-animation-5"/>
        <HobbyCard title="Reading" 
              image="./images/hobbies/reading.png"
              imageClass="sentiment-analysis-image"
              animationVersion="card-animation-1"/>
        <HobbyCard title="AI" 
              image="./images/sentiment.png"
              imageClass="sentiment-analysis-image"
              animationVersion="card-animation-7"/>
        <HobbyCard title="Psychology" 
              image="./images/hobbies/psychology.png"
              imageClass="sentiment-analysis-image"
              animationVersion="card-animation-2"/>
        

      </section>


      <section className="bottom-section">
        <a  className="text-reset bottom-link" 
            href="https://www.linkedin.com/in/gabrielcaterson" 
            target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a  className="text-reset bottom-link" 
            href=""
            target="_blank" rel="noopener noreferrer">Resume</a>
        <a  className="text-reset bottom-link" 
            href="https://github.com/GabrielCaterson"
            target="_blank" rel="noopener noreferrer">GitHub</a>
      </section>

    </div>
  );
}

export default App;
