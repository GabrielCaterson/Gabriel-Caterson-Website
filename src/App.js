import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './bootstrap-5-dark-theme-main/css/mdb.dark.min.css';

import { Card } from './Components/Card.js';



function App() {
  return (
    <div className="App">
      
      <h1 className="name-box">
        Gabriel Caterson
      </h1>


      <div className="card-box">

        <Card title="Peripheral" 
              info="A website that allows you to create optical illusions of motion." 
              linkText="visit" 
              image=""/>

        <Card title="Deckscalibur" 
              info="A website that hosts a genetic algorithm that can build decks for you for the game Clash Royale." 
              linkText="visit"
              image="./images/deckscalibur.png"
              imageClass="deckscalibur-image"/>

        <Card title="botZaya" 
              info="A discord bot with a variety of features including a GPT-2 based chatbot." 
              linkText="see code"
              image=""/>

        <Card title="Sentiment-Analysis" 
              info="A sentiment analysis neural network trained on the IMDB database." 
              linkText="see jupyter notebook"
              image=""/>
        
        <Card title="Chad Botro" 
              info="A twitch chatbot for the streamer Chad Potro." 
              linkText="see code"
              image=""/>
        
      </div>

    </div>
  );
}

export default App;
