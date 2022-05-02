import Records from '../Records';
import Nav from '../Nav';

export default function TopScoresPage() {
  return (
    <div id='RecordsPage' className='page'>
      <Nav headline='Top Scores' />
      {/* h1 for spacing */}
      <h1></h1>
      <div id='recordsContainer'>
        <Records title='planets' />
        <Records title='countries' />
        <Records title='games' />
      </div>
    </div>
  );
}
