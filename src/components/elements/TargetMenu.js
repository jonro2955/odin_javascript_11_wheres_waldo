export default function TargetMenu(props) {
  let style = { left: props.clickedX + 15, top: props.clickedY - 15, color: 'red' };
  const level = props.level;
  const targets = props.targets;
  const target0 = targets[level][0]['name'];
  const target1 = targets[level][1]['name'];
  const target2 = targets[level][2]['name'];
  const target0Found = targets[level][0]['found'];
  const target1Found = targets[level][1]['found'];
  const target2Found = targets[level][2]['found'];

  return (
    <div id='TargetMenu' style={style}>
      {!target0Found && (
        <button onClick={props.menuClickHandler}>{target0}</button>
      )}
      {!target1Found && (
        <button onClick={props.menuClickHandler}>{target1}</button>
      )}
      {!target2Found && (
        <button onClick={props.menuClickHandler}>{target2}</button>
      )}
    </div>
  );
}
