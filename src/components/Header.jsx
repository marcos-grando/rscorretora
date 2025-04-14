import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Linkto from "./reuts/Linkto";
import Menu from "./reuts/Menu";
import Sociais from "./reuts/Sociais";
import Contators from "./reuts/Contators";

function Header({ onlyPage }) {
    const [fixedClass, setFixedClass] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 250) {
                setFixedClass(true);
            } else {
                setFixedClass(false);
            }
        };

        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);


    // Abaixo é retornado 2 <header>;
    // 1º header aparece sempre fixo no topo;
    // 2º header é fixed, aparece ao descer a página;
    return (
        <>
            <header className={`${onlyPage ? "onlypage" : "header"} `} >
                <div className="line-header"></div>
                <div className="line-limit">
                    <div className="wpp-creci">
                        <Contators type="CRECI" />
                        <a className="wpp" href={Linkto({ type: "wpp" })} target="_blank">
                            <i className="fab fa-whatsapp" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div className="redes">
                        <Sociais onlyicon={true} />
                    </div>
                </div>
                <div className='content'>
                    <div className="header-rs">
                        <img src="/imgs/icon.png" alt="Ícone RS Corretora de Imóveis" />
                        <div className="rs-line"></div>
                        <div className="rs-corretora">
                            <p>Raquel Silva</p>
                            <p>Corretora de Imóveis</p>
                        </div>
                    </div>

                    <div className="header-menu">
                        <Menu />
                    </div>

                    <div className="header-contato">
                        <ul>
                            <li className="wpp-div">
                                <Link to={Linkto({ type: "wpp" })} target="_blank">
                                    <div className="border">
                                        <i className="fab fa-whatsapp" aria-hidden="true"></i>
                                        <Contators type="wpp" />
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <header className={`${onlyPage ? "onlypage" : "header"} fixed ${fixedClass ? "show" : "out"} `} >
                <div className="line-header"></div>
                <div className="line-limit">
                    <div className="wpp-creci">
                        <Contators type="CRECI" />
                        <a className="wpp" href={Linkto({ type: "wpp" })} target="_blank">
                            <i className="fab fa-whatsapp" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div className="redes">
                        <Sociais onlyicon={true} />
                    </div>
                </div>
                <div className='content'>
                    <div className="header-rs">
                        <img src="/imgs/icon.png" alt="Ícone RS Corretora de Imóveis" />
                        <div className="rs-line"></div>
                        <div className="rs-corretora">
                            <p>Raquel Silva</p>
                            <p>Corretora de Imóveis</p>
                        </div>
                    </div>

                    <div className="header-menu">
                        <Menu />
                    </div>

                    <div className="header-contato">
                        <ul>
                            <li className="wpp-div">
                                <Link to={Linkto({ type: "wpp" })} target="_blank">
                                    <div className="border">
                                        <i className="fab fa-whatsapp" aria-hidden="true"></i>
                                        <Contators type="wpp" />
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;