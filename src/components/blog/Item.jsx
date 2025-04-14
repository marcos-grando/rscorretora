import React from "react";
import { Link } from "react-router-dom";
import Linkto from "../reuts/Linkto";

function Item({ eachNews, noImg }) {

    return (
        <Link className="item" title="Ir para a reportagem"
            state={{ article: eachNews }}
            to={Linkto({ type: "blog-slug", data: eachNews })}
        >
            {noImg ? '' : <img src={eachNews.thumb} alt={eachNews.title} />}

            <div className="content">
                <p>{eachNews.title}</p>
            </div>
        </Link>
    );
}

export default Item;