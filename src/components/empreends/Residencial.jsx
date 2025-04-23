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
import LoadingOrNotFound from "../reuts/loadingOrNotFound";

function Residencial() {

    // exceção especial para o caso "Premiatto & Agapito" (na existência outros casos, mudar isso)
    const subType1 = "agapito";
    const subType2 = "premiatto";
    const [subType, setSubType] = useState(subType1)
    const [subResidencial, setSubResidencial] = useState(null)
    const [isSpecialCase, setIsSpecialCase] = useState(false)

    // define a string usada como classe e 'type' em clickType
    const condType = "cond";
    const aptoType = "apto";
    const planType = "plantas";
    const allType = [condType, aptoType, planType]

    const [contentType, setContentType] = useState(condType);
    const clickType = (type) => {
        setContentType(type);
    };
    const subResidType = (type) => {
        setSubType(type);
    };

    const [residencial, setResidencial] = useState(null);
    const [construtora, setConstrutora] = useState(null);
    const [allInfos, setAllInfos] = useState(null);

    const { id } = useParams();

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-")
            .trim();
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/construtoras.json');
            const data = await response.json();

            let findConstrutora = null;
            let findResidencial = null;

            const findAllInfos = data.map(construtora => ({
                empreendimentos: construtora.empreendimentos.filter(emp => generateSlug(emp["infos-main"].title + "-" + emp["infos-main"].local) !== id).map(emp => ({
                    "id-nome": emp["id-nome"],
                    "infos-main": emp["infos-main"]
                }))
            }));

            for (const construtora of data) {
                console.log("const: ", data);
                for (const empreendimento of construtora.empreendimentos) {

                    const findSlug = generateSlug(
                        empreendimento["infos-main"].title + "-" + empreendimento["infos-main"].local
                    );
                    if (findSlug === id && !findResidencial) {
                        findResidencial = empreendimento;
                        findConstrutora = {
                            "const-nome": construtora["const-nome"],
                            "logo": construtora.logo
                        };
                    }
                }
            }

            setAllInfos(findAllInfos);
            setConstrutora(findConstrutora || false);
            setResidencial(findResidencial || false);

            const specialCase = findResidencial && !("infos-cond" in findResidencial);
            if (specialCase) {
                setSubResidencial(findResidencial[subType]);
                setIsSpecialCase(true);
            }
        };
        fetchData();
    }, [id, subType]);

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

    // if (residencial === false) {
    //     return <ResidException type={"loading"} />
    // } else if (residencial === null ) {
    //     return <ResidException type={"notFound"} />
    // }
    if (residencial === null) {
        return <LoadingOrNotFound type={"loading"} />
    } else if (residencial === false ) {
        return <LoadingOrNotFound type={"notFound"} />
    }

    return (
        <>
            <Header />
            <ResidWpp title={residencial["infos-main"].title} />
            <section className="residpage">
                <Quadrados LorR={'left'} TorB={'top'} UorD={'start'} SorE={'up'} maxSquare={numQuad} />
                <Quadrados LorR={'right'} TorB={'top'} UorD={'end'} SorE={'up'} maxSquare={numQuad} />
                <div className="wrapper">
                    <ResidHead residencial={residencial} construtora={construtora} />
                    <div className="container">
                        {isSpecialCase && (
                            <div className="sub-opts">
                                <div onClick={() => subResidType(subType1)} className={`opt ${subType1} ${subType === subType1 ? 'active' : ''}`} >
                                    <p>Agapito</p>
                                </div>
                                <div onClick={() => subResidType(subType2)} className={`opt ${subType2} ${subType === subType2 ? 'active' : ''}`} >
                                    <p>Premiatto</p>
                                </div>
                            </div>
                        )}

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
                        <ResidContent type={contentType} allType={allType}
                            residencial={isSpecialCase ? subResidencial : residencial}
                        />
                    </div>

                </div>

                <ResidMaps title={residencial["infos-main"].title} lati={residencial["infos-main"]["lati"]} long={residencial["infos-main"]["long"]} />

                <Slidemove
                    title="Outros empreendimentos!"
                    subtitle=""
                    thumbs={allInfos}
                />

                <Quadrados LorR={'left'} TorB={'bottom'} UorD={'start'} SorE={'down'} maxSquare={7} />
                <Quadrados LorR={'right'} TorB={'bottom'} UorD={'end'} SorE={'down'} maxSquare={7} />
            </section>
            <Footer />
        </>
    )
}

export default Residencial;