import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Item from "./Item";
import Quadrados from "../Quadrados";
import { Link } from "react-router-dom";

function Blog({ type, noImg, nNow }) {

    // noImg => para lista de notícias sem imagem;
    // nNow => retorna o nº de referência (o id) da reportagem aberta (Newspage.jsx);
    // nNow é usado em "relacionais" para evitar a renderização da reportagem que o usuário estiver presente;


    // news => Armazena as notícias retornadas da requisição;
    // visibleRows => número de linhas carregadas inicialmente;
    // itemsPerRow => quantidade de itens renderizados por linha;
    // itemsNews => quantidade de notícias renderizadas em Notícias, inicial page;

    const [news, setNews] = useState([]);

    const [visibleRows, setVisibleRows] = useState(2);
    const [itemsPerRow, setItemsPerRow] = useState(null);

    const [gridStyle, setGridStyle] = useState({ gridTemplateColumns: "repeat(4, 1fr)" });

    const [itemsNews, setItemsNews] = useState(null)

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch('/blog.json');
            const data = await response.json();
            setNews(data);
        }
        fetchBlog();
    }, []);

    // itemsToShow calcula nº de rows + news e retorna o valor para ser renderizado inicialmente
    const itemsToShow = visibleRows * itemsPerRow;
    const loadMore = () => {
        setVisibleRows(prev => prev + itemsPerRow);
    };
    useEffect(() => {
        const updateItemsPerRow = () => {

            const width = window.innerWidth;
            if (width <= 450) {
                setItemsNews(2);
                setItemsPerRow(1);
                setGridStyle({ gridTemplateColumns: "repeat(1, 1fr)" })

            } else if (width > 451 && width <= 768) {
                setItemsNews(2);
                setItemsPerRow(2);
                setGridStyle({ gridTemplateColumns: "repeat(2, 1fr)" })

            } else if (width > 769 && width <= 1200) {
                setItemsNews(3);
                setItemsPerRow(3);
                setGridStyle({ gridTemplateColumns: "repeat(3, 1fr)" })

            } else {
                setItemsNews(4);
                setItemsPerRow(4);
                setGridStyle({ gridTemplateColumns: "repeat(4, 1fr)" })
            }
        };
        updateItemsPerRow();
        window.addEventListener('resize', updateItemsPerRow);

        return () => window.removeEventListener('resize', updateItemsPerRow);
    }, []);


    return (
        <>
            {
                (() => {
                    switch (type) {
                        case "onlypage":
                            return <>
                                <Header />
                                <section className="blogpage">
                                    <div className="wrapper">
                                        <div className="blog-title">
                                            <div>
                                                <p className="title">Blog Space RS</p>
                                                <div className="line"></div>
                                            </div>
                                            <p>Reportagens sobre o trabalho da corretora Raquel silva e informações sobre o mercado imobiliário.</p>
                                        </div>
                                        <div className="container" style={gridStyle}>
                                            {news.slice(0, itemsToShow).map((eachNews, i) => (
                                                <Item key={i} eachNews={eachNews} i={i} />
                                            ))}
                                        </div>
                                        {itemsToShow < news.length && (
                                            <button className="load-more" onClick={loadMore} >
                                                Ver mais
                                            </button>
                                        )}
                                    </div>
                                </section>
                                <Footer />
                            </>

                        case "relacionais":
                            return <section className="relacionais">
                                {news.filter(eachNews => eachNews.ref !== nNow).slice(0, 3).map((eachNews, i) => (
                                    <Item key={i} eachNews={eachNews} noImg={noImg} />
                                ))}
                            </section>

                        default:
                            return <section className="news">
                                <div className="wrapper">
                                    <div className="news-title">
                                        <p>Notícias</p>
                                        <p>últimas reportagens</p>
                                        <div className="line"></div>
                                    </div>
                                    <div className="container">

                                        {news.slice(0, itemsNews).map((eachNews, i) => (
                                            <Item key={i} eachNews={eachNews} i={i} />
                                        ))}
                                    </div>
                                    <div className="ver-blogspace">
                                        <Link to="/blog-space" >
                                            <button>Visitar Blog Space <span>›</span> </button>
                                        </Link>
                                    </div>
                                </div>
                            </section>
                    }
                })()
            }
        </>
    );
}

export default Blog;