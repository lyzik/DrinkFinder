import styled from "styled-components"

export const Header = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 50px 10px 50px;
    display: grid;
    grid-template-columns: auto 1fr;
    position: fixed;
    z-index: 1;
    width: 100%;
`;

export const MainLink = styled.a`
    text-decoration: none;
    color:white;
    font-size: 27px;
    font-weight: 900;
`
export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: end;
    a, a:link{
        text-decoration: none;
        color:white;
        padding-right: 35px;
    }
    a:hover{
        color: #E2E3E9;
    }
`