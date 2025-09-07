import React, { useEffect, useState } from "react";

function ResidHead({ residencial }) {

    const [isMob, setIsMob] = useState(false);

    useEffect(() => {
        const updateIsMob = () => {
            const width = window.innerWidth;

            if (width <= 460) {
                setIsMob(true);
            } else {
                setIsMob(false);
            }
        };

        updateIsMob(); // Chama ao montar o componente
        window.addEventListener("resize", updateIsMob);

        return () => window.removeEventListener("resize", updateIsMob);
    }, []);

    const const_logo = residencial?.const_logo?.logo?.url;

    const details = residencial?.extradb?.details;
    const dormsMinMax = `${details?.dorms?.min}~${details?.dorms?.max}`;
    const banheirosMinMax = `${details?.banheiros?.min}~${details?.banheiros?.max}`;
    const garagensMinMax = `${details?.garagens?.min}~${details?.garagens?.max}`;

    const valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(residencial.valor) || null;

    return (
        !residencial ? (<p>Carregando...</p>) : (
            <div className="head">
                <div className="img">
                    <img src={residencial?.thumb?.url} alt={`Thumbnail do Residencial ${residencial.title}`} className="thumb" />
                    <img src={residencial?.logo?.url} alt={`Logotipo do Residencial ${residencial.title}`} className="logo" />
                </div>
                <div className="texto">
                    <p className="status">{residencial.status_name.name}</p>
                    <p className="title">{residencial.type_name.single} {residencial.name}</p>
                    <p className="local">{residencial.local}</p>
                    <p className="valor">Imóveis a partir de <span>{valor}</span></p>
                    {const_logo && <img className="constlogo" src={const_logo} alt="" />}
                    <div className="infos">
                        <div className="info">
                            {isMob ?
                                <>
                                    <div>
                                        <i className="fas fa-bed"></i>
                                        <p>{dormsMinMax}</p>
                                        <p>Dorms</p>
                                    </div>

                                </>
                                :
                                <>
                                    <i className="fas fa-bed"></i>
                                    <p>{dormsMinMax} Dorms</p>
                                </>
                            }
                        </div>
                        <div className="info">
                            {isMob ?
                                <>
                                    <div>
                                        <i className="fas fa-shower"></i>
                                        <p>{banheirosMinMax}</p>
                                        <p>Banheiros</p>
                                    </div>
                                </>
                                :
                                <>
                                    <i className="fas fa-shower"></i>
                                    <p>{banheirosMinMax} Banheiros</p>
                                </>
                            }
                        </div>
                        <div className="info">
                            {isMob ?
                                <>
                                    <div>
                                        <i className="fas fa-car"></i>
                                        <p>{garagensMinMax}</p>
                                        <p>Garagem</p>
                                    </div>
                                </>
                                :
                                <>
                                    <i className="fas fa-car"></i>
                                    <p>{garagensMinMax} Garagem</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default ResidHead;