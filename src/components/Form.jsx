import React, { Fragment, useState, useRef } from "react";

export const Form = ({changeTodos, length}) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const textRef = useRef(null);

  const saveTodo = () => {
    if (title !== '' && text !== '') {
      changeTodos({
        id: length + 1,
        title,
        text,
        done: false,
      });
      setTitle('');
      setText('');
    }
  };

  return (
    <Fragment>
      <div className='flex flex-col gap-4 container w-6/12 m-auto'>
        <input 
          type="text" 
          ref={inputRef} 
          className='border' 
          value={title} 
          onInput={() => setTitle(inputRef.current.value)} 
        />
        <textarea 
          cols="30" 
          className='border'
          ref={textRef}
          onInput={() => setText(textRef.current.value)}
          value={text} 
          rows="10">
        </textarea>
        <button onClick={saveTodo} className='p-4 border bg-slate-500 bg-slate-400 w-24 m-auto'>save</button>
      </div>
    </Fragment>
  )
}