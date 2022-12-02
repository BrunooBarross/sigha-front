import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

import ModalAlert from '../Modal-Alert/ModalAlert';
import Banner from '../Banner'

import {
    Container,
    RegisterContainer,
    Button,
    Div
} from "./styled"

const SignUp = () => {
    const navigate = useNavigate();
    const [register, setRegister] = useState({ userName: "", email: "", password: "" });
    const [image, setImage] = useState('');
    const [load, setLoad] = useState(false);
    const [alert, setAlert] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState("../assets/images/error.png");
    const [alertColor, setAlertColor] = useState(false);

    function registerUser(event) {
        event.preventDefault();
        setAlert(null);
        setLoad(true);

        if(image.size > 2097152){
            window.alert("Olha o tamanho dessse arquivo ai fera! quer me falir? Mais de 2mb... Dá não");
            setLoad(false);
            return "";
        }; 

        const formData = new FormData();
        formData.append('file', image);
        formData.append('userName', register.userName);
        formData.append('email', register.email);
        formData.append('password', register.password);
        const requisicaoPost = axios.post(`${process.env.REACT_APP_API_BASE_URL}/signup`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }); requisicaoPost.then(response => {
                setLoad(false);
                setAlertColor(true);
                setImageSrc("../assets/images/accept.png");
                setAlert('Cadastro Realizado!');
                setIsOpen(true);
                setTimeout(() =>{
                    setIsOpen(false);
                    navigate('/');
                    setAlertColor(false);
                },2400); 
            }); requisicaoPost.catch(error => {
                if (error.response.status === 409) {
                    setImageSrc("../assets/images/error.png")
                    setAlert('Email já cadastrado!');
                    setIsOpen(true);
                    setTimeout(() =>{
                        setIsOpen(false);
                    },2400);
                }
                if (error.response.status === 422) {
                    setAlert('Erro nos dados, tente novamente!');
                }
                setLoad(false);
            });
    }

    return (
        <Container>
            <ModalAlert alert={alert} modalIsOpen={modalIsOpen} imageSrc={imageSrc} alertColor={alertColor}></ModalAlert>
            <Banner></Banner>
            <RegisterContainer encType='multipart/form-data' load={load} onSubmit={registerUser}>
                <span>Cadastro de Usuário</span>
                <input type="name" name="name" minLength="4" placeholder='username'
                    onChange={e => setRegister({ ...register, userName: e.target.value })}
                    disabled={load ? true : false} required />
                <input type="email" name="email" placeholder='email'
                    onChange={e => setRegister({ ...register, email: e.target.value })}
                    disabled={load ? true : false} required />
                <input type="password" minLength="4" name="password" placeholder='password'
                    onChange={e => setRegister({ ...register, password: e.target.value })}
                    disabled={load ? true : false} required />
                <div className='div-file'>
                    <span>Sua linda foto</span>
                    <input className='file' name="file" type="file" accept="image/jpeg,image/gif,image/png"
                        onChange={e => setImage(e.target.files[0])} disabled={load ? true : false} required />
                </div>
                <Button load={load} disabled={load ? true : false} type="submit">{load ? <ThreeDots color="#fff" height={13} /> : "Sign Up"}</Button>
                <Div>
                    <Link to={`/`}>
                        <span>Switch back to log in</span>
                    </Link>
                </Div>
            </ RegisterContainer>
        </Container>
    );
}

export default SignUp;