import Records from '../Records';
import Nav from '../Nav';

export default function TopScoresPage() {
  return (
    <div id='RecordsPage' className='page'>
      <Nav headline='Top Scores' />
      <div id='recordsContainer'>
        <Records level='planets' />
        <Records level='countries' />
        <Records level='games' />
      </div>
    </div>
  );
}
