import "./FarmBoard.css";
import { ReactComponent as Farm } from "../asset/farm.svg";

const FarmComponent = ({ username, className }) => {
  return (
    <>
      <div className="farmContainer">
        <div className="farmItem">
          <Farm />
          <h3 className="userFarm1">User 1</h3>
        </div>
        {/* <div className="farmItem">
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
        </div> */}
      </div>

      <div className="fence fenceRow1 fenceRow01" />
      <div className="fence fenceRow1 fenceRow02" />
      <div className="fence fenceRow1 fenceRow03" />
      <div className="fence fenceRow1 fenceRow04" />
      <div className="fence fenceRow1 fenceRow05" />

      <FenceRow rowNumber={1} />
      <FenceRow rowNumber={2} />
      <FenceRow rowNumber={3} />
      <FenceRow rowNumber={4} />
      <FenceCol colNumber={1} />
      <FenceCol colNumber={2} />
      <FenceCol colNumber={3} />
      {/* </div> */}
    </>
  );
};

const Fence = ({ className }) => {
  return <div className={`fence ${className}`} />;
};

const Fences = ({ className }) => {
  return <div className={`fenceCol ${className}`} />;
};

const FenceRow = ({ rowNumber }) => {
  return (
    <>
      <Fence className={`fenceRow${rowNumber} fenceRow01`} />
      <Fence className={`fenceRow${rowNumber} fenceRow02`} />
      <Fence className={`fenceRow${rowNumber} fenceRow03`} />
      <Fence className={`fenceRow${rowNumber} fenceRow04`} />
      <Fence className={`fenceRow${rowNumber} fenceRow05`} />
    </>
  );
};

const FenceCol = ({ colNumber }) => {
  return (
    <>
      <Fences className={`fenceCol${colNumber} fenceCol01`} />
      <Fences className={`fenceCol${colNumber} fenceCol02`} />
      <Fences className={`fenceCol${colNumber} fenceCol03`} />
      <Fences className={`fenceCol${colNumber} fenceCol04`} />
      <Fences className={`fenceCol${colNumber} fenceCol05`} />
      <Fences className={`fenceCol${colNumber} fenceCol06`} />
    </>
  );
};

const UserFarm = ({ username }) => {
  return (
    <>
      <FarmComponent username={username} />
    </>
  );
};

const App = () => {
  return (
    <div>
      <UserFarm username="User 1" className="1" />
      <UserFarm username="User 2" className="2" />
      <UserFarm username="User 3" className="3" />
      <UserFarm username="User 4" className="4" />
    </div>
  );
};

export default App;
