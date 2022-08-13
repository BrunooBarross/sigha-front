import { useState } from "react";
import dayjs from 'dayjs';
import styled from 'styled-components';
import axios from 'axios';

import ModalAlert from '../Modal-Alert/ModalAlert';
import ModalEdit from "./Edit";

const Document = ({ id, title, type, issueDate, hours, documentUrl, token, render, setRender }) =>{
    const [alert, setAlert] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState("../assets/images/joinha.png");
    const [alertColor, setAlertColor] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);

    function deleteDocument(id, title){
        let dialog = window.confirm("Deletar o arquivo: " + title+ "?");
        if(dialog){
            const config = {headers: { Authorization: `Bearer ${token}`, id}}
            const requestDelete = axios.delete(`http://127.0.0.1:5000/documents`,config);
            requestDelete.then(response => {
                setImageSrc("../assets/images/joinha.png");
                setAlertColor(true)
                setAlert("Deletado com sucesso!")
                setIsOpen(true);
                setTimeout(()=>{
                    setIsOpen(false);
                    setRender(!render);
                },2400)
            });
            requestDelete.catch(error => { 
                console.log(error);
            });
        }
        return "";        
    }

    return(
        <>
            <ModalEdit 
                modalEditOpen={modalEditOpen} 
                setModalEditOpen={setModalEditOpen}
                id={id}
                title={title}
                type={type}
                issueDate={issueDate}
                hours={hours}
                token={token}
                render={render}
                setRender={setRender}
            >
            </ModalEdit>
            <ModalAlert alert={alert} modalIsOpen={modalIsOpen} imageSrc={imageSrc} alertColor={alertColor}></ModalAlert>
            <Tr>
                <td>{dayjs(issueDate).locale('pt-BR').format('DD-MM-YY')}</td>
                <td>{title}</td>
                <td>{type}</td>
                <td>{hours}h</td>
                <td><a href={documentUrl} target="_blank" rel="noreferrer"><ion-icon name="download"></ion-icon></a></td>
                <TdButton>
                    <button className='edit' onClick={() => {setModalEditOpen(!modalEditOpen)}}>
                        <ion-icon name="create-outline"></ion-icon>
                        <span>Edit</span>
                    </button>
                    <button className='delete' onClick={()=> deleteDocument(id, title)}>
                        <ion-icon name="trash-outline"></ion-icon>
                        <span>Delete</span>
                    </button>
                </TdButton>
            </Tr>
        </>
    );
};

export default Document;

const Tr = styled.tr`
    a{
        text-decoration: none;
    }
    ion-icon{
        margin-left: 20px;
        font-size: 18px;
        color: black;
    }
    
`     

const TdButton = styled.td`
    display: flex;
    justify-content: space-evenly;

    button{
        border-radius: 4px;
        width: 69px; 
        color: #fff;
        border: 2px solid #a55eea; 
        cursor: pointer;
    }
   
    ion-icon{
        margin-left: 0px;
        font-size: 13px;
        color: #fff;
    }

    .edit{
        background-color: #007BFF;
    }

    .delete{
        background-color: #DC3545;
    }

    @media (max-width: 570px) {	  
        flex-direction: column;
        button{
            font-size: 12px;
            width: 50px; 
            margin-top: 2px;
        }
    }

    @media (max-width: 529px) {	  
        span{
            display: none;
        }
        button{
            width: 40px; 
        }
    }
`