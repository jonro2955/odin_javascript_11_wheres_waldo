import { Link } from 'react-router-dom';
import planetsImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/planets.jpg';
import countriesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/countries.png';
import gamesImg from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_11_wheres_waldo/src/images/games.jpg';

export default function GamePathTile(props) {
  let image = () => {
    switch (props.pathName) {
      case 'Planets':
        return planetsImg;
      case 'Countries':
        return countriesImg;
      case 'Games':
        return gamesImg;
      default:
        return null;
    }
  };

  return (
    <div className='GamePathTile'>
      <div>{props.pathName}</div>
      <Link
        className='GamePathLink'
        to={`/${props.pathName}`}
        style={{
          backgroundImage: `url(${image()})`,
        }}
      ></Link>
    </div>
  );
}
