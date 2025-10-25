import React, { useEffect, useState, useMemo } from "react";
import './styles.css';
import registe_img from '../../assets/register.png';
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2, FiUserX, FiXCircle } from "react-icons/fi";
import { getAlunos, deleteAluno } from "../../services/requests";

export default function Alunos() {
    const history = useNavigate();

    const [searchInput, setSearchInput] = useState('');

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

    async function editAluno(id) {
        try {
            history(`/alunos/novo/${id}`);
        } catch (err) {
            console.error(`Erro ao editar aluno ${id}:`, err);
        }
    }

    const search = (searchValue) => {
        setSearchInput(searchValue);
    }

    const filteredAlunos = useMemo(() => {
        const term = String(searchInput || '').trim().toLowerCase();
        if (term.length <= 1) return alunos;

        return alunos.filter((aluno) => {
            const haystack = [aluno.nome, aluno.email, aluno.curso]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return haystack.includes(term);
        });
    }, [alunos, searchInput]);

    async function deleteRegister(id) {
        try {
            if (window.confirm("Tem certeza que deseja deletar este aluno?")) {
                const authorization = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                await deleteAluno(id, authorization);
                setAlunos(alunos.filter(aluno => aluno.id !== id));
            }
        } catch (err) {
            console.error(`Erro ao deletar aluno ${id}:`, err);
        }
    }
    return (
        <div className="aluno-container">
            <header>
                <img src={registe_img} id="register_img" />
                <span>Bem vindo, {email}</span>

                <Link className="button" to="/alunos/novo/0">NOVO</Link>

                <button type="button" className="logout-btn" onClick={logout}>
                    <FiXCircle size={60} color="#a8a8b3" />
                </button>
            </header>

            <form>
                <input
                    type="text"
                    placeholder="Pesquisar Aluno"
                    value={searchInput}
                    onChange={(e) => search(e.target.value)} />
            </form>

            <h1>Alunos Matriculados</h1>

            <ul>
                {filteredAlunos.map(aluno => (
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
                            <button
                                type="button"
                                aria-label={`Editar ${aluno.nome}`}
                                className="edit-btn"
                                onClick={() => editAluno(aluno.id)}>
                                <FiEdit2 size={28} color="#a8a8b3" />
                            </button>

                            <button
                                type="button"
                                aria-label={`Remover ${aluno.nome}`}
                                className="delete-btn"
                                onClick={() => deleteRegister(aluno.id)}>
                                <FiUserX size={28} color="#a8a8b3" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}