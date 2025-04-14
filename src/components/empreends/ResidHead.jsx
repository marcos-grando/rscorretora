import React, { useEffect, useState } from "react";

function ResidHead({ residencial, construtora }) {

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

    const resid = residencial['infos-main'];

    let status = resid.status === 'Pré-lançamento' ? 'Pré lançamento' : resid.status || 'N/A';
    let valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resid.valor) || null;

    return (
        <div className="head">
            <div className="img">
                <img src={resid.thumb} alt={`Thumbnail do Residencial ${resid.title}`} className="thumb" />
                <img src={resid.logo} alt={`Logotipo do Residencial ${resid.title}`} className="logo" />
            </div>
            <div className="texto">
                <p className="status">{status}</p>
                <p className="title">{resid.subtitle} {resid.title}</p>
                <p className="local">{resid.local}</p>
                <p className="valor">Imóveis a partir de <span>{valor}</span></p>
                <img className="constlogo" src={construtora.logo} alt="" />
                <div className="infos">
                    <div className="info">
                        {isMob ?
                            <>
                                <div>
                                    <i className="fas fa-bed"></i>
                                    <p>1~3</p>
                                    <p>Dorms</p>
                                </div>
                                
                            </>
                            :
                            <>
                                <i className="fas fa-bed"></i>
                                <p>1~3 Dorms</p>
                            </>
                        }
                    </div>
                    <div className="info">
                        {isMob ?
                            <>
                                <div>
                                    <i className="fas fa-shower"></i>
                                    <p>1~3</p>
                                    <p>Banheiros</p>
                                </div>
                                
                            </>
                            :
                            <>
                                <i className="fas fa-shower"></i>
                                <p>1~3 Banheiros</p>
                            </>
                        }
                    </div>
                    <div className="info">
                        {isMob ?
                            <>
                                <div>
                                    <i className="fas fa-car"></i>
                                    <p>1~3</p>
                                    <p>Garagem</p>
                                </div>
                                
                            </>
                            :
                            <>
                                <i className="fas fa-car"></i>
                                <p>1~3 Garagem</p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResidHead;