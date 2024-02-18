/*
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap-5-dark-theme-main/css/mdb.dark.min.css';*/
import '../App.css';
//import './FunkyColors.css';
//import './ParallaxTheme.css';
import '../MaterialGreen.css';

/*
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
*/
import Spline from "@splinetool/react-spline";



function App() {
    return (
        <div className="App">
            <div className="starter-box" >
                <Spline
                    className="spline"
                    scene='https://prod.spline.design/9Na0j-hHQpEas1Ka/scene.splinecode'
                />
            </div>
        </div>
    );
}

export default App;