import React, { useEffect, useRef } from 'react';
import J from '../../assets/images/letters/J.svg';
import A from '../../assets/images/letters/A.svg';
import R from '../../assets/images/letters/R.svg';
import D from '../../assets/images/letters/D.svg';
import I from '../../assets/images/letters/I.svg';
import M from '../../assets/images/letters/M.svg';
import B from '../../assets/images/letters/B.svg';
import L from '../../assets/images/letters/L.svg';
import O from '../../assets/images/letters/O.svg';
import X from '../../assets/images/letters/X.svg';

import './image-logo.css';

const letters = [J, A, R, D, I, M, B, L, O, X];
const classes = ['J', 'A', 'R', 'D', 'I', 'M', 'B', 'L', 'O', 'X'];

const ImageLogo = () => {
    const containerRef = useRef(null);
    const letterRefs = useRef([]);

useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 600px)').matches;
    if (!isMobile) {
        const handleMouseMove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            letterRefs.current.forEach((ref) => {
                if (!ref) return;

                const rect = ref.getBoundingClientRect();
                const dx = mouseX - (rect.left + rect.width / 2);
                const dy = mouseY - (rect.top + rect.height / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = 200;
                const force = Math.max(0, maxDistance - distance);
                const displacement = force * 0.5;

                ref.style.transform = `translate(${ -forceDirectionX * displacement }px, ${ -forceDirectionY * displacement }px)`;
            });
        };

        const handleMouseLeave = () => {
            letterRefs.current.forEach((ref) => {
                if (ref) ref.style.transform = 'translate(0px, 0px)';
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    } else {
        // Mobile: animação periódica
        const container = containerRef.current;
        if (!container) return;

        const interval = setInterval(() => {
            container.classList.add('animate');
            setTimeout(() => {
                container.classList.remove('animate');
            }, 2400); // tempo da animação
        }, 6000); // executa a cada 5s

        return () => clearInterval(interval);
    }
}, []);


    return (
        <div className='image-logo-container' ref={containerRef}>
            {letters.map((src, i) => (
                <img
                    key={i}
                    ref={(el) => (letterRefs.current[i] = el)}
                    className={`letter letter-${classes[i]}`}
                    src={src}
                    alt={`letra ${classes[i]}`}
                />
            ))}
        </div>
    );
};

export default ImageLogo;
