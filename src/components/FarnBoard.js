import "./FarmBoard.css";
import { ReactComponent as Farm } from "../asset/farm.svg";

function FarmBoard() {
  return (
    <>
      <div className="farmContainer">
        <div className="farmItem">
          <Farm />
          <h3 className="userFarm1">User 1</h3>
        </div>
        <div className="farmItem">
          <Farm />
          <h3 className="userFarm2">User 2</h3>
        </div>
        <div className="farmItem">
          <Farm />
          <h3 className="userFarm2">User 2</h3>
        </div>
        <div className="farmItem">
          <Farm />
          <h3 className="userFarm2">User 2</h3>
        </div>
      </div>

      <div className="fence fenceRow1 fenceRow01" />
      <div className="fence fenceRow1 fenceRow02" />
      <div className="fence fenceRow1 fenceRow03" />
      <div className="fence fenceRow1 fenceRow04" />
      <div className="fence fenceRow1 fenceRow05" />

      <div className="fence fenceRow2 fenceRow01" />
      <div className="fence fenceRow2 fenceRow02" />
      <div className="fence fenceRow2 fenceRow03" />
      <div className="fence fenceRow2 fenceRow04" />
      <div className="fence fenceRow2 fenceRow05" />

      <div className="fence fenceRow3 fenceRow02" />
      <div className="fence fenceRow3 fenceRow03" />
      <div className="fence fenceRow3 fenceRow04" />
      <div className="fence fenceRow3 fenceRow05" />

      <div className="fence fenceRow4 fenceRow02" />
      <div className="fence fenceRow4 fenceRow03" />
      <div className="fence fenceRow4 fenceRow04" />
      <div className="fence fenceRow4 fenceRow05" />

      <div className="fenceCol fenceCol1 fenceCol01" />
      <div className="fenceCol fenceCol1 fenceCol02" />
      <div className="fenceCol fenceCol1 fenceCol03" />
      <div className="fenceCol fenceCol1 fenceCol04" />
      <div className="fenceCol fenceCol1 fenceCol05" />
      <div className="fenceCol fenceCol1 fenceCol06" />

      <div className="fenceCol fenceCol2 fenceCol02" />
      <div className="fenceCol fenceCol2 fenceCol03" />
      <div className="fenceCol fenceCol2 fenceCol04" />
      <div className="fenceCol fenceCol2 fenceCol05" />
      <div className="fenceCol fenceCol2 fenceCol06" />

      <div className="fenceCol fenceCol3 fenceCol02" />
      <div className="fenceCol fenceCol3 fenceCol03" />
      <div className="fenceCol fenceCol3 fenceCol04" />
      <div className="fenceCol fenceCol3 fenceCol05" />
      <div className="fenceCol fenceCol3 fenceCol06" />
    </>
  );
}

export default FarmBoard;
