import { useParams } from 'react-router-dom';

export default function GamePage() {

  return (
    <div id='GamePage'>
      <h1>GamePage</h1>
      <div>This level is for {useParams().level}</div>
    </div>
  );
}
