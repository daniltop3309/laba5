import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const initNotes = [ 
    {text: 'notes1', isEdit: false}, 
    {text: 'notes2', isEdit: false},
    {text: 'notes3', isEdit: false}, 
  ]
  const [notes, setNotes] = useState(initNotes); 
  const [addvalue, setAddvalue] = useState();

  function startEdit(index) {
    const copy = Object.assign([], notes); 
    copy[index].isEdit = true;
    setNotes(copy); 
  }

  function endEdit(index) {
    const copy = Object.assign([], notes); 
    copy[index].isEdit = false;
    setNotes(copy);
  }
  function addnew() {
    let obj = {
      text: addvalue,
      isEdit: false,
    }
    setNotes([...notes, obj])
  };
  function changeNote(index, event) {
    const copy = Object.assign([], notes); 
    copy[index].text = event.target.value;
    setNotes(copy);
  }
  function deleteProduct(index) {
    setNotes(
      notes.filter((note, newindex) => {
        if (newindex !== index) {
          return note;
        }
      })
    );
  }
  const result = notes.map((note, index) => {
    let elem;
    let delet = <button style={{position:'relative', zIndex:2}} onClick={() => deleteProduct(index)}>delete</button>

    if (!note.isEdit) {
      elem = <div>
        <span onClick={() => startEdit(index)}>{note.text}</span>
        {delet}
      </div>;
    } else {
      elem = <input 
      value = {note.text}
      onChange={event => changeNote(index, event)}
      onBlur={() => endEdit(index)}
      />;
    }

    return <li key={index}>{elem}</li>;
  });

  return <div>
    <input onChange={(event) => setAddvalue(event.target.value)} type = "text" value = {addvalue} placeholder = 'Add Todo...' />
    <button onClick={addnew} >submit</button>
    <ul>
    {result}
    </ul>
  </div>;
}

export default App;