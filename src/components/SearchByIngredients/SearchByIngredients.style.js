import styled from "styled-components"

export const Main = styled.div`
    grid-template-columns: 30% 70%;
    padding-top: 90px;
`
export const Ingredients = styled.div`
    width: 30%;
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
    margin: 0px 20px 20px 20px;
    height: 80vh;
    border-radius: 10px;
    overflow-y: scroll;
    input{
        padding: 10px;
        border-radius: 15px;
        border: 2px solid gray;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
    }
    input:focus{
        outline: none;
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
`


export const Drinks = styled.div`
    width: 65%;
    float: right;
`