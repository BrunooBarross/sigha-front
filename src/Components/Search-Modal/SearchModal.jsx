import Modal from 'react-modal';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from "react";

const SearchModal = ({ modalIsOpen, setModalIsOpen }) => {
    const [title, setTitle] = useState("");
    const customStyles = {
        content: {
            width: '60%',
            height: '250px',
            top: '23%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            ariaHideApp={false}
        >
            <DivModal>
                <div className="modal-header">
                    <h5><ion-icon name="search"></ion-icon> Encontre um documento</h5>
                    <ion-icon name="close" onClick={() => setModalIsOpen(false)}></ion-icon>
                </div>
                <hr />
                <form>
                    <input type="text" placeholder="Digite o nome do doc" minLength={3} maxLength={20}
                        onChange={e => setTitle(e.target.value)} required />
                    <hr />
                    <BntDiv>
                        <Link to={`/documents/${title}`}>
                            <button type="submit" className="btn-submit" onClick={() => setModalIsOpen(false)}>
                                Pesquisar
                            </button>
                        </Link>
                        <button type="button" className="btn-close" onClick={() => setModalIsOpen(false)}>
                            Fechar
                        </button>
                    </BntDiv>
                </form>
            </DivModal>
        </Modal>
    );
}

export default SearchModal;

const DivModal = styled.div`
    width: 100%;
    height: 100%;
    
    .modal-header{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }

    h5{
        font-size: 20px;
    }

    ion-icon{
        font-size: 25px;
        cursor: pointer;
    }

    input{
        width: 100%;
        height: 40px;
        padding-left: 5px;
        margin-top: 5px;
        margin-bottom: 5px;
        border: solid #d0d0d0 1px;
        font-size: 16px;
        color: #868585;
        outline: none;
    }

    @media (max-width: 290px) {	
        input{
            font-size: 14px;
        }
    }
`
const BntDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%; 

    button{
        width: 250px;
        height: 62px;
        margin-top: 10px;
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

    @media (max-width: 920px) {	
        button{
            width: 90px;
            justify-content: center;
            height: 40px;
            font-size: 14px;
            text-align: center;
        }  
    }

    @media (max-width: 529px) {	
        button{
            width: 75px;
            height: 40px;
            font-size: 14px;
            text-align: center;
        }  
    }
`