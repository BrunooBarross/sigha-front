import styled from 'styled-components';

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

export {
    DivModal,
    Label
}