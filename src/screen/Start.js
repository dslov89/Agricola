import { Link, useNavigate } from "react-router-dom";
import './first.css';

function Start() {
  const navigation = useNavigate();

  function naviHandler() {
    navigation("/start");
  }

  return (
    <div className="App">
      <header>
        <h1>Welcome to Agricola Game</h1>
      </header>
      <body>
        
        <ul>
          <li>
            <a href="#"></a>
          </li>
          <li>
            <a>
            <button onClick={naviHandler}>게임에 참여</button>
            </a>
          </li>
          <li>
            <a href="#"></a>
          </li>
        </ul>
      </body>
    </div>
  );
}

export default Start;
