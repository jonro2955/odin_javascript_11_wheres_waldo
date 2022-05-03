import Records from '../Records';
import Nav from '../Nav';

export default function TopScoresPage() {
  return (
    <div id='RecordsPage' className='page'>
      <Nav headline='Top Scores' />
      <div id='recordsContainer'>
        <Records title='planets' />
        <Records title='countries' />
        <Records title='games' />
      </div>
      <h6 style={{marginTop: '50px'}}>Database provided by Firebase</h6>
    </div>
  );
}
