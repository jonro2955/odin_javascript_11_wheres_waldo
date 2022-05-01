import { Link } from 'react-router-dom';
import React from 'react';
export default function Nav(props) {
  return (
    <nav className='nav-wrapper'>
      <Link className='left navBtn' to={`/`}>
        Home
      </Link>
      <div className='brand-logo center'>{props.headline}</div>
      <Link className='right navBtn' to={`/records`}>
        Top Scores
      </Link>
    </nav>
  );
}
