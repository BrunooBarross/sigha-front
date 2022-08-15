import { useState } from "react";
import { Link, useNavigate} from 'react-router-dom';

import SearchModal from '../Search-Modal/SearchModal';

import {
    Container,
    Ul,
    ImageUser,
    ChevronIcon,
    QuickAccess
} from "./styled"

const Header = () => {
    const navigate = useNavigate();
    const { token, picture } = JSON.parse(localStorage.getItem('userData'));
    const [quickAccess, setQuickAccess] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return(
        <Container>
            <SearchModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}></SearchModal>
            <div className='div-logo' onClick={() => {navigate('/home')}}>
                <img src="../assets/images/logo.png" alt="logo" />
                <span className='logo'>SIGHA</span>
            </div>
            <Ul>
                <li onClick={() => {navigate('/home')}}><ion-icon name="home-outline"></ion-icon>
                    HOME
                </li>
                <li onClick={() => {navigate('/documents')}}><ion-icon name="document-outline"></ion-icon>
                    LISTAR
                </li>
                <li  onClick={() => setModalIsOpen(true)}>
                    <ion-icon name="search-outline"></ion-icon>
                    BUSCAR
                </li> 
            </Ul>
            <ImageUser 
                src={picture}
                alt="profile picture"
                onClick={() => setQuickAccess(!quickAccess)}
            />
             <ChevronIcon
                transfrom={quickAccess ? "rotate(180deg)" : "rotate(0deg)"}
                onClick={() => setQuickAccess(!quickAccess)}
                size="30px"
            />
           <QuickAccess to="#" token={token} display={quickAccess ? "inherit" : "none"}> 
                <Link to="/">
                    <span  >Logout</span>
                </Link>
            </QuickAccess>
        </Container>
    );
}

export default Header;