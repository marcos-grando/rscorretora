import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ResidHead from "./ResidHead";
import ResidWpp from "./ResidWpp";
import ResidMaps from "./ResidMaps";
import ResidContent from "./ResidContent";
import Slidemove from "../sections/Slidemove";
import Quadrados from "../Quadrados";
import LoadingOrPageNotfound from "../../util/LoadingOrPageNotfound";
import { getItemById, getRelatedItems } from "../../data/catalog";

function Residencial() {

    const { idParams } = useParams();

    function returnIdParams(urlParams) {
        if (!urlParams) return null;
        const id = String(urlParams).match(/^(\d+)-?/);
        return id ? Number(id[1]) : null;
    };
    const itemId = returnIdParams(idParams);

    const itemdb = getItemById(itemId);
    const related = useMemo(() => getRelatedItems(itemId), [itemId]);

    // define a string usada como classe e 'type' em clickType
    const condType = "cond";
    const aptoType = "apto";
    const planType = "plantas";
    const allType = [condType, aptoType, planType];

    const [contentType, setContentType] = useState(condType);
    const clickType = (type) => { setContentType(type); };

    // Cuida da exibição por dif telas
    const [isMob, setIsMob] = useState(false);
    const [numQuad, setNumQuad] = useState(7);

    useEffect(() => {
        const updateIsMob = () => {
            const width = window.innerWidth;

            if (width <= 430) {
                setNumQuad(5)
            } else if (width <= 460) {
                setIsMob(true);
            } else if (width <= 500) {
                setNumQuad(6);
            } else {
                setIsMob(false);
            }
        };

        updateIsMob(); // Chama ao montar o componente
        window.addEventListener("resize", updateIsMob);

        return () => window.removeEventListener("resize", updateIsMob);
    }, []);

    if (!itemdb) return <LoadingOrPageNotfound type="notFound" />;

    return (
        !itemdb ? (<p>Carregando...</p>) : (
            <>
                <Header />
                <ResidWpp title={itemdb?.name} />
                <section className="residpage">
                    <Quadrados LorR={'left'} TorB={'top'} UorD={'start'} SorE={'up'} maxSquare={numQuad} />
                    <Quadrados LorR={'right'} TorB={'top'} UorD={'end'} SorE={'up'} maxSquare={numQuad} />
                    <div className="wrapper">
                        <ResidHead residencial={itemdb} />
                        <div className="container">

                            <div className="opts">
                                <div onClick={() => clickType(condType)} className={`opt ${condType} ${contentType === condType ? 'active' : ''}`} >
                                    {isMob &&
                                        <div>
                                            <i className="fas fa-image"></i>
                                            <p>Condomínio</p>
                                        </div>
                                    }
                                    {!isMob &&
                                        <>
                                            <i className="fas fa-image"></i>
                                            <p>Condomínio</p>
                                        </>
                                    }
                                </div>
                                <div onClick={() => clickType(aptoType)} className={`opt ${aptoType} ${contentType === aptoType ? 'active' : ''}`} >
                                    {isMob &&
                                        <div>
                                            <i className="fas fa-couch"></i>
                                            <p>Apartamento</p>
                                        </div>
                                    }
                                    {!isMob &&
                                        <>
                                            <i className="fas fa-couch"></i>
                                            <p>Apartamento</p>
                                        </>
                                    }
                                </div>
                                <div onClick={() => clickType(planType)} className={`opt ${planType} ${contentType === planType ? 'active' : ''}`} >
                                    {isMob &&
                                        <div>
                                            <i className="fas fa-clipboard-list"></i>
                                            <p>Plantas</p>
                                        </div>
                                    }
                                    {!isMob &&
                                        <>
                                            <i className="fas fa-clipboard-list"></i>
                                            <p>Plantas</p>
                                        </>
                                    }
                                </div>
                            </div>
                            <ResidContent type={contentType} allType={allType} residencial={itemdb} />
                        </div>

                    </div>

                    <ResidMaps title={itemdb?.name} lati={itemdb?.latitude} long={itemdb?.longitude} />

                    {related && related.length > 0 &&
                        <Slidemove
                            title="Outros empreendimentos!"
                            subtitle=""
                            thumbs={related}
                        />
                    }

                    <Quadrados LorR={'left'} TorB={'bottom'} UorD={'start'} SorE={'down'} maxSquare={7} />
                    <Quadrados LorR={'right'} TorB={'bottom'} UorD={'end'} SorE={'down'} maxSquare={7} />
                </section>
                <Footer />
            </>
        )
    )
}

export default Residencial;
