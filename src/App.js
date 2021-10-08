import { useEffect, useState } from "react"
import logo from './logo.svg';
import './App.css';
import Preloader from './component/Preloader';
import { readTodos, createTodo, updateTodo, deleteTodo } from './component/functions'




function App() {
  const [todo, setTodo] = useState({
    title: '',
    content: ''
  })
  const [todos, setTodos] = useState(null)
  const [currentId, setCurremtId] = useState(0)

  const getData = async () => {
    const result = await readTodos()
    if (result) {
      setTodos(result)
    }
    console.log(result)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (currentId === 0) {
      const result = await createTodo(todo)
      console.log(result)
      setTodos([...todos, result])
      Clear()
    } else {
      await updateTodo(currentId, todo)
      Clear()
    }
  }

  const deleteFun = async (id) => {
    await deleteTodo(id);
    const todocopys = [...todos]
    todocopys.filter(todo => todo.id !== id)
    setTodos(todocopys)
  }

  const Clear = () => {
    setCurremtId(0)
    setTodo({ title: "", content: " " })
  }
  useEffect(() => {
    let currentTodo = currentId != 0 ? todos.find(todo => todo._id === currentId) :
      { title: " ", content: " " }
    setTodo(currentTodo)
  }, [currentId])
  useEffect(() => {
    getData()
  }, [currentId])

  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode === 27) {
        Clear()
      }
    }
    window.addEventListener('keydown', clearField)
    return () => window.removeEventListener('keydown', clearField)
  }, [])

  return (
    <div className="container">

      <div className="row">
        <pre>{JSON.stringify(todo)}</pre>
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">title</i>
              <input id="icon_prefix" type="text" className="validate"
                value={todo.title}
                onChange={e => setTodo({ ...todo, title: e.target.value })}
              />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">description</i>
              <input id="icon_telephone" type="tel" className="validate"
                value={todo.content}
                onChange={e => setTodo({ ...todo, content: e.target.value })}

              />
              <label htmlFor="icon_telephone">content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="waves-effect.waves-light btn">Submit</button>
          </div>

        </form>
        <div className="row right-align">
          <button
            onClick={() => {
              Clear()
            }}
            className="waves-effect.waves-light btn">Clear</button>
        </div>


        <div>
          {
            !todos ? <Preloader /> : todos.length > 0 ?
              <ul className="collection">
                {
                  todos.map((item) => (
                    <li
                      onClick={() => {
                        setCurremtId(item._id)
                        console.log(currentId)
                      }}
                      key={item._id} className="collection-item"><div><h5>{item.title}</h5>
                        <p>{item.content}<a href="#!" className="secondary-content"><i className="material-icons" onClick={() => {
                          deleteFun(item._id)
                        }}>delete</i></a></p></div></li>
                  ))
                }

              </ul> :
              <div>Notting to Do</div>
          }
        </div>



      </div>


    </div>
  );
}

export default App;
