import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './bootstrap-5-dark-theme-main/css/mdb.dark.min.css';

import { Card } from './Components/Card.js';



function App() {
  return (
    <div className="App">
      <header className="App-header">        
        
        <h1>
          Gabriel Caterson
        </h1>

      </header>
      <div className="card-box">
        <Card title="Peripheral" info="A website that allows you to create optical illusions of motion." linkText="visit"/>

          <Card title="Deckscalibur" info="A website that allows you to create optical illusions of motion." linkText="visit"/>

          <Card title="botZaya" info="A website that allows you to create optical illusions of motion." linkText="see code"/>

          <Card title="Sentiment-Analysis" info="A website that allows you to create optical illusions of motion." linkText="see jupyter notebook"/>
      </div>
    </div>
  );
}

export default App;
