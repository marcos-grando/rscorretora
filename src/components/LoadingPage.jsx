import React, { useEffect, useState } from "react";

function LoadingPage() {

    const [progress, setProgress] = useState(0);
    const [lpStyle, setLpStyle] = useState(true);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const duration = 1000;
        const steps = 100;
        const intervalTime = duration / steps;

        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + 1;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";
        document.body.style.overflowY = "hidden";
        setTimeout(() => {
            setLpStyle(false);
            
            document.documentElement.style.overflowY = "auto";
            document.body.style.overflowY = "auto";
        }, 1200);
        setTimeout(() => {
            setVisible(false)
        }, 1450);
    })
    if (!visible) return null;
    console.log(progress)

    return (
        <section className={`loadingPage ${!lpStyle ? 'finally' : ''}`}>
            <div className="loadingContent">
                <img className="loadImg" src="/imgs/icon.png" alt="ícone RS" />
                <p>Carregando página...</p>
                <div className="loaded-line">
                    <div className="loading-line" style={{ width: `${progress}%`, transition: "width 10ms linear" }}>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoadingPage;