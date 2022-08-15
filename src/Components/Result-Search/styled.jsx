import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #fff;
`

const Aviso = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin-top: 50px;
    text-align: center;

    h2{
        font-size: 20px;
    }

    h3{
        font-size: 16px;
        margin-top: 10px;
    }
`

const Title = styled.div`
    width: 100%;
    margin-top: 50px;

    h1{
        font-size: 20px;
    }

    .add-circle{
        margin-right: 20px;
    }

    .add-circle ion-icon{
        color: red;
        font-size: 30px;
        cursor: pointer;
    }

    hr{
        margin-top: 18px;
    }
`

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    height: 100vh;

    table {
        text-align: center;
        margin-top: 20px;
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    .bold{
        font-size: 14px;
        font-weight: bold;
    }

    td, th {
        font-size: 13px;
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }

    @media (max-width: 800px) {	  
        width: 90%;
    }

    @media (max-width: 529px) {	    
        input{
            width: 85%;
        }
        table {
            width: 89%;
        }
    }

    @media (max-width: 408px) {	    
        .bold{
            font-size: 11px;
        }

        td, th {
            font-size: 10px;
            padding: 5px;
        }
    }

    @media (max-width: 320px) {	    
        .bold{
            font-size: 10px;
        }

        td, th {
            font-size: 9px;
            padding: 4px;
        }
    }
`

export {
    Container,
    Aviso,
    Title,
    Section
}