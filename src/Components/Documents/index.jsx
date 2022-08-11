import styled from 'styled-components';
import Header from "../Header";

const Documents = () => {
    return(
        <Container>
            <Header></Header>
            <Section>
                <Title>
                    <h1><ion-icon name="documents-outline"></ion-icon> Seus Documentos</h1>
                    <span><hr /></span>
                </Title>
                <table>
                    <tbody>
                        <tr>
                            <td className='bold'>Emissão</td>
                            <td className='bold'>Nome Documento</td>
                            <td className='bold'>Tipo</td>
                            <td className='bold'>CH</td>
                            <td className='bold'>Arquivo</td>
                        </tr>
                        <tr>
                            <td>12-05-2020</td>
                            <td>Um documento</td>
                            <td>Online</td>
                            <td>5 hrs</td>
                            <td>Download</td>
                        </tr>
                    </tbody>
                </table>
            </Section>
        </Container>
    );
};

export default Documents;

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
        margin-bottom: 18px;
    }

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
        width: 100%;
    }

    @media (max-width: 529px) {	    
        input{
            width: 89%;
        }
        table {
            width: 89%;
        }
    }

    @media (max-width: 342px) {	    
        .bold{
            font-size: 11px;
        }

        td, th {
            font-size: 10px;
            padding: 5px;
        }
    }
`