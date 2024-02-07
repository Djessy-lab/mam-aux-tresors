import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PiLadderSimpleThin } from "react-icons/pi";
import { useSpring, animated, config } from 'react-spring';

const Valeurs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isScrollPositionReached, setIsScrollPositionReached] = useState(false);
  const [showCitation, setShowCitation] = useState(false);
  const lettersRef = useRef([]);
  const citationRef = useRef('');


  const valeurs = [
    { title: 'T', img: '/img/TLetter.png', citation: "Dans chaque coin de la MAM, la tendresse s'épanouit, tissant des liens doux entre les enfants et leurs assistantes maternelles." },
    { title: 'R', img: '/img/RLetter.png', citation: "Au cœur de la MAM, les relations grandissent comme des fleurs, reliant les familles et les assistantes maternelles dans une belle communauté." },
    { title: 'E', img: '/img/ELetter.png', citation: "Chaque jour à la MAM, les petits explorateurs partent à la découverte du monde, nourrissant leur curiosité et leur soif d'apprendre." },
    { title: 'S', img: '/img/SLetter.png', citation: "La MAM est un lieu où les rêves prennent vie, où les enfants peuvent s'inventer mille histoires et explorer l'imaginaire qui les entoure." },
    { title: 'O', img: '/img/OLetter.png', citation: "Les assistantes maternelles, discrètes observatrices, veillent sur chaque sourire, chaque découverte, créant un environnement sûr et stimulant." },
    { title: 'R', img: '/img/RLetter2.png', citation: "Dans la MAM, le respect est la base de chaque interaction, un pilier qui guide les enfants vers la compréhension et l'appréciation mutuelles." },
    { title: 'S', img: '/img/SLetter2.png', citation: "Les sourires radieux des enfants illuminent la MAM, créant une atmosphère chaleureuse où chaque journée commence et se termine avec une joie partagée." },
  ];

  const getLetterSize = (index) => {
    if (lettersRef.current[index]) {
      const rect = lettersRef.current[index].getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    }
    return { width: 0, height: 0 };
  };

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 2700;
      const closeThreshold = 3000;
      if (scrollPosition > threshold -300 ) {
        setIsScrollPositionReached(true);
      } else {
        setIsScrollPositionReached(false);
        handleCloseCitation();
      }

      if (scrollPosition > closeThreshold) {
        handleCloseCitation();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTitleClick = (index) => {
    setActiveIndex(index);
    setShowCitation(true);
  };

  const handleCloseCitation = () => {
    setActiveIndex(null);
    setShowCitation(false);
  };

  const calculateScalePosition = () => {
    const stopScrollPosition = 2990;

    if (activeIndex !== null) {
      const rect = lettersRef.current[activeIndex].getBoundingClientRect();
      const left = rect.left + rect.width / 2;
      const top = rect.bottom - 70;

      if (window.scrollY > stopScrollPosition) {
        return { left: -1000, top: -1000, opacity: 0 };
      }

      return { left, top, opacity: 1 };
    }

    return { left: 0, top: 0, opacity: 0 };
  };


  const springProps = useSpring({
    left: calculateScalePosition().left,
    top: calculateScalePosition().top,
    opacity: activeIndex !== null && isScrollPositionReached ? 1 : 0,
    config: config.wobbly,
  });


  return (
    <div className="relative h-screen">
      <div className="flex flex-wrap justify-center mt-48 w-[80%] mx-auto relative">
        {valeurs.map((valeur, index) => (
          <div
            key={index}
            ref={(el) => (lettersRef.current[index] = el)}
            className="flex flex-col cursor-pointer hover:translate-y-[1px] relative"
            onMouseEnter={() => {
              if (!showCitation) {
                setActiveIndex(index);
                citationRef.current = valeurs[index]?.citation;
              }
            }}
            onMouseLeave={() => {
              if (!showCitation) {
                setActiveIndex(null);
              }
            }}
            onClick={() => handleTitleClick(index)}
          >
            <div
              className={`min-h-48 max-h-48 flex items-center ${valeur.img === '/img/S*.png' ? 'translate-y-[-5px]' : ''
                }`}
            >
              <Image src={valeur.img} alt={valeur.title} width={150} height={200} className="" />
            </div>
          </div>
        ))}
      </div>
      {showCitation && activeIndex !== null && (
        <div className="fixed inset-0 bg-blur-lg backdrop-blur-lg p-8 flex items-center justify-center" onClick={handleCloseCitation} >
          <p className="text-[#404746] text-4xl font-serif text-center">{valeurs[activeIndex]?.citation}</p>
        </div>
      )}
      <animated.div
        style={{
          position: 'absolute',
          transform: `translate(-50%, -50%)`,
          ...springProps,
        }}
      >
        <Image src="/img/pere.png" alt="echelle" width={80} height={80} />
      </animated.div>
    </div>
  );
};

export default Valeurs;
