import React from "react";
import Linkto from "./Linkto";

function Sociais({ onlyicon }) {

    return (
        <>
            {onlyicon ?
                <div className="redes-icon">
                    {/* <a className="link" href={ Linkto({ type: 'facebook' }) }>
                        <i className="fab fa-facebook"></i>
                    </a> */}
                    <a className="link" href={ Linkto({ type: 'instagram' }) } target="_blank">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a className="link" href={ Linkto({ type: 'menuBlog' }) }>
                        <i className="fas fa-newspaper"></i>
                    </a>
                </div>
                :
                <div className="redes-sociais">
                    {/* <a className="link" href={ Linkto({ type: 'facebook' }) }>
                        <i className="fab fa-facebook"></i>
                        <p>Facebook</p>
                    </a> */}
                    <a className="link" href={ Linkto({ type: 'instagram' }) } target="_blank">
                        <i className="fab fa-instagram"></i>
                        <p>Instagram</p>
                    </a>
                    <a className="link" href={ Linkto({ type: 'menuBlog' }) }>
                        <i className="fas fa-newspaper"></i>
                        <p>Blog</p>
                    </a>
                </div>
            }
        </>
    )
}

export default Sociais;