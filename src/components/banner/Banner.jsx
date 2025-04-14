import React from "react";
import { Link } from "react-router-dom";
import Linkto from "../reuts/Linkto";
import Arrows from "./Arrows";
import Quadrados from "../Quadrados";

function Banner({ infos }) {

    // itera sobre 'infos' e retorna a div .slide com o conteúdo do Banner formatado (R$, etc);
    const divInfosMap = infos.flatMap((construtora) => construtora.empreendimentos.map((info) => {
        let status = info['infos-main']?.status === 'Pré-lançamento' ? 'Pré lançamento' : info['infos-main']?.status || 'N/A';
        let valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(info['infos-main']?.valor) || null;

        return (
            <div key={info['id-nome'] || 'N/A'} className={`slide`} id={info['id-nome'] || 'N/A'}>
                <div className="img">
                    <div className="img-skew">
                        <img src={info['infos-main']['banner']} alt="" />
                    </div>
                    <div className="img-skew-shadow">

                    </div>
                </div>
                <div className="content">
                    <div className="status">{status}</div>
                    <div className="title" title={`Residencial ${info['infos-main']?.title}`}>{info['infos-main']?.title}</div>
                    <div className="local">{info['infos-main']?.local}</div>
                    <ul className="detalhes">
                        {info['infos-main']?.detalhes?.map((detalhe, i) => (
                            <li key={i} className="detalhe">{detalhe}</li>
                        ))}
                    </ul>
                    <div className="valor">
                        A partir de <span className="span-valor">{valor}</span>
                    </div>
                    <div className="buttons">
                        <Link to={Linkto({ type: "empreend-slug", data: info })}>
                            <button>Ver Empreendimento ⮞</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }));

    // itera sobre 'infos' para criar as bolinhas abaixo de banner
    // ballIndex serve também índice para a key
    let ballIndex = 0;
    const divBallsMap = infos.flatMap((construtora) => construtora.empreendimentos.map((info) => (
        <div key={ballIndex} className={`ball`} id={ballIndex++}>
        </div>
    )));

    return (
        <>
            <section className="banner">
                <div className="loading-bar"></div>
                <div className="wrapper">
                    <div className="container">
                        {divInfosMap}
                    </div>
                    <div className="balls">
                        {divBallsMap}
                    </div>
                </div>
                {/* <Quadrados LorR={'right'} TorB={'bottom'} UorD={'end'} SorE={'down'} maxSquare={7} /> */}
                <Quadrados LorR={'right'} TorB={'top'} UorD={'end'} SorE={'up'} maxSquare={7} />

                <Arrows />
            </section>
        </>
    )
}

export default Banner;
