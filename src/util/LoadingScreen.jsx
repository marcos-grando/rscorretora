import React from "react";

function LoadingScreen() {

    const keyframes = `
        @keyframes loading {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
        }
        @keyframes shadowInline {
        0%   { left: -150%; }
        100% { left: 150%; }
        }`;

    const container = {
        height: "100%",
        width: "100%",
        flex: 1,
        overflow: "hidden",
    };
    const shadow = {
        backgroundColor: "white",
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
    };
    const shadowBefore = {
        content: '""',
        background: "linear-gradient(120deg, white 0%, grey 50%, white 100%)",
        height: "100%",
        width: "150%",
        position: "absolute",
        top: 0,
        left: "-150%",
        transform: "skewX(-25deg)",
        opacity: 0.15,
        pointerEvents: "none",
        animation: "shadowInline 3s ease-in-out infinite",
    };
    const loading = {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.32,
    };
    const svgStyle = {
        height: 250,
        width: 250,
        color: "grey",
        animation: "loading 3s linear infinite",
    };
    const svgStyle2 = {
        position: "absolute",
        height: 250,
        width: 250,
        color: "darkgrey",
        animation: "loading 3s linear infinite",
    };

    return (
        <div style={container}>
            <style>{keyframes}</style>
            <div style={shadow}>
                {/* <div style={shadowBefore} /> */}
                <div style={loading}>
                    <svg viewBox="0 0 24 24" style={svgStyle2} aria-label="loading">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                    <svg viewBox="0 0 24 24" style={svgStyle} aria-label="loading">
                        <circle cx="12" cy="12" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default LoadingScreen;