import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 62.84%;
    height: 100vh;
    background-image: url("../assets/images/bg-main.jpg");
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);

    h1{
        margin-left: 16%;
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 106px;
        line-height: 117px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }

    h2{
        margin-left: 16%;
        width: 442px;
        height: 128px;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
    }
    @media (max-width: 1009px) {	  
        h2{
            width: 390px;
        }   
    }
    @media (max-width: 900px) {	  
        width: 100%;
        height: 220px; 
        margin-bottom: 29px;
        align-items: center;

        h1{
            font-size: 76px;
            line-height: 84px;
            margin-left: 0;
        }
        h2{
            margin-left: 0;
            width: 250px;
            height: 68px;
            font-size: 23px;
            line-height: 34px;
        }
    }
`

export{
    Container
}