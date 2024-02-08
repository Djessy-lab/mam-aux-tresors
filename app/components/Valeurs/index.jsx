import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSpring, animated, config } from 'react-spring';
import { isMobile } from 'react-device-detect';


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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 2700;
      const closeThreshold = 3000;
      if (scrollPosition > threshold - 300) {
        setIsScrollPositionReached(true);
      } else {
        setIsScrollPositionReached(false);
        handleCloseLetter();
      }

      if (scrollPosition > closeThreshold) {
        handleCloseLetter();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLetterClick = (index) => {
    setActiveIndex(index);
    setShowCitation(true);
  };

  const handleCloseLetter = () => {
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

  const getLetterClass = (valeur) => {
    switch (valeur.img) {
      case '/img/SLetter2.png':
        return 'translate-y-[-9px]';
      case '/img/ELetter.png':
        return 'translate-y-[-3x]';
      case '/img/RLetter.png':
        return 'translate-y-[3px]';
      case '/img/SLetter.png':
        return 'translate-y-[-8px]';
      case '/img/OLetter.png':
        return 'translate-y-[-7px]';
      default:
        return '';
    }
  };


  return (
    <div className="relative h-screen">
      <div className="flex flex-wrap justify-center mt-8 sm:mt-16 md:mt-24 lg:mt-32 w-full md:w-[80%] mx-auto relative">
        {valeurs.map((valeur, index) => (
          <div
            key={index}
            ref={(el) => (lettersRef.current[index] = el)}
            className="flex flex-col cursor-pointer hover:translate-y-[1px] mb-8 sm:mb-10 md:mb-12"
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
            onClick={() => handleLetterClick(index)}
          >
            <div className={`flex items-center ${!isMobile ? getLetterClass(valeur) : ''}`}>
              <Image
                src={valeur.img}
                alt={valeur.title}
                width={isMobile ? 80 : 150}
                height={isMobile ? 133 : 200}
                className=""
              />
            </div>
          </div>
        ))}
      </div>
      {showCitation && activeIndex !== null && (
        <div className="fixed inset-0 bg-blur-lg backdrop-blur-lg p-8 flex items-center justify-center" onClick={handleCloseLetter}>
          <p className="text-[#404746] text-4xl font-serif text-center w-full sm:w-3/4 lg:w-3/5">{valeurs[activeIndex]?.citation}</p>
        </div>
      )}
      <animated.div
        style={{
          position: 'absolute',
          transform: `translate(-50%, -50%)`,
          ...springProps,
        }}
      >
        <Image src="/img/bebe.png" alt="echelle" width={140} height={140} className={showCitation ? 'blur-lg' : ''} />
      </animated.div>
    </div>
  );
};

export default Valeurs;
