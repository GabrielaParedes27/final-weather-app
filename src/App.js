import './App.css';
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <Weather defaultCity="New York" />
     <footer>
       This project was coded by{" "}
       <a href="www.linkedin.com/in/gabriela-paredes-314333180" target="_blank">
         Gabriela Paredes
       </a>{" "}
       and is{" "}
       <a href="https://github.com/GabrielaParedes27/final-weather-app.git" target="_blank">
         open-sourced on GitHub
       </a>
     </footer>
    </div>
  );
}


