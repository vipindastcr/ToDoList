import './App.css'
import {useState} from 'react' 
function App() {
  const [toDos,setToDos] = useState([])
  const [toDo,setToDo] = useState('')
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = daysOfWeek[new Date().getDay()]; 
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>To Do List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(eve)=>setToDo(eve.target.value)}  type="text" placeholder="🖊️ Add item..." />
        <i onClick={()=>setToDos([...toDos,{id:Date.now(), text:toDo, status:false}])} className="fas fa-plus"></i>
      </div>
      <div className="todos">
      {toDos.map((obj, index) => {
        return (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                onChange={(eve) => {
                  setToDos(
                    toDos.map((obj2) => {
                      if (obj2.id === obj.id) {
                        obj2.status = eve.target.checked;
                      }
                      return obj2;
                    })
                  );
                }}
                checked={obj.status}
                type="checkbox"
              />
            
              {obj.isEditing ? (
                <input
                  type="text"
                  value={obj.text}
                  onChange={(e) => {
                    setToDos(
                      toDos.map((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.text = e.target.value;
                        }
                        return obj2;
                      })
                    );
                  }}
                />
              ) : (
                <p>{obj.text}</p>
              )}
            </div>

            <div className="right">
              <div className="mid-right">
                <button
                  onClick={() => {
                    setToDos(
                      toDos.map((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.isEditing = !obj2.isEditing; 
                        }
                        return obj2;
                      })
                    );
                  }}
                >
                  {obj.isEditing ? "Save" : "Edit"}
                </button>
              </div>
              <i
                className="fas fa-times"
                onClick={() => {
                  setToDos(toDos.filter((obj3) => obj3.id !== obj.id));
                }}
              ></i>
            </div>
          </div>
        );
      })}

        <div className='completed-todos'>
        {toDos.map((obj)=>{
          if(obj.status){
            return (<h1>{obj.text}</h1>) 
          }
          return null
        })}
        </div>
      </div>
    </div>
  );
}
export default App;