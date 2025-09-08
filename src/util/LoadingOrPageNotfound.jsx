import React, { useState } from "react";
import { Link } from "react-router-dom";
import Linkto from "../components/reuts/Linkto";
import Header from "../components/Header";
import LoadingScreen from "./LoadingScreen";

function LoadingOrPageNotfound({ type, error }) {

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
                        <LoadingScreen />
                    </section>
                </>
            );
    };
};

export default LoadingOrPageNotfound;