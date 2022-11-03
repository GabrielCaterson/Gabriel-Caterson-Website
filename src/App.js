import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap-5-dark-theme-main/css/mdb.dark.min.css';
import './App.css';


import { Card } from './Components/Card.js';
import { SkillCard } from './Components/SkillCard.js';




function App() {
  return (
    <div className="App">
      
      <h1 className="name-box">
        Gabriel Caterson
      </h1>

      <section className="about-me">
        I am a full stack computer programmer based in Florida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </section>

      <section className="card-box">
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

      <section className="card-box">
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

      <section className="bottom-section">
        <a  className="bottom-link" 
            href="https://www.linkedin.com/in/gabrielcaterson" 
            target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a  className="bottom-link" 
            href=""
            target="_blank" rel="noopener noreferrer">Resume</a>
        <a  className="bottom-link" 
            href="https://github.com/GabrielCaterson"
            target="_blank" rel="noopener noreferrer">GitHub</a>
      </section>

    </div>
  );
}

export default App;
