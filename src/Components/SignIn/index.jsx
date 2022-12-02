import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from "react";
import { ThreeDots } from 'react-loader-spinner';
import UserContext from "../../Contexts/UserContext"
import { useContext } from 'react';

import Banner from '../Banner'
import ModalAlert from '../Modal-Alert/ModalAlert';

import {
    Container,
    RegisterContainer,
    Button,
    Div
} from "./styled"

const SignIn = () => {
    const navigate = useNavigate();
    const [loginData, setloginData] = useState({ email: "", password: "" });
    const [load, setLoad] = useState(false);
    const [alert, setAlert] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState("../assets/images/error.png");
    const [alertColor, setAlertColor] = useState(false);

    const { setUserData } = useContext(UserContext);

    function userLogin(event) {
        setAlert(null);
        event.preventDefault();
        setLoad(true);
        const requisicaoPost = axios.post(`${process.env.REACT_APP_API_BASE_URL}/signin`, loginData);
        requisicaoPost.then(response => {
            const { data } = response;
            localStorage.setItem("userData", JSON.stringify({ token: data.token, userName: data.userName, picture: data.imageUrl }))
            setUserData({ token: data.token, userName: data.userName, picture: data.imageUrl });
            setLoad(false);
            navigate('/home')
        }); requisicaoPost.catch(error => {
            setAlertColor(false);
            setImageSrc("../assets/images/error.png")
            if (error.response.status === 404) {
                setAlert('Email não cadastrado');
                setIsOpen(true);
            }
            if (error.response.status === 401) {
                setAlert('Senha incorreta');
                setIsOpen(true);
            }
            setTimeout(() => {
                setIsOpen(false);
            }, 2400);
            setLoad(false);
        });
    }

    return (
        <Container>
            <ModalAlert alert={alert} modalIsOpen={modalIsOpen} imageSrc={imageSrc} alertColor={alertColor}></ModalAlert>
            <Banner></Banner>
            <RegisterContainer load={load} onSubmit={userLogin}>
                <img src="../assets/images/logo.png" alt="logo" />
                <input type="email" name="email" placeholder='email'
                    onChange={e => setloginData({ ...loginData, email: e.target.value })}
                    disabled={load ? true : false} required />
                <input type="password" minLength="4" name="password" placeholder='password'
                    onChange={e => setloginData({ ...loginData, password: e.target.value })}
                    disabled={load ? true : false} required />
                <Button load={load} disabled={load ? true : false} type="submit">{load ? <ThreeDots color="#fff" height={13} /> : "Log In"}</Button>
                <Div>
                    <Link to={`/signup`}>
                        <span>First time? Create an account!</span>
                    </Link>
                </Div>
            </ RegisterContainer>
        </Container>
    );
}

export default SignIn;