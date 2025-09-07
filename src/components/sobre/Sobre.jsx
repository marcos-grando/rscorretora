import React from "react";
import { Link } from "react-router-dom";
import Linkto from "../reuts/Linkto";
import Quadrados from "../Quadrados";
import { texto_sobre } from "../../util/textoSobre";

function Sobre() {

    return (
        !texto_sobre ? (<p>Carregando...</p>) : (
            <section className="sobre">
                <div className="sobre-wrapper">
                    <div className="sobre-title">
                        <p>Raquel Silva</p >
                        <p>Corretora de Imóveis</p>
                        <div className="line"></div>
                    </div >
                    <div className="container">
                        <div className="content">

                            <div className="texto">
                                <h2>Quem é Raquel Silva?</h2>
                                {texto_sobre.slice(0, 2).map((texto, i) => (
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
                </div >
            </section >
        )
    )
}

export default Sobre;