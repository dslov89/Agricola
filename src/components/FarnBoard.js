import "./FarmBoard.css";
import { ReactComponent as Farm } from "../asset/farm.svg";
import woodRoomImage from '../image/wood_room.png';
import rockRoomImage from '../image/rock_room.png';
import soilRoomImage from '../image/soil_room.png';

const FarmComponent = ({ username, className, fenceArray , farmArray}) => {
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

const FarmComponent2 = ({ username, className}) => {
  // 배열 정의
  return (
    <div className={`farmContainer ${className}`}>
      <div className="farmItem">
        <Farm />
        <h3 className="userFarm1">{username}</h3>
      </div>

      <FenceRow2 rowNumber={1}/>
      <FenceRow2 rowNumber={2}/>
      <FenceRow2 rowNumber={3}/>
      <FenceRow2 rowNumber={4}/>
      <FenceCol2 colNumber={1}/>
      <FenceCol2 colNumber={2}/>
      <FenceCol2 colNumber={3}/>
    </div>
  );
};

const Fence = ({ className, isFence }) => {
  const style = isFence ? { backgroundColor: 'red' } : {};
  return <div className={`fence ${className}`} style={style} />;
};

const Fences = ({ className, isFence }) => {
  const style = isFence ? { backgroundColor: 'red' } : {};
  return <div className={`fenceCol ${className}`} style={style} />;
};

const Fence2 = ({ className }) => {
  return <div className={`fence ${className}`} />;
};

const Fences2 = ({ className }) => {
  return <div className={`fenceCol ${className}`} />;
};

const Room = ({className, itemName }) => {
  let imageSrc = '';
  if(itemName === 'wood_room') imageSrc = woodRoomImage;
  else if(itemName === 'rock_room') imageSrc = rockRoomImage;
  else if(itemName === 'soil_room') imageSrc = soilRoomImage;
  const style = { backgroundImage: `url(${imageSrc})` };
  return <div className={`room ${className}`} style={style} />;
};

const FarmRoom = ({ floorNumber, farmArray }) => {
  return (
    <>
      <Room className={`room${floorNumber}_1`} itemName={farmArray[(floorNumber-1)*5]} />
      <Room className={`room${floorNumber}_2`} itemName={farmArray[(floorNumber-1)*5 + 1]} />
      <Room className={`room${floorNumber}_3`} itemName={farmArray[(floorNumber-1)*5 + 2]} />
      <Room className={`room${floorNumber}_4`} itemName={farmArray[(floorNumber-1)*5 + 3]} />
      <Room className={`room${floorNumber}_5`} itemName={farmArray[(floorNumber-1)*5 + 4]} />
    </>
  );

}

const FenceRow = ({ rowNumber, fenceArray }) => {
  let rowIndex = (rowNumber-1)*2;
  return (
    <>
      <Fence className={`fenceRow${rowNumber} fenceRow01`} isFence={fenceArray[rowIndex][0] === 1} />
      <Fence className={`fenceRow${rowNumber} fenceRow02`} isFence={fenceArray[rowIndex][1] === 1} />
      <Fence className={`fenceRow${rowNumber} fenceRow03`} isFence={fenceArray[rowIndex][2] === 1} />
      <Fence className={`fenceRow${rowNumber} fenceRow04`} isFence={fenceArray[rowIndex][3] === 1} />
      <Fence className={`fenceRow${rowNumber} fenceRow05`} isFence={fenceArray[rowIndex][4] === 1} />
      <Fence className={`fenceRow${rowNumber} fenceRow06`} isFence={fenceArray[rowIndex][5] === 1} />
    </>
  );
};

const FenceCol = ({ colNumber, fenceArray }) => {
  let colIndex = (colNumber)*2 -1;
  return (
    <>
      <Fences className={`fenceCol${colNumber} fenceCol01`} isFence={fenceArray[colIndex][0] === 1} />
      <Fences className={`fenceCol${colNumber} fenceCol02`} isFence={fenceArray[colIndex][1] === 1} />
      <Fences className={`fenceCol${colNumber} fenceCol03`} isFence={fenceArray[colIndex][2] === 1} />
      <Fences className={`fenceCol${colNumber} fenceCol04`} isFence={fenceArray[colIndex][3] === 1} />
      <Fences className={`fenceCol${colNumber} fenceCol05`} isFence={fenceArray[colIndex][4] === 1} />
      <Fences className={`fenceCol${colNumber} fenceCol06`} isFence={fenceArray[colIndex][5] === 1} />
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
      <FarmComponent username={username} className = {className} fenceArray={fenceArray} farmArray = {farmArray} />
    </>
  );
};

const UserFarm2 = ({ username, className }) => {
  return (
    <>
      <FarmComponent2 username={username} className = {className}/>
    </>
  );
};


const App = () => {
  let turn = 1;
  const user1Farm = 
  ['empty','empty','empty','empty','empty',
  'wood_room','empty','empty','empty','empty',
  'wood_room','empty','empty','empty','empty'];

  const user2Farm = 
  ['empty','empty','soil_room','soil_room','wood_room',
  'wood_room','empty','empty','wood_room','empty',
  'wood_room','rock_room','soil_room','empty','empty'];

  const user3Farm = 
  ['empty','empty','soil_room','soil_room','empty',
  'wood_room','empty','empty','wood_room','empty',
  'wood_room','empty','empty','empty','empty'];

  const user4Farm = 
  ['empty','empty','soil_room','soil_room','empty',
  'wood_room','soil_room','empty','wood_room','empty',
  'wood_room','rock_room','empty','empty','empty'];



  const user1FenceArray = [
    [0, 0, 0, 0, 0, 0], //row1
    [0, 0, 0, 0, 0, 0], //col1
    [0, 0, 0, 0, 0, 0], //row2
    [0, 0, 0, 0, 0, 0], //col2
    [0, 0, 0, 0, 0, 0], //row3
    [0, 0, 0, 0, 0, 0], //col3
    [0, 0, 0, 0, 0, 0], //row4
  ];
  const user2FenceArray = [
    [0, 0, 0, 0, 0, 0], //row1
    [0, 0, 0, 0, 0, 0], //col1
    [0, 0, 1, 0, 0, 0], //row2
    [0, 0, 1, 1, 0, 0], //col2
    [0, 0, 1, 1, 0, 0], //row3
    [0, 0, 0, 1, 1, 0], //col3
    [0, 0, 0, 1, 0, 0], //row4
  ];

  const user3FenceArray = [
    [1, 1, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 1, 1],
    [0, 0, 1, 1, 1, 0],
  ];

  const user4FenceArray = [
    [1, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 0],
  ];

  return (
    <div>
      {turn === 1 && (
      <>
        <UserFarm2 username="User 1" className="1" />
        <UserFarm username="User 2" className="2" fenceArray={user2FenceArray} farmArray={user2Farm} />
        <UserFarm username="User 3" className="3" fenceArray={user3FenceArray} farmArray={user3Farm} />
        <UserFarm username="User 4" className="4" fenceArray={user4FenceArray} farmArray={user4Farm} />
      </>
      )}

      {turn === 2 && (
      <>
        <UserFarm2 username="User 2" className="2" />
        <UserFarm username="User 1" className="1" fenceArray={user1FenceArray} farmArray={user1Farm} />
        <UserFarm username="User 3" className="3" fenceArray={user3FenceArray} farmArray={user3Farm} />
        <UserFarm username="User 4" className="4" fenceArray={user4FenceArray} farmArray={user4Farm} />
      </>
      )}
      
      {turn === 3 && (
      <>
        <UserFarm2 username="User 3" className="3" />
        <UserFarm username="User 1" className="1" fenceArray={user1FenceArray} farmArray={user1Farm} />
        <UserFarm username="User 2" className="2" fenceArray={user2FenceArray} farmArray={user2Farm} />
        <UserFarm username="User 4" className="4" fenceArray={user4FenceArray} farmArray={user4Farm} />
      </>
      )}

      {turn === 4 && (
      <>
        <UserFarm2 username="User 4" className="4" />
        <UserFarm username="User 1" className="1" fenceArray={user1FenceArray} farmArray={user1Farm} />
        <UserFarm username="User 2" className="2" fenceArray={user2FenceArray} farmArray={user2Farm} />
        <UserFarm username="User 3" className="3" fenceArray={user3FenceArray} farmArray={user3Farm} />
      </>
      )}
    </div>
  );
};

export default App;