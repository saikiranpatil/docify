import { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export const DocumentsContext = createContext();

const DocumentsContextProvider = (props) => {
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

  const deleteDocument = (documentId) => {
    if (window.confirm("Do you wish to delete this document")) {
      socket.emit('delete-document', documentId);

      const updatedDocuments = documents.filter((doc) => doc._id !== documentId);
      setDocuments(updatedDocuments);
    }
  };

  return (
    <DocumentsContext.Provider value={{ documents, createNewDocument, deleteDocument }}>
      {props.children}
    </DocumentsContext.Provider>
  );
};

export default DocumentsContextProvider;