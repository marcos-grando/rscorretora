import React from "react";

function Linkto({ type, data, text }) {

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

    switch (type) {

        case "wpp":
            return "https://wa.me/554899692591?text=Oi,%20gostaria%20de%20mais%20informações";

        case "wpp-text":
            if (!text) { "https://wa.me/554899692591?text=Oi,%20gostaria%20de%20mais%20informações" }
            return `https://wa.me/554899692591?text=${encodeURIComponent(text)}`;

        case "facebook":
            return "https://facebook.com.br/raquel"; // atualizar quando tiver

        case "instagram":
            return "https://www.instagram.com/raquelrcorretora";

        
        // links menu

        case "menuSobre":
            return "/sobre";

        case "menuEmpreendimentos":
            return "/empreendimentos";
        case "empreend-slug":
            const resid = data['infos-main'];
            return `/empreendimentos/${generateSlug(resid.title + "-" + resid.local)}`;

        case "menuBlog":
            return "/blog-space";
        case "blog-slug":
            return `/blog-space/${generateSlug(data.ref + data.title)}`;

        default: /* utiliza-se "others" geralmente */
            return "/";
    }
}

export default Linkto;