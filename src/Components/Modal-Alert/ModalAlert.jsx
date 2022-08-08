import Modal from 'react-modal';
import styled from 'styled-components';

const ModalAlert = ({alert, modalIsOpen, imageSrc, alertColor}) => {

    const customStyles = {
        content: {
            width: '30%',
            height: '50%',
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
        margin-top: 30px;
        width: 35%;
    }
`

const Label = styled.label`
    margin-top: 20px;
    font-size: 28px;
    color: ${props => props.alertColor ? "green" : "red"};
    padding-top: 5px;
`