import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import '../estilos/style.css';
import '../estilos/load-page.css';
import '../estilos/header.css';
import '../estilos/menu-style.css';
import '../estilos/footer.css';

// page inicinal banner
import '../estilos/banner/banner.css';
import '../estilos/banner/banner-wrapper.css';
import '../estilos/banner/banner-content.css';
import '../estilos/banner/banner-animation.css';
import '../estilos/banner/banner-prev.css';
import '../estilos/banner/banner-next.css';

// page inicial sections simples ("Notícias" e "Raquel Silva")
import '../estilos/onlySections/news.css';
import '../estilos/onlySections/sobre.css';
import '../estilos/onlySections/sociais.css';

// Slidemove.jsx
import '../estilos/slides/slide-wrapper.css';
import '../estilos/slides/slide-wrapper-animation.css';
import '../estilos/slides/featured-slide.css';

// Allitems.jsx
import '../estilos/allitems/allitems.css';
import '../estilos/allitems/allitems-slides.css';
import '../estilos/allitems/allitems-slides-content.css';
import '../estilos/allitems/allitems-animation.css';

// Sobre.jsx
import '../estilos/sobre/sobreall.css';

// individual page para cada residencial
import '../estilos/residpage/residpage.css';
import '../estilos/residpage/residpage-container.css';
import '../estilos/residpage/residpage-content.css';
import '../estilos/residpage/residpage-content-infosdesc.css';
import '../estilos/residpage/residpage-map.css';
import '../estilos/residpage/residpage-telawpp.css';
import '../estilos/residpage/residpage-modal.css';

// blog space, individual page p/ notícias e "relacionais" ("Leia Mais")
import '../estilos/blog/blogspace.css';
import '../estilos/blog/newspage.css';
import '../estilos/blog/relacionais.css';



createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
)