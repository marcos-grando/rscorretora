import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoadingPage from "./components/LoadingPage";
import Header from "./components/Header";
import Banner from "./components/banner/Banner";
import TopAndRedirect from "./components/TopAndRedirect";
import LoadingOrNotFound from "./components/reuts/loadingOrNotFound";

const Footer = lazy(() => import('./components/Footer'));
const Sobre = lazy(() => import('./components/sobre/Sobre'));
const Slidemove = lazy(() => import('./components/sections/Slidemove'));
const Allitems = lazy(() => import('./components/filteritems/Allitems'));
const Blog = lazy(() => import('./components/blog/Blog'));

const Newspage = lazy(() => import('./components/blog/Newspage'));
const Residencial = lazy(() => import('./components/empreends/Residencial'));

function App() {

    const [infos, setInfos] = useState([]);
    const [infosRS, setInfosRS] = useState(null);

    const [loading, setLoading] = useState(!localStorage.getItem("alreadyLoaded"));

    const [isFilterOrNot, setIsFilterOrNot] = useState(true);

    useEffect(() => {
        const updateFilterDesktop = () => {
            const width = window.innerWidth;

            if (width <= 1024) {
                setIsFilterOrNot(false);
            } else {
                setIsFilterOrNot(true);
            }
        };

        updateFilterDesktop(); // Chama ao montar o componente
        window.addEventListener("resize", updateFilterDesktop);

        return () => window.removeEventListener("resize", updateFilterDesktop);
    }, []);

    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => {
                setLoading(false);
                localStorage.setItem("alreadyLoaded", "true");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [loading]);

    // requisição dos dados de construtoras.json;
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/construtoras.json');
            const data = await response.json();
            setInfos(data);
        }
        fetchData();
    }, [])

    // retorna um filtro de dados, de acordo com a "condicional", dos arquivos da requisição acima;
    const filterInfos = (condicional) => {
        return infos.map((construtora) => {
            const filteredInfos = construtora.empreendimentos.filter(condicional);
            if (filteredInfos.length > 0) {
                return {
                    "const-nome": construtora['const-nome'] || "Construtora não identificada",
                    "empreendimentos": filteredInfos.map((empreendimento) => ({
                        "id-nome": empreendimento['id-nome'] || "Residencial não identificado",
                        "infos-main": {
                            'thumb': empreendimento['infos-main']['thumb'],
                            'banner': empreendimento['infos-main']['banner'],
                            'fachada': empreendimento['infos-main']['fachada'],
                            'subtitle': empreendimento['infos-main']['subtitle'],
                            'title': empreendimento['infos-main']['title'],
                            'local': empreendimento['infos-main']['local'],
                            'status': empreendimento['infos-main']['status'],
                            'valor': empreendimento['infos-main']['valor'],
                            'detalhes': empreendimento['infos-main']['detalhes']
                        }
                    }))
                };
            }
            return null;
        })
            .filter(construtora => construtora !== null)
    };

    // requisição dos dados de rscorretora.json;
    useEffect(() => {
        const fetchDataRS = async () => {
            const response = await fetch('/rscorretora.json');
            const data = await response.json();
            setInfosRS(data);
        }
        fetchDataRS();
    }, []);
    // retorna o objeto especifico dentro do arquivo .json acima;
    const filterInfosRS = (filter) => {
        return infosRS ? infosRS[filter] || [] : [];
    };


    // determina quais residenciais aparecerão no banner principal, através de "id-nome" (presente em construtoras.json);
    const bannerDestaques = [
        "riviere-petrusse",
        "reserva",
        "colina-de-sao-pedro",
        "julio-schappo",
        "lyon",
        "belle-ville",
        "majestic",
        "privilege",
        "saint-michel"
    ];
    // renderiza na ordem da lista acima, e não na lista do arquivo;
    const bannerDestaquesRender = bannerDestaques.flatMap(id =>
        filterInfos((empreendimento) => empreendimento['id-nome'] === id)
    ).filter(Boolean);

    return (
        <>
            <TopAndRedirect />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            {loading && <LoadingPage />}
                            <Header />
                            <Banner infos={bannerDestaquesRender} />

                            <Suspense fallback={<div>Carregando...</div>}>
                                <Blog />
                            </Suspense>

                            <Suspense fallback={<div>Carregando...</div>}>
                                <Sobre sobre={filterInfosRS("sobre") || []} />
                            </Suspense>

                            <Suspense fallback={<div>Carregando...</div>}>
                                <Slidemove
                                    title="Pronto para Morar"
                                    subtitle="Residenciais prontinhos para você!"
                                    thumbs={filterInfos((empreendimento) => empreendimento['infos-main']['status'] === 'Pronto para Morar')}
                                />
                            </Suspense>

                            {isFilterOrNot &&
                                <Suspense fallback={<div>Carregando...</div>}>
                                    <Allitems data={infos} />
                                </Suspense>
                            }

                            <Suspense fallback={<div>Carregando...</div>}>
                                <Slidemove
                                    title="Em construção"
                                    subtitle="Seu sonho sendo construído!"
                                    thumbs={filterInfos((empreendimento) => empreendimento['infos-main']['status'] !== 'Pronto para Morar')}
                                />
                            </Suspense>

                            {!isFilterOrNot &&
                                <>
                                    <Suspense fallback={<div>Carregando...</div>}>
                                        <Slidemove
                                            title="Campinas, São José"
                                            subtitle="Conveniência e mobilidade urbana!"
                                            thumbs={filterInfos((empreendimento) => empreendimento['infos-main']['local'] !== 'Campinas, São José')}
                                        />
                                    </Suspense>

                                    <Suspense fallback={<div>Carregando...</div>}>
                                        <Slidemove
                                            title="Kobrasol, São José"
                                            subtitle="Qualidade de vida perto do mar!"
                                            thumbs={filterInfos((empreendimento) => empreendimento['infos-main']['local'] !== 'Kobrasol, São José')}
                                        />
                                    </Suspense>
                                </>
                            }

                            <Suspense fallback={<div>Carregando...</div>}>
                                <Footer />
                            </Suspense>

                        </>
                    }
                />
                <Route path="/sobre" element={
                    <Sobre sobre={filterInfosRS("sobre") || []} onlyPage={true} />
                } />
                <Route path="/empreendimentos" element={
                    <Allitems onlyPage={true} data={infos} />
                } />
                <Route path="/empreendimentos/:id" element={
                    <Residencial data={infos} />
                } />
                <Route path="/blog-space" element={
                    <Blog type={"onlypage"} />
                } />
                <Route path="/blog-space/:id" element={
                    <Newspage />
                } />
                <Route path="*" element={
                    <LoadingOrNotFound type={"notFound"} />
                } />
            </Routes>
        </>
    );
}

export default App;

/*
    data={infos} => Apenas criar uma requisição .json em Residencial.jsx de acordo com o slug/id para trazer o conteúdo.
*/