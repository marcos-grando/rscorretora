import { Link } from "react-router-dom";
import Linkto from "../reuts/Linkto";
import Arrows from "./Arrows";
import Quadrados from "../Quadrados";
import { getSlides } from "../../data/catalog";

function Banner() {

    const slidedb = getSlides();

    const divInfosMap = slidedb.map((info, i) => {
        let valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(info?.item_valor) || null;

        return (
            <div key={info.id} className={`slide`} id={`${i}-${info.item_name}`}>
                <div className="img">
                    <div className="img-skew">
                        <img src={info.banner} alt="" />
                    </div>
                    <div className="img-skew-shadow">

                    </div>
                </div>
                <div className="content">
                    <div className="status">{info.status_name}</div>
                    <div className="title" title={`Residencial ${info?.item_name}`}>{info?.item_name}</div>
                    <div className="local">{info?.item_local}</div>
                    <ul className="detalhes">
                        {info?.detalhes?.map((detalhe, i) => (
                            <li key={i} className="detalhe">{detalhe}</li>
                        ))}
                    </ul>
                    <div className="valor">
                        A partir de <span className="span-valor">{valor}</span>
                    </div>
                    <div className="buttons">
                        <Link to={Linkto({ type: "empreend-slug", data: { id: info.item_id, name: info.item_name, local: info.item_local } })}>
                            <button>Ver Empreendimento ⮞</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    });

    // itera sobre 'infos' para criar as bolinhas abaixo de banner
    // ballIndex serve também índice para a key
    const divBallsMap = slidedb.map((info, index) => (
        <div key={info.id} className="ball" id={index} />
    ));

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
