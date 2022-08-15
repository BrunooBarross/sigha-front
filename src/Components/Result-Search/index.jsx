import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';

import Header from "../Header";
import Columns from "../Documents/Columns"
import Document from '../Documents/Document';
import Pagination from "../Documents/Pagination";

import {
    Container,
    Aviso,
    Title,
    Section
} from "./styled"

const ResultSearch = () => {
    const { title } = useParams();
    const { token } = JSON.parse(localStorage.getItem('userData'));
    const [documents, setDocuments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    
    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${token}`}}
        const requisicaoGet = axios.get(`https://sigha-api.herokuapp.com/documents/search?title=${title}`,config);
        requisicaoGet.then(response => {
           const {data} = response;
           setDocuments(data);
        });
        requisicaoGet.catch(error => { 
            console.log(error);
        });
    }, [token, title]);

    const itensPerPage = 10;
    const pages = Math.ceil(documents.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = documents.slice(startIndex, endIndex);

    return (
        <Container>
            <Header></Header>
            <Section>
                <Title>
                    <div>
                        <h1><ion-icon name="search"></ion-icon> Resultado da busca</h1>
                    </div>
                    <span><hr /></span>
                </Title>
                {
                    documents.length === 0 ? 
                    <Aviso>
                        <h2>Não encontramos nenhum certificado com o nome "{title}"</h2>
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
                                        awsFileKey={item.awsFileKey}
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
}

export default ResultSearch;