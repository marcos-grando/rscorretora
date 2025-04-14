import React, { useEffect, useState } from "react";

function Topics({ topics }) {

    return (
        <section className="topics">
            <div className="wrapper">
                <div className="topics-title">
                    <p>Categorias</p>
                    <p>Busque sua preferência</p>
                    <div className="line"></div>
                </div>
                <div className="container">

                    {topics.map((categoria, i) => (
                        <div key={i} className="item">
                            
                            <img src={categoria.img} alt={categoria.chamada} />
                            
                            <div className="content"> {categoria.chamada} </div>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default Topics;