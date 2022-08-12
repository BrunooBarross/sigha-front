import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Header from "../Header";
import Columns from "./Columns";
import Document from "./Document";
import Pagination from "./Pagination";

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
        const requisicaoGet = axios.get(`http://127.0.0.1:5000/documents`,config);
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #fff;
`

const Title = styled.div`
    width: 100%;
    margin-top: 50px;

    div{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

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