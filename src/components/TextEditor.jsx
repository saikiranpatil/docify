import { useCallback, useEffect, useState, useRef } from 'react';
import logo from '../assets/logo.png';
import { ImEarth } from "react-icons/im";
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import { io } from 'socket.io-client';
import { useParams, Link, useNavigate } from "react-router-dom";
import { getFormattedDateTime } from './utils';

const toolbarOptions = [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'font': [] }],
  ['bold', 'italic', 'underline', 'strike', { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  ['code-block', 'image', 'blockquote'],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'direction': 'rtl' }],                         // text direction
  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'align': [] }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  ['clean']                                         // remove formatting button
];

const TextEditor = () => {
  const navigate = useNavigate();
  const { id: documentId } = useParams();

  const [title, setTitle] = useState("");
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);
    return () => {
      s.disconnect();
    }
  }, [])

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    }

    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler);
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
      socket.emit("save-document", quill.getContents());
    }

    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler);
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once("load-document", document => {
      if (document == null) navigate("/error");
      setTitle(document.title);
      modifiedRef.current.innerHTML = "Last Modified: " + getFormattedDateTime(document.modifiedAt);
      quill.setContents(document.data);
      quill.enable()
    })
    socket.emit("get-document", documentId);
  }, [socket, quill, documentId, navigate])

  const handleShare = () => {
    let copyLink = "http://localhost:5173/documents/" + documentId;
    navigator.clipboard.writeText(copyLink);
    window.alert("Document Link Copied")
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    socket.emit("change-title", e.target.value);
  }

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, { theme: "snow", modules: { toolbar: toolbarOptions } })
    setQuill(q);
    q.disable();
    q.setText("Loading............. Please Wait");
  }, []);

  const modifiedRef = useRef();

  return (
    <>
      <div className='navbar'>
        <div className="left">
          <Link to="/">
            <img src={logo} height="40px" alt="" />
          </Link>
          <div className="left-text">
            <input id='title' type="text" placeholder='Untitled document' value={title} onChange={handleTitleChange} />
            <p ref={modifiedRef} className='modify-text'>
            </p>
          </div>
        </div>
        <div className="right">
          <button className='btn navbar-share-btn' onClick={handleShare}>
            <ImEarth size={18} color='#001d35' />
            <span>
              Share
            </span>
          </button>
        </div>
      </div>
      <div className='main-container' ref={wrapperRef} />
    </>
  )
}

export default TextEditor
