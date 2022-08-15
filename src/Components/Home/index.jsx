import Header from "../Header";
import { useNavigate } from 'react-router-dom';

import {
    Container,
    Section,DivButton,
    Btn
} from "./styled"

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Header></Header>
            <Section>
                <div>
                    <h1>Sistema gerenciador de horas acadêmicas</h1>
                </div>
                <DivButton>
                    <Btn onClick={() => {navigate('/insert')}}>CADASTRAR CERTIFICADO</Btn>
                    <Btn onClick={() => {navigate('/report')}}>RELATÓRIOS</Btn>
                </DivButton>
            </Section>
        </Container>
    );
}

export default Home;