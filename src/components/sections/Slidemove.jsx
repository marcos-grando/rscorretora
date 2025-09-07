import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import ThumbEach from './ThumbEach';

function Slidemove({ thumbs, title, subtitle }) {

    const [itemsSlide, setItemsSlide] = useState(4);
    const [distanceItem, setDistanceItem] = useState(40);
    const [itemPadding, setItemPadding] = useState(null);

    const [swiperVisible, setSwiperVisible] = useState(false);
    const swiperContainerRef = useRef(null);
    const swiperRef = useRef(null);

    // validação do swiperVisible (carregamento dinâmico)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { setSwiperVisible(true); }
            });
        }, { rootMargin: "20px", threshold: 0.8 });

        if (swiperContainerRef.current) observer.observe(swiperContainerRef.current);

        return () => {
            if (swiperContainerRef.current) observer.unobserve(swiperContainerRef.current);
        };
    }, []);

    useEffect(() => {
        if (!swiperRef.current || !swiperRef.current.swiper) return;

        const swiper = swiperRef.current.swiper;

        setTimeout(() => {
            swiper.slideTo(0);
        }, 50);
    }, [thumbs]);

    useEffect(() => {
        const updateItemsPerRow = () => {
            const width = window.innerWidth;

            if (width <= 515) {
                setItemsSlide(1);
                setDistanceItem(10);
                setItemPadding(4.6);
            } else if (width <= 825) {
                setItemsSlide(2);
                setDistanceItem(20);
                setItemPadding(4.8);
            } else if (width <= 1220) {
                setItemsSlide(3);
                setDistanceItem(30);
                setItemPadding(6.6);
            } else {
                setItemsSlide(4);
                setDistanceItem(40);
                setItemPadding(6.5);
            }
        };
        updateItemsPerRow();
        window.addEventListener('resize', updateItemsPerRow);

        return () => window.removeEventListener('resize', updateItemsPerRow);
    }, []);

    return (
        <section className="slide-wrapper">
            {<Suspense fallback={<div>Carregando...</div>} >
                <div className="slide-container" ref={swiperContainerRef}>
                    <div className="slide-title">
                        <p>{title}</p>
                        {subtitle ? <p>{subtitle}</p> : ''}
                        <div className="line"></div>
                    </div>

                    {swiperVisible && <Swiper className="slide-content"
                        style={{ paddingLeft: `${itemPadding}rem`, paddingRight: `${itemPadding}rem` }}
                        modules={[Navigation]}
                        navigation
                        slidesPerView={itemsSlide}
                        slidesPerGroup={1}
                        speed={600}
                        spaceBetween={distanceItem}
                        loop={false}
                        simulateTouch={true}
                        allowTouchMove={true}
                        watchSlidesProgress={true}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                    >
                        {thumbs.map((eachItem, i) => (
                            <SwiperSlide className="slide-item"
                                title={`Ver mais sobre o residencial ${eachItem.name}`}
                                key={i}
                                data-index={i}
                            >
                                <ThumbEach eachItem={eachItem} />
                            </SwiperSlide>
                        ))}
                    </Swiper>}
                </div>
            </Suspense>}
        </section>
    );
}

export default Slidemove;