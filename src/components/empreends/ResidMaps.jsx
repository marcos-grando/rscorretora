import React, { useEffect, useState } from "react";
import Contators from "../reuts/Contators";
import Linkto from "../reuts/Linkto";
import Quadrados from "../Quadrados";

function ResidMaps({ title, lati, long }) {

    const [localMap, setLocalMap] = useState(null);
    const [locais, setLocais] = useState([]);

    useEffect(() => {
        const getLocalMap = async (latitude, longitude) => {
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                setLocalMap(data.address)
            } catch (error) {
                console.error("Erro ao buscar endereço:", error);
            }
        };

        const getLocais = async (latitude, longitude) => {
            const query = `
                [out:json];
                (
                    node(around:300, ${latitude}, ${longitude})["amenity"];
                );
                out body;
            `;
            const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setLocais(data.elements);
            } catch (error) {
                console.error("Erro ao buscar locais próximos:", error);
            }
        };

        getLocalMap(lati, long);
        getLocais(lati, long)
    }, [lati, long])

    const { road, suburb, city, state, postcode, country } = localMap || {};
    function siglaState(nome) {
        return nome.split(' ').map(palavra => palavra[0]).join('').toUpperCase();
    }

    return localMap ?
        (
            <div className="div-map">
                <div className="map">
                    <div className="map-text">
                        <div className="titlemap">
                            <p className="title">Conheça a região!</p>
                            <p className="local-map">{road}, {suburb} - {city}/{siglaState(state)}</p>
                            <a target="_blank" className="btn-rotas"
                                href={`https://www.google.com/maps/dir/?api=1&destination=${lati},${long}`}
                            >
                                <i className="fas fa-map-marker-alt map-marker"></i>
                                <p>Ver rotas no Google Maps</p>
                            </a>
                        </div>
                        <div className="contato">
                            <p>Mais informações?</p>
                            <p>Raquel Silva aguarda seu contato!</p>

                            <a className="wpp" target="_blank" rel="noopener noreferrer"
                                href={Linkto({ type: "wpp-text", text: `Olá, Raquel. Gostaria de mais informações sobre o Residencial ${title}.` })}
                            >
                                <i className="fab fa-whatsapp" aria-hidden="true"></i>
                                <Contators type="wpp" />
                            </a>
                        </div>
                    </div>
                    <iframe
                        src={`https://www.google.com/maps?q=${lati},${long}&z=15&output=embed`}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        )
        :
        null
}

export default ResidMaps;