import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

import ModalAlert from '../Modal-Alert/ModalAlert';
import Banner from '../Banner'

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

        const formData = new FormData();
        formData.append('file', image);
        formData.append('userName', register.userName);
        formData.append('email', register.email);
        formData.append('password', register.password);
        const requisicaoPost = axios.post("http://127.0.0.1:5000/signup",
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

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    background: #1d1c26;

    @media (max-width: 900px) {	  
        flex-direction:  column;
        align-items: center;
    }
`
const RegisterContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 429px;
    margin-left: 51px;
    margin-right: 51px;

    span{
        color: #fff;
    }

    input{
        padding-left: 17px;
        width: 100%;
        height: 65px;
        margin-top: 13px;
        background: #FFFFFF;
        border-radius: 6px;
        opacity:${props => props.load ? 0.2 : 1};
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: #9F9F9F;
    }

    .div-file{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-top: 13px;
        color: #fff;
    }

    span{
        margin-top: 15px;
        font-size: 30px;
    }

    .file{
        font-size: 20px;
        width: 80%;
        background: none;
    }

    @media (max-width: 500px) {	  
        width: 88%;
        margin-left: 0;
        margin-right: 0;

        input{
            height: 55px;
            margin-top: 11px;
            font-size: 22px;
            line-height: 33px;
        }
    }
`
const Button = styled.button`
        opacity:${props => props.load ? 0.2 : 1};
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 65px;
        align-items: center;
        justify-content: center;
        background: #a20e5a;
        border-radius: 6px;
        border: none;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: #FFFFFF;
        cursor: pointer;
        margin-top: 10px;

        @media (max-width: 500px) {	  
            height: 55px;
        }
`
const Div = styled.div`
        width: 100%;
        margin-top: 14px;
        display: flex;
        justify-content: center;
    
    span{
        color: #184aca;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        text-decoration-line: underline;
        cursor: pointer;
    }

    @media (max-width: 390px) {	  
        span{
            font-size: 17px;
            line-height: 20px;
        }
    }
`
export default SignUp;