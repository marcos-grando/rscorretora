import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFlip } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";

function Featureslide({ condicional, title, subtitle }) {

    const [featuresVisible, setFeaturesVisible] = useState(false);
    const featuresRef = useRef(null);

    const [features, setFeatures] = useState([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target === featuresRef.current) {setFeaturesVisible(true)}
                }
            })
        }, { rootMargin: "20px", threshold: 0.9, });

        if (featuresRef.current) {observer.observe(featuresRef.current)}
        return () => {
            if (featuresRef.current) {observer.unobserve(featuresRef.current)}
        }

    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/construtoras.json');
            const data = await response.json();

            const filterInfos = data.map((construtora) => {
                const filteredInfos = construtora.empreendimentos.filter(condicional);
                if (filteredInfos.length > 0) {
                    return {
                        "const-nome": construtora['const-nome'] || "Construtora não identificada",
                        "empreendimentos": filteredInfos.map((empreendimento) => ({
                            "id-nome": empreendimento['id-nome'] || "Residencial não identificado",
                            "infos-main": {
                                'banner': empreendimento['infos-main']['banner'],
                                'fachada': empreendimento['infos-main']['fachada'],
                                'thumb': empreendimento['infos-main']['thumb'],
                                'subtitle': empreendimento['infos-main']['subtitle'],
                                'title': empreendimento['infos-main']['title'],
                                'local': empreendimento['infos-main']['local'],
                                'status': empreendimento['infos-main']['status'],
                                'valor': empreendimento['infos-main']['valor'],
                                'detalhes': empreendimento['infos-main']['detalhes']
                            }
                        }))
                    };
                }
                return null;
            }).filter(construtora => construtora !== null);

            setFeatures(filterInfos);
        };
        fetchData();
    }, [setFeatures]);

    return(
        <section className="features-wrapper">
            {<Suspense fallback={<div>Carregando...</div>}>
                <div className="slide-container" ref={featuresRef}>
                    <div className="slide-title">
                        <p>{title}</p>
                        {subtitle ? <p>{subtitle}</p> : ''}
                        <div className="line"></div>
                    </div>
                    {featuresVisible && <Swiper className="slide-content"
                        modules={[Pagination, EffectFlip]}
                        flipEffect={{ slideShadows: false }}
                        effect="flip"
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        speed={600}
                        loop={true}
                    >
                        {features.map((construtora) =>
                            construtora.empreendimentos.map((empreendimento) => (
                                <SwiperSlide key={empreendimento['id-nome']} className="slide-item">
                                    <img src={empreendimento['infos-main']['fachada']} alt={`${empreendimento['infos-main']['title']}, lançamento em destaque.`} loading="lazy"/>
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>}
                </div>
            </Suspense>}
        </section>
    )
}

export default Featureslide;