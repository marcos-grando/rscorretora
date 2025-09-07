import React from "react";
import { texto_sobre } from "../../util/textoSobre";
import Contators from "../reuts/Contators";
import Header from "../Header";
import Footer from "../Footer";

function SobreOnlypage() {

    return (
        <>
            <Header />
            <section className="sobre-full">
                <div className="wrapper">
                    <div className="container">

                        <div className="content">

                            <div className="title">
                                <p>Quem é Raquel Silva?</p>
                            </div>

                            <img src="/imgs/rscorretora/img-rscorretora.jpeg" alt="Foto de Raquel Silva, corretora de imóveis" />

                            <div className="texto">
                                {texto_sobre.map((texto, i) => (
                                    <p key={i}>{texto}</p>
                                ))}
                                <div className="wpp">
                                    <i className="fab fa-whatsapp" aria-hidden="true"></i>
                                    <Contators type="wpp" />
                                </div>
                                <div className="email">
                                    <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                                    <Contators type="email" />
                                </div>
                                <div className="creci">
                                    <i className="fa-solid fa-thumbtack" aria-hidden="true"></i>
                                    <Contators type="Creci" />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default SobreOnlypage;