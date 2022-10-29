import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap-5-dark-theme-main/css/mdb.dark.min.css';
import './App.css';


import { Card } from './Components/Card.js';



function App() {
  return (
    <div className="App">
      
      <h1 className="name-box">
        Gabriel Caterson
      </h1>

      Check out some of my projects!
      <div className="card-box">

        <Card title="Peripheral" 
              info="A website that allows you to create optical illusions of motion." 
              linkText="visit" 
              image="./images/peripheral.png"
              imageClass="peripheral-image"
              link="https://gabrielcaterson.github.io/peripheral-motion/"/>

        <Card title="Deckscalibur" 
              info="A website that hosts a genetic algorithm that can build decks for you for the game Clash Royale." 
              linkText="visit"
              image="./images/deckscalibur.png"
              imageClass="deckscalibur-image"
              link="http://www.deckscalibur.com"/>

        <Card title="botZaya" 
              info="A discord bot with a variety of features including a GPT-2 based chatbot." 
              linkText="see code"
              image="./images/discord.png"
              imageClass="discord-image"
              link="https://github.com/GabrielCaterson/talkToGabe"/>

        <Card title="Sentiment-Analysis" 
              info="A sentiment analysis neural network trained on the IMDB database." 
              linkText="see jupyter notebook"
              image="./images/sentiment.png"
              imageClass="sentiment-analysis-image"
              link="https://github.com/GabrielCaterson/Sentiment-Analysis/blob/main/discord_sentiment.ipynb"/>
        
        <Card title="Chad Botro" 
              info="A twitch chatbot for the streamer Chad Potro." 
              linkText="see code"
              image="./images/twitch.png"
              imageClass="chad-botro-image"
              link="https://github.com/GabrielCaterson/Twitch-Bot-Chad-Botro"/>
        
      </div>

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
