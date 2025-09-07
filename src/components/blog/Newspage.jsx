import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Blog from "./Blog";
import Quadrados from "../Quadrados";

const generateSlug = (title) => {
    return title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .trim();
};

function Newspage() {

    const { id } = useParams();
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await fetch('/blog.json');
            const data = await response.json();
            const selectNews = data.length > 0 ? data.find((n) => generateSlug(n.ref + n.title) === id) : null;
            setNews(selectNews || null);
        }
        fetchNews();
    }, [id]);

    if (!news) return <Blog type={"notFound"} />

    return (
        <>
            <Header />
            <section className="newspage">
                <p className="chamada">NOTÍCIA</p>
                <div className="wrapper">
                    <div className="container">

                        <div className="title">
                            <p className="title">{news.title}</p>
                            <div className="public">
                                <i className="fa fa-clock"></i>
                                <p>Publicado em {news.time} </p>
                            </div>
                            <p className="desc">{news.desc}</p>
                        </div>
                        <div className="img">
                            <img src={news.img} alt="" />
                            <p>Fotografia por <a target="_blank" href={news.autorlink}>{news.autorimg}</a></p>
                        </div>
                        <div className="content">
                            <div className="texto">
                                {news?.texto?.map((texto, i) => (
                                    <div key={i}>
                                        {texto['subtitle'] && <p className="subtitle">{texto.subtitle}</p>}
                                        {texto['frases'].map((frase, ii) => (
                                            <p key={ii}>{frase}</p>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <div className="relacionais-newspage">
                                <p className="title">LEIA MAIS</p>
                                <Blog type={"relacionais"} nNow={news.ref} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Newspage;