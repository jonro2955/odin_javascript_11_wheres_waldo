export default function TargetMenu(props) {
  let style = { left: props.coordX + 15, top: props.coordY - 15, color: 'red' };
  return (
    <div id='TargetMenu' style={style}>
        <button className='dd-list-item'>Target1</button>
        <button className='dd-list-item'>Target2</button>
        <button className='dd-list-item'>Target3</button>
    </div>
  );
}
