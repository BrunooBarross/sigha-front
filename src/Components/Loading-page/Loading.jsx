import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';

const Loading= () => {
    return (
        <Load><Oval color="#000" height={120} width={120}/></Load>
    )
}

export default Loading;

const Load= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70vh;
`
