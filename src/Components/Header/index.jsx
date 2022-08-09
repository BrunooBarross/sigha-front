import styled from 'styled-components';
import { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

import SearchModal from '../Search-Modal/SearchModal';

const Header = () => {
    const { token, picture } = JSON.parse(localStorage.getItem('userData'))
    const [quickAccess, setQuickAccess] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return(
        <Container>
            <SearchModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}></SearchModal>
            <div>
                <Link to="/home">
                    <img src="../assets/images/logo.png" alt="logo" />
                </Link>
                <span className='logo'>SIGHA</span>
            </div>
            <Ul>
                <li><ion-icon name="document-outline"></ion-icon>LISTAR DOCUMENTOS</li>
                <li  onClick={() => setModalIsOpen(true)}>
                    <ion-icon name="search-outline"></ion-icon>
                    BUSCAR DOCUMENTOS
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

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    background-color: #1a1919;
    
    div{
        display: flex;
        align-items: center;
    }

    span{
        margin-left: 9px;
        color: #fff;
        font-size: 20px;
    }

    img{
        width: 55px;
        margin-left: 30px;
    }

    
    @media (max-width: 575px) {	
        .logo{
            display: none;
        }  
        img{
        width: 45px;
        margin-left: 20px;
        }
    }
`
const Ul = styled.ul`
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
   
    li{
        display: flex;
        align-items: center;
        height: 100%;
        color: #fff;
        cursor: pointer;
        font-size: 16px;
    }

    ion-icon{
        margin-right: 3px;
        font-size: 25px;
    }

    li:hover {
        color: #CE93D8; 
        background-color: rgba(0,0,0,0.5);
    }
    @media (max-width: 800px) {	  
        li{
            flex-direction: column;
            justify-content: center;
            text-align: center;
            font-size: 14px;
        }
        ion-icon{
            margin-top: 4px;
            margin-bottom: 4px;
        }
    }
    @media (max-width: 532px) {	  
        li{
            margin-right: 10px;
            font-size: 12px;
        }
        ion-icon{
            font-size: 22px;
        }
    }

    @media (max-width: 532px) {	  
        li{
            margin-left: 5px;
        }
    }
`

const ImageUser = styled.img`
    margin-right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;

    @media (max-width: 575px) {	  
        width: 50px;
        height: 50px;
        border-radius: 40%;
    }
`

const ChevronIcon = styled(IoChevronDownSharp)`
    position: absolute;
    right: 85px;
    top: 25px;
    transform: ${({ transfrom }) => transfrom};
    color: white;
    :hover {
        cursor: pointer;
        color: #CE93D8;
    }

    @media (max-width: 575px) {	  
        right: 70px;
    }

    @media (max-width: 354px) {	  
        display: none;
    }
`

const QuickAccess = styled.span`
    width: 135px;
    height: 47px;
    background-color: #1a1919;
    border-bottom-left-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    display: ${({ display }) => display};
    top: 72px;
    right: 0;

    span,
    a {
        text-decoration: none;
        font-size: 17px;
        color: #ffffff;
        font-weight: bold;
        margin-top: 12px;
        font-family: "Lato", sans-serif;
    }
    span:hover,
    a:hover {
        cursor: pointer;
        color: #CE93D8;
    }

    @media (max-width: 575px) {	  
        width: 110px;
    }

    @media (max-width: 378px) {	  
        width: 90px;
    }
`

export default Header;