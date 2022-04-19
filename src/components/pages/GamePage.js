import { useParams } from 'react-router-dom';
import planetsImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/planets.jpg';
import countriesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/countries.png';
import gamesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/games.jpg';

export default function GamePage() {
  const level = useParams().level;

  const findables = {
    planets: ['Mercury', 'Jupiter', 'Saturn'],
    countries: ['Honduras', 'Central African Republic', 'Bulgaria'],
    games: ['Solid Snake', 'Lara Croft', 'Megaman'],
  };

  function objectives() {
    switch (level) {
      case 'Planets':
        return findables['planets'].join(', ');
      case 'Countries':
        return findables['countries'].join(', ');
      case 'Games':
        return findables['games'].join(', ');
      default:
        return null;
    }
  }

  function image() {
    switch (level) {
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

  // Make mouse pointer become a circle insode gameImage
  function mouseEnterHandler() {
    //The div with the .cursor class is styled to make it appear as a ring
    let ringCursor = document.querySelector('.ringCursor');
    ringCursor.style.display = 'initial';
    document.getElementById('gameImage').addEventListener('mousemove', (e) => {
      //the above div's top and left style values are updated in response to mouse movements
      ringCursor.style.top = e.pageY + 'px';
      ringCursor.style.left = e.pageX + 'px';
    });
  }

  function mouseLeaveHandler() {
    let ringCursor = document.querySelector('.ringCursor');
    ringCursor.style.display = 'none';
  }

  // Open item selection menu at click location
  function clickHandler(e) {
    console.log(e.clientX, e.clientY);
  }

  return (
    <div className='page'>
      <h2>{level}</h2>
      <h6>Find: {objectives()}</h6>
      <img
        src={image()}
        alt={level}
        className='gameImage'
        id='gameImage'
        width='1150'
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onClick={clickHandler}
        cursor='crosshair'
      ></img>
      <div className='ringCursor'></div>
      <div>Found: </div>
    </div>
  );
}
