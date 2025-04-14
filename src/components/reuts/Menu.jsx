import React, { useEffect, useState } from "react";
import Linkto from "./Linkto";
import { NavLink, useLocation } from "react-router-dom";


function Menu() {
    const location = useLocation();

    const [version, setVersion] = useState(null);

    useEffect(() => {
        const updateItemsPerRow = () => {
            const width = window.innerWidth;

            if (width <= 425) {
                setVersion('mini');
            } else if (width <= 1024) {
                setVersion('mob');
            } else {
                setVersion('desktop');
            }
        };

        updateItemsPerRow(); // Chama ao montar o componente
        window.addEventListener("resize", updateItemsPerRow);

        return () => window.removeEventListener("resize", updateItemsPerRow);
    }, [version]);


    const menus = {
        menuHome: {
            icon: <i className="fas fa-home"></i>,
            text: <span>Início</span>
        },
        menuSobre: {
            icon: <i className="fas fa-user"></i>,
            text: <span>Sobre</span>
        },
        menuEmpreendimentos: {
            icon: <i className="fas fa-city"></i>,
            text: <span>Empreendimentos</span>
        },
        menuBlog: {
            icon: <i className="fas fa-book-open"></i>,
            text: <span>Blog Space</span>
        }
    }

    const buildRender = (type) => {
        switch (version) {
            case 'mini':
                return menus[`${type}`].icon

            case 'mob':
                return <>
                    {menus[`${type}`].icon}
                    {menus[`${type}`].text}
                </>

            default:
                return menus[`${type}`].text
        };
    };

    const liRender = (nav) => {
        return (
            <li>
                <NavLink to={Linkto({ type: nav })}
                    className={location.pathname === Linkto({ type: nav }) ? "select" : nav}
                >
                    {buildRender(nav)}
                </NavLink>
            </li>
        );
    };

    return (
        <nav>
            <ul>
                {liRender('menuHome')}
                {liRender('menuSobre')}
                {liRender('menuEmpreendimentos')}
                {liRender('menuBlog')}
            </ul>
        </nav>
    );
}

export default Menu;