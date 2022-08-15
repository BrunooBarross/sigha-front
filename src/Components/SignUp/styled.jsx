import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: 100vw;
    min-height: 100vh;
    background: #1d1c26;

    @media (max-width: 900px) {	  
        flex-direction:  column;
        align-items: center;
    }
`
const RegisterContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 429px;
    margin-left: 51px;
    margin-right: 51px;

    span{
        color: #fff;
    }

    input{
        padding-left: 17px;
        width: 100%;
        height: 65px;
        margin-top: 13px;
        background: #FFFFFF;
        border-radius: 6px;
        opacity:${props => props.load ? 0.2 : 1};
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: #9F9F9F;
    }

    .div-file{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-top: 13px;
        color: #fff;
    }

    span{
        margin-top: 15px;
        font-size: 30px;
    }

    .file{
        font-size: 20px;
        width: 80%;
        background: none;
    }

    @media (max-width: 500px) {	  
        width: 88%;
        margin-left: 0;
        margin-right: 0;

        input{
            height: 55px;
            margin-top: 11px;
            font-size: 22px;
            line-height: 33px;
        }
    }
`
const Button = styled.button`
        opacity:${props => props.load ? 0.2 : 1};
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 65px;
        align-items: center;
        justify-content: center;
        background: #a20e5a;
        border-radius: 6px;
        border: none;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: #FFFFFF;
        cursor: pointer;
        margin-top: 10px;

        @media (max-width: 500px) {	  
            height: 55px;
        }
`
const Div = styled.div`
        width: 100%;
        margin-top: 14px;
        display: flex;
        justify-content: center;
    
    span{
        color: #184aca;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        text-decoration-line: underline;
        cursor: pointer;
    }

    @media (max-width: 390px) {	  
        span{
            font-size: 17px;
            line-height: 20px;
        }
    }
`

export {
    Container,
    RegisterContainer,
    Button,
    Div
}