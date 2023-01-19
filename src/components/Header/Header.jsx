import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Styled from "./Header.style"

const Header = () => {
    const [menuVisibility, setMenuVisibility] = useState(false);

    return <Styled.Header menuVisibility={menuVisibility}>
        <Styled.MainLink href={`/`}>
            <img src="../public/DrinkFinder-Logo.png" alt="" />
        </Styled.MainLink>
        <span class="material-symbols-sharp" onClick={() => setMenuVisibility(!menuVisibility)}>
            menu
        </span>
        <Styled.Nav menuVisibility={menuVisibility}>
            <a href="/searchbying">Find by ingredients</a>
            <a href="/search">Search</a>
            <a href="/">List</a>
        </Styled.Nav>
    </Styled.Header>
}

export default Header