import styled from "styled-components"

export const Header = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 50px 10px 50px;
    display: grid;
    grid-template-columns: auto 1fr;
    position: fixed;
    z-index: 1;
    width: 100%;
    .material-symbols-sharp{
        display: none;
    }
    @media(max-width: 768px){
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: ${props => props.menuVisibility ? "0.5fr 1fr 1fr 1fr" : "1"};
        .material-symbols-sharp{
            color: white;
            display: flex;
            align-self: center;
            font-size: 30px;
            display: block;
            grid-area: 1 / 3 / 2 / 4;
            justify-self: end;
            border-radius: 50%;
            padding:5px;
            &:active{
                background-color: rgba(255,255,255, 0.2);
            }
        }
    }
`;
export const MainLink = styled.a`
    img{
        width: 220px;
    }
    @media(max-width: 768px){
        img{
            width: 250px;
        }
        grid-area: 1 / 1 / 2 / 3;
    }
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
    @media(max-width: 768px){
        display: ${props => props.menuVisibility ? "flex" : "none"};
        flex-direction: column;
        text-align: center;
        grid-area: 2 / 1 / 5 / 4;
        padding-right: 0px;
        a, a:link{
            justify-self: center;
            height: 60px;
            padding: 20px;
            width: 100%;
        }
        -webkit-tap-highlight-color: rgba(255,255,255, 0.2);
    }
`