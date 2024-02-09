import { useState } from 'react';
import Image from 'next/image';
import { useSpring, animated } from 'react-spring';
// import CardFlip from 'react-card-flip';
import dynamic from 'next/dynamic';
const CardFlip = dynamic(() => import('react-card-flip'), { ssr: false });

const Equipe = () => {
  const equipe = [
    { nom: 'Cynthia', tel: '0699090985', photo: '/img/groupe.jpg', description: 'Cynthia, notre douce gardienne, crée une ambiance réconfortante avec son approche bienveillante. Elle partage des histoires et organise des activités ludiques.' },
    { nom: 'Annie', tel: '0675153610', photo: '/img/groupe.jpg', description: "Annie, la magicienne de la créativité, éveille l'artiste en chaque enfant. Ses idées artistiques et ses couleurs vives enchantent notre MAM." },
    { nom: 'Coraline', tel: '0621660590', photo: '/img/groupe.jpg', description: "Coraline, l'aventurière intrépide, transforme chaque jour en une exploration joyeuse. Son encouragement à la découverte fait de chaque moment une aventure excitante." },
  ];

  const [isFlipped, setIsFlipped] = useState(Array(equipe.length).fill(false));

  const handleCardClick = (index) => {
    const newFlippedState = Array(equipe.length).fill(false);
    newFlippedState[index] = !isFlipped[index];
    setIsFlipped(newFlippedState);
  };

  const handleTelClick = (event) => {
    event.stopPropagation();
  };

  const springProps = useSpring({
    transform: isFlipped.some((flipped) => flipped) ? 'rotateY(0deg)' : 'rotateY(0deg)',
  });

  // const renderCardFlip = () => {
  //  return  typeof window !== 'undefined' && window.innerWidth >= 768 ? 'horizontal' : 'vertical';
  // }

  return (
    <div className='p-4 lg:p-20'>
      <h1 className="text-[#636e6d] text-center text-2xl lg:text-5xl font-serif font-bold mb-20">Qui sommes nous ?</h1>
      <div className="flex lg:flex-row flex-col items-center lg:justify-around">
        {equipe.map((member, index) => (

          <CardFlip
            key={index}
            isFlipped={isFlipped[index]}
            flipDirection='horizontal'
            flipSpeedBackToFront={1}
            flipSpeedFrontToBack={1}
          >
            <div className='cursor-pointer mb-4 lg:mb-0' onClick={() => handleCardClick(index)}>
              <animated.div
                className="flex justify-center shadow-lg hover:shadow-md rounded-xl p-4 lg:p-10 w-[80vw] h-48 lg:h-80 lg:w-[25vw] bg-[#F4F4F4F4]"
                style={{ ...springProps }}
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4 lg:mb-10">
                    <Image
                      src={member.photo}
                      alt={member.nom}
                      width={250}
                      height={200}
                      className="w-20 h-20 lg:w-32  lg:h-32 rounded-full"
                    />
                  </div>
                  <div className="shadow-md rounded-xl p-2 lg:p-4 bg-[#AABEBD] min-w-32 max-w-32 lg:min-w-48 lg:max-w-48">
                    <h2 className="text-center text-xl lg:text-3xl text-white font-serif">{member.nom}</h2>
                  </div>
                </div>
              </animated.div>
            </div>
            <div onClick={() => handleCardClick(index)}>
              <animated.div
                className="flex justify-center shadow-lg hover:shadow-md rounded-xl p-4 lg:p-10 w-[80vw] h-48 lg:h-80 lg:w-[25vw] bg-[#F4F4F4F4]"
                style={{ ...springProps }}
              >
                <div className="flex flex-col justify-around items-center min-h-20 mt-4 lg:min-h-60 max-h-20 lg:max-h-60">
                  <div className="">
                    <p className='text-center text-sm text-[#738180]'>{member.description}</p>
                  </div>
                  <a href={`tel:${member.tel}`} className="text-center text-xl lg:text-3xl text-white font-serif" onClick={handleTelClick}>
                    <div className="shadow-md rounded-xl p-2 lg:p-4 bg-[#AABEBD] hover:bg-[#5c6766] min-w-32 max-w-32 lg:min-w-48 lg:max-w-48">
                      {member.tel}
                    </div>
                  </a>
                </div>
              </animated.div>
            </div>
          </CardFlip>
        ))}
      </div>
    </div>
  );
};

export default Equipe;
