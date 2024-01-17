import { useState, useEffect } from 'react';
import './App.css';
import { Form } from './components/Form';

function App() {
  const [todos, setTodos] = useState([]);

  const changeTodos = (newTodo) => {
    return setTodos((prev) => {
      const newTodoList = [
        ...prev,
        newTodo
      ];
      localStorage.setItem('todolist', JSON.stringify(newTodoList));
      return newTodoList;
    });
  } 

  const changeTodoState = (id) => {
    setTodos(prev => {
      const newTodoList = prev.map((item) => {
        if (item.id == id) {
          let newDone = !item.done;
          return {...item, ['done']: newDone};
        } else {
          return item;
        }
      });
      localStorage.setItem('todolist', JSON.stringify(newTodoList));
      return newTodoList;
    })
  }

  useEffect(() => {
    const todoList = localStorage.getItem('todolist');

    if (todoList) {
      setTodos(JSON.parse(todoList));
    }
  }, []);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline mb-8">
        Todo List!
      </h1>
      <Form changeTodos={changeTodos} length={todos.length} />
      {
        todos.length > 0 && 
        <ul className='mt-8 flex flex-col gap-4 container w-6/12 m-auto'>
          {todos.map(todo => {
            return <li className='border' key={todo.id}>
              <p className='mb-4'>{todo.title}</p>
              <div className='flex justify-between py-4 px-6 items-center'>
                <p>{todo.text}</p>
                <p>{todo.done ? 'Выполненная задача' : 'Новая задача'}</p>
                <input type="checkbox" onChange={() => changeTodoState(todo.id)} checked={todo.done} value={todo.done} />
              </div>
            </li>
          }) }
        </ul>
      }
    </div>
  );
}

export default App;
