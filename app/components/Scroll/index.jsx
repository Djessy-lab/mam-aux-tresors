'use client'

import { GiOpenChest, GiOpenTreasureChest } from "react-icons/gi";
import { Animator, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, ScrollContainer, ScrollPage, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut, batch } from "react-scroll-motion";
import Photos from "../Photos";
import Logo from "../Logo";
import Equipe from "../Equipe";
import Valeurs from "../Valeurs";
import Contact from "../Contact";
import { PiTreeLight, PiTreePalmLight } from "react-icons/pi";
import { TiHeart } from "react-icons/ti";


const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn())
const ZoomInScrollOut2 = batch(FadeIn(), ZoomIn())
const FadeUp = batch(Fade(), MoveOut(0, -400), StickyIn())

const Scroll = () => {
  return (
    <div>
      <ScrollContainer>
        <ScrollPage>
          <Animator animation={batch(Sticky(), Fade(0, 10), ZoomOut(.7, 20), Move(40, 0))} >
            <GiOpenChest size={500} className=" -rotate-3 text-center text-[#AABEBD]" />
          </Animator>
        </ScrollPage>

        <ScrollPage>
          <Animator animation={batch(StickyIn())} >
            <Logo />
          </Animator>
        </ScrollPage>

        <ScrollPage>
          <Animator animation={batch(FadeIn())} >
            <Photos />
          </Animator>
        </ScrollPage>

        <ScrollPage>
          <Animator animation={batch( ZoomIn())} >
            <Equipe />
          </Animator>
        </ScrollPage>

        <ScrollPage>
          {/* <Animator animation={MoveIn(-1000, 0)}> */}
          <Valeurs />
          {/* </Animator> */}
        </ScrollPage>



        <ScrollPage>
          <Animator animation={batch(StickyOut(), MoveIn(0, 100))}>
            <Contact />
          </Animator>
        </ScrollPage>

      </ScrollContainer>
    </div>
  )
}

export default Scroll
