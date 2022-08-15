import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useState } from "react";

import {
    DivModal,
    BtnDiv
} from "./styled"

const SearchModal = ({ modalIsOpen, setModalIsOpen }) => {
    const [title, setTitle] = useState("");
    const customStyles = {
        content: {
            width: '80%',
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
                    <BtnDiv>
                        <Link to={`/documents/${title}`}>
                            <button type="submit" className="btn-submit" onClick={() => setModalIsOpen(false)}>
                                Pesquisar
                            </button>
                        </Link>
                        <button type="button" className="btn-close" onClick={() => setModalIsOpen(false)}>
                            Fechar
                        </button>
                    </BtnDiv>
                </form>
            </DivModal>
        </Modal>
    );
}

export default SearchModal;