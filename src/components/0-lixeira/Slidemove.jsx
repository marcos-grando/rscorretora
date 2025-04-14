import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function Slidemove({ condicional, title, subtitle }) {
    const [swiperVisible, setSwiperVisible] = useState(false);
    const swiperRef = useRef(null);

    const [thumbs, setThumbs] = useState([]);

    // validação do swiperVisible (carregamento dinâmico)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target === swiperRef.current) { setSwiperVisible(true) }
                }
            })
        }, { rootMargin: "20px", threshold: 0.8, });

        if (swiperRef.current) { observer.observe(swiperRef.current) }
        return () => {
            if (swiperRef.current) { observer.unobserve(swiperRef.current) }
        }

    }, [])

    // requisição feita ao construtora.json
    useEffect(() => {
        const fetchDate = async () => {
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

            setThumbs(filterInfos);
        };
        fetchDate();
    }, [setThumbs]);

    useEffect(() => {
        const swiper = swiperRef.current.swiper;  // Acessando a instância correta do Swiper
        if (!swiper) return;

        setTimeout(() => {
            swiper.slideTo(0);
        }, 50);
    }, [thumbs]);

    return (
        <section className="slide-wrapper">
            {<Suspense fallback={<div>Carregando...</div>} >
                <div className="slide-container" ref={swiperRef}>
                    <div className="slide-title">
                        <p>{title}</p>
                        { subtitle ? <p>{subtitle}</p> : '' }
                        <div className="line"></div>
                    </div>

                    {swiperVisible && <Swiper className="slide-content"
                        modules={[Navigation]}
                        navigation
                        slidesPerView={7}
                        slidesPerGroup={1}
                        speed={600}
                        spaceBetween={20}
                        loop={false}
                        simulateTouch={true}
                        allowTouchMove={true}
                        watchSlidesProgress={true}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                    >
                        {thumbs.map((construtora) =>
                            construtora.empreendimentos.map((empreendimento) => (
                                <SwiperSlide key={empreendimento.index} data-index={empreendimento.index} className="slide-item">
                                    <img src={empreendimento['infos-main']['thumb'] || "default.jpg"} alt={empreendimento['infos-main']['title']} loading="lazy" />
                                    <p>{empreendimento['infos-main']['title']}</p>
                                    <p>{empreendimento['infos-main']['local']}</p>
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>}
                </div>
            </Suspense>}
        </section>
    );
}

export default Slidemove;