import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function Testando() {

    const totalFilters = 17;
    const itemsGroup = 12;
    const totalGroups = Math.ceil(totalFilters / itemsGroup);

    const items = Array.from({ length: totalFilters }, (_, i) => `Item ${i + 1}`);

    const groups = Array.from({ length: totalGroups }, (_, i) => (
        <SwiperSlide key={i} className="content">
            {items.slice(i * itemsGroup, i * itemsGroup + itemsGroup).map((item, ii) => {
                return (
                    <div key={ii} className="item">
                        {item}
                    </div>
                );
            })}
        </SwiperSlide>
    ));

    return (
        <section className="testando">
            <div className="container">
                <Swiper
                    modules={[Navigation]}
                    navigation
                    slidesPerView={1}
                    slidesPerGroup={1}
                    speed={600}
                    spaceBetween={20}
                >
                    {groups}
                </Swiper>
            </div>
        </section>
    );
}

export default Testando;

/*

*/