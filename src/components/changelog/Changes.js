<<<<<<< HEAD
import Change from "./Change";

function Changes(props) {

  function changeList(z) {
    const a = z.change.changes;
    const b = a.map(change => <Change key={a.indexOf(change)} change={change} />)
    return (
      <ul>
        {b}
      </ul>
    )
  }

  return (
    <>
      <h4>({props.change.date}) v{props.change.version}</h4>
      {changeList(props)}
    </>
  );
}

=======
import Change from "./Change";

function Changes(props) {

  function changeList(z) {
    const a = z.change.changes;
    const b = a.map(change => <Change key={a.indexOf(change)} change={change} />)
    return (
      <ul>
        {b}
      </ul>
    )
  }

  return (
    <>
      <h4>({props.change.date}) v{props.change.version}</h4>
      {changeList(props)}
    </>
  );
}

>>>>>>> 4fa73a8799f23b20ed1dc58a869117c09c354afa
export default Changes;