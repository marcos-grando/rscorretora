import React, { useState, useEffect, useRef, useMemo, lazy, Suspense } from 'react';
import Header from '../Header';
import Footer from '../Footer';
const ThumbEach = lazy(() => import('../sections/ThumbEach'));
// import ThumbEach from './ThumbEach';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Allitems = ({ onlyPage, data }) => {
    const [filters, setFilters] = useState({ local: [], status: [] });

    const [filterVisible, setFilterVisible] = useState(false);
    const filterRef = useRef(null);

    const [filterScroll, setFilterScroll] = useState(0);
    const scrollRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);

    const [isOpen, setIsOpen] = useState(false)
    const openRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setFilterVisible(true);
        }, { rootMargin: "5px", threshold: 0.05 });

        if (filterRef.current) observer.observe(filterRef.current);

        return () => {
            if (filterRef.current) observer.unobserve(filterRef.current);
        };
    }, []);

    // caso mobile: determina o "bottom" do filter, para que siga a tela sem sair do container;
    useEffect(() => {
        const downScroll = () => {
            if (!scrollRef.current) return;

            const scrollRect = scrollRef.current.getBoundingClientRect();
            const scrollWindow = window.innerHeight;

            if (scrollRect.bottom <= scrollWindow) {
                setFilterScroll(scrollWindow - scrollRect.bottom);
            } else {
                setFilterScroll(0);
            }
        };
        window.addEventListener("scroll", downScroll);
        return () => window.removeEventListener("scroll", downScroll);
    }, []);

    // atualiza o estado isMobile qnd width <= 900;
    useEffect(() => {
        const updateItemsPerRow = () => {
            const width = window.innerWidth;
            if (width <= 900) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        updateItemsPerRow();
        window.addEventListener('resize', updateItemsPerRow);

        return () => window.removeEventListener('resize', updateItemsPerRow);
    }, []);

    // abre e fecha menu de filtragem
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openRef.current && !openRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const locaisUnicos = useMemo(() => [
        ...new Set(data.flatMap(item => item.empreendimentos.map(emp => emp['infos-main'].local)))
    ], [data]);
    const statusUnicos = useMemo(() => [
        ...new Set(data.flatMap(item => item.empreendimentos.map(emp => emp['infos-main'].status)))
    ], [data]);

    // Filtro eficiente
    const filteredData = useMemo(() =>
        data.flatMap(construtora =>
            construtora.empreendimentos.filter(empreendimento => {
                const { local, status } = empreendimento['infos-main'];
                return (
                    (filters.local.length === 0 || filters.local.includes(local)) &&
                    (filters.status.length === 0 || filters.status.includes(status))
                );
            })
        ), [data, filters]
    );

    const choiceFilter = (category, value) => {
        setFilters((prevFilters) => {
            const updatedCategory = prevFilters[category].includes(value)
                ? prevFilters[category].filter((item) => item !== value)
                : [...prevFilters[category], value];

            return { ...prevFilters, [category]: updatedCategory };
        });
    };
    // calculo para quantidade de items por slide
    const totalFilters = filteredData.length;
    const itemsGroup = 15;
    const totalGroups = Math.ceil(totalFilters / itemsGroup);

    return (
        <>
            {onlyPage ? <Header /> : ''}
            <section className="filter" ref={filterRef}>
                <div className="wrapper">
                    <div className={onlyPage ? "onlypage-title" : "filter-title"}>
                        <p>Empreendimentos</p>
                        {/* <p>Filtrar por preferência</p> */}
                        <p>Filtrar e buscar imóveis por preferência</p>
                        <div className="line"></div>
                    </div>
                    <div className="container">
                        <div ref={openRef} className={`filter-form ${isOpen ? "show" : "icon"}`} style={{ bottom: isMobile ? `${filterScroll}px` : 'none' }} >
                            {!isOpen && <div onClick={() => setIsOpen(true)} className="filter-toggle" >☰</div>}
                            {isOpen &&
                                <>
                                    <p>Filtrar busca por:</p>
                                    <div className="local-filter">
                                        <p>Localização</p>
                                        {locaisUnicos.map((local) => (
                                            <label key={local}>
                                                <input
                                                    type="checkbox"
                                                    checked={filters.local.includes(local)}
                                                    onChange={() => choiceFilter('local', local)}
                                                />
                                                {local}
                                            </label>
                                        ))}
                                    </div>
                                    <div className="status-filter">
                                        <p>Situação</p>
                                        {statusUnicos.map((status) => (
                                            <label key={status}>
                                                <input
                                                    type="checkbox"
                                                    checked={filters.status.includes(status)}
                                                    onChange={() => choiceFilter('status', status)}
                                                />
                                                {status}
                                            </label>
                                        ))}
                                    </div>
                                </>
                            }
                        </div>

                        {filterVisible && (
                            <Suspense fallback={<div>Carregando...</div>}>
                                <div className="filter-infos">
                                    <Swiper
                                        modules={[Navigation]}
                                        navigation
                                        slidesPerView={1}
                                        slidesPerGroup={1}
                                        speed={600}
                                        // spaceBetween={20}
                                        autoHeight={true}
                                    >
                                        {Array.from({ length: totalGroups }, (_, i) => (
                                            <SwiperSlide key={i} className="slide-items">
                                                {filteredData.slice(i * itemsGroup, i * itemsGroup + itemsGroup).map((empreendimento, ii) => (
                                                    <div key={ii} className="slide-item">
                                                        <ThumbEach empreendimento={empreendimento} />
                                                    </div>
                                                ))}
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </Suspense>
                        )}
                    </div>
                </div>
            </section>
            {onlyPage ? <Footer /> : ''}
        </>
    );
};

export default Allitems;
