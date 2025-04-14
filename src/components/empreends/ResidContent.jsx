import React, { useEffect, useState } from "react";

function ResidContent({ type, residencial, allType }) {

    const [isModalOpen, setIsModalOpen] = useState(false);      // abre/fecha a imagem
    const [selectImage, setSelectImage] = useState(null);   // armazena a imagem clicada
    const [imageList, setImageList] = useState([]);         // lista de todas as imagens do 'tipo'
    const [selectIndex, setSelectIndex] = useState(0);      // índice que será usada para navegação

    useEffect(() => {
        const imgs = document.querySelectorAll(".img");
        imgs.forEach(img => {
            img.classList.remove("animate");
            void img.offsetWidth; // Força reflow
            img.classList.add("animate");
        });
    }, [residencial, type]);


    const openModal = (imgSrc, index, imgs) => {
        setSelectImage(imgSrc);
        setSelectIndex(index);
        setImageList(imgs);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectImage(null);
    };
    const nextImg = () => {
        const newIndex = (selectIndex + 1) % imageList.length;
        setSelectIndex(newIndex);
        setSelectImage(imageList[newIndex]);
    };
    const prevImg = () => {
        const newIndex = (selectIndex - 1 + imageList.length) % imageList.length;
        setSelectIndex(newIndex);
        setSelectImage(imageList[newIndex]);
    };


    let resid
    let render
    switch (type) {

        case allType[0]:
            resid = residencial["infos-cond"]["imagens-cond"];

            resid ?
                render = resid.map((item, i) => (
                    <div key={i} className="img"
                        style={{ animationDelay: `${(i * 2)}0ms` }}
                        onClick={() => openModal(item.img, i, resid.map(img => img.img))}
                    >
                        <img src={item.img} alt={item.desc} />
                        <p>{item.desc}</p>
                        <p>{item.title}</p>
                    </div>
                ))
                :
                render = <div className="sem-img">
                    <div className="sem-img2" style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
                        <i className="fas fa-camera" style={{ fontSize: "4em", opacity: "0.75" }}></i>
                        <p>Sem fotos no momento!</p>
                    </div>
                </div>;
            break;

        case allType[1]:
            resid = residencial["infos-apto"]["imagens-apto"];

            resid ?
                render = resid.map((item, i) => (
                    <div key={i} className="img"
                        style={{ animationDelay: `${(i * 2)}0ms` }}
                        onClick={() => openModal(item.img, i, resid.map(img => img.img))}
                    >
                        <img src={item.img} alt="Imagem do apto" />
                    </div>
                ))
                :
                render = <div className="sem-img">
                    <div className="sem-img2" style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
                        <i className="fas fa-camera" style={{ fontSize: "4em", opacity: "0.75" }}></i>
                        <p>Sem fotos no momento!</p>
                    </div>
                </div>;
            break;

        case allType[2]:
            resid = residencial["infos-plantas"]["imagens-plantas"];

            resid ?
                render = resid.map((item, i) => (
                    <div key={i} className="img"
                        style={{ animationDelay: `${(i * 2)}0ms` }}
                        onClick={() => openModal(item.img, i, resid.map(img => img.img))}
                    >
                        <img src={item.img} alt={item.desc} />
                        <p>{item.desc}</p>
                        <p>{item.title}</p>
                    </div>
                ))
                :
                render = <div className="sem-img">
                    <div className="sem-img2" style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
                        <i className="fas fa-camera" style={{ fontSize: "4em", opacity: "0.75" }}></i>
                        <p>Sem fotos no momento!</p>
                    </div>
                </div>;
            break;

        default:
            return <div>Sem imagens no momento!</div>;
    }

    return (
        <div className="content">

            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-container">

                        {/* criar uma div juntando os dois aqui, pro X ficar suave sempre em cima da img */}
                        <div className="img">
                            <span className="close">&times;</span>
                            <img className="modal-content" src={selectImage} alt="Ampliada" />
                        </div>

                        <button className="prev" onClick={(e) => { e.stopPropagation(); prevImg(); }}>‹</button>
                        <button className="next" onClick={(e) => { e.stopPropagation(); nextImg(); }}>›</button>

                    </div>
                </div>
            )}
            <div className="infos-imgs">
                {render}
            </div>

            <div className="infos-desc">
                <div className="infos-desc-container">
                    <div className="plantas">
                        <p>Plantas disponíveis:</p>
                        <ul>
                            {residencial["infos-plantas"]["detalhes-plantas"].map((info, i) => (
                                <li key={i}>
                                    <i className="fas fa-circle"></i>
                                    {info}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="cond">
                        <p>Áreas do condomínio:</p>
                        <ul>
                            {residencial["infos-cond"]["detalhes-cond"].map((info, i) => (
                                <li key={i}>
                                    <i className="fas fa-check"></i>
                                    {info}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="apto">
                        <p>Detalhes dos aptos:</p>
                        <ul>
                            {residencial["infos-apto"]["detalhes-apto"].map((info, i) => (
                                <li key={i}>
                                    <i className="fas fa-check"></i>
                                    {info}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResidContent;