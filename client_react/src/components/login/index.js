import React, { useState } from "react";
import './styles.css';
import login_img from '../../assets/login.png';
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../services/requests";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();

    async function authenticate(event) {
        console.log(event);
        event.preventDefault();

        const data = { email, password };

        try {
            const response = await login(data);
            localStorage.setItem("email", email);
            localStorage.setItem("token", response.token);
            localStorage.setItem("expiration", response.expiration);
        } catch (error) {
            alert("Login failed. Please check your credentials and try again.");
            return;
        }

        history("/alunos");
    }

    return (
        <div className="login-container">

            <section className="form">
                <img src={login_img} id="login_img" />
                <h1>Login</h1>
                <form onSubmit={authenticate}>
                    <div>
                        <input
                            placeholder="email"
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="password"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </section>
        </div>
    );
}