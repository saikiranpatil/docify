import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineFolderRemove } from 'react-icons/hi';
import { getFormattedDateTime } from './utils';
import { DocumentsContext } from '../contexts/DocumentsContext';
import logo from "../assets/logo.png";

const Card = ({ doc }) => {
    const { deleteDocument } = useContext(DocumentsContext);

    const handleDeleteDocument = () => {
        deleteDocument(doc._id);
    };

    return (
        <Link className='card' to={`./documents/${doc._id}`}>
            <div className='img'></div>
            <div className='text'>
                <div className='title'>{doc && doc.title !== '' ? doc.title : 'Untitled document'}</div>
                <div className='time'>
                    <img src={logo} alt='logo' height={20} />
                    <p>{getFormattedDateTime(doc.modifiedAt)}</p>
                </div>
                <Link className='more-icon' onClick={handleDeleteDocument} to={"#"}>
                    <HiOutlineFolderRemove size={18} />
                </Link>
            </div>
        </Link>
    );
};

export default Card;