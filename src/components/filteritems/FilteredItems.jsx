import React, { useMemo, lazy, Suspense, useState, useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

const ThumbEach = lazy(() => import('../sections/ThumbEach'));

function FilteredItems({ filters, datadb }) {

    const [gridStyle, setGridStyle] = useState({ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(auto, 1fr)" });
    const [itemTotal, setItemsTotal] = useState(16);

    const containerRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);

    const filteredDatadb = useMemo(() => {
        const result = datadb.filter(eachItem => {
            const { local, status } = eachItem;
            return (
                (filters.local.length === 0 || filters.local.includes(local)) &&
                (filters.status.length === 0 || filters.status.includes(status))
            );
        });
        return result;
    }, [datadb, filters]);

    useEffect(() => {
        setCurrentPage(0);
    }, [datadb, filters]);

    const isNull = filteredDatadb.length === 0;

    useEffect(() => {
        const updateItemsPerRow = () => {
            const width = window.innerWidth;

            if (width <= 425) {
                setGridStyle({ gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "repeat(auto, 1fr)" });
                setItemsTotal(8);
            } else if (width <= 580) {
                setGridStyle({ gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "repeat(auto, 1fr)" });
                setItemsTotal(6);
            } else if (width <= 844) {
                setGridStyle({ gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(auto, 1fr)" });
                setItemsTotal(9);
            } else if (width <= 1024) {
                setGridStyle({ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(auto, 1fr)" });
                setItemsTotal(12);
            } else if (width <= 1124) {
                setGridStyle({ gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(auto, 1fr)" });
                setItemsTotal(12);
            } else {
                setGridStyle({ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(auto, 1fr)" });
                setItemsTotal(16);
            }
        };

        updateItemsPerRow(); // Chama ao montar o componente
        window.addEventListener("resize", updateItemsPerRow);

        return () => window.removeEventListener("resize", updateItemsPerRow);
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;
        const OFFSET = 72; // ajuste se tiver navbar fixa
        const y = containerRef.current.getBoundingClientRect().top + window.scrollY - OFFSET;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }, [currentPage]);

    const itemsGroup = itemTotal;
    const totalGroups = Math.ceil(filteredDatadb.length / itemsGroup);
    const currentItems = filteredDatadb.slice(currentPage * itemsGroup, currentPage * itemsGroup + itemsGroup);

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <div ref={containerRef} className="filter-infos">
                {isNull &&
                    <div className='noResult'>
                        <div className="building">
                            <i className="fas fa-building front"></i>
                            <i className="fas fa-building back"></i>
                        </div>
                        <p>Nenhum empreendimento encontrado</p>
                    </div>
                }
                <>
                    {!isNull && <p className='total-cards'>{filteredDatadb.length} empreendimento(s) encontrado(s)</p>}
                    <div className="slide-items" style={{ display: 'grid', gap: '1em', ...gridStyle }}>
                        {currentItems.map((eachItem, i) => (
                            <div key={i} className="slide-item" style={{ animationDelay: `${i * 50}ms` }}>
                                <ThumbEach eachItem={eachItem} />
                            </div>
                        ))}
                    </div>

                    {totalGroups > 1 && (
                        <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5em', gap: '1em' }}>
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                                disabled={currentPage === 0}
                            >
                                <p><i className="fas fa-chevron-left"></i></p>
                            </button>
                            <span>Página {currentPage + 1} de {totalGroups}</span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalGroups - 1))}
                                disabled={currentPage === totalGroups - 1}
                            >
                                <p><i className="fas fa-chevron-right"></i></p>
                            </button>
                        </div>
                    )}
                </>
            </div>
        </Suspense>
    );
};

export default FilteredItems;
