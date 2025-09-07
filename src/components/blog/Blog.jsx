import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Item from "./Item";
import { Link, useLocation } from "react-router-dom";
import BlogSpace from "./BlogSpace";

function Blog({ type, noImg, nNow }) {

    // noImg => para lista de notícias sem imagem;
    // nNow => retorna o nº de referência (o id) da reportagem aberta (Newspage.jsx);
    // nNow é usado em "relacionais" para evitar a renderização da reportagem que o usuário estiver presente;


    // news => Armazena as notícias retornadas da requisição;
    // visibleRows => número de linhas carregadas inicialmente;
    // itemsPerRow => quantidade de itens renderizados por linha;
    // itemsNews => quantidade de notícias renderizadas em Notícias, inicial page;

    const [news, setNews] = useState([]);

    const [visibleRows, setVisibleRows] = useState(1);
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
        setVisibleRows(prev => prev + 1);
    };

    useEffect(() => {
        const updateItemsPerRow = () => {

            const width = window.innerWidth;
            if (width <= 450) {
                setItemsNews(2);
                setItemsPerRow(2);
                setGridStyle({ gridTemplateColumns: "repeat(2, 1fr)" })

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
                                <BlogSpace news={news} itemsToShow={itemsToShow} loadMore={loadMore} gridStyle={gridStyle} />
                                <Footer />
                            </>

                        case "relacionais":
                            return <section className="relacionais">
                                {news.filter(eachNews => eachNews.ref !== nNow).slice(0, 3).map((eachNews, i) => (
                                    <Item key={i} eachNews={eachNews} noImg={noImg} />
                                ))}
                            </section>

                        case "notFound":
                            return <>
                                <Header />
                                <section className="newspage notFound"
                                    style={{
                                        height: "100%", width: "100%",
                                        display: "flex", flexDirection: "column",
                                        justifyContent: "center", alignItems: "center",
                                        position: "absolute", top: "0"
                                    }}
                                >
                                    <p className="chamada">NOTÍCIA NÃO ENCONTRADA</p>
                                    <div className="wrapper"
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "2em"
                                        }}
                                    >
                                        <div className="container">
                                            <div className="title" style={{ margin: "auto" }}>
                                                <p className="title" style={{ textAlign: "center", fontSize: "1.8em" }}>Essa notícia está indisponível ou foi removida!</p>
                                            </div>
                                        </div>
                                        <Link to={"/blog-space"}
                                            style={{
                                                backgroundColor: "var(--cor-empreends-atrat2)",
                                                borderRadius: "2px",
                                                padding: "12px 10px",
                                                color: "white",
                                                fontSize: "1.15em",
                                                fontWeight: "400",
                                                boxShadow: "1px 1px 2px #0b1014"
                                            }}
                                        >
                                            Ir para Blog Space
                                        </Link>
                                    </div>
                                </section>
                            </>

                        default: /* Utilizo "other" geralmente */
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