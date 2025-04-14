import React from "react";

function News({ news }) {

    return (
        <section className="news">
            <div className="wrapper">
                <div className="news-title">
                    <p>Notícias</p>
                    <p>últimas reportagens</p>
                    <div className="line"></div>
                </div>
                <div className="container">

                    {news.map((eachNews, i) => (
                        <div key={i} className="item" title="Ir para a reportagem">

                            <img src={eachNews.thumb} alt={eachNews.title} />

                            <div className="content">
                                <p>{eachNews.title}</p>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}

export default News;