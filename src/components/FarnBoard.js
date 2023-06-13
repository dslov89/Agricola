import "./FarmBoard.css";
import { ReactComponent as Farm } from "../asset/farm.svg";
import woodRoomImage from "../image/wood_room.png";
import rockRoomImage from "../image/rock_room.png";
import soilRoomImage from "../image/soil_room.png";
import plow from "../image/plow.png";
import plow_grain1 from "../image/plow_grain1.png";
import plow_grain2 from "../image/plow_grain2.png";
import plow_grain3 from "../image/plow_grain3.png";
import sheep from "../image/sheep.png";
import house from "../image/house.png";

import { DataContext } from "../store/data-context";
import { UserContext } from "../store/user-context";
import React, { useContext, useEffect } from "react";
import CardBoard from "./CardBoard";

const FarmComponent = ({ username, className, fenceArray, farmArray }) => {
  // 배열 정의
  return (
    <div className={`farmContainer ${className}`}>
      <div className="farmItem">
        <Farm />
        <h3 className="userFarm1">{username}</h3>
      </div>

      <FenceRow rowNumber={1} fenceArray={fenceArray} />
      <FenceRow rowNumber={2} fenceArray={fenceArray} />
      <FenceRow rowNumber={3} fenceArray={fenceArray} />
      <FenceRow rowNumber={4} fenceArray={fenceArray} />
      <FenceCol colNumber={1} fenceArray={fenceArray} />
      <FenceCol colNumber={2} fenceArray={fenceArray} />
      <FenceCol colNumber={3} fenceArray={fenceArray} />

      <FarmRoom floorNumber={1} farmArray={farmArray} />
      <FarmRoom floorNumber={2} farmArray={farmArray} />
      <FarmRoom floorNumber={3} farmArray={farmArray} />
    </div>
  );
};

const FarmComponent2 = ({ username, className }) => {
  // 배열 정의
  return (
    <div className={`farmContainer ${className}`}>
      <div className="farmItem">
        <Farm />
        <h3 className="userFarm1">{username}</h3>
      </div>

      <FenceRow2 rowNumber={1} />
      <FenceRow2 rowNumber={2} />
      <FenceRow2 rowNumber={3} />
      <FenceRow2 rowNumber={4} />
      <FenceCol2 colNumber={1} />
      <FenceCol2 colNumber={2} />
      <FenceCol2 colNumber={3} />
    </div>
  );
};

const Fence = ({ className, isFence }) => {
  const style = isFence ? { backgroundColor: "red" } : {};
  return <div className={`fence ${className}`} style={style} />;
};

const Fences = ({ className, isFence }) => {
  const style = isFence ? { backgroundColor: "red" } : {};
  return <div className={`fenceCol ${className}`} style={style} />;
};

const Fence2 = ({ className }) => {
  return <div className={`fence ${className}`} />;
};

const Fences2 = ({ className }) => {
  return <div className={`fenceCol ${className}`} />;
};

const Room = ({ className, itemName }) => {
  let imageSrc = "";
  let imageStyle = {}; // imageStyle 변수를 초기화

  if (itemName === "wood_room") imageSrc = woodRoomImage;
  else if (itemName === "rock_room") imageSrc = rockRoomImage;
  else if (itemName === "soil_room") imageSrc = soilRoomImage;
  else if (itemName === "plow") imageSrc = plow;
  else if (itemName === "plow_grain1") imageSrc = plow_grain1;
  else if (itemName === "plow_grain2") imageSrc = plow_grain2;
  else if (itemName === "plow_grain3") imageSrc = plow_grain3;
  else if (itemName === "sheep") imageSrc = sheep;
  else if (itemName === "sheep_room") {
    imageSrc = sheep;
    imageStyle = {
      width: "35px",
      height: "25px",
    };
  }
  else if (itemName === "house") {
    imageSrc = house;
    imageStyle = {
      width: "40px",
      height: "35px",
    };
  }
  const style = { backgroundImage: `url(${imageSrc})` };
  return <div className={`room ${className}`}  style={{ ...style, ...imageStyle }} />;
};

const FarmRoom = ({ floorNumber, farmArray }) => {
  return (
    <>
      <Room
        className={`room${floorNumber}_1`}
        itemName={farmArray[(floorNumber - 1) * 5]}
      />
      <Room
        className={`room${floorNumber}_2`}
        itemName={farmArray[(floorNumber - 1) * 5 + 1]}
      />
      <Room
        className={`room${floorNumber}_3`}
        itemName={farmArray[(floorNumber - 1) * 5 + 2]}
      />
      <Room
        className={`room${floorNumber}_4`}
        itemName={farmArray[(floorNumber - 1) * 5 + 3]}
      />
      <Room
        className={`room${floorNumber}_5`}
        itemName={farmArray[(floorNumber - 1) * 5 + 4]}
      />
    </>
  );
};

const FenceRow = ({ rowNumber, fenceArray }) => {
  let rowIndex = (rowNumber - 1) * 2;
  return (
    <>
      <Fence
        className={`fenceRow${rowNumber} fenceRow01`}
        isFence={fenceArray[rowIndex][0] === 1}
      />
      <Fence
        className={`fenceRow${rowNumber} fenceRow02`}
        isFence={fenceArray[rowIndex][1] === 1}
      />
      <Fence
        className={`fenceRow${rowNumber} fenceRow03`}
        isFence={fenceArray[rowIndex][2] === 1}
      />
      <Fence
        className={`fenceRow${rowNumber} fenceRow04`}
        isFence={fenceArray[rowIndex][3] === 1}
      />
      <Fence
        className={`fenceRow${rowNumber} fenceRow05`}
        isFence={fenceArray[rowIndex][4] === 1}
      />
      <Fence
        className={`fenceRow${rowNumber} fenceRow06`}
        isFence={fenceArray[rowIndex][5] === 1}
      />
    </>
  );
};

const FenceCol = ({ colNumber, fenceArray }) => {
  let colIndex = colNumber * 2 - 1;
  return (
    <>
      <Fences
        className={`fenceCol${colNumber} fenceCol01`}
        isFence={fenceArray[colIndex][0] === 1}
      />
      <Fences
        className={`fenceCol${colNumber} fenceCol02`}
        isFence={fenceArray[colIndex][1] === 1}
      />
      <Fences
        className={`fenceCol${colNumber} fenceCol03`}
        isFence={fenceArray[colIndex][2] === 1}
      />
      <Fences
        className={`fenceCol${colNumber} fenceCol04`}
        isFence={fenceArray[colIndex][3] === 1}
      />
      <Fences
        className={`fenceCol${colNumber} fenceCol05`}
        isFence={fenceArray[colIndex][4] === 1}
      />
      <Fences
        className={`fenceCol${colNumber} fenceCol06`}
        isFence={fenceArray[colIndex][5] === 1}
      />
    </>
  );
};

const FenceRow2 = ({ rowNumber }) => {
  return (
    <>
      <Fence2 className={`fenceRow${rowNumber} fenceRow01`} />
      <Fence2 className={`fenceRow${rowNumber} fenceRow02`} />
      <Fence2 className={`fenceRow${rowNumber} fenceRow03`} />
      <Fence2 className={`fenceRow${rowNumber} fenceRow04`} />
      <Fence2 className={`fenceRow${rowNumber} fenceRow05`} />
    </>
  );
};

const FenceCol2 = ({ colNumber }) => {
  return (
    <>
      <Fences2 className={`fenceCol${colNumber} fenceCol01`} />
      <Fences2 className={`fenceCol${colNumber} fenceCol02`} />
      <Fences2 className={`fenceCol${colNumber} fenceCol03`} />
      <Fences2 className={`fenceCol${colNumber} fenceCol04`} />
      <Fences2 className={`fenceCol${colNumber} fenceCol05`} />
      <Fences2 className={`fenceCol${colNumber} fenceCol06`} />
    </>
  );
};

const UserFarm = ({ username, fenceArray, className, farmArray }) => {
  return (
    <>
      <FarmComponent
        username={username}
        className={className}
        fenceArray={fenceArray}
        farmArray={farmArray}
      />
    </>
  );
};

const UserFarm2 = ({ username, className }) => {
  return (
    <>
      <FarmComponent2 username={username} className={className} />
    </>
  );
};

const App = () => {
  const { userData, setUserData } = useContext(UserContext);
  const { farmData } = useContext(DataContext);
  
  const user1Farm = userData.user1.farm_array;
  const user2Farm = userData.user2.farm_array;
  const user3Farm = userData.user3.farm_array;
  const user4Farm = userData.user4.farm_array;
  const user1FenceArray = userData.user1.farm_fence_array;
  const user2FenceArray = userData.user2.farm_fence_array;
  const user3FenceArray = userData.user3.farm_fence_array;
  const user4FenceArray = userData.user4.farm_fence_array;

  

  return (
    <div>
      {farmData.turn === 1 && (
        <>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm2 username="User 1" className="1" />
            <CardBoard userId="1" />
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm
              username="User 2"
              className="2"
              fenceArray={user2FenceArray}
              farmArray={user2Farm}
            />
            <CardBoard userId="2" />
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm
              username="User 3"
              className="3"
              fenceArray={user3FenceArray}
              farmArray={user3Farm}
            />
            <CardBoard userId="3" />
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm
              username="User 4"
              className="4"
              fenceArray={user4FenceArray}
              farmArray={user4Farm}
            />
            <CardBoard userId="4" />
          </div>
        </>
      )}

      {farmData.turn === 2 && (
        <>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm2 username="User 2" className="2" />
            <CardBoard userId="2" />
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm
              username="User 1"
              className="1"
              fenceArray={user1FenceArray}
              farmArray={user1Farm}
            />
            <CardBoard userId="1" />
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm
              username="User 3"
              className="3"
              fenceArray={user3FenceArray}
              farmArray={user3Farm}
            />
            <CardBoard userId="3" />
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm
              username="User 4"
              className="4"
              fenceArray={user4FenceArray}
              farmArray={user4Farm}
            />
            <CardBoard userId="4" />
          </div>
        </>
      )}

      {farmData.turn === 3 && (
        <>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm2 username="User 3" className="3" />
            <CardBoard userId="3" />
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm
              username="User 1"
              className="1"
              fenceArray={user1FenceArray}
              farmArray={user1Farm}
            />
            <CardBoard userId="1" />
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm
              username="User 2"
              className="2"
              fenceArray={user2FenceArray}
              farmArray={user2Farm}
            />
            <CardBoard userId="2" />
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm
              username="User 4"
              className="4"
              fenceArray={user4FenceArray}
              farmArray={user4Farm}
            />
            <CardBoard userId="4" />
          </div>
        </>
      )}

      {farmData.turn === 4 && (
        <>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm2 username="User 4" className="4" />
            <CardBoard userId="4" />
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm
              username="User 1"
              className="1"
              fenceArray={user1FenceArray}
              farmArray={user1Farm}
            />
            <CardBoard userId="1" />
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm
              username="User 2"
              className="2"
              fenceArray={user2FenceArray}
              farmArray={user2Farm}
            />
            <CardBoard userId="2" />
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <UserFarm
              username="User 3"
              className="3"
              fenceArray={user3FenceArray}
              farmArray={user3Farm}
            />
            <CardBoard userId="3" />
          </div>
        </>
      )}
    </div>
  );
};

export default App;