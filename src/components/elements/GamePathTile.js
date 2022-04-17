import { Link } from 'react-router-dom';

export default function GamePathTile(props) {
  return (
    <div className='GamePathTile'>
      <Link to={`/${props.pathName}`}>{props.pathName}</Link>
    </div>
  );
}
