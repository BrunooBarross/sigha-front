import Modal from 'react-modal';
import styled from 'styled-components';

const SearchModal = ({ modalIsOpen, setModalIsOpen }) => {

    const customStyles = {
        content: {
            width: '60%',
            height: '34%',
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
					<h5>Encontre um documento</h5>
					<ion-icon name="close" onClick={() => setModalIsOpen(false)}></ion-icon>
				</div>
                <hr />
                <input type="text" placeholder="Digite o nome do doc" />
                <hr />
                <BntDiv>
                    <button type="submit" className="btn-submit">Pesquisar</button>
                    <button type="button" className="btn-close" onClick={() => setModalIsOpen(false)}>
                        Fechar
                    </button>
                </BntDiv>
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
        margin-top: 5px;
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
        border-color: #d0d0d0 2px;
        font-size: 16px;
        color: #868585;
        outline: none;
    }
`
const BntDiv = styled.form`
    display: flex;
    justify-content: flex-end;

    button{
        width: 250px;
        height: 70px;
        margin-top: 10px;
        border-radius: 10px;
        cursor: pointer;
        color: #fff;
        font-size: 18px;
        border-color: #CE93D8 2px;
    }

    .btn-submit{
        margin-right: 10px;
        background-color: #28A745;
    }

    .btn-close{
        background-color: #DC3545;
    }
`