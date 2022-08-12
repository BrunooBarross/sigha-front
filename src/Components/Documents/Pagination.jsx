import styled from 'styled-components';

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
    return (
        <DivPagination style={pages === 1 ? { display: "none"} : null}>
            {Array.from(Array(pages), (item, index) => {
                return <button style={index === currentPage ? { backgroundColor: "red" } : null} key={index} value={index}
                    onClick={(e) => setCurrentPage(Number(e.target.value))}>{index + 1}</button>
            })}
        </DivPagination>
    );
}

export default Pagination;

const DivPagination = styled.div`
    margin-top: 14px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button{
        cursor: pointer;
        margin-left: 2px;
        border: none;
        border-radius: 5px;
    }
    
    button:hover{
        background-color: rgba(0,0,0,0.5);
    }
`