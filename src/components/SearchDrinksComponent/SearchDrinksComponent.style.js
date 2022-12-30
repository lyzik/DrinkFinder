import styled from "styled-components"

export const SearchBarContainer = styled.div`
    padding: 15px;
    input{
        padding: 10px;
        border-radius: 15px;
        border: none;
        box-shadow: 0px 3px 30px rgba(0,0,0,0.25);
        width: 350px
    }
    input:focus{
        outline: none;
    }
`