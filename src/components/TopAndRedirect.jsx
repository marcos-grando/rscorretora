import { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

function TopAndRedirect() {
    const { pathname } = useLocation(); // Correção: Desestrutura pathname corretamente

    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname]);

    if (pathname !== "/" && pathname.endsWith("/")) {
        return <Navigate to={pathname.slice(0, -1)} replace />;
    }

    return null;
}

export default TopAndRedirect;
