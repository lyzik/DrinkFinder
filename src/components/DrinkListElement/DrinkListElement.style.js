import styled from "styled-components"

export const Drink = styled.div`
display: grid;
grid-template-columns: 200px auto 100px;
margin: 30px 100px 30px 50px;
box-shadow: 10px 8px 10px lightgray;
border-radius: 5px;
transition: 0.3s;
.material-symbols-sharp {
    color: ${props => props.color};
    padding: 20px 0px 20px 20px;
    font-size: 40px;
    transition: 0.3s;
}
.material-symbols-sharp:hover {
    color: #F67280;
    cursor: default;
}

&:hover{
    background-color: #E2E3E9;
}
`;

export const Text = styled.div`
padding: 20px;
`

export const Image = styled.div`
img {
    border-radius: 5px;
    box-shadow: 3px 3px 15px lightgray;
    min-width: 200px;
}
`

export const Link = styled.a`
    text-decoration: none;
    color: black;
    cursor: default;
`