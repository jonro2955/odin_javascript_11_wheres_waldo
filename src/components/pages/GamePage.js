import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import planetsImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/planets.jpg';
import countriesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/countries.png';
import gamesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/games.jpg';

export default function GamePage() {
  const gameImage = document.getElementById('gameImage');
  const levelParam = useParams().levelParam;
  const [lastClickedCoord, setlastClickedCoord] = useState({ x: '', y: '' });

  useEffect(() => {
    outputClickedCoords(lastClickedCoord);
  }, [lastClickedCoord]);

  function clickHandler(e) {
    setlastClickedCoord({ x: e.pageX, y: e.pageY });
  }

  //console log the clicked coordinates
  function outputClickedCoords(coords) {
    //only if there is a value 
    if (coords['x']) {
      console.log(
        'Clicked coordinate in pixels relative to the upper left corner of the image: ' +
          (coords['x'] - gameImage.offsetLeft) +
          ', ' +
          (coords['y'] - gameImage.offsetTop)
      );
    }
  }

  const findables = {
    /* Values 'x' and 'y' are predetermined distances of the centerpoint of each findable
    'thing' inside the picture (i.e. a planet or the face of a game character chosen by me) 
    relative to the upper left corner of the the img element rendered with a width of 1150px 
    (achieved by using the img element's offsetLeft and offsetTop properties). Such a relative 
    pixel coordinate does not change with the positioning of the image in the browser window 
    (such as when the dev tools are opened) or the zoom level.
    The center point is an approximation eyeballed by a human.
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

  function getObjectivesString() {
    let array = [];
    switch (levelParam) {
      case 'Planets':
        findables['Planets'].forEach((item) => {
          array.push(item['name']);
        });
        break;
      case 'Countries':
        findables['Countries'].forEach((item) => {
          array.push(item['name']);
        });
        break;
      case 'Games':
        findables['Games'].forEach((item) => {
          array.push(item['name']);
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

  // Make ring cursor embelishment disappear outside image
  function mouseLeaveHandler() {
    document.querySelector('.ringCursor').style.display = 'none';
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
      ></img>

      <div className='ringCursor'></div>
    </div>
  );
}
