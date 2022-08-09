import Header from "../Header";
import styled from 'styled-components';

const Home = () => {
    return (
        <Container>
            <Header></Header>
            <Section>
                <div>
                    <h1>Sistema gerenciador de horas acadêmicas</h1>
                </div>
                <DivButton>
                    <Bnt>CADASTRAR DOCUMENTO</Bnt>
                    <Bnt>FILTRAR EDITAR EXCLUIR</Bnt>
                </DivButton>
                
            </Section>
        </Container>
    );
}

const Container = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');    
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: url("../assets/images/bg-main.jpg");
    filter: brightness(95%);
`

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 900px;
    height: 100vh;

    h1{
        font-family: 'Ubuntu', sans-serif;
        color: #fff;
        font-size: 40px;
        text-align: center;
    }

    @media (max-width: 900px) {	  
        width: 100%;
    }

    @media (max-width: 390px) {	  
        h1{
            font-size: 32px;
        }
    }
`

const DivButton = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 70px;
    margin-left: 10px;
    margin-right: 30px;

    @media (max-width: 575px) {	  
        flex-direction: column;
        justify-content: center;
    }
    
`

const Bnt = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 280px; 
    height: 80px;
    margin-left: 15px;
    color: #fff; 
    border-radius: 10px; 
    border: 3px solid #a55eea; 
    padding: 20px; font-weight: bold;
    cursor: pointer;

    :hover {
        color: #CE93D8; 
        background-color: rgba(0,0,0,0.5);
    }

    @media (max-width: 575px) {	  
        width: 85%;
        margin-top: 15px;
        margin-bottom: 15px;
    }

    @media (max-width: 296px) {	  
        text-align: center;
    }
`

export default Home;