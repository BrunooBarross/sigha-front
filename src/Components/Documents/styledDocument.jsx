import styled from 'styled-components';

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
export {
    Tr,
    TdButton
}