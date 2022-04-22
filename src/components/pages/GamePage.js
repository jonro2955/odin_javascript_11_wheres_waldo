import { useParams } from 'react-router-dom';
import planetsImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/planets.jpg';
import countriesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/countries.png';
import gamesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/games.jpg';

export default function GamePage() {
  const levelParam = useParams().levelParam;

  const targets = {
    /* Values 'x' and 'y' are predetermined distances of the centerpoint of each findable
    'thing' inside the picture (i.e. a planet or the face of a game character chosen by me) 
    relative to the upper left corner of the the img element rendered with a width of 1150px 
    (using the img element's offsetLeft and offsetTop properties). Such a relative 
    pixel coordinate does not change with the positioning of the image in the browser window 
    (such as when the dev tools are opened) or the zoom level.
    */
    Planets: [
      { name: 'Mercury', x: '822', y: '331' },
      { name: 'Mars', x: '605', y: '348' },
      { name: 'Neptune', x: '179', y: '443' },
    ],
    Countries: [
      { name: 'Honduras', x: '245', y: '404' },
      { name: 'Central African Republic', x: '595', y: '435' },
      { name: 'Bulgaria', x: '607', y: '303' },
    ],
    Games: [
      { name: "Solid Snake's face", x: '88', y: '314' },
      { name: "Lara Croft's face", x: '241', y: '383' },
      { name: "Megaman's face", x: '912', y: '156' },
    ],
  };

  function clickHandler(e) {
    const gameImage = document.getElementById('gameImage');
    const coordX = e.pageX - gameImage.offsetLeft;
    const coordY = e.pageY - gameImage.offsetTop;
    console.log(`${coordX}, ${coordY}`);
    const clickedCoordDiv = document.getElementById('clickedCoordDiv');
    clickedCoordDiv.textContent = `${coordX}, ${coordY}`;
    switch (levelParam) {
      case 'Planets':
        if (807 < coordX && coordX < 837 && 316 < coordY && coordY < 346) {
          clickedCoordDiv.textContent = `Mercury`;
        }
        if (590 < coordX && coordX < 620 && 333 < coordY && coordY < 363) {
          clickedCoordDiv.textContent = `Mars`;
        }
        if (160 < coordX && coordX < 198 && 424 < coordY && coordY < 463) {
          clickedCoordDiv.textContent = `Neptune`;
        }
        break;
      case 'Countries':
        if (235 < coordX && coordX < 255 && 394 < coordY && coordY < 414) {
          clickedCoordDiv.textContent = `Honduras`;
        }
        if (575 < coordX && coordX < 615 && 420 < coordY && coordY < 450) {
          clickedCoordDiv.textContent = `Central African Republic`;
        }
        if (597 < coordX && coordX < 617 && 293 < coordY && coordY < 313) {
          clickedCoordDiv.textContent = `Bulgaria`;
        }
        break;
      case 'Games':
        if (73 < coordX && coordX < 103 && 299 < coordY && coordY < 329) {
          clickedCoordDiv.textContent = `Solid Snake's face`;
        }
        if (226 < coordX && coordX < 256 && 368 < coordY && coordY < 398) {
          clickedCoordDiv.textContent = `Lara Croft's face`;
        }
        if (897 < coordX && coordX < 927 && 141 < coordY && coordY < 171) {
          clickedCoordDiv.textContent = `Megaman's face`;
        }
        break;
      default:
        break;
    }
  }

  function getObjectivesString() {
    let array = [];
    switch (levelParam) {
      case 'Planets':
        targets['Planets'].forEach((target) => {
          array.push(target['name']);
        });
        break;
      case 'Countries':
        targets['Countries'].forEach((target) => {
          array.push(target['name']);
        });
        break;
      case 'Games':
        targets['Games'].forEach((target) => {
          array.push(target['name']);
        });
        break;
      default:
        return null;
    }
    return array.join(', ');
  }

  function getImage() {
    switch (levelParam) {
      case 'Planets':
        return planetsImg;
      case 'Countries':
        return countriesImg;
      case 'Games':
        return gamesImg;
      default:
        return null;
    }
  }

  // Make mouse pointer become a circle inside game image
  function mouseEnterHandler() {
    //The div with the .ringCursor class is styled to make it look like a ring
    let ringCursor = document.querySelector('.ringCursor');
    ringCursor.style.display = 'initial';
    document.getElementById('gameImage').addEventListener('mousemove', (e) => {
      //the top and left style values are updated in response to mouse movements
      ringCursor.style.top = e.pageY + 'px';
      ringCursor.style.left = e.pageX + 'px';
    });
  }

  // Make ring cursor disappear outside game image
  function mouseLeaveHandler() {
    document.querySelector('.ringCursor').style.display = 'none';
  }

  function mouseDownHandler() {
    document.querySelector('.ringCursor').classList.add('clickAnimation');
  }

  function mouseUpHandler() {
    document.querySelector('.ringCursor').classList.remove('clickAnimation');
  }

  return (
    <div className='page'>
      <h2>{levelParam}</h2>
      <h6>Find: {getObjectivesString()}</h6>
      <img
        src={getImage()}
        alt={levelParam}
        className='gameImage'
        id='gameImage'
        width='1150'
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onClick={clickHandler}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
      ></img>
      <div id='clickedCoordDiv'>Coords</div>
      <div className='ringCursor'></div>
    </div>
  );
}
