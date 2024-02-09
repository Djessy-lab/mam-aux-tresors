import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

const baseSrc = '/img/Image';

const datas = [
  {
    id: 1,
    image: `${baseSrc}2.jpeg`,
    title: 'Leurs petites mains',
    description: 'Des équipements adaptés à leur taille et à leur âge',
  },
  {
    id: 2,
    image: `${baseSrc}3.jpeg`,
    title: 'Parcours de motricité',
    description: 'Un parcours de motricité est mis à disposition pour leur plus grand plaisir',
  },
  {
    id: 3,
    image: `${baseSrc}4.jpeg`,
    title: 'Coin repas',
    description: "Une petite table pour manger comme les grands et apprendre à se servir tout seul",
  },
  {
    id: 4,
    image: `${baseSrc}5.jpeg`,
    title: 'Coin détente',
    description: 'Un coin détente pour lire des petites histoires ou pour se reposer',
  },
];

const Photos = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    let requestId;

    const startAutoScroll = () => {
      const scroll = () => {
        const scrollAmount = 0.5;
        container.scrollLeft += scrollAmount;

        // Ajouter un délai pour ajuster la vitesse de défilement
        setTimeout(() => {
          requestId = requestAnimationFrame(scroll);
        }, 5);
      };

      requestId = requestAnimationFrame(scroll);
    };

    startAutoScroll();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  const cloneAndAppend = () => {
    if (containerRef.current) {
      datas.forEach((dataItem) => {
        const newDiv = document.createElement('div');
        newDiv.className = 'lg:w-[100vw] h-[100vh]';
        newDiv.innerHTML = `
          <div class="flex ml-2">
            <div class="inline-block px-3">
              <div class="w-[100vw] h-[80vh] max-w-xl overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img
                  class="object-center object-cover w-[100%] h-[100%]"
                  src="${dataItem.image}"
                  alt="${dataItem.title}"
                />
              </div>
            </div>
          </div>
        `;
        containerRef.current.appendChild(newDiv);
      });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const lastSlide = containerRef.current.lastElementChild;
      const rect = lastSlide.getBoundingClientRect();

      if (rect.right <= window.innerWidth) {
        cloneAndAppend();
      }
    }
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex overflow-x-auto pb-10 hide-scroll-bar"
        onScroll={handleScroll}
      >
        {datas.map((slide) => (
          <div key={slide.id} className="lg:w-[100vw] h-[100vh]">
            <div className="flex ml-2">
              <div className="inline-block px-3">
                <div className="w-[100vw] h-[80vh] max-w-xl overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <Image
                    className="object-center object-cover w-[100%] h-[100%]"
                    src={slide.image}
                    alt={slide.title}
                    width={800}
                    height={800}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
