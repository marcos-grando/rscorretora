import React from "react";
import Header from "../Header";
import Quadrados from "../Quadrados";

function Sobreall({ sobre }) {

    return (
        <>
            <Header onlyPage={true} />
            <section className="sobre-full">
                <Quadrados LorR={'left'} TorB={'top'} UorD={'start'} SorE={'up'} maxSquare={6} />
                <div className="wrapper">
                    <div className="container">
                        <div className="content">
                            <div className="title">
                                <p>Quem é Raquel Silva?</p>
                            </div>
                            <div className="texto">
                                {sobre.map((texto, i) => (
                                    <p key={i}>{texto}</p>
                                ))}
                            </div>
                        </div>
                        <div className="media">
                            <img src="./imgs/rscorretora/img-rscorretora.jpeg" alt="Foto de Raquel Silva, corretora de imóveis" />
                            <div className="wha"></div>
                            <div className="email"></div>
                            <div className="creci"><p>Creci/SC 10101 A</p></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Sobreall;