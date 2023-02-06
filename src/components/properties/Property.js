function Property(props) {

  const id = props.props.ids + props.property;
  const value = props.props.valuesFrom[props.property];

  return (
    <>
      <label className="prop" style={{ width: Number(props.props.width) }} >{props.property}</label>
      <input className="prop" type={props.props.type} id={id} value={value} onChange={props.props.onChange} onBlur={props.props.onBlur}></input>
    </>
  );
}

export default Property;