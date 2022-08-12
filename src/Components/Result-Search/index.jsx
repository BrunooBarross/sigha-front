//import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from "../Header";

const ResultSearch = () => {
    //const { title } = useParams();

    return (
        <Container>
            <Header></Header>
        </Container>
    );
}

export default ResultSearch

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #fff;
`