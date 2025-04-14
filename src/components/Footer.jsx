import React from "react";
import { Link } from "react-router-dom";
import Menu from "./reuts/Menu";
import Sociais from "./reuts/Sociais";
import Contators from "./reuts/Contators";
import Linkto from "./reuts/Linkto";
import Blog from "./blog/Blog";

function Footer() {

    return (
        <footer>
            <div className={'wrapper'}>
                <div className="line">
                    <img src="/imgs/icon.png" alt="Ícone RS Corretora de Imóveis" />
                </div>
                <div className="container">
                    <div className="content">
                        <div className="infos">
                            <div className="rs-corretora">
                                <p>Raquel Silva</p>
                                <p>Corretora de Imóveis</p>
                            </div>

                            <Contators type={"Creci"} />

                            <div className="rs-contato">
                                <Link className="wpp"
                                    title="Enviar mensagem via Whatsapp"
                                    to={Linkto({ type: "wpp" })} target="_blank"
                                >
                                    <i className="fab fa-whatsapp"></i><Contators type={"wpp"} />
                                </Link>
                                <Contators type={"email"} />
                            </div>
                        </div>
                        <div className="menu">
                            <p className="title">Menu</p>
                            <Menu />
                        </div>
                        <div className="redes">
                            <p className="title">Redes Sociais</p>
                            <Sociais />
                        </div>
                        <div className="blog">
                            <p className="title">Reportagens</p>
                            <Blog type={"relacionais"} noImg={true} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;