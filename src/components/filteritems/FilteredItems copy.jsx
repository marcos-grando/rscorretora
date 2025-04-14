import React, { useMemo, lazy, Suspense, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ThumbEach = lazy(() => import('../sections/ThumbEach'));

function FilteredItems({ filters, data }) {

    const [gridStyle, setGridStyle] = useState({ gridTemplateColumns: "repeat(5, 1fr)", gridTemplateRows: "repeat(3, 1fr)" });
    const [itemTotal, setItemsTotal] = useState(15);

    const filteredData = useMemo(() => {
        const result = data.flatMap(construtora =>
            construtora.empreendimentos.filter(empreendimento => {
                const { local, status } = empreendimento['infos-main'];
                return (
                    (filters.local.length === 0 || filters.local.includes(local)) &&
                    (filters.status.length === 0 || filters.status.includes(status))
                );
            })
        );
        return result;
    }, [data, filters]);

    const isNull = filteredData.length === 0;
    console.log(isNull)

    useEffect(() => {
        const updateItemsPerRow = () => {
            const width = window.innerWidth;

            if (width <= 425) {
                setGridStyle({ gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "repeat(4, 1fr)" });
                setItemsTotal(8);
            } else if (width <= 580) {
                setGridStyle({ gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "repeat(3, 1fr)" });
                setItemsTotal(6);
            } else if (width <= 844) {
                setGridStyle({ gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(3, 1fr)" });
                setItemsTotal(9);
            } else if (width <= 1024) {
                setGridStyle({ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(3, 1fr)" });
                setItemsTotal(12);
            } else if (width <= 1124) {
                setGridStyle({ gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(4, 1fr)" });
                setItemsTotal(12);
            } else {
                setGridStyle({ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(4, 1fr)" });
                setItemsTotal(16);
            }
        };

        updateItemsPerRow(); // Chama ao montar o componente
        window.addEventListener("resize", updateItemsPerRow);

        return () => window.removeEventListener("resize", updateItemsPerRow);
    }, []);

    const itemsGroup = itemTotal;
    const totalGroups = Math.ceil(filteredData.length / itemsGroup);

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <div className="filter-infos">
                {isNull &&
                    <div className='noResult'>
                        <div className="building">
                            <i className="fas fa-building front"></i>
                            <i className="fas fa-building back"></i>
                        </div>
                        <p>Nenhum empreendimento encontrado</p>
                    </div>
                }
                <Swiper
                    modules={[Navigation]}
                    navigation
                    slidesPerView={1}
                    slidesPerGroup={1}
                    speed={600}
                    autoHeight={true}
                >
                    {Array.from({ length: totalGroups }, (_, i) => (
                        <SwiperSlide key={i} className="slide-items" style={gridStyle}>
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
    );
};

export default FilteredItems;
