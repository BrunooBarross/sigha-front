import styled from 'styled-components';
import { useNavigate} from 'react-router-dom';
import Header from "../Header";

const Insert = () => {
    const navigate = useNavigate();
    const regex = new RegExp('dog','gi');

    return (
        <Container>
            <Header></Header>
            <Section>
                <Title>
                    <h1>+ Inserir Documentos</h1>
                    <span><hr /></span>
                </Title>
                <Form>
                    <datalist id="list"> 
                        <option>Presencial</option> 
                        <option>Online</option> 
                    </datalist>
                    <Label>Nome do Certificado:</Label>
                        <input type="text" placeholder="Ex: Palestra jogos digitais" minLength={5} maxLength={40} required/>
                    <Label>Selecione o tipo do seu certificado</Label>
                        <input name="type" list="list" pattern={regex} placeholder="Prencial ou Online" required/>
                        
                    <Label>Carga horária</Label>
                        <input type="number" min="0" step="1" required/>
                    <Label>Anexar certificado</Label>
                        <input className='file' name="file" type="file" accept="image/jpeg,image/gif,image/png" required/>
                    <BntDiv>
                        <button type="submit" className="btn-submit">Salvar</button>
                        <button type="button" className="btn-close" onClick={()=>{navigate("/home")}}>Fechar</button>
                    </BntDiv>
                </Form>
            </Section>
        </Container>
    );
}

export default Insert;

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
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 500px;
`

const Label = styled.label`
    margin-top: 20px;
    font-size: 15px;
`

const BntDiv = styled.div`
    display: flex;
    justify-content: flex-end;

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
`