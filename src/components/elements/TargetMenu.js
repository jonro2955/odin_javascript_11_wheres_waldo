export default function TargetMenu(props) {
  let style = { left: props.coordX + 15, top: props.coordY - 15, color: 'red' };
  const level = props.level;
  const targets = props.targets;
  const target0 = targets[level][0]['name'];
  const target1 = targets[level][1]['name'];
  const target2 = targets[level][2]['name'];

  return (
    <div id='TargetMenu' style={style}>
      <button onClick={props.menuClickHandler}>
        {target0}
      </button>
      <button onClick={props.menuClickHandler}>
        {target1}
      </button>
      <button onClick={props.menuClickHandler}>
        {target2}
      </button>
    </div>
  );
}
