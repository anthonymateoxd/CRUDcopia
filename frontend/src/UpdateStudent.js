import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function UpdateStudent() {

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.put('http://localhost:8081/update/' + id, {name, email })
        .then(res => {
            console.log(res);
                navigate('/');
        }).catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
                <div className="w-50 bg-white rounded p-3">
                    <form onSubmit={handleSubmit}>
                        <h2>UpdateS tudent</h2>
                        <div className="mb-2">
                            <label>Name</label>
                            <input type="text" placeholder="Ingrese su Nombre" className="form-control"
                            onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="text" placeholder="Escriba su Correo" className="form-control"
                            onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-success">Update</button>
                    </form>
                </div>
        </div>
    )
}

export default UpdateStudent;