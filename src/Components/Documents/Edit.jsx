import Modal from 'react-modal';
import { useState } from "react";
import styled from 'styled-components';
import dayjs from 'dayjs';
import axios from 'axios';

const ModalEdit = ({ modalEditOpen, setModalEditOpen, id, title, type, issueDate, hours, token, setRender, render }) => {
    const [load, setLoad] = useState(false);
    const [documentData, setDocumentData] = useState({ title: title, type: type, issueDate: issueDate, hours: hours});
    const [certificate, setCertificate] = useState(undefined);
    const datePicker = new Date().toISOString().split("T")[0];
   
    const customStyles = {
        content: {
            height: '82%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function updateDocument(event) {
        event.preventDefault();
        setLoad(true);
        
        if(certificate.size > 2097152){
            setLoad(false);
            window.alert("Olha o tamanho dessse arquivo ai fera! quer me falir? Mais de 2mb... Dá não");
            return "";
        }; 

        const formData = new FormData();

        if( certificate === undefined && 
            documentData.title === title &&
            documentData.type === type &&
            documentData.issueDate === issueDate &&
            documentData.hours === hours
        ){
            return setModalEditOpen(false);
        }

        if(certificate !== undefined){
            formData.append('file', certificate);
        }
        formData.append('title', documentData.title);
        formData.append('type', documentData.type);
        formData.append('issueDate', dayjs(documentData.issueDate).locale('pt-BR').format('YYYY-MM-DD'));
        formData.append('hours', documentData.hours);

        const requisicaoPost = axios.put("https://sigha-api.herokuapp.com/documents",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                    id
                },
            }); requisicaoPost.then(response => {
                setRender(!render);
                setLoad(false);
                setModalEditOpen(false);
            }); requisicaoPost.catch(error => {
                setLoad(false);
            });
    }

    return (
        <Modal
            isOpen={ modalEditOpen }
            style={customStyles}
            ariaHideApp={false}
        >
             <Section>
                <Title>
                    <h1>+ Alterar Certificado</h1>
                    <span><hr /></span>
                </Title>
                <Form encType='multipart/form-data' load={load} onSubmit={updateDocument}>
                    <Label>Nome do Certificado:</Label>
                    <input type="text" value={documentData.title} placeholder="Ex: Palestra jogos digitais" minLength={5} maxLength={55} 
                        onChange={e => setDocumentData({ ...documentData, title: e.target.value })} 
                        disabled={load ? true : false} required />
                    <Label>Selecione o tipo:</Label>
                    <RadioDiv>
                            <input type="radio" name="fav_language" value={"Online"} onChange={e => setDocumentData({ ...documentData, type: e.target.value })} 
                                disabled={load ? true : false} checked={documentData.type === "Online" ? true : false} required />
                            <label>Online</label>
                            <input type="radio" name="fav_language" value={"Presencial"} onChange={e => setDocumentData({ ...documentData, type: e.target.value })} 
                                disabled={load ? true : false} checked={documentData.type === "Presencial" ? true : false} required />
                            <label>Presencial</label>
                    </RadioDiv>
                    <Label>Data de emissão</Label>
                    <input type="date" max={datePicker} value={dayjs(documentData.issueDate).locale('pt-BR').format('YYYY-MM-DD')}
                        onChange={e => setDocumentData({ ...documentData, issueDate: e.target.value })} 
                        disabled={load ? true : false} required />
                    <Label>Carga horária</Label>
                    <input type="number" value={documentData.hours} min="0" step="1"
                        onChange={e => setDocumentData({ ...documentData, hours: e.target.value })} 
                        disabled={load ? true : false} required />
                    <Label title='Deixe vazio para permanecer o mesmo arquivo'>Anexar certificado</Label>
                    <input title='Deixe vazio para permanecer o mesmo arquivo' className='file' name="file" type="file" accept="image/jpeg,image/gif,image/png,application/pdf" 
                        onChange={e => setCertificate(e.target.files[0])} disabled={load ? true : false} />
                    <BntDiv>
                        <button type="submit" className="btn-submit">Salvar</button>
                        <button type="button" className="btn-close" onClick={() => { setModalEditOpen(!modalEditOpen) }}>Fechar</button>
                    </BntDiv>
                </Form>
            </Section>
        </Modal>
    );
}

export default ModalEdit;

const Title = styled.div`
    width: 100%;
`
const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;

    h1{
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 14px;
    }

    input{
        height: 35px;
        margin-top: 10px;
        font-size: 15px;
    }

    @media (max-width: 800px) {	  
        width: 100%;
    }

    @media (max-width: 529px) {	    
        input{
            width: 89%;
            height: 30px;
        }
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 500px;

    @media (max-width: 529px) {	  
        align-items: center;  
        width: 100%; 
    }
`

const Label = styled.label`
    margin-top: 18px;
    font-size: 15px;
    cursor: pointer;

    @media (max-width: 529px) {	    
        width: 89%;
    }
`

const RadioDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;

    label{
        margin-right: 10px;
        font-size: 14px;
        text-align: center;
    }

    input{
        cursor: pointer;
        margin-top: 0;
        width: 15px;
    }

    @media (max-width: 529px) {	     
        width: 89%;
    }
`

const BntDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    button{
        width: 220px;
        height: 55px;
        margin-top: 30px;
        border-radius: 10px;
        cursor: pointer;
        color: #fff;
        font-size: 18px;
        border: solid #a55eea 2px;
    }

    .btn-submit{
        margin-right: 10px;
        background-color: #28A745;
    }

    .btn-close{
        background-color: #DC3545;
    }

    @media (max-width: 529px) {	  
        button{
            width: 40%;
            height: 40px;
            font-size: 14px;
        }  
    }
`
