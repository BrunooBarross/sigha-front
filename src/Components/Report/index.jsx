import { useState, useEffect } from "react";
import axios from 'axios';
import { Chart } from 'react-google-charts';
import Modal from 'react-modal';
import dayjs from 'dayjs';

import Header from "../Header";
import Loading from "../Loading-page/Loading";

import {
    Container,
    Section,
    Title,
    Aviso,
    DivInput,
    DivChart
} from "./styled"

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
    const[loadingPages, setLoadingPages] = useState(true);
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
            setLoadingPages(false);
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
            if (dayjs(reportData.date).locale('pt-BR').format('YYYY-MM-DD') < document.issueDate) {
                console.log('estrei aqui')
                totalHoursChart = totalHoursChart + parseInt(document.hours);
            }
        })
        const result = reportData.hours - totalHoursChart;
        setgoalData([
            ["Resultado", "Horas"],
            ["Possui", totalHoursChart],
            ["Faltam", result < 0 ? 0 : result]
        ])
        setModalIsOpen(true);
    }

    return (
        <Container>
            <Header></Header>
            {loadingPages ? <Loading></Loading> :
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
                                <input type="date" title='O cálculo será realizado a partir da data selacionada' max={datePicker} 
                                    onChange={e => setReportData({ ...reportData, date: e.target.value })} required />
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

            }
        </Container>
    );
};

export default Report;