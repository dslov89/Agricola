import "../screen/Main.css";
import FarmBoard from "./FarnBoard";

function Farms() {
  return (
    <div className="farmContainer">
      <div className="farmContainer2">
        <FarmBoard />
      </div>
      <div className="farmContainer2">
        <FarmBoard />
      </div>
      <div className="farmContainer3">
        <FarmBoard />
      </div>
      <div className="farmContainer3">
        <FarmBoard />
      </div>
    </div>
  );
}

export default Farms;
