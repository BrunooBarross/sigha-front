import Modal from 'react-modal';
import {
    DivModal,
    Label
} from "./styled"

const ModalAlert = ({ alert, modalIsOpen, imageSrc, alertColor }) => {

    const customStyles = {
        content: {
            width: '45%',
            height: '250px',
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