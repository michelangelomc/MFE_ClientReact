import React, { useEffect, useState } from "react";
import './styles.css';
import registe_img from '../../assets/register.png';
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2, FiUserX, FiXCircle } from "react-icons/fi";
import { getAlunos } from "../../services/requests";

export default function Alunos() {
    const history = useNavigate();
    const [nome, setNome] = useState('');
    const [alunos, setAlunos] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    useEffect(() => {
        let mounted = true;

        const authorization = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        async function fetchAlunos() {
            try {
                const data = await getAlunos(authorization);
                if (mounted) setAlunos(data);
            } catch (err) {
                console.error('Erro carregando alunos:', err);
            }
        }

        fetchAlunos();

        return () => { mounted = false; };
    }, [token]);

    function logout() {
        try {
            localStorage.clear();
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            history("/");
        } catch (err) {
            console.error('Erro durante logout:', err);
        }
    }

    return (
        <div className="aluno-container">
            <header>
                <img src={registe_img} id="register_img" />
                <span>Bem vindo....{email}</span>

                <Link className="button" to="/alunos/novo/0">NOVO</Link>

                <button type="button" onClick={logout}>
                    <FiXCircle size={32} color="#a8a8b3" />
                </button>
            </header>
            <form>
                <input placeholder="Pesquisar" />
                <button type="button" className="button">BUSCAR</button>
            </form>
            <h1>Alunos Matriculados</h1>
            <ul>
                {alunos.map(
                    aluno => (
                        <li key={aluno.id}>
                            <div className="aluno-field">
                                <span className="label">Nome:</span>
                                <span className="value">{aluno.nome}</span>
                            </div>
                            <div className="aluno-field">
                                <span className="label">Email:</span>
                                <span className="value">{aluno.email}</span>
                            </div>
                            <div className="aluno-field">
                                <span className="label">Curso:</span>
                                <span className="value">{aluno.curso}</span>
                            </div>

                            <div className="actions">
                                <button type="button" aria-label={`Editar ${aluno.nome}`} className="edit-btn">
                                    <FiEdit2 size={28} color="#a8a8b3" />
                                </button>

                                <button type="button" aria-label={`Remover ${aluno.nome}`} className="delete-btn">
                                    <FiUserX size={28} color="#a8a8b3" />
                                </button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div >
    );
}