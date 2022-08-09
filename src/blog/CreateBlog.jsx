import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = 'http://localhost:8000/blogs/'

const CreateBlog = () => {
    const [title, setTitle] = useState([]);
    const [content, setContent] = useState([]);
    const navigate = useNavigate();

    const store = async (e) => {
        e.preventDefault();
        let data = {
            title: title,
            content: content,
        };
        let body = JSON.stringify(data);
        let config = {
            method: 'POST',
            headers: {
              Accept: 'application.json',
              'Content-Type': 'application/json'
            },
            body: body,
            cache: 'default'
        }
        await fetch(API, config);
        navigate('/');
    }

    return (
        <div>
            <h3>Crear Blog</h3>
            <form onSubmit={ store }>
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

export default CreateBlog;