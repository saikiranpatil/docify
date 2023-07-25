import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Quill from 'quill';

const socket = io('http://localhost:3001');

export const TextEditorContext = createContext();

const TextEditorContextProvider = (props) => {
  const [title, setTitle] = useState('');
  const [quill, setQuill] = useState();

  useEffect(() => {
    const s = io('http://localhost:3001');
    socket.on('receive-changes', (delta) => {
      quill.updateContents(delta);
    });

    return () => {
      s.disconnect();
    };
  }, [quill]);

  return (
    <TextEditorContext.Provider value={{ title, setTitle, quill, setQuill }}>
      {props.children}
    </TextEditorContext.Provider>
  );
};

export default TextEditorContextProvider;
