import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
`

const Title = styled.div`
    width: 100%;
    h1{
        font-size: 20px;
        margin-top: 50px;
        margin-bottom: 14px;
    }

    ion-icon{
        margin-right: 5px;
    }
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
        color: #353232;
        font-size: 14px;
        font-weight: bold;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    .right{
        color: black;
        text-align: right;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }


    @media (max-width: 800px) {	  
        width: 90%;
    }

    @media (max-width: 529px) {	    
        input{
            width: 89%;
        }
    }
`

const DivInput = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 50px;
    margin-top: 12px;
    border: solid #dddddd 0.1px;

    div{
        margin-top: 5px;
        text-align: center;
        font-size: 18px;
    }

    input{
        cursor: pointer;
        width: 50%;
        margin-top: 15px;
        height: 25px;
        margin-left: 10px;
        margin-right: 10px;
    }

    button{
        color: #fff;
        height: 40px;
        width: 90px;
        margin-top: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        border-radius: 10px;
        border: solid #a55eea 2px;
        background-color: #28A745;
    }
`

const DivChart = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    button{
        cursor: pointer;
        border-radius: 10px;
        border: solid #a55eea 2px;
        background-color: #DC3545;
        width: 100px;
        height: 40px;
        color: #fff;
    }
`

export {
    Container,
    Section,
    Title,
    Aviso,
    DivInput,
    DivChart
}