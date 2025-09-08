import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./util/supabaseClient";
import LoadingPage from "./components/LoadingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/banner/Banner";
import TopAndRedirect from "./components/TopAndRedirect";
import LoadingOrPageNotfound from "./util/LoadingOrPageNotfound";

const Sobre = lazy(() => import('./components/sobre/Sobre'));
const SobreOnlypage = lazy(() => import('./components/sobre/SobreOnlypage'));
const Slidemove = lazy(() => import('./components/sections/Slidemove'));
const Allitems = lazy(() => import('./components/filteritems/Allitems'));
const Blog = lazy(() => import('./components/blog/Blog'));

const Newspage = lazy(() => import('./components/blog/Newspage'));
const Residencial = lazy(() => import('./components/empreends/Residencial'));

function App() {

    // novo Supabase View Data
    const [datadb, setDatadb] = useState([]);
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

    useEffect(() => {
        const fetchDatadb = async () => {
            const { data, error } = await supabase.from('view_all_items_withypes').select('*');
            if (error) console.error(error);
            setDatadb(data);
        };
        fetchDatadb();
    }, []);

    const filterDatadb = (keyCompare, valueCompare, except = false) => {
        if (except) return datadb.filter((each) => each?.[keyCompare] !== valueCompare)
        return datadb.filter((each) => each?.[keyCompare] === valueCompare)
    };

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
                            <Banner />

                            <Suspense fallback={<div>Carregando...</div>}>
                                <Blog />
                            </Suspense>

                            <Suspense fallback={<div>Carregando...</div>}>
                                <Sobre />
                            </Suspense>

                            <Suspense fallback={<div>Carregando...</div>}>
                                <Slidemove
                                    title="Pronto para Morar"
                                    subtitle="Residenciais prontinhos para você!"
                                    thumbs={filterDatadb('status_id', 1)}
                                />
                            </Suspense>

                            {isFilterOrNot &&
                                <Suspense fallback={<div>Carregando...</div>}>
                                    <Allitems notOnlyPage={true} datadbNotOnly={datadb} />
                                </Suspense>
                            }

                            <Suspense fallback={<div>Carregando...</div>}>
                                <Slidemove
                                    title="Em construção"
                                    subtitle="Seu sonho sendo construído!"
                                    thumbs={filterDatadb('status_id', 1, true)}
                                />
                            </Suspense>

                            {!isFilterOrNot &&
                                <>
                                    <Suspense fallback={<div>Carregando...</div>}>
                                        <Slidemove
                                            title="Campinas, São José"
                                            subtitle="Conveniência e mobilidade urbana!"
                                            thumbs={filterDatadb('local', 'Campinas, São José')}
                                        />
                                    </Suspense>

                                    <Suspense fallback={<div>Carregando...</div>}>
                                        <Slidemove
                                            title="Kobrasol, São José"
                                            subtitle="Qualidade de vida perto do mar!"
                                            thumbs={filterDatadb('local', 'Kobrasol, São José')}
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
                    <SobreOnlypage />
                } />
                <Route path="/empreendimentos" element={
                    <Allitems />
                } />
                <Route path="/empreendimentos/:idParams" element={
                    <Residencial />
                } />
                <Route path="/blog-space" element={
                    <Blog type={"onlypage"} />
                } />
                <Route path="/blog-space/:id" element={
                    <Newspage />
                } />
                <Route path="*" element={
                    <LoadingOrPageNotfound type={"notFound"} />
                } />
            </Routes>
        </>
    );
}

export default App;

/*
    data={infos} => Apenas criar uma requisição .json em Residencial.jsx de acordo com o slug/id para trazer o conteúdo.
*/