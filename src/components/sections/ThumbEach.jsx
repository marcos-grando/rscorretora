import React from "react";
import { Link } from "react-router-dom";
import Linkto from "../reuts/Linkto";

function ThumbEach({ eachItem }) {

    const details = eachItem.details

    let valor = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(eachItem.valor) || null;

    return (
        <Link to={Linkto({ type: "empreend-slug", data: eachItem })}>
            <img src={eachItem.thumb || "default.jpg"} alt={eachItem.title} loading="lazy" />
            <div className="item">
                <div className="status">{eachItem.status}</div>

                <div className="content">
                    <div className="texts">
                        <p className="title">{eachItem.name}</p>
                        <p className="local">{eachItem.local}</p>
                        <p className="valor">A partir de <span>{valor}</span></p>
                    </div>
                    <div className="infos">
                        <div className="info">
                            <i className="fas fa-bed"></i>
                            <p>{details.banheiros.max}~{details.banheiros.min}</p>
                        </div>
                        <div className="info">
                            <i className="fas fa-shower"></i>
                            <p>{details.garagens.max}~{details.garagens.min}</p>
                        </div>
                        <div className="info">
                            <i className="fas fa-car"></i>
                            <p>{details.dorms.max}~{details.dorms.min}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ThumbEach;