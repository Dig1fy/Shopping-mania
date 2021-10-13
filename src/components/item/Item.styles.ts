import styled from 'styled-components';


export const Wrapper = styled.div`
display:flex;
justify-content: space-between;
flex-direction: column;
width: 100%;
border:1px solid lightblue;
border-radius:20px;
height: 100%;
text-align: center;

button{
    border-radius: 0 0 10px 10px;
}

img{
    margin: 0 auto;
    margin-top: 5px;
    max-height: 250px;
    max-width: 250px;
}

div{
    margin: 0 auto;
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100% auto;

}

p{
    text-align:left;
}
`;
