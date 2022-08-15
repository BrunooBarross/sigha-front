import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from "../Header";
import Columns from "./Columns";
import Document from "./Document";
import Pagination from "./Pagination";

import {
    Container,
    Section,
    Title,
    Aviso
} from "./styled"

const Documents = () => {
    const navigate = useNavigate();
    const { token } = JSON.parse(localStorage.getItem('userData'));
    const [documents, setDocuments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [render, setRender] = useState(false);

    const itensPerPage = 10;
    const pages = Math.ceil(documents.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = documents.slice(startIndex, endIndex);

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${token}`}}
        const requisicaoGet = axios.get(`https://sigha-api.herokuapp.com/documents`,config);
        requisicaoGet.then(response => {
           const {data} = response;
           setDocuments(data);
        });
        requisicaoGet.catch(error => { 
            console.log(error);
        });
    }, [token, render]);

    return(
        <Container>
            <Header></Header>
            <Section>
                <Title>
                    <div>
                        <h1><ion-icon name="documents-outline"></ion-icon> Seus Documentos</h1>
                        <div className="add-circle" onClick={() => {navigate('/insert')}}>
                            <ion-icon className= "add-circle" name="add-circle"></ion-icon>
                        </div>
                    </div>
                    <span><hr /></span>
                </Title>
                {
                    documents.length === 0 ? 
                    <Aviso>
                        <h2>Você não possui nenhum documento</h2>
                        <h3>Clique <a href="/insert">aqui</a> e realize um cadastro</h3>
                    </Aviso>
                    :
                    <table>
                        <tbody>
                            <Columns></Columns>               
                            {
                                currentItens.map((item, key) =>
                                    <Document
                                        key={key}
                                        id={item.id}
                                        title={item.title}
                                        type={item.type}
                                        issueDate={item.issueDate}
                                        hours={item.hours}
                                        documentUrl={item.documentUrl}
                                        token={token}
                                        render={render}
                                        setRender={setRender}
                                    />
                                )
                            }
                        </tbody>
                    </table>
                }
                <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </Section>
        </Container>
    );
};

export default Documents;