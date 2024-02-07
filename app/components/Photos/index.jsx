/* eslint-disable no-unused-vars */
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
const baseSrc = '/img/Image'
const datas = [
  {
    id: 1,
    image: `${baseSrc}2.jpeg`,
    title: 'Leurs petites mains',
    description: 'Des équipements adaptés à leur taille et à leur âge'
  },
  {
    id: 2,
    image: `${baseSrc}3.jpeg`,
    title: 'Parcours de motricité',
    description: 'Un parcours de motricité est mis à disposition pour leur plus grand plaisir'
  },
  {
    id: 3,
    image: `${baseSrc}4.jpeg`,
    title: 'Coin repas',
    description: 'Une petite table pour manger comme les grands et apprendre à se servir tout seul'
  },
  {
    id: 4,
    image: `${baseSrc}5.jpeg`,
    title: 'Coin détente',
    description: 'Un coin détente pour lire des petites histoires ou pour se reposer'
  },
]


const Photos = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    let scrollIntervalId = null;

    const startAutoScroll = () => {
      scrollIntervalId = setInterval(() => {
        const scrollAmount =  0.5;
        container.scrollLeft += scrollAmount;
      },  20);
    };

    startAutoScroll();

    return () => {
      clearInterval(scrollIntervalId);
    };
  }, []);

  const cloneAndAppend = () => {
    if (containerRef.current) {
      datas.forEach((dataItem) => {
        const newDiv = document.createElement('div');
        newDiv.className = "w-[100vw] h-[100vh]";
        newDiv.innerHTML = `
          <div class="flex ml-4">
            <div class="inline-block px-3">
              <div class="w-[100vw] h-[80vh] max-w-lg overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
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
          <div key={slide.id} className="w-[100vw] h-[100vh]">
            <div className="flex ml-4">
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


// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";

{/* <div className="mx-auto lg:w-[50%] h-[50vh] ">
        <Carousel
          autoPlay
          interval={5000}
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          stopOnHover
        >
          {datas.map((slide) => (
            <div key={slide.id} className=''>
              <Image className='object-center object-cover w-[80%] h-[100vh] rounded-xl' src={slide.image} alt={slide.title} width={500} height={500} />
              <div className="rounded-3xl backdrop-blur-sm border border-[#AABEBD] shadow-xl hover:shadow-none flex flex-col justify-center px-6 mb-10 absolute bottom-10 left-[25%] text-center text-white font-bold font-serif w-[50%] h-[30%] ">
                <h2 className='text-2xl text-emerald-300 italic p-4'>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          )
          )}
        </Carousel>
      </div> */}
