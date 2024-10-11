import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Starter from './pages/Starter.js';
import BalloonCalculator from './pages/BalloonCalculator.js';
import Genetic from './pages/Genetic.js';



import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    HashRouter,
    createHashRouter,
    RouterProvider
} from "react-router-dom";

const router = createHashRouter(
    [
       {
           path: "/",
           errorElement: <App />,
           children : [
               {
                   path: "/",
                   element: <App />
                },
                {
                    path: "starter",
                    element: <Starter />
                },
                {
                    path: "balloons",
                    element: <BalloonCalculator />
                },
                {
                    path: "genetic",
                    element: <Genetic />
                }
           ]
       }
   ]
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();