import styled from "styled-components"

export const Main = styled.div`
    grid-template-columns: 30% 70%;
    padding-top: 90px;
    justify-content: center;
    .visibleSetter{
        display: none;
        position: fixed;
        z-index: 1;
        bottom: 13px;
        right: 13px;
        width: 80px;
        height: 80px;
        background-color: #777986;
        color: white;
        border-radius: 50%;
        span{
            font-size: 40px;
        }
    }
    .drinksAmount{
        display: none;
    }
    @media(max-width: 768px){
    .drinksAmount{
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
            color: black;
            z-index: 2;
            bottom: 65px;
            right: 18px;
            width: 30px;
            background-color: #B3B5BD;
            height: 30px;
            text-align: center;
            border-radius: 50%;
            font-weight: 900;
        }
    }
    .notFound{
        color: white;
        width: 65%;
        float: right;
        @media(max-width: 768px){
            width: 100%;
            text-align: center;
        }
    }
    @media(max-width: 768px){
        padding-top: 60px;
        .visibleSetter{
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`
export const Ingredients = styled.div`
    width: ${props => props.fullWidth ? '30%' : '94%'};
    transition: 0.5s;
    ${props => !props.fullWidth ?
        `.ing-container{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            transition-delay: 0.7s;`
        : null
    }
    }
    p{
        font-size: 30px;
        padding: 10px 0px 0px 4px;
    }
    p:hover{
        cursor: pointer;
        color: pink;
    }
    span{
        padding: 5px 5px 5px 20px;
    }
    background-color: rgba(0, 0, 0, 0.4);
    color: pink;
    position: fixed;
    padding: 20px;
    margin: 0px 3% 3% 3%;
    height: 80vh;
    border-radius: 10px;
    overflow-y: scroll;
    input{
        padding: 10px;
        border-radius: 15px;
        border: 2px solid gray;
        width: ${props => props.fullWidth ? '100%' : '50%'};
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
    }
    input:focus{
        outline: none;
    }
    @media(max-width: 768px){
        width: 95%;
        margin: 10px 3% 3% 3%;
        display: ${props => !props.drinksVisible ? 'default' : 'none'};
        opacity: ${props => !props.drinksVisible ? '1' : '0'};
        .ing-container{
            grid-template-columns: 1fr;
        }
        input{
            width: 100%;
        }
    }
    
`

export const Ingredient = styled.div`
    p{
        font-size: 30px;
        color: gray;
    }
    p:hover{
        cursor: pointer;
        color: pink;
    }
    span{
        padding: 5px 5px 5px 20px;
    }
    @media(max-width: 768px){
        p:hover{
            color: gray;
        }
    }
`

export const Drinks = styled.div`
    display: default;
    width: 65%;
    float: right;
    transition: 0.5s;
    transition-delay: 0.6s;
    display: ${props => props.visible ? 'default' : 'none'};
    opacity: ${props => props.visible ? '1' : '0'};
    @media(max-width: 768px){
        width: 100%;
        opacity: ${props => props.drinksVisible ? '1' : '0'};
        display: ${props => props.drinksVisible ? 'default' : 'none'};
    }
`