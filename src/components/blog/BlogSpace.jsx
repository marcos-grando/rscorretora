import React from "react";
import Item from "./Item";

function BlogSpace({ news, itemsToShow, loadMore, gridStyle }) {

    return (
        <section className="blogspace">
            <div className="blog-title">
                <div>
                    <p className="title">Blog Space RS</p>
                    <div className="line"></div>
                </div>
                <p>Reportagens sobre o trabalho da corretora Raquel silva e informações sobre o mercado imobiliário.</p>
            </div>
            <div className="head">
                <h2>Últimas notícias</h2>
                <div className="container" >
                    {news.slice(0, 3).map((eachNews, i) => (
                        <Item key={i} eachNews={eachNews} i={i} />
                    ))}
                </div>
            </div>

            <div className="main">
                <h2>Todas as reportagens</h2>
                <div className="container" style={gridStyle}>
                    {news.slice(0, itemsToShow).map((eachNews, i) => (
                        <Item key={i} eachNews={eachNews} i={i} />
                    ))}
                </div>
                {itemsToShow < news.length && (
                    <button className="load-more" onClick={loadMore}
                        style={{
                            backgroundColor: "var(--cor7)",
                            boxShadow: "1px 1px 2px var(--cor5)",
                            border: "none",
                            borderRadius: "50px",
                            padding: "10px 16px",
                            marginTop: "25px",
                            color: "white",
                            cursor: "pointer"
                        }}
                    >
                        Ver mais
                    </button>
                )}
            </div>

        </section>
    );
};

export default BlogSpace;