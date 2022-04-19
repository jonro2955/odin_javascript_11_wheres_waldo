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
        width='1150'
        onClick={clickHandler}
      ></img>
    </div>
  );
}
