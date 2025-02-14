"use client"


import React, { useState, useEffect, useRef } from 'react';
import {Banner, CreatorCard} from "../components";
import Image from 'next/image'
import images from '../public/assets'
import {makeId} from '../utils/makeId'
import { useTheme } from "next-themes";

const Home = () => {
  const [hideButton, setHideButton] = useState(false)
  const {theme} = useTheme()
  const parentRef = useRef(null);
  const scrollRef = useRef(null);



  const handleScroll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  }

  const isScrollable = () => {
    const {current} = scrollRef;
    const {current : parent} = parentRef;

    if(current?.scrollWidth >= parent?.offsetWidth) {
      setHideButton(false);
    }else {
      setHideButton(true)
    }
  }

  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.addEventListener('resize', isScrollable);

    }
  })
  

  
  return (
    <div className='flex justify-center sm:px-4 p-12 '>
      <div className='w-full minmd:w-4/5 '>
        <Banner 
          name="Discover, collect, and sell extraordinary NFTs"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"   
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
        <div>
          <h1 className='font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0'>Best Creators</h1>
          <div className='relative flex-1 max-w-full flex mt-3'
          ref={parentRef}
          >
              <div className='flex flex-row w-max overflow-x-auto select-none' ref={scrollRef}>
                  {[6, 7, 8, 9, 10].map((i) => (
                    <CreatorCard 
                      key={`creator-${i}`}
                      rank={i}
                      creatorImage={images[`creator${i}`]}
                      creatorName={`0x${makeId(3)}...${makeId(4)}`}

                      creatorEths={10 - i * 0.5 }
                    />
                  ))}

                 {!hideButton && (<>
      
                  <div onClick={() => handleScroll('left')}
              className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-1/2 transform -translate-y-1/2 cursor-pointer left-0 overflow-x-auto"
            >
              <Image
                src={images.left}
                layout="fill"
                objectFit="contain"
                alt="left"
                className={theme === 'light' && 'filter invert'}
              />
            </div>

            <div
              onClick={() => handleScroll('right')}
              className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-1/2 transform -translate-y-1/2 cursor-pointer right-0"
            >
              <Image
                src={images.right}
                layout="fill"
                objectFit="contain"
                alt="right"
                className={theme === 'light' && 'filter invert'}
              />
            </div>
            </>
            )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;