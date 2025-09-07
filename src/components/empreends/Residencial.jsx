import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ResidHead from "./ResidHead";
import ResidWpp from "./ResidWpp";
import ResidMaps from "./ResidMaps";
import ResidContent from "./ResidContent";
import Slidemove from "../sections/Slidemove";
import Quadrados from "../Quadrados";
import LoadingOrPageNotfound from "../reuts/LoadingOrPageNotfound";
import { supabase } from "../../util/supabaseClient";

function Residencial() {

    const { idParams } = useParams();

    function returnIdParams(urlParams) {
        if (!urlParams) return null;
        const id = String(urlParams).match(/^(\d+)-?/);
        return id ? Number(id[1]) : null;
    };
    const itemId = returnIdParams(idParams);

    const [itemdb, setItemdb] = useState(null);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        const fetchItemdb = async () => {
            const { data, error } = await supabase.from('items').select('*, const_logo:construtoras(logo), type_name:types(single), status_name:status(name)').eq('id', itemId).maybeSingle();
            if (error) console.error(error);
            setItemdb(data ?? []);
        };
        fetchItemdb();
    }, [idParams]);

    useEffect(() => {
        const fetchRelateddb = async () => {
            // const { data, error } = await supabase.from('view_all_items_withypes').select('*').eq('local', itemdb?.local).eq('status_id', itemdb?.status_id).neq('id', itemdb?.id).limit(10);
            const { data, error } = await supabase.rpc('related_smart', {
                _local: itemdb.local,
                _status_id: itemdb.status_id,
                _exclude_id: itemdb.id,
                _limit: 10
            });
            if (error) console.error(error);
            setRelated(data ?? []);
        };
        fetchRelateddb();
    }, [itemdb?.id, itemdb?.local, itemdb?.status_id]);
    // console.log(itemdb)

    // define a string usada como classe e 'type' em clickType
    const condType = "cond";
    const aptoType = "apto";
    const planType = "plantas";
    const allType = [condType, aptoType, planType]

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

    if (itemdb === null) {
        return <LoadingOrPageNotfound type={"loading"} />
    } else if (itemdb === false) {
        return <LoadingOrPageNotfound type={"notFound"} />
    }

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

                    <Slidemove
                        title="Outros empreendimentos!"
                        subtitle=""
                        thumbs={related}
                    />

                    <Quadrados LorR={'left'} TorB={'bottom'} UorD={'start'} SorE={'down'} maxSquare={7} />
                    <Quadrados LorR={'right'} TorB={'bottom'} UorD={'end'} SorE={'down'} maxSquare={7} />
                </section>
                <Footer />
            </>
        )
    )
}

export default Residencial;