import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import FilterMenu from './FilterMenu';
import FilteredItems from './FilteredItems';
import { supabase } from '../../util/supabaseClient';

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

    const [datadbState, setDatadbState] = useState([]);
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        if (!notOnlyPage) {
            const fetchDatadb = async () => {
                const { data, error } = await supabase.from('view_all_items_withypes').select('*');
                if (error) console.error(error);
                setDatadbState(data || []);
                setLoadingState(false);
            };
            fetchDatadb();
        }
    }, [notOnlyPage]);

    const datadb = notOnlyPage ? datadbNotOnly : datadbState;

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
