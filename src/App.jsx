import { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleAddOrEdit = () => {
    if (isEditing) {
      setToDos(toDos.map(obj => 
        obj.id === editId ? { ...obj, text: toDo } : obj
      ));
      setIsEditing(false);
      setEditId(null);
    } else {
      setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
    }
    setToDo('');
  };

  const handleDelete = (id) => {
    setToDos(toDos.filter(obj => obj.id !== id));
  };

  const handleEdit = (id, text) => {
    setIsEditing(true);
    setEditId(id);
    setToDo(text);
  };

  return (
    <>
      <div className="app">
        <div className="mainHeading">
          <h1>ToDo List</h1>
        </div>
        <div className="subHeading">
          <br />
          <h2>Whoop, it's Wednesday 🌝 ☕</h2>
        </div>
        <div className="input">
          <input
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
            type="text"
            placeholder={isEditing ? "✏️ Edit item..." : "🖊️ Add item..."}
          />
          <i onClick={handleAddOrEdit} className="fas fa-plus"></i>
        </div>
        <div className="todos">
          {toDos.map((obj) => {
            return (
              <div className="todo" key={obj.id}>
                <div className="left">
                  <input
                    onChange={(e) => {
                      setToDos(
                        toDos.map(obj2 => 
                          obj2.id === obj.id ? { ...obj2, status: e.target.checked } : obj2
                        )
                      );
                    }}
                    checked={obj.status}
                    type="checkbox"
                  />
                  <p style={{ textDecoration: obj.status ? "line-through" : "none" }}>
                    {obj.text}
                  </p>
                </div>
                <div className="right">
                  <i
                    onClick={() => handleEdit(obj.id, obj.text)}
                    className="fas fa-edit"
                  ></i>
                  <i
                    onClick={() => handleDelete(obj.id)}
                    className="fas fa-times"
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
