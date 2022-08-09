import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return(
        <div className="Home-container">
            <div>

            <Link to={`/login`} className='btn btn-primary'> Login </Link>
            </div>
            <div>

            <Link to={`/events`} className='btn btn-primary'> View Calendar </Link>
            </div>
            {/* <button onClick={() => deleteBlog(blog.id)} className='btn btn-danger'>Delete <i className="fa-solid fa-trash-can"></i> </button> */}
            
        </div>
    )
}

export default Home;