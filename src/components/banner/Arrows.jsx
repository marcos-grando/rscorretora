import React, { useEffect, useRef } from "react";

function Arrows({ mov }) {
    
    const runNextAuto = useRef(null);
    const timeAutoNext = 15000;
    const timeStopMov = 1500;

    let ballChangeIndex = 1; // slide índice (define o slide inicial e a bolinha correspondente)
    useEffect(() => {
        // faz com que a bolinha inicial receba a classe .show
        setTimeout(() => {
            const balls = document.querySelectorAll('.banner .wrapper .balls .ball');
            if (balls.length > ballChangeIndex) {
                balls[ballChangeIndex].classList.add('show');
            }
        }, 250);
    }, []);

    const showSlider = (change) => {
        // controla de forma dinâmica o slide + a bolinha correspondente (junto do .css)

        const slideChange = document.querySelector('.banner .wrapper .container');
        const allSlides = document.querySelectorAll('.banner .wrapper .container .slide');
        const balls = document.querySelectorAll('.banner .wrapper .balls .ball');
        const arrows = document.querySelectorAll('.banner .arrows .arrow');

        balls.forEach(ball => ball.classList.remove('show'));
        arrows.forEach(arrow => arrow.classList.add('block'));

        if (change === 'next') {
            slideChange.classList.add('next');
            slideChange.appendChild(allSlides[0]);
            ballChangeIndex = (ballChangeIndex + 1) % allSlides.length;
        } else {
            slideChange.classList.add('prev');
            slideChange.prepend(allSlides[allSlides.length - 1]);
            ballChangeIndex = (ballChangeIndex - 1 + allSlides.length) % allSlides.length;
        }

        balls[ballChangeIndex].classList.add('show');

        setTimeout(() => {
            arrows.forEach(arrow => arrow.classList.remove('block'))
            slideChange.classList.remove('prev', 'next')
        }, timeStopMov);

        clearTimeout(runNextAuto.current);
        loadingBar();
        runNextAuto.current = setTimeout(() => { showSlider('next') }, timeAutoNext);
    }

    
    const loadingBar = () => {
        const loadingBar = document.querySelector('.banner .loading-bar');

        loadingBar.style.transition = 'none';
        loadingBar.style.width = '100%';
        setTimeout(() => {
            loadingBar.style.transition = `width ${timeAutoNext - 100}ms linear`;
            loadingBar.style.width = "0%";
        }, 50);
    }
    useEffect(() => {
        loadingBar();
        runNextAuto.current = setTimeout(() => { showSlider('next') }, timeAutoNext);

        return () => clearTimeout(runNextAuto.current);
    })

    return (
        <div className="arrows">
            <div className="arrow left" onClick={() => showSlider('prev')}>
                <p><i className="fas fa-chevron-left"></i></p>
            </div>
            <div className="arrow right" onClick={() => showSlider('next')}>
                <p><i className="fas fa-chevron-right"></i></p>
            </div>
        </div>
    )
}

export default Arrows;