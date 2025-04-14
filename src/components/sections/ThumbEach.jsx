import React from "react";
import { Link } from "react-router-dom";
import Linkto from "../reuts/Linkto";

function ThumbEach({ empreendimento }) {

    const resid = empreendimento['infos-main'];

    let valor = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(resid['valor']) || null;

    return (
        <Link to={Linkto({ type: "empreend-slug", data: empreendimento })}>
            <img src={resid['thumb'] || "default.jpg"} alt={resid['title']} loading="lazy" />
            <div className="item">
                <div className="status">{resid['status']}</div>

                <div className="content">
                    <div className="texts">
                        <p className="title">{resid['title']}</p>
                        <p className="local">{resid['local']}</p>
                        <p className="valor">A partir de <span>{valor}</span></p>
                    </div>
                    <div className="infos">
                        <div className="info">
                            <i className="fas fa-bed"></i>
                            <p>1~3</p>
                        </div>
                        <div className="info">
                            <i className="fas fa-shower"></i>
                            <p>1~3</p>
                        </div>
                        <div className="info">
                            <i className="fas fa-car"></i>
                            <p>1~3</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ThumbEach;