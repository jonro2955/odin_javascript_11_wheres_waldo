import { useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

export default function Records(props) {
  const [records, setRecords] = useState([]);
  const [limit] = useState(props.limit ? props.limit : 100);
  const [level] = useState(props.level);

  async function onSnapRead() {
    const array = [];
    const q = query(collection(getFirestore(), 'data'), orderBy('seconds'));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        array.push(doc.data());
      });
      // If a level prop is provided for use in <TopScoresPage/>
      if (level) {
        setRecords(
          array.slice(0, limit).map((item, index) => {
            if (level && item.level === level)
              return (
                <div key={index}>
                  <span className='recordEntryFieldLabel'>Time:</span>&nbsp;
                  <span className='recordEntryFieldData'>
                    {item.seconds} seconds
                  </span>
                  &nbsp;
                  <span className='recordEntryFieldLabel'>Name:</span>&nbsp;
                  <span className='recordEntryFieldData'>
                    {item.name.toUpperCase()}
                  </span>
                </div>
              );
          })
        );
        // If a level prop is not provided for use in <HomePage/>
      } else {
        setRecords(
          array.slice(0, limit).map((item, index) => {
            return (
              <div key={index}>
                <span className='recordEntryNum'>{index + 1})</span>&nbsp;
                <span className='recordEntryFieldLabel'>Name:</span>&nbsp;
                <span className='recordEntryFieldData'>
                  {item.name.toUpperCase()}
                </span>
                &nbsp;
                <span className='recordEntryFieldLabel'>Time:</span>&nbsp;
                <span className='recordEntryFieldData'>
                  {item.seconds} seconds
                </span>
                &nbsp;
                <span className='recordEntryFieldLabel'>Level:</span>&nbsp;
                <span className='recordEntryFieldData'>
                  {item.level.toUpperCase()}
                </span>
                &nbsp;
              </div>
            );
          })
        );
      }
    });
  }

  useEffect(() => {
    onSnapRead();
  }, []);

  return (
    <div id='Records'>
      <h3>{level ? level.toUpperCase() : ''}</h3>
      <div>{records}</div>
    </div>
  );
}
