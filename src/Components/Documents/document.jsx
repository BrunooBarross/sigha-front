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
            <TdButton>
                <button className='edit'><ion-icon name="create-outline"></ion-icon><span>Edit</span></button>
                <button className='delete'><ion-icon name="trash-outline"></ion-icon><span>Delete</span></button>
            </TdButton>
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

const TdButton = styled.td`
    display: flex;
    justify-content: space-evenly;

    button{
        border-radius: 4px;
        width: 69px; 
        color: #fff;
        border: 2px solid #a55eea; 
        cursor: pointer;
    }
   
    ion-icon{
        margin-left: 0px;
        font-size: 13px;
        color: #fff;
    }

    .edit{
        background-color: #007BFF;
    }

    .delete{
        background-color: #DC3545;
    }

    @media (max-width: 570px) {	  
        flex-direction: column;
        button{
            font-size: 12px;
            width: 50px; 
            margin-top: 2px;
        }
    }

    @media (max-width: 529px) {	  
        span{
            display: none;
        }
        button{
            width: 40px; 
        }
    }
`