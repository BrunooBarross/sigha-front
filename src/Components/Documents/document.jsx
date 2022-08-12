import dayjs from 'dayjs';
import styled from 'styled-components';

const Document = ({ id, title, type, issueDate, hours, documentUrl, awsFileKey }) =>{
    return(
        <Tr>
            <td>{dayjs(issueDate).locale('pt-BR').format('DD-MM-YY')}</td>
            <td>{title}</td>
            <td>{type}</td>
            <td>{hours}h</td>
            <td><a href={documentUrl} target="_blank" rel="noreferrer"><ion-icon name="download"></ion-icon></a></td>
        </Tr>
    );
};

export default Document;

const Tr = styled.tr`
    a{
        text-decoration: none;
    }
    ion-icon{
        margin-left: 20px;
        font-size: 18px;
        color: black;
    }
`                            