import React, { useState, useEffect } from "react";
import Arrows from "../banner/Arrows";

function Banner() {

    const [ball, setBall] = useState(0);
    const [infos, setInfos] = useState([]);

    const bannerDestaques = [
        "belle-ville",
        "majestic",
        "privilege",
        "valentina",
        "colina-de-sao-pedro",
        "julio-schappo",
        "riviere-petrusse",
        "tremont"
    ]
    const condicional = (empreendimento) => bannerDestaques.includes(empreendimento['id-nome'])

    useEffect(() => {
        const fetchDate = async () => {
            const response = await fetch('/construtoras.json');
            const data = await response.json();
            const filterInfos = data.map((construtora) => {
                const filteredInfos = construtora.empreendimentos.filter(condicional);
                if (filteredInfos.length > 0) {
                    return {
                        "const-nome": construtora['const-nome'] || "Construtora não identificada",
                        "empreendimentos": filteredInfos.map((empreendimento) => ({
                            "id-nome": empreendimento['id-nome'] || "Residencial não identificado",
                            "infos-main": {
                                'banner': empreendimento['infos-main']['banner'],
                                'thumb': empreendimento['infos-main']['thumb'],
                                'subtitle': empreendimento['infos-main']['subtitle'],
                                'title': empreendimento['infos-main']['title'],
                                'local': empreendimento['infos-main']['local'],
                                'status': empreendimento['infos-main']['status'],
                                'valor': empreendimento['infos-main']['valor'],
                                'detalhes': empreendimento['infos-main']['detalhes']
                            }
                        }))
                    };
                }
                return null;
            }).filter(construtora => construtora !== null);

            setInfos(filterInfos);
        };
        fetchDate();
    }, [setInfos]);

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
                    <div className="title" title={`Residencial ${info['infos-main']?.title}`}>Residencial {info['infos-main']?.title}</div>
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
                        <button>Ver Empreendimento ⮞</button>
                    </div>
                </div>
            </div>
        )
    }));

    let ballIndex = 0;
    const divBallsMap =  infos.flatMap((construtora) => construtora.empreendimentos.map((info) =>(
        <div key={ballIndex} className={`ball`} id={ballIndex++}>
        </div>
    )));
   
    return (
        <>
            <section className="banner">
                <div className="wrapper">
                    <div className="container">
                        {divInfosMap}
                    </div>
                    <div className="balls">
                        {divBallsMap}
                    </div>
                </div>
                <div className="trace-icon">
                    <img src="./public/icon.png" alt="" />
                </div>
                <Arrows />
            </section>
        </>
    )
}

export default Banner;
