import React from "react";
import { Link } from "react-router-dom";
import * as Styled from "./Header.style"

const Header = () => {
    return <Styled.Header>
        <Styled.MainLink href={`/`}>DrinkFinder</Styled.MainLink>
        <Styled.Nav>
            <a href="/searchbying">Find by ingredients</a>
            <a href="/search">Search</a>
            <a href="/">List</a>
        </Styled.Nav>
    </Styled.Header>
}

export default Header