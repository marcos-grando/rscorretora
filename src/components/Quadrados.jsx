import React from "react";
import '../../estilos/quadrados.css';

function Quadrados({ LorR, TorB, UorD, SorE, maxSquare }) {
    // LorR => Left ou Right, 
    // TorB => Top ou Bottom, 
    // UorD => Up ou Down, 
    // SorE => Start ou End;

    // att => por descuido UorD e SorE tiveram valores invertidos
    // att² => modificar isso posteriormente (importante ver todos lugares que usam Quadrados.jsx)
    
    const estilos = {
        quadradinhos: {
            ...(TorB === 'bottom' ? { bottom: "0" } : { top: "0" }),
            ...(LorR === 'left' ? { left: "0"} : { right: "0"})
        },
        quadrados: {
            ...(UorD === 'start' ? { alignItems: "flex-start" } : { alignItems: "flex-end" }),
            ...(SorE === 'up' ? { flexDirection: "column-reverse" } : { flexDirection: "column" })
        }
    }

    return (
        <section className="quadradinhos" style={estilos.quadradinhos}>
            <div className="quadrados" style={estilos.quadrados}>
                {Array.from({ length: maxSquare }, (_, i) => i + 1).map((qtdQuadrados, linhaIndex) => (
                    <div className="linha" key={linhaIndex}>
                        {Array.from({ length: qtdQuadrados }).map((_, index) => (
                            <div className="quadrado" key={index} style={{ animationDelay: `${index * 0.2}s` }}></div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Quadrados;