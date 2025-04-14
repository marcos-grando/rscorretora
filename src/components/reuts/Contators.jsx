import React from "react";

function Contators({ type }) {

    return (
        <>
            {
                (() => {
                    switch (type) {
                        case "email":
                            return <p>raquelsilva.25@hotmail.com</p>
                        case "wpp":
                            return <p>(48) 9969-2591</p>
                        case "Creci":
                            return <p>Creci 23642</p>
                        case "CRECI":
                            return <p>CRECI 23642</p>
                        default:
                            return <p>N/A</p>
                    }
                })()
            }
        </>
    );
}

export default Contators;