// components/Preloader.js

import { useEffect } from "react";
import gsap from "gsap";

const Preloader = ({ isLoading }) => {
    useEffect(() => {
        if (!isLoading) {
            const svg = document.getElementById("preloaderSvg");
            const svgText = document.querySelector(".hero-section .intro_text svg text");
            const tl = gsap.timeline({
                onComplete: startStrokeAnimation,
            });
            const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
            const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

            tl.to(".preloader-heading .load-text , .preloader-heading , .preloader-heading::before ,.cont", {
                delay: 1.5,
                y: -100,
                opacity: 0,
            });
            tl.to(svg, {
                duration: 0.5,
                attr: { d: curve },
                ease: "power2.easeIn",
            }).to(svg, {
                duration: 0.5,
                attr: { d: flat },
                ease: "power2.easeOut",
            });
            tl.to(".preloader", {
                y: -1500,
            });
            tl.to(".preloader", {
                zIndex: -1,
                display: "none",
            });

            function startStrokeAnimation() {
                if (svgText) {
                    svgText.classList.add("animate-stroke");
                }
            }
        }
    }, [isLoading]);

    return (
     
        <div className={`preloader ${isLoading ? '' : 'hidden'}`}>
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <path id="preloaderSvg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
            </svg>

            <div className="preloader-heading">
                <div className="load-text">
                    <span>R</span>
                    <span>a</span>
                    <span>D</span>
                    <span>i</span>
                    <span>n</span>
                    <span>s</span>
                    {/* <span>E</span>
                    <span>R</span> */}
                </div>
            </div>
        </div>
    );
};

export default Preloader;
