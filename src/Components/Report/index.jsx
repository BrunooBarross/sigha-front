import styled from 'styled-components';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Chart } from 'react-google-charts';
import Modal from 'react-modal';

import Header from "../Header";
import dayjs from 'dayjs';

const customStyles = {
    content: {
        width: '310px',
        height: '380px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


const Report = () => {
    const { token } = JSON.parse(localStorage.getItem('userData'));
    const [documents, setDocuments] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [reportData, setReportData] = useState({ date: "", hours: 0 });
    const [goalData, setgoalData] = useState([["Resultado", "Horas"]]);
    const datePicker = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${token}` } }
        const requisicaoGet = axios.get(`https://sigha-api.herokuapp.com/documents`, config);
        requisicaoGet.then(response => {
            const { data } = response;
            setDocuments(data);
        });
        requisicaoGet.catch(error => {
            console.log(error);
        });
    }, [token]);

    let totaLHours = 0;
    let online = 0;
    let totalHoursOln = 0;
    let presencial = 0
    let totalHoursPresent = 0;

    documents.forEach((document) => {
        if (document.hours) {
            totaLHours += document.hours;
        }
        if (document.type === "Online") {
            totalHoursOln += document.hours;
            online++;
        }
        if (document.type === "Presencial") {
            presencial++;
            totalHoursPresent += document.hours
        }
    })

    function generateGraphic(event) {
        event.preventDefault();
        let totalHoursChart = 0;
        documents.forEach((document) => {
            if (dayjs(reportData.date).locale('pt-BR').format('YYYY-MM-DD') > document.issueDate) {
                totalHoursChart = totalHoursChart + parseInt(document.hours);
            }
        })
        const result = reportData.hours - totalHoursChart;
        setgoalData([
            ["Resultado", "Horas"],
            ["Faltam", result < 0 ? 0 : result],
            ["Possui", totalHoursChart]
        ])
        setModalIsOpen(true);
    }

    return (
        <Container>
            <Header></Header>
            <Section>
                <Title>
                    <h1><ion-icon name="bar-chart-outline"></ion-icon>Relatório</h1>
                    <span><hr /></span>
                </Title>
                {documents.length === 0 ? 
                    <Aviso>
                        <h2>Você não possui nenhum documento</h2>
                        <h3>Clique <a href="/insert">aqui</a> e realize um cadastro</h3>
                    </Aviso> :
                    <>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='bold'>Quantidade de registros</td>
                                    <td className='bold right'>{documents.length}</td>
                                </tr>
                                <tr>
                                    <td className='bold'>Total de horas</td>
                                    <td className='bold right'>{totaLHours}h</td>
                                </tr>
                                <tr>
                                    <td className='bold'>Primeiro certificado emitido em</td>
                                    <td className='bold right'>{dayjs(documents.at(-1).issueDate).locale('pt-BR').format('DD-MM-YY')}</td>
                                </tr>
                                <tr>
                                    <td className='bold'>Último certificado emitido em</td>
                                    <td className='bold right'>{dayjs(documents[0].issueDate).locale('pt-BR').format('DD-MM-YY')}</td>
                                </tr>
                                <tr>
                                    <td className='bold'>Registros do tipo "Online"</td>
                                    <td className='bold right'>{online}</td>
                                </tr>
                                <tr>
                                    <td className='bold'>Horas Online</td>
                                    <td className='bold right'>{totalHoursOln}h</td>
                                </tr>
                                <tr>
                                    <td className='bold'>Registros do tipo "Presencial"</td>
                                    <td className='bold right'>{presencial}</td>
                                </tr>
                                <tr>
                                    <td className='bold'>Horas modelo Presencial</td>
                                    <td className='bold right'>{totalHoursPresent}h</td>
                                </tr>
                            </tbody>
                        </table>
                        <DivInput onSubmit={generateGraphic}>
                            <div><span>Gráfico meta de horas</span></div>
                            <input type="number" title='Digita sua meta de horas' min={1} maxLength={400}
                                placeholder="Sua meta de horas" onChange={e => setReportData({ ...reportData, hours: e.target.value })} required />
                            <input type="date" title='O cálculo será realizado a partir da data selacionada' max={datePicker} required />
                            <button type='submit'>Gerar</button>
                        </DivInput>
                        <Modal
                            isOpen={modalIsOpen}
                            style={customStyles}
                            ariaHideApp={false}
                        >
                            <DivChart>
                                <Chart
                                    chartType="PieChart"
                                    data={goalData}
                                    max-width="350px"
                                    width='100%'
                                    height="100%"
                                />
                                <button>Fechar</button>
                            </DivChart>
                        </Modal>
                    </>
                }
            </Section>
        </Container>
    );
};

export default Report;

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