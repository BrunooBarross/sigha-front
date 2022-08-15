import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #fff;
`
const Title = styled.div`
    width: 100%;
`
const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    height: 100vh;

    h1{
        font-size: 20px;
        margin-top: 50px;
        margin-bottom: 14px;
    }

    input{
        height: 40px;
        margin-top: 10px;
        font-size: 15px;
    }

    @media (max-width: 800px) {	  
        width: 100%;
    }

    @media (max-width: 529px) {	    
        input{
            width: 89%;
        }
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 500px;

    @media (max-width: 529px) {	  
        align-items: center;  
        width: 100%; 
    }
`

const Label = styled.label`
    margin-top: 20px;
    font-size: 15px;

    @media (max-width: 529px) {	    
        width: 89%;
    }
`

const RadioDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;

    label{
        margin-right: 10px;
        font-size: 14px;
        text-align: center;
    }

    input{
        margin-top: 0;
        width: 15px;
    }

    @media (max-width: 529px) {	     
        width: 89%;
    }
`

const BntDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    button{
        width: 250px;
        height: 70px;
        margin-top: 30px;
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

    @media (max-width: 529px) {	  
        button{
            width: 40%;
            height: 40px;
            font-size: 14px;
        }  
    }
`

export {
    Container,
    Section,
    Title,
    Form,
    Label,
    RadioDiv,
    BntDiv
}