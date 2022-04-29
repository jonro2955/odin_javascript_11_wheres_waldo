export default function Records(props) {
  return (
    <div id='TopScores'>
      <h5>Top Scores</h5>
      {props.records.map((item, index) => (
        <div key={index}>
          {index + 1}) {item.name}: {item.seconds} seconds ({item.level})
        </div>
      ))}
    </div>
  );
}
