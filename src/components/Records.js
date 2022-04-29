import { useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

export default function Records(props) {
  const [context] = useState(props.context);
  const [records, setRecords] = useState([]);

  async function getDocsRead() {
    let array = [];
    const q = query(collection(getFirestore(), 'data'), orderBy('seconds'));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      array.push(doc.data());
    });
    setRecords(array);
    console.log('home(a)');
  }

  async function onSnapRead() {
    const array = [];
    const q = query(collection(getFirestore(), 'data'), orderBy('seconds'));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        array.push(doc.data());
      });
      setRecords(array);
      console.log('home(b)');
    });
  }

  useEffect(() => {
    // getDocsRead();
    onSnapRead();
  }, []);

  return (
    <div id='TopScores'>
      <h5>Top Scores</h5>
      {context === 'home'
        ? records.map((item, index) => {
            return (
              <div key={index}>
                {index + 1}) {item.name}: {item.seconds} seconds ({item.level})
              </div>
            );
          })
        : records.map((item, index) => {
            if (item.level === context) {
              return (
                <div key={index}>
                  {index + 1}) {item.name}: {item.seconds} seconds ({item.level}
                  )
                </div>
              );
            }
          })}
    </div>
  );
}
