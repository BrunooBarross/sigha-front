import { useState } from "react";
import dayjs from 'dayjs';
import axios from 'axios';

import ModalAlert from '../Modal-Alert/ModalAlert';
import ModalEdit from "./Edit";

import {
    Tr,
    TdButton
} from "./styledDocument"

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
            const requestDelete = axios.delete(`${process.env.REACT_APP_API_BASE_URL}/documents`,config);
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