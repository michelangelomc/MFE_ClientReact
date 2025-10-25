import React, { use, useEffect } from "react";
import './styles.css';
import { FiCornerDownLeft, FiUserPlus } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAlunoById, createAluno, updateAluno } from "../../services/requests";

export default function Novo() {
    const alunoId = useParams().id;

    console.log("aluno id ==> ", alunoId);

    const [id, setId] = React.useState(alunoId);
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [curso, setCurso] = React.useState('');
    const [idade, setIdade] = React.useState(0);

    const history = useNavigate();
    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    async function handlerAluno() {
        try {

            if (alunoId !== '0') {
                const aluno = await getAlunoById(alunoId, authorization);
                console.log("aluno encontrado: ", aluno);
                setId(aluno.id);
                setNome(aluno.nome);
                setEmail(aluno.email);
                setCurso(aluno.curso);
                setIdade(aluno.idade);
            }
        } catch (error) {
            console.error(`Erro ao recuperar aluno: ${id}`, error);
            history("/");
        }
    };

    useEffect(() => {
        if (alunoId === 0) {
            console.log("Aluno novo ID:", alunoId);
            return;
        }
        console.log("Novo aluno, vai chamar o handlerAluno.");
        handlerAluno();
    }, [alunoId]);

    async function saveAluno(event) {
        console.log("Salvar aluno chamado.", event);
        console.log("Aluno ID:", alunoId);
        event.preventDefault();
        const aluno = {
            id,
            nome,
            email,
            idade
        };

        try {
            if (alunoId === '0') {
                await createAluno(aluno, authorization);
            } else {
                await updateAluno(alunoId, aluno, authorization);
            }
        } catch (error) {
            console.error("Erro ao salvar aluno:", error);
        }

        history("/alunos");
    }

    return (
        <div className="novo-aluno-container">
            <section className="form">
                <div className="section-header">
                    <div className="icon-title">
                        <FiUserPlus size={25} color="#000" />
                        <h1>{alunoId === "0" ? "Novo Aluno" : "Editar Aluno"}</h1>
                    </div>
                    <Link to="/alunos" className="back-link">
                        <FiCornerDownLeft size={16} color="#000" />
                        VOLTAR
                    </Link>
                </div>
            </section>
            <form onSubmit={saveAluno}>
                <input placeholder="nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <input placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input placeholder="curso"
                    value={curso}
                    onChange={e => setCurso(e.target.value)}
                />
                <input placeholder="idade"
                    value={idade}
                    onChange={e => setIdade(e.target.value)}
                />
                <button type="submit" className="button">SALVAR</button>
            </form>
        </div>
    );
}   