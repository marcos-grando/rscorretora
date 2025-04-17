import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Linkto from "../reuts/Linkto";
import Header from "../Header";
import Footer from "../Footer";
import Quadrados from "../Quadrados";
import Contators from "../reuts/Contators";

function Sobre({ sobre, onlyPage }) {

    return (
        <>
            {onlyPage ?
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
                                        {sobre.map((texto, i) => (
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
                :
                <section className="sobre">             
                    <div className="sobre-wrapper">
                        <div className="sobre-title">
                            <p>Raquel Silva</p>
                            <p>Corretora de Imóveis</p>
                            <div className="line"></div>
                        </div>
                        <div className="container">
                            <div className="content">

                                <div className="texto">
                                    <h2>Quem é Raquel Silva?</h2>
                                    {sobre.slice(0, 2).map((texto, i) => (
                                        <div key={i} className="frase">
                                            <p>{texto}</p>
                                        </div>
                                    ))}
                                    <Link to={Linkto({ type: 'menuSobre' })}>
                                        <button>Texto completo <span>›</span> </button>
                                    </Link>
                                </div>

                                <div className="img">
                                    <div className="img-skew">
                                        <img src="./imgs/rscorretora/2-banner-floripa.jpg" alt="Fotografia área de florianópolis" />
                                    </div>
                                </div>


                            </div>
                            <p className="fotopor">Foto por <a target="_blank" href="https://www.pexels.com/pt-br/@henrique-braga-105197502/" >Henrique Braga</a></p>
                            <Quadrados LorR={'left'} TorB={'bottom'} UorD={'start'} SorE={'down'} maxSquare={5} />
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default Sobre;