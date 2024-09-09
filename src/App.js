import {Routes,Route} from "react-router-dom"
import WeatherHome from "./components/WeatherHome";
import Home from './components/Home'
import './App.css';


const App = ()=>(
  <>
  <Routes>
    <Route path="/" Component={Home}/>
    <Route path="/WeatherHome/:cityname" Component={WeatherHome}/>
  </Routes>
  </>
)

export default App;
