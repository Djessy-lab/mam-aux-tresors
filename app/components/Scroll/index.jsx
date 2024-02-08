'use client'

import { Animator, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, ScrollContainer, ScrollPage, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut, batch } from "react-scroll-motion";
import Photos from "../Photos";
import Logo from "../Logo";
import Equipe from "../Equipe";
import Valeurs from "../Valeurs";
import Contact from "../Contact";
import Image from "next/image";


const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn())
const ZoomInScrollOut2 = batch(FadeIn(), ZoomIn())
const FadeUp = batch(Fade(), MoveOut(0, -400), StickyIn())

const Scroll = () => {
  return (
    <div>
      <ScrollContainer>
        <ScrollPage>
          <Animator animation={batch(Sticky(), Fade(0, 1), ZoomOut(.7, 10), MoveOut(0, -50))} >
            <Image src="/img/coffre3.png" alt="logo" width={500} height={500} className="p-12" />
          </Animator>
        </ScrollPage>

        <ScrollPage>
          <Animator animation={batch(StickyIn())} >
            <Logo />
          </Animator>
        </ScrollPage>

        <ScrollPage>
          <Animator animation={batch(ZoomIn(1.2, 1))} >
            <Photos />
          </Animator>
        </ScrollPage>

        <ScrollPage>
          <Animator animation={ZoomIn(0.5, 1)} >
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
