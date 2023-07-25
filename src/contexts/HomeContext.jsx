import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export const HomeContext = createContext();

const HomeContextProvider = (props) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        socket.emit('load-documents');

        socket.on('receive-documents', (allDocuments) => {
            setDocuments(allDocuments);
        });
    }, []);

    const createNewDocument = (title) => {
        socket.emit('create-new-document', title);
    };

    return (
        <HomeContext.Provider value={{ documents, createNewDocument }}>
            {props.children}
        </HomeContext.Provider>
    );
};

export default HomeContextProvider;
