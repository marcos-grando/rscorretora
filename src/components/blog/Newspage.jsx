import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Blog from "./Blog";
import Quadrados from "../Quadrados";

function Newspage() {

    const [news, setNews] = useState([]);


    useEffect(() => {
        const fetchNews = async () => {
            const response = await fetch('/blog.json');
            const data = await response.json();
            setNews(data);
        }
        fetchNews();
    }, []);


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
    const { id } = useParams();
    const eachNews = news.length > 0 ? news.find((n) => generateSlug(n.ref + n.title) === id) : null;

    console.log(eachNews)
    if (!eachNews) return <p>Notícia não encontrada...</p>;

    return (
        <>
            <Header />
            <section className="newspage">
                <p className="chamada">NOTÍCIA</p>
                <div className="wrapper">
                    <div className="container">

                        <div className="title">
                            <p className="title">{eachNews.title}</p>
                            <div className="public">
                                <i className="fa fa-clock"></i>
                                <p>Publicado em {eachNews.time} </p>
                            </div>
                            <p className="desc">{eachNews.desc}</p>
                        </div>
                        <div className="img">
                            <img src={eachNews.img} alt="" />
                            <p>Fotografia por <a target="_blank" href={eachNews.autorlink}>{eachNews.autorimg}</a></p>
                        </div>
                        <div className="content">
                            <div className="texto">
                                {eachNews['texto'].map((texto, i) => (
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
                                <Blog type={"relacionais"} nNow={eachNews.ref} />
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