import React, { useState, useRef, useEffect, useMemo } from 'react';
import Filters from './Filters';

function FilterMenu({ filters, setFilters, datadb }) {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const filterRef = useRef(null);

    const filterMobileRef = useRef(null);
    const filterInternalRef = useRef(null);
    const [filterClass, setFilterClass] = useState('topo')
    const [filterStyle, setFilterStyle] = useState({ position: "absolute", top: "-65px" });

    useEffect(() => {
        const screenUpdate = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        window.addEventListener('resize', screenUpdate);
        return () => window.removeEventListener('resize', screenUpdate);
    }, []);

    useEffect(() => {
        if (!isMobile) return; // Só ativa no mobile

        const handleScroll = () => {
            if (!filterMobileRef.current || !filterInternalRef.current) return;

            const mobileRect = filterMobileRef.current.getBoundingClientRect();
            const internalHeight = filterInternalRef.current.offsetHeight;
            const adjustedTop = (filterMobileRef.current.offsetHeight - internalHeight) - 30; // define o limite do .filter na parte INFERIOR da div pai

            if (mobileRect.top >= 65) { // mudar aqui e abaixo junto
                setFilterStyle({ position: "absolute", top: `-65px` }); // define o limite do .filter na parte SUPERIOR da div pai
                setFilterClass('topo');

            } else if (mobileRect.bottom <= internalHeight + 30) {
                setFilterStyle({ position: "absolute", top: `${adjustedTop}px` });             // define o limite do .filter na parte INFERIOR da div pai
                setFilterClass('bottom');

            } else {
                setFilterStyle({ position: "fixed", top: "0px" });
                setFilterClass('middle');
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobile]);

    const openFilter = () => {
        setIsOpenFilter(true);
        document.body.classList.add('no-scroll');
        document.querySelectorAll('.filter .wrapper .container .filter-infos .swiper .slide-items .slide-item').forEach(each => each.style.pointerEvents = 'none');
    };
    const closeFilter = () => {
        setIsOpenFilter(false);
        document.body.classList.remove('no-scroll');
        document.querySelectorAll('.filter .wrapper .container .filter-infos .swiper .slide-items .slide-item').forEach(each => each.style.pointerEvents = 'all');
    };

    useEffect(() => {
        const clickOutFilter = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                closeFilter();
            }
        };

        document.addEventListener("mousedown", clickOutFilter);
        return () => {
            document.removeEventListener("mousedown", clickOutFilter);
        };
    }, [])


    return (
        <div ref={filterMobileRef} className={isMobile ? 'filter-mobile' : 'filter-form'}>
            {!isMobile && <Filters filters={filters} setFilters={setFilters} datadb={datadb} />}
            {isMobile && (
                <div className="filter-external">
                    <div ref={filterInternalRef} className={`filter-internal`} style={{ ...filterStyle }}>
                        {isOpenFilter ?
                            <div className="filter-modal">
                                <Filters filters={filters} setFilters={setFilters} datadb={datadb} closeFilter={closeFilter} filterRef={filterRef} />
                            </div>
                            :
                            <div className={`icon ${filterClass}`} onClick={openFilter}>
                                <i className="fas fa-sliders-h"></i>
                                {/* <i className="fas fa-filter"></i> */}
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterMenu;

