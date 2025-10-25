import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/login";
import Alunos from "./components/alunos/alunos";
import Novo from "./components/novo/novo";

export default function AppRouter() {
    return (
       <BrowserRouter>
           <Routes>
               <Route exact path="/"  Component={Login} />
               <Route path="/alunos" Component={Alunos} />
               <Route path="/alunos/novo/:id" Component={Novo} />
           </Routes>
       </BrowserRouter>
    );
}