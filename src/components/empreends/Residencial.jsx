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

function Residencial({ data }) {

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

    const [residencial, setResidencial] = useState(null);
    const [construtora, setConstrutora] = useState(null);

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

    const subResidType = (type) => {
        setSubType(type);
    }
    const clickType = (type) => {
        setContentType(type);
    };

    useEffect(() => {
        const foundConstrutora = data.find(construtora =>
            construtora.empreendimentos.some(empreendimento =>
                generateSlug(empreendimento["infos-main"].title + "-" + empreendimento["infos-main"].local) === id
            )
        );

        if (foundConstrutora) {
            const foundResidencial = foundConstrutora.empreendimentos.find(empreendimento =>
                generateSlug(empreendimento["infos-main"].title + "-" + empreendimento["infos-main"].local) === id
            );

            setConstrutora(foundConstrutora);
            setResidencial(foundResidencial)

            const specialCase = !("infos-cond" in foundResidencial);
            if (specialCase) {
                setSubResidencial(foundResidencial[subType]);
                setIsSpecialCase(true);
            }
        }
    }, [id, data, subType]);

    if (!construtora) {
        return <p>Construtora não encontrado</p>;
    }
    if (!residencial) {
        return <p>Residencial não encontrado</p>;
    }

    // console.log(subResidencial['infos-cond']['imagens-cond'])

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
                    thumbs={data}
                />

                <Quadrados LorR={'left'} TorB={'bottom'} UorD={'start'} SorE={'down'} maxSquare={7} />
                <Quadrados LorR={'right'} TorB={'bottom'} UorD={'end'} SorE={'down'} maxSquare={7} />
            </section>
            <Footer />
        </>
    )
}

export default Residencial;