import React from "react";
import { Link } from "react-router-dom";
import * as Styled from "./Header.style"

const Header = () => {
    return <Styled.Header>
        <a href={`/`}>DrinkFinder</a>
    </Styled.Header>
}

export default Header