import styled from "styled-components"

export const Drink = styled.div`
display: grid;
grid-template-columns: 200px auto 100px;
margin: 30px 100px 30px 50px;
border-radius: 5px;
transition: 0.3s;
background-color: rgba(0, 0, 0, 0.4);
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
    background-color: rgba(46, 45, 45, 0.7);
}
`;

export const Text = styled.div`
padding: 20px;
`

export const Image = styled.div`
img {
    border-radius: 5px;
    min-width: 200px;
    opacity: 0.7;
}
`

export const Link = styled.a`
    text-decoration: none;
    color: lightgray;
    cursor: default;
`