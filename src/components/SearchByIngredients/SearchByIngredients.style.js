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
    background-color: #F353DA;
    color: white;
    position: fixed;
    padding: 20px;
    margin: 0px 20px 20px 20px;
    height: 80vh;
    border-radius: 10px;
    overflow-y: scroll;
    input{
        padding: 10px;
        border-radius: 15px;
        border: none;
        box-shadow: 0px 3px 30px rgba(0,0,0,0.25);
        width: 100%
    }
    input:focus{
        outline: none;
    }
`

export const Ingredient = styled.div`
    p{
        font-size: 30px;
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