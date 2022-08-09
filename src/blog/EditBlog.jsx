import {  useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = `http://localhost:8000/blogs/`

const EditBlog = () => {
    const [title, setTitle] = useState([]);
    const [content, setContent] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getBlogById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getBlogById = async () => {
        let config = {
            method: 'GET',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            cache: 'default'
        }
        let res = await fetch(`${API}${id}`, config);
        let resJson = await res.json();
        
        setTitle(resJson.title);
        setContent(resJson.content);
    }

    const update = async (e) => {
        e.preventDefault();
        let data = {
            title: title,
            content: content,
        };
        let body = JSON.stringify(data);
        let config = {
            method: 'PUT',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: body,
            cache: 'default'
        }
        let res = await fetch(`${API}${id}`, config);
        let resJson = await res.json();

        console.log(resJson);
        if (false == true)
            navigate('/');
    }

    return (
        <div>
            <h1>Vista Editar</h1>
            <form onSubmit={ update }>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input  value={ title }
                            onChange= { (e) => setTitle(e.target.value) }
                            type="text"
                            className="form-control"
                    />
                </div>

                <div>
                    <label className="form-label">Content</label>
                    <textarea   value={ content }
                                onChange= { (e) => setContent(e.target.value) }
                                type="text"
                                className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Store</button>
            </form>
        </div>
    );
}

export default EditBlog;