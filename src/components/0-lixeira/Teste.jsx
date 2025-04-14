import React from "react";
import '../../estilos/teste.css';

function Teste() {

    let status = 'Em construção';
    let title = 'Belle Ville';
    let local = 'Kobrasol, São José';
    let valor = 'A partir de R$ 485.500.00';
    let dorms = '2~3';
    let car = '1~2';
    let wc = '3~4';

    return (
        <section className="teste">
            <div className="wrapper">
                <div className="container">

                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="item">
                            <div className="status">{status}</div>
                            <div className="img"></div>
                            <div className="content">
                                <p className="title">{title}</p>
                                <p className="local">{local}</p>
                                <p className="valor">{valor}</p>
                                <div className="infos">
                                    <div className="info">
                                        <i class="fas fa-bed"></i>
                                        {dorms}
                                    </div>
                                    <div className="info">
                                        <i class="fas fa-shower"></i>
                                        {wc}
                                    </div>
                                    <div className="info">
                                        <i class="fas fa-car"></i>
                                        {car}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default Teste;