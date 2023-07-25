import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <>
            <div className='error'>
                <h1>
                    Page Not Found
                </h1>
                <Link to="/">
                    <button className='btn'>Visit Home Page</button>
                </Link>
            </div>
        </>
    )
}

export default NotFound
