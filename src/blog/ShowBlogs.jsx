// import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API = 'http://localhost:8000/blogs/'

const ShowBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        getBlogs();
    }, []);

    const getBlogs = async () => {
        let config = {
            method: 'GET',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            cache: 'default'
        }
        let res = await fetch(API, config);
        let resJson = await res.json();

        setBlogs(resJson);
    }

    const deleteBlog = async (id) => {
        let config = {
            method: 'DELETE',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            cache: 'default'
        }
        await fetch(`${API}${id}`, config);
        getBlogs();
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Link to='/create' className='btn btn-primary mt-2-mb-2'>Crear <i className="fa-solid fa-circle-plus"></i> </Link>
                    {/* Tabla con estilo bootstrap */}
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog.id}>
                                    <td> {blog.title} </td>
                                    <td> {blog.content} </td>
                                    <td>
                                        <Link to={`/edit/${blog.id}`} className='btn btn-info'>Editar <i className="fa-solid fa-pen-to-square"></i> </Link>
                                        <button onClick={() => deleteBlog(blog.id)} className='btn btn-danger'>Delete <i className="fa-solid fa-trash-can"></i> </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ShowBlogs;