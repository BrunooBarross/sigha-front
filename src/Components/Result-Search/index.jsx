import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';

import Header from "../Header";
import Columns from "../Documents/Columns"
import Document from '../Documents/Document';
import Pagination from "../Documents/Pagination";

const ResultSearch = () => {
    const { title } = useParams();
    const { token } = JSON.parse(localStorage.getItem('userData'));
    const [documents, setDocuments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    
    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${token}`}}
        const requisicaoGet = axios.get(`http://127.0.0.1:5000/documents/search?title=${title}`,config);
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

export default ResultSearch

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #fff;
`

const Aviso = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin-top: 50px;
    text-align: center;

    h2{
        font-size: 20px;
    }

    h3{
        font-size: 16px;
        margin-top: 10px;
    }
`

const Title = styled.div`
    width: 100%;
    margin-top: 50px;

    h1{
        font-size: 20px;
    }

    .add-circle{
        margin-right: 20px;
    }

    .add-circle ion-icon{
        color: red;
        font-size: 30px;
        cursor: pointer;
    }

    hr{
        margin-top: 18px;
    }
`

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    height: 100vh;

    table {
        text-align: center;
        margin-top: 20px;
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    .bold{
        font-size: 14px;
        font-weight: bold;
    }

    td, th {
        font-size: 13px;
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }

    @media (max-width: 800px) {	  
        width: 90%;
    }

    @media (max-width: 529px) {	    
        input{
            width: 85%;
        }
        table {
            width: 89%;
        }
    }

    @media (max-width: 408px) {	    
        .bold{
            font-size: 11px;
        }

        td, th {
            font-size: 10px;
            padding: 5px;
        }
    }

    @media (max-width: 320px) {	    
        .bold{
            font-size: 10px;
        }

        td, th {
            font-size: 9px;
            padding: 4px;
        }
    }
`