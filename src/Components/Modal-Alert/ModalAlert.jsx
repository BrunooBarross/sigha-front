import Modal from 'react-modal';
import styled from 'styled-components';

const ModalAlert = ({alert, modalIsOpen, imageSrc, alertColor}) => {

    const customStyles = {
        content: {
            width: '45%',
            height: '33%',
            top: '50%',
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
                <img src={imageSrc} alt="alert" />
                <Label alertColor={alertColor}>{alert}</Label>
            </DivModal>
        </Modal>
    );
}

export default ModalAlert;

const DivModal = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        margin-top: 20px;
        max-width: 150px;
    }

    @media (max-width: 798px) {	  
        justify-content: center;

        img{
            width: 50%;
        }
    }

    @media (max-width: 581px) {	  
        img{
            width: 60%;
        }
    }

    @media (max-width: 489px) {	  
        img{
            width: 70%;
        }
    }
`

const Label = styled.label`
    margin-top: 15px;
    font-size: 28px;
    color: ${props => props.alertColor ? "green" : "red"};
    padding-top: 5px;

    @media (max-width: 580px) {	  
        font-size: 25px;
    }

    @media (max-width: 580px) {	  
        font-size: 25px;
        text-align: center;
    }

    @media (max-width: 280px) {	  
        font-size: 22px;
        text-align: center;
    }
`