import { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import FilterMenu from './FilterMenu';
import FilteredItems from './FilteredItems';
import { getAllItems } from '../../data/catalog';

function Allitems({ notOnlyPage = false, datadbNotOnly = [] }) {

    const filterRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setFilterVisible(true);
        }, { rootMargin: "5px", threshold: 0.25 });

        if (filterRef.current) observer.observe(filterRef.current);

        return () => {
            if (filterRef.current) observer.unobserve(filterRef.current);
        };
    }, []);

    const datadb = notOnlyPage ? datadbNotOnly : getAllItems();

    const [filters, setFilters] = useState({ local: [], status: [] });
    const [filterVisible, setFilterVisible] = useState(false);

    return (
        <>
            {!notOnlyPage && <Header />}
            <section className="filter" ref={filterRef}>
                <div className="wrapper">
                    <div className={!notOnlyPage ? "onlypage-title" : "filter-title"}>
                        <p>Empreendimentos</p>
                        <p>Filtrar e buscar imóveis por preferência</p>
                        <div className="line"></div>
                    </div>
                    <div className="container">
                        <FilterMenu filterRef={filterRef} filters={filters} setFilters={setFilters} datadb={datadb} />
                        {filterVisible && <FilteredItems filters={filters} datadb={datadb} />}
                    </div>
                </div>
            </section>
            {!notOnlyPage && <Footer />}
        </>
    );
};

export default Allitems;
