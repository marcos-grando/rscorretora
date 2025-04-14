import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Linkto from "../reuts/Linkto";

function ResidWpp({ title }) {

    const [isWppOpen, setIsWppOpen] = useState(false);
    const wppRef = useRef(null);

    const [textarea, setTextarea] = useState('');
    const textareaRef = useRef(null);

    const [isMob, setIsMob] = useState(false);

    useEffect(() => {
        const updateIsMob = () => {
            const width = window.innerWidth;

            if (width <= 1024) {
                setIsMob(true);
            } else {
                setIsMob(false);
            }
        };

        updateIsMob();
        window.addEventListener("resize", updateIsMob);

        return () => window.removeEventListener("resize", updateIsMob);
    }, []);


    const openWpp = () => {
        setIsWppOpen(true);
    };
    const closeWpp = () => {
        setIsWppOpen(false);
    };
    useEffect(() => {
        const clickOutWpp = (event) => {
            if (wppRef.current && !wppRef.current.contains(event.target)) {
                closeWpp();
            }
        };

        document.addEventListener("mousedown", clickOutWpp);

        return () => {
            document.removeEventListener("mousedown", clickOutWpp);
        };
    }, []);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "40px";
            const newHeight = Math.min(Math.max(textareaRef.current.scrollHeight, 40), 100);
            textareaRef.current.style.height = `${newHeight}px`;
        }
    }, [textarea]);

    const changeWpp = (event) => {
        setTextarea(event.target.value);
    };

    return (
        isMob ? (
            <a className="logowpp" target="_blank" rel="noopener noreferrer"
                href={Linkto({ type: "wpp-text", text: `Olá, Raquel. Gostaria de mais informações sobre o Residencial ${title}.` })}
            >
                <img className="wppimg" onClick={openWpp}
                    src={"/imgs/rscorretora/wpp.png"}
                    alt="Logo do whatsapp, clique para enviar mensagem"
                />
                <img className="rsimg"
                    src={"/imgs/rscorretora/rscorretora-wpp.jpg"} alt="rs imagem junto do logo do whatsapp"
                />
            </a>
        ) : isWppOpen ? (
            <div className="residwpp" ref={wppRef}>
                <img className="wppimg" onClick={closeWpp}
                    src={"/imgs/rscorretora/wpp.png"}
                    alt="Logo do whatsapp, clique para enviar mensagem"
                />
                <div className="tela-wpp">
                    <div className="wpp-title">
                        <img src="/imgs/rscorretora/rscorretora-wpp.jpg" alt="" />
                        <div className="title">
                            <p>Raquel Silva</p>
                            <p>Corretora de Imóveis</p>
                        </div>
                    </div>
                    <div className="msgs">
                        <div className="wpp-mid">
                            <div className="rs-date">
                                <p>Hoje</p>
                            </div>
                            <div className="rs-msg">
                                <p>Olá, tudo bem?</p>
                            </div>
                            <div className="rs-msg">
                                <p>Gostaria de saber mais sobre o Residencial {title}?</p>
                            </div>
                            <div className="rs-msg">
                                <p>Digite sua dúvida abaixo e entre em contato pelo Whatsap.</p>
                            </div>
                        </div>
                        <div className="wpp-msg">

                            <textarea
                                className="inputext"
                                placeholder="Envie sua mensagem..."
                                ref={textareaRef}
                                value={textarea}
                                onChange={changeWpp}
                                style={{ height: `40px` }}
                                rows={1}
                            ></textarea>

                            <a className="submit" target="_blank" rel="noopener noreferrer"
                                href={Linkto({ type: "wpp-text", text: textarea })}
                            >
                                <button> <i className="fa fa-paper-plane"></i> </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div >
        ) : (
            <div className="logowpp">
                <img className="wppimg" onClick={openWpp}
                    src={"/imgs/rscorretora/wpp.png"}
                    alt="Logo do whatsapp, clique para enviar mensagem"
                />
                <img className="rsimg"
                    src={"/imgs/rscorretora/rscorretora-wpp.jpg"} alt=""
                />
            </div>
        )
    );
}

export default ResidWpp;