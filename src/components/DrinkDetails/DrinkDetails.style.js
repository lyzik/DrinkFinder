import styled from "styled-components";

export const Info = styled.div`
    display: flex;
    padding: 55px;
    @media(max-width: 768px){
        padding: 50px 0 40px 20px;
    }
`

export const ImgContainer = styled.div`
    width: 250px;
    img{
        border-radius: 10px;
        opacity: 0.65;
    }
    @media(max-width: 768px){
        width: 150px;
    }
`
export const Ingredients = styled.div`
    padding-left: 40px;
    @media(max-width: 768px){
        padding-left: 10px;
    }   
`

export const Recipe = styled.div`
    margin-left: 55px;
    @media(max-width: 768px){
        margin-left: 20px;
    }   
    
`

export const Main = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
    padding-top: 50px;
    color: #a19999;
    background: linear-gradient(${props => props.bgColor}, rgba(0,0,0, 0.6)), url("../public/edgar-chaparro-Lwx-q6OdGAc-unsplash.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    h1{
        color: white;
    }
    @media(max-width: 768px){
        grid-template-columns: 1fr;
        font-size: 15px
    }   
`

export const RightSide = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    @media(max-width: 768px){
        justify-content: left;
    }   
`

export const moreInfo = styled.div`
    margin-top: 55px;
    background-color: rgba(0, 0, 0, 0.7);
    width: 50%;
    border-radius: 15px;
    padding: 15px;
    @media(max-width: 768px){
        margin: 20px;
        width: 100%;
    }   
`

