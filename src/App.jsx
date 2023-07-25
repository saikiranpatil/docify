import './App.css';
import TextEditor from './components/TextEditor';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentsContextProvider from './contexts/DocumentsContext';

function App() {
  return (
    <Router>
      <DocumentsContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documents/:id" element={<TextEditor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DocumentsContextProvider>
    </Router>
  );
}

export default App;