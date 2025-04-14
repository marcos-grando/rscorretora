import React, { useState, useEffect, useRef, useMemo, lazy, Suspense } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import FilterMenu from './FilterMenu';
import FilteredItems from './FilteredItems';

function Allitems({ onlyPage, data }) {
    const [filters, setFilters] = useState({ local: [], status: [] });
    const [filterVisible, setFilterVisible] = useState(false);
    const filterRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setFilterVisible(true);
        }, { rootMargin: "5px", threshold: 0.05 });

        if (filterRef.current) observer.observe(filterRef.current);

        return () => {
            if (filterRef.current) observer.unobserve(filterRef.current);
        };
    }, []);

    return (
        <>
            {onlyPage && <Header />}
            <section className="filter" ref={filterRef}>
                <div className="wrapper">
                    <div className={onlyPage ? "onlypage-title" : "filter-title"}>
                        <p>Empreendimentos</p>
                        <p>Filtrar e buscar imóveis por preferência</p>
                        <div className="line"></div>
                    </div>


                    <div className="container">
                        <FilterMenu filterRef={filterRef} filters={filters} setFilters={setFilters} data={data} />
                        {/* <FilterTeste /> */}
                        {filterVisible && <FilteredItems filters={filters} data={data} />}
                    </div>
                </div>
            </section>
            {onlyPage && <Footer />}
        </>
    );
};

export default Allitems;
