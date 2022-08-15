import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from "../Header";
import { useState } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import ModalAlert from '../Modal-Alert/ModalAlert';

const Insert = () => {
    const { token } = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();
    const datePicker = new Date().toISOString().split("T")[0];

    const [load, setLoad] = useState(false);
    const [documentData, setDocumentData] = useState({ title: "", type: "", issueDate: "", hours: 0});
    const [certificate, setCertificate] = useState("");
    const [alert, setAlert] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState("../assets/images/error.png");
    const [alertColor, setAlertColor] = useState(false);
    function registerUser(event) {
        event.preventDefault();
        setLoad(true);
        if(certificate.size > 2097152){
            setLoad(false);
            window.alert("Olha o tamanho dessse arquivo ai fera! quer me falir? Mais de 2mb... Dá não");
            return "";
        };   
        const formData = new FormData();
        formData.append('file', certificate);
        formData.append('title', documentData.title);
        formData.append('type', documentData.type);
        formData.append('issueDate', dayjs(documentData.issueDate).locale('pt-BR').format('YYYY-MM-DD'));
        formData.append('hours', documentData.hours);

        const requisicaoPost = axios.post("https://sigha-api.herokuapp.com/documents",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            }); requisicaoPost.then(response => {
                setLoad(false);
                setAlertColor(true);
                setImageSrc("../assets/images/accept.png");
                setAlert('Cadastro Realizado!');
                setIsOpen(true);
                setTimeout(() =>{
                    setIsOpen(false);
                    navigate('/documents')
                },2000); 
            }); requisicaoPost.catch(error => {
                setLoad(false);
            });
    }

    return (
        <Container>
            <Header></Header>
            <ModalAlert alert={alert} modalIsOpen={modalIsOpen} imageSrc={imageSrc} alertColor={alertColor}></ModalAlert>
            <Section>
                <Title>
                    <h1>+ Inserir Certificado</h1>
                    <span><hr /></span>
                </Title>
                <Form encType='multipart/form-data' load={load} onSubmit={registerUser}>
                    <Label>Nome do Certificado:</Label>
                    <input type="text" placeholder="Ex: Palestra jogos digitais" minLength={5} maxLength={55} 
                        onChange={e => setDocumentData({ ...documentData, title: e.target.value })} 
                        disabled={load ? true : false} required />
                    <Label>Selecione o tipo:</Label>
                    <RadioDiv>
                            <input type="radio" name="fav_language" value={"Online"} onChange={e => setDocumentData({ ...documentData, type: e.target.value })} 
                                disabled={load ? true : false} required />
                            <label>Online</label>
                            <input type="radio" name="fav_language" value={"Presencial"} onChange={e => setDocumentData({ ...documentData, type: e.target.value })} 
                                disabled={load ? true : false} required />
                            <label>Presencial</label>
                    </RadioDiv>
                    <Label>Data de emissão</Label>
                    <input type="date" max={datePicker} 
                        onChange={e => setDocumentData({ ...documentData, issueDate: e.target.value })} 
                        disabled={load ? true : false} required />
                    <Label>Carga horária</Label>
                    <input type="number" min={0} step="1" max={50}
                        onChange={e => setDocumentData({ ...documentData, hours: e.target.value })} 
                        disabled={load ? true : false} required />
                    <Label>Anexar certificado</Label>
                    <input className='file' name="file" type="file" accept="image/jpeg,image/gif,image/png,application/pdf" 
                        onChange={e => setCertificate(e.target.files[0])} disabled={load ? true : false} required />
                    <BntDiv>
                        <button type="submit" className="btn-submit">Salvar</button>
                        <button type="button" className="btn-close" onClick={() => { navigate(-1) }}>Fechar</button>
                    </BntDiv>
                </Form>
            </Section>
        </Container>
    );
}

export default Insert;

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
`
const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    height: 100vh;

    h1{
        font-size: 20px;
        margin-top: 50px;
        margin-bottom: 14px;
    }

    input{
        height: 40px;
        margin-top: 10px;
        font-size: 15px;
    }

    @media (max-width: 800px) {	  
        width: 100%;
    }

    @media (max-width: 529px) {	    
        input{
            width: 89%;
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
    margin-top: 20px;
    font-size: 15px;

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
        width: 250px;
        height: 70px;
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