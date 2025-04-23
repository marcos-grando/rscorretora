import React, { useState } from "react";
import { Link } from "react-router-dom";
import Linkto from "./Linkto";
import Header from "../Header";

function LoadingOrNotFound({ type }) {

    switch (type) {
        case "notFound":
            return (
                <>
                    <Header />
                    <section className="residNotFound"
                        style={{
                            backgroundColor: "white",
                            height: "100%", width: "100%",
                            textAlign: "center",
                            display: "flex", flexDirection: "column",
                            justifyContent: "center", alignItems: "center", gap: "1em",
                            position: "absolute", top: "0"
                        }}
                    >
                        <p className="notFound-title" style={{ fontSize: "1.8em", fontWeight: "600" }}>Ops, algo deu errado!</p>
                        <p className="notFound-subtitle">
                            Não encontramos a página que você procura.
                        </p>
                        <Link
                            to={Linkto({ type: "others" })}
                            style={{
                                backgroundColor: "var(--cor-slide-wrapper-atrat)",
                                borderRadius: "2px",
                                marginTop: "0.5em",
                                padding: "12px 18px",
                                color: "white"
                            }}
                        >
                            Ir para Página Inicial
                        </Link>
                    </section>
                </>
            );

        case "loading":
            return (
                <>
                    <Header />
                    <section className="residLoading"
                        style={{
                            height: "100%", width: "100%",
                            display: "flex", justifyContent: "center", alignItems: "center",
                            position: "absolute", top: "0"
                        }}
                    >
                        <p className="notFound-title" style={{ fontSize: "1.5em", fontWeight: "600", opacity: "0.7" }}>Carregando informações...</p>
                    </section>
                </>
            );
    };
};

export default LoadingOrNotFound;