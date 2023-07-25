import { useState, useEffect } from 'react';
import logo from '../assets/logo.png'
import { io } from 'socket.io-client'
import Card from './Card';
import { GrAdd } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState();
  const [socket, setSocket] = useState();

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);
    return () => {
      s.disconnect();
    }
  }, []);
  useEffect(() => {
    if (socket == null) return;
    socket.emit("load-documents");
    socket.on("receive-documents", allDocuments => {
      setDocuments(allDocuments);
    })
  }, [socket, documents]);

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-new-documents", newDocumentId => {
      navigate(`documents/${newDocumentId}`)
    })
  }, [socket, navigate]);

  const createNewDocument = () => {
    let newDocumentTitle = window.prompt("Enter Title of the new document");
    socket.emit("create-new-document", newDocumentTitle);
  }

  return (
    <>
      <div className='navbar'>
        <div className="left">
          <Link to="/">
            <img src={logo} height="40px" alt="" />
          </Link>
          <h2>Docify</h2>
        </div>
        <div className="right">
        </div>
      </div>
      <div className="home">
        <div className="header">
          <span>Recent Documents</span>
          <p className='btn add-btn' onClick={createNewDocument}><GrAdd size={16} /> New Document</p>
        </div>
        <div className='card-container'>
          {documents?.length === 0 ? (
            <p className='grayText'>No documents found.</p>
          ) : (
            documents?.map((doc) => (
              <Card key={doc._id} doc={doc} />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Home
