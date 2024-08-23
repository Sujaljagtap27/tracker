import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";



function App() {
  const [count, setCount] = useState(0);
  const [todo, settodo] =useState();
  const [todos, settodos] =useState([""]);

  const [showFinished, setshowFinished] =useState(true);

  useEffect(()=>
  {
    let todoString = localStorage.getItem("todos")
    if(todoString)
    {
      let todos = JSON.parse(todoString)
      settodos(todos)
    }
   
  },[])

  const saveToLS = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  

  const handleChange=(e)=>
  {
      settodo(e.target.value);
      
  }

  const handleAdd=()=>
  {
      settodos([...todos,{ id: uuidv4(), todo, isCompleted:false}]);
      console.log(todos);
      settodo("");
      saveToLS();
    
  }

  const handleEdit=(e,id)=>
  {
    let t=todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let newtodos =todos.filter(item=>
    {
      return item.id!==id
    }
    );
    settodos(newtodos)
    saveToLS();
  }

  const handleDelete=(e,id)=>
  {
 
      let newTodos = todos.filter(item=>
      {
          return item.id!==id
      }
      );
      settodos(newTodos)
      saveToLS();
    
  }

  const togglefinshed = (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleCheck=(e)=>
  {
    console.log(e,e.target)
    let id =e.target.name;
    console.log(`the id is ${id}`)
    let index=todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos=[...todos]; 
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    console.log(newTodos,todos); 
    saveToLS(); 
  } 

  return (
    <>
      {/* <Navbar/> */}
      <div className=" bagc mx-3 md:container  md:mx-auto my-5 rounded-lg  p-5  min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-3xl'>Task Tracker Application</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Task</h2>
          <div className="flex">
          <input onChange={handleChange} checked={todo} type="text"  className='w-full hi rounded-3xl px-5 py-1'  />
          <button onClick={handleAdd}  className='bg-green-800 hover:bg-green-950 disabled:bg-red-500 text-sm py-1 p-3 w-40 text-white rounded-full  mx-2'>Add</button>
          </div>
          </div>
          <input className='my-4' id='show' type="checkbox" onChange={togglefinshed } checked={!showFinished} />
         
          <label className='h-[1px] mx-4' htmlFor='show'>Show Finished</label>
          <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
          <h2 className='text-2xl font-bold'>your todo</h2>
          <div className='todos'>
            {todos.lenght ===0 &&  <div className='m-5'>No todos to display</div>}
            {todos.map(item=>{
              
            
            return (showFinished || item.isCompleted) && <div key={item.id} className="todos flex justify-between md:w-1/2 my-3">
              <input name={item.id} onChange={handleCheck} type="checkbox" checked={item.isCompleted}  />
              <div className="sj "><div className={item.isCompleted?"line-through":""} >{item.todo}</div></div>
              <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e,item.id)} className='bg-blue-800 hover:bg-blue-950 text-sm py-1 p-3 text-white rounded-lg m-2'><FaUserEdit /></button>
              <button onClick={(e)=>handleDelete(e,item.id)} className='bg-red-800 hover:bg-red-950 text-sm py-1 p-3 text-white rounded-lg m-2'><MdDeleteForever />
              </button>
              </div>
            </div>
      
      })}
        </div>
        </div>
      

    </>
  )
 } 

export default App
