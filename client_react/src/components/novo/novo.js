import React from "react";
import './styles.css';
import { FiCornerDownLeft, FiUserPlus } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

export default function Novo() {
    const alunoId = useParams().id;
    
    console.log("aluno id ==> ", alunoId);

    return (
        <div className="novo-aluno-container">
            <section>
                <FiUserPlus size={25} color="#000" />
                <h1>{alunoId === "0" ? "Novo" : "Editar"}</h1>
                <Link to="/alunos" className="back-link">
                    <FiCornerDownLeft size={16} color="#000" /> VOLTAR
                </Link>
            </section>
            <form>
                <input placeholder="nome" />
                <input placeholder="email" />
                <input placeholder="curso" />
                <input placeholder="idade" />
                <button type="button" className="button">SALVAR</button>
            </form>
        </div>
    );
}   