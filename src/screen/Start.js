import { Link, useNavigate } from "react-router-dom";

function Start() {
  const navigation = useNavigate();

  function naviHandler() {
    navigation("/start");
  }

  return (
    <>
      <p>
        <button onClick={naviHandler}>Navigate</button>
      </p>
    </>
  );
}

export default Start;
