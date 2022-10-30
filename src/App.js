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

      <section className="card-box">
        <p className="section-title">Check out some of my projects!</p>

        <Card title="Peripheral" 
              info="A website that allows you to create optical illusions of motion." 
              linkText="visit" 
              image="./images/peripheral.png"
              imageClass="peripheral-image"
              link="https://gabrielcaterson.github.io/peripheral-motion/"
              animationVersion="card-animation-3"/>

        <Card title="Deckscalibur" 
              info="A website that hosts a genetic algorithm that can build strong decks for the game Clash Royale." 
              linkText="visit"
              image="./images/deckscalibur.png"
              imageClass="deckscalibur-image"
              link="http://www.deckscalibur.com"
              animationVersion="card-animation-2"/>

        <Card title="botZaya" 
              info="A discord bot with a variety of features including a GPT-2 based chatbot." 
              linkText="see code"
              image="./images/discord.png"
              imageClass="discord-image"
              link="https://github.com/GabrielCaterson/talkToGabe"
              animationVersion="card-animation-5"/>

        <Card title="Sentiment-Analysis" 
              info="A sentiment analysis neural network trained on the IMDB database." 
              linkText="see jupyter notebook"
              image="./images/sentiment.png"
              imageClass="sentiment-analysis-image"
              link="https://github.com/GabrielCaterson/Sentiment-Analysis/blob/main/discord_sentiment.ipynb"
              animationVersion="card-animation-1"/>
        
        <Card title="Chad Botro" 
              info="A twitch chatbot for the streamer Chad Potro." 
              linkText="see code"
              image="./images/twitch.png"
              imageClass="chad-botro-image"
              link="https://github.com/GabrielCaterson/Twitch-Bot-Chad-Botro"
              animationVersion="card-animation-4"/>
        
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
