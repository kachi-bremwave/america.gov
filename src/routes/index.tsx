import type { CSSProperties, FormEvent } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/site.css?raw";
import { SiteMenuSheet } from "@/components/SiteMenuSheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "America.gov — Whatever you need from government, start here." },
      { name: "description", content: "Ask anything and get simple answers only from official government sources. Free to use, no ads, privacy protected." },
      { property: "og:title", content: "America.gov" },
      { property: "og:description", content: "Whatever you need from government, start here." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { "dir": "ltr", "lang": "en" }, body: { "className": "\x66ont-body \x74ext-primary \x61ntialiased" } } },
  component: Index,
});

function Index() {
  const [openMenu0, setOpenMenu0] = useState(null as string | null);
  const menuRoot0 = useRef<Element | null>(null);
  const [openGovDialog, setOpenGovDialog] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [heroPlaying, setHeroPlaying] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(2);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  const HERO_SLIDES = [
    {
      id: 1,
      query: "How do I replace my social security card?",
      alt: "A person walking along a beach",
      img: "/site-assets/7fffd04527c9ccf5.webp",
      backdrop: "/site-assets/947a7880d7de5ca0.webp",
    },
    {
      id: 2,
      query: "How do I book a campsite in a national park?",
      alt: "People jumping from rocks beside a forest",
      img: "/site-assets/947a7880d7de5ca0.webp",
      backdrop: "/site-assets/947a7880d7de5ca0.webp",
    },
    {
      id: 3,
      query: "I’m a veteran. How do I get care?",
      alt: "A person standing in the bed of a pickup truck beside the water",
      img: "/site-assets/585636efd63190f9.webp",
      backdrop: "/site-assets/585636efd63190f9.webp",
    },
    {
      id: 4,
      query: "I just got married. How do I change my last name?",
      alt: "A bride sitting in a car with a rain-speckled window",
      img: "/site-assets/18c178701e0261da.webp",
      backdrop: "/site-assets/18c178701e0261da.webp",
    },
    {
      id: 5,
      query: "When do I qualify for Medicare?",
      alt: "People sitting on a stone wall overlooking the sea",
      img: "/site-assets/6774c6d98e6cbeed.webp",
      backdrop: "/site-assets/6774c6d98e6cbeed.webp",
    },
    {
      id: 6,
      query: "Help me find a new job",
      alt: "A person riding an escalator",
      img: "/site-assets/b1309fcc0dbee669.webp",
      backdrop: "/site-assets/b1309fcc0dbee669.webp",
    },
    {
      id: 7,
      query: "How do I register my new business?",
      alt: "A person repairing a bicycle in a workshop",
      img: "/site-assets/ed421744a96c34e0.webp",
      backdrop: "/site-assets/ed421744a96c34e0.webp",
    },
    {
      id: 8,
      query: "How do I update my address with USPS?",
      alt: "An adult and child looking at a tablet among moving boxes",
      img: "/site-assets/12884d7617857096.webp",
      backdrop: "/site-assets/12884d7617857096.webp",
    },
    {
      id: 9,
      query: "How do I get a passport for my child?",
      alt: "Child looking through binoculars",
      img: "/site-assets/0a7aabcd52dc33a3.webp",
      backdrop: "/site-assets/0a7aabcd52dc33a3.webp",
    },
    {
      id: 10,
      query: "Where can I enlist in the armed services?",
      alt: "Two people standing together in a doorway",
      img: "/site-assets/fb35939d7c49f583.webp",
      backdrop: "/site-assets/fb35939d7c49f583.webp",
    },
  ];

  const handleDemoSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const field = (event.currentTarget.querySelector('input[name="message"]') ||
      event.currentTarget.querySelector('textarea[name="message"]')) as HTMLInputElement | HTMLTextAreaElement | null;
    const text = (field?.value ?? "").trim();
    window.location.href = `/chat?q=${encodeURIComponent(text || HERO_SLIDES[activeSlideIndex]?.query || "hi")}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledDown(window.scrollY > 280);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const message = new URLSearchParams(window.location.search).get("message");
    if (message && message.trim()) {
      window.location.href = `/chat?q=${encodeURIComponent(message.trim())}`;
    }
  }, []);

  useEffect(() => {
    if (!openMenu0 && !openGovDialog && !openFeedback) return;
    const closeOutside = (event: MouseEvent) => {
      if (event.target instanceof Node && ![menuRoot0.current].some(root => root?.contains(event.target as Node))) setOpenMenu0(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpenMenu0(null); setOpenGovDialog(false); setOpenFeedback(false); } };
    document.addEventListener("click", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => { document.removeEventListener("click", closeOutside); document.removeEventListener("keydown", closeOnEscape); };
  }, [openMenu0, openGovDialog, openFeedback]);

  useEffect(() => {
    if (!heroPlaying) return;
    const id = window.setInterval(() => {
      setActiveSlideIndex(index => (index + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [heroPlaying]);

  useImportedLayout();

  const carouselContent0 = (
    <div className="relative">
      <div className="relative isolate" data-site-hero-enter="3">
        {/* Ambient backdrop glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 translate-y-[8.727273%] opacity-60 dark:opacity-[0.08]" aria-hidden="true">
          <div className="absolute -inset-[360px] blur-[120px]">
            <div className="absolute inset-[360px] scale-90">
              <img
                className="absolute inset-0 size-full object-cover transition-opacity duration-700"
                src={HERO_SLIDES[activeSlideIndex]?.backdrop || HERO_SLIDES[0].backdrop}
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Hero Card Container - Slide row showing full image, no slicing across slides */}
        <div
          className="overflow-hidden squircle relative isolate touch-pan-y touch-pinch-zoom cursor-grab rounded-40 shadow-hero-photo after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-[inherit] after:[corner-shape:inherit] after:inset-ring after:inset-ring-border-quaternary dark:after:inset-ring-blue-900/5 active:cursor-grabbing mobile:rounded-[calc(58px*var(--corner-scale))]"
          data-slot="carousel-content"
        >
          <div
            className="flex ml-0 transition-transform duration-500 ease-out"
            style={{ transform: `translate3d(-${activeSlideIndex * 100}%, 0px, 0px)` }}
          >
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                className="min-w-full shrink-0 grow-0 basis-full relative aspect-400/493 pl-0 mobile:aspect-3/2 overflow-hidden"
                role="group"
                aria-roledescription="slide"
                data-slot="carousel-item"
                aria-hidden={idx !== activeSlideIndex}
                aria-label={`Example ${idx + 1} of ${HERO_SLIDES.length}: ${slide.query}`}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    className="absolute inset-0 size-full object-cover"
                    alt={slide.alt}
                    src={slide.img}
                    loading={idx === 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-background-primary-invert opacity-20 dark:opacity-40"
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-atomic="true" aria-live="polite">
        Example {activeSlideIndex + 1} of {HERO_SLIDES.length}: {HERO_SLIDES[activeSlideIndex]?.query}
      </p>

      {/* Carousel Navigation & Playback Controls */}
      <div className="relative z-20 mt-10 mobile:mt-12" data-site-hero-enter="4">
        <div className="relative flex items-center justify-center gap-2.5">
          <button
            className="inline-flex shrink-0 cursor-pointer items-center justify-center font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint active:scale-95 focus-visible:outline-none rounded-full size-12 sm:size-14 bg-background-tertiary text-text-primary hover:bg-background-secondary"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setActiveSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
            }}
            type="button"
            tabIndex={0}
            data-slot="carousel-previous"
            aria-label="Previous example"
          >
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.77 10L13.06 4.71L11.65 3.29L4.94 10L11.65 16.71L13.06 15.29L7.77 10Z" fill="currentColor" />
            </svg>
          </button>

          <button
            className="inline-flex shrink-0 cursor-pointer items-center justify-center font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint active:scale-95 focus-visible:outline-none rounded-full size-12 sm:size-14 bg-background-tertiary text-text-primary hover:bg-background-secondary"
            type="button"
            tabIndex={0}
            data-slot="carousel-playback"
            aria-label={heroPlaying ? "Pause the example questions" : "Play the example questions"}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setHeroPlaying((p) => !p);
            }}
          >
            {heroPlaying ? (
              <svg fill="none" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M8 4C8 3.45 7.55 3 7 3H5C4.45 3 4 3.45 4 4V16C4 16.55 4.45 17 5 17H7C7.55 17 8 16.55 8 16V4Z" fill="currentColor" />
                <path d="M16 4C16 3.45 15.55 3 15 3H13C12.45 3 12 3.45 12 4V16C12 16.55 12.45 17 13 17H15C15.55 17 16 16.55 16 16V4Z" fill="currentColor" />
              </svg>
            ) : (
              <svg fill="none" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 3L18 10L6 17L6 3Z" fill="currentColor" />
              </svg>
            )}
          </button>

          <button
            className="inline-flex shrink-0 cursor-pointer items-center justify-center font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint active:scale-95 focus-visible:outline-none rounded-full size-12 sm:size-14 bg-background-tertiary text-text-primary hover:bg-background-secondary"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
            }}
            type="button"
            tabIndex={0}
            data-slot="carousel-next"
            aria-label="Next example"
          >
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.35 3.29L15.06 10L8.35 16.71L6.94 15.29L12.23 10L6.94 4.71L8.35 3.29Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <style>{capturedCSS}</style>
      <div data-ce="astro-island" data-site-import-carousel-root="3" {...({ uid: "Z23wQGh", prefix: "r1", "component-url": "/_astro/home-page.CClgCQBv.js", "component-export": "HomePageIsland", "renderer-url": "/_astro/client.CH1YUKG_.js", props: "{\"pathname\":[0,\"/\"],\"search\":[0,\"\"],\"chatOnly\":[0,false],\"heroCards\":[1,[[0,{\"id\":[0,\"socialSecurity\"],\"image\":[0,{\"backdropSrc\":[0,\"/_astro/social-security.Dp3mFOLc_Z23DCuB.webp\"],\"backdropSrcSet\":[0,\"/_astro/social-security.Dp3mFOLc_10nXhy.webp 64w, /_astro/social-security.Dp3mFOLc_Z23DCuB.webp 128w\"],\"src\":[0,\"/_astro/social-security.Dp3mFOLc_2wyN13.webp\"],\"srcSet\":[0,\"/_astro/social-security.Dp3mFOLc_1DREtn.webp 640w, /_astro/social-security.Dp3mFOLc_1FHtli.webp 832w, /_astro/social-security.Dp3mFOLc_ZlB16Y.webp 1080w, /_astro/social-security.Dp3mFOLc_Zwibtr.webp 1440w, /_astro/social-security.Dp3mFOLc_8lESm.webp 1920w, /_astro/social-security.Dp3mFOLc_2wyN13.webp 2000w\"],\"mobileSrcSet\":[0,\"/_astro/social-security.Dp3mFOLc_Z16sV0R.webp 360w, /_astro/social-security.Dp3mFOLc_Z1FBBT9.webp 480w, /_astro/social-security.Dp3mFOLc_Z1UB7tK.webp 640w, /_astro/social-security.Dp3mFOLc_Z1S89wM.webp 832w, /_astro/social-security.Dp3mFOLc_dsfjv.webp 1080w, /_astro/social-security.Dp3mFOLc_Z16MtUu.webp 1440w, /_astro/social-security.Dp3mFOLc_Z1enVOC.webp 1622w\"],\"width\":[0,2000],\"height\":[0,2000]}]}],[0,{\"id\":[0,\"nationalPark\"],\"image\":[0,{\"backdropSrc\":[0,\"/_astro/national-park.DCQqmN0z_Z7qnDN.webp\"],\"backdropSrcSet\":[0,\"/_astro/national-park.DCQqmN0z_KQSLX.webp 64w, /_astro/national-park.DCQqmN0z_Z7qnDN.webp 128w\"],\"src\":[0,\"/_astro/national-park.DCQqmN0z_1xqNv8.webp\"],\"srcSet\":[0,\"/_astro/national-park.DCQqmN0z_Z1ERj4o.webp 640w, /_astro/national-park.DCQqmN0z_2gtUnC.webp 832w, /_astro/national-park.DCQqmN0z_ZYMkoM.webp 1080w, /_astro/national-park.DCQqmN0z_Zd9nqn.webp 1440w, /_astro/national-park.DCQqmN0z_1v0oFG.webp 1920w, /_astro/national-park.DCQqmN0z_1xqNv8.webp 2000w\"],\"mobileSrcSet\":[0,\"/_astro/national-park.DCQqmN0z_PyIcP.webp 360w, /_astro/national-park.DCQqmN0z_1CFF9T.webp 480w, /_astro/national-park.DCQqmN0z_Z6N4ey.webp 640w, /_astro/national-park.DCQqmN0z_Z1hwQ72.webp 832w, /_astro/national-park.DCQqmN0z_OftMD.webp 1080w, /_astro/national-park.DCQqmN0z_2giRuk.webp 1081w\"],\"width\":[0,2000],\"height\":[0,1333]}]}],[0,{\"id\":[0,\"veteranCare\"],\"image\":[0,{\"backdropSrc\":[0,\"/_astro/veteran-care.G_BGYd8h_Z1iPeT7.webp\"],\"backdropSrcSet\":[0,\"/_astro/veteran-care.G_BGYd8h_ZGUd3g.webp 64w, /_astro/veteran-care.G_BGYd8h_Z1iPeT7.webp 128w\"],\"src\":[0,\"/_astro/veteran-care.G_BGYd8h_22X0kr.webp\"],\"srcSet\":[0,\"/_astro/veteran-care.G_BGYd8h_Z27t2c7.webp 640w, /_astro/veteran-care.G_BGYd8h_utJ19.webp 832w, /_astro/veteran-care.G_BGYd8h_ZWIn20.webp 1080w, /_astro/veteran-care.G_BGYd8h_1FRAKy.webp 1440w, /_astro/veteran-care.G_BGYd8h_p0Mq8.webp 1920w, /_astro/veteran-care.G_BGYd8h_22X0kr.webp 2000w\"],\"mobileSrcSet\":[0,\"/_astro/veteran-care.G_BGYd8h_Z1fsFwl.webp 360w, /_astro/veteran-care.G_BGYd8h_1ObI9Q.webp 480w, /_astro/veteran-care.G_BGYd8h_1cHR9V.webp 640w, /_astro/veteran-care.G_BGYd8h_Z2oBXIV.webp 832w, /_astro/veteran-care.G_BGYd8h_ZuMXcx.webp 1080w, /_astro/veteran-care.G_BGYd8h_2iQ3Iq.webp 1083w\"],\"width\":[0,2000],\"height\":[0,1335]}]}],[0,{\"id\":[0,\"nameChange\"],\"image\":[0,{\"backdropSrc\":[0,\"/_astro/name-change.CSCtyIHX_MI3vl.webp\"],\"backdropSrcSet\":[0,\"/_astro/name-change.CSCtyIHX_Z1xC0Nt.webp 64w, /_astro/name-change.CSCtyIHX_MI3vl.webp 128w\"],\"src\":[0,\"/_astro/name-change.CSCtyIHX_5SstQ.webp\"],\"srcSet\":[0,\"/_astro/name-change.CSCtyIHX_ZO3NJL.webp 640w, /_astro/name-change.CSCtyIHX_Z1PnVgK.webp 832w, /_astro/name-change.CSCtyIHX_ZvDS8P.webp 1080w, /_astro/name-change.CSCtyIHX_Z1sc3cO.webp 1440w, /_astro/name-change.CSCtyIHX_1D0AW5.webp 1920w, /_astro/name-change.CSCtyIHX_5SstQ.webp 2000w\"],\"mobileSrcSet\":[0,\"/_astro/name-change.CSCtyIHX_Z2nNakl.webp 360w, /_astro/name-change.CSCtyIHX_1ToyWc.webp 480w, /_astro/name-change.CSCtyIHX_108J8C.webp 640w, /_astro/name-change.CSCtyIHX_q7Tzt.webp 832w, /_astro/name-change.CSCtyIHX_Z1tGhoq.webp 1080w, /_astro/name-change.CSCtyIHX_24XkAP.webp 1435w\"],\"width\":[0,2000],\"height\":[0,1769]}]}],[0,{\"id\":[0,\"medicare\"],\"image\":[0,{\"backdropSrc\":[0,\"/_astro/medicare.DqRXMPkA_2eGROM.webp\"],\"backdropSrcSet\":[0,\"/_astro/medicare.DqRXMPkA_Z1qGndW.webp 64w, /_astro/medicare.DqRXMPkA_2eGROM.webp 128w\"],\"src\":[0,\"/_astro/medicare.DqRXMPkA_ZgvyOQ.webp\"],\"srcSet\":[0,\"/_astro/medicare.DqRXMPkA_ZL6US9.webp 640w, /_astro/medicare.DqRXMPkA_28OIKa.webp 832w, /_astro/medicare.DqRXMPkA_ZpRboO.webp 1080w, /_astro/medicare.DqRXMPkA_ZVHshH.webp 1440w, /_astro/medicare.DqRXMPkA_YeLuw.webp 1920w, /_astro/medicare.DqRXMPkA_ZgvyOQ.webp 2000w\"],\"mobileSrcSet\":[0,\"/_astro/medicare.DqRXMPkA_ZFkBsc.webp 360w, /_astro/medicare.DqRXMPkA_ZaVJ6v.webp 480w, /_astro/medicare.DqRXMPkA_Z1HbB5s.webp 640w, /_astro/medicare.DqRXMPkA_1N1m5v.webp 832w, /_astro/medicare.DqRXMPkA_2qfz3.webp 1080w, /_astro/medicare.DqRXMPkA_ZR2gQO.webp 1387w\"],\"width\":[0,2000],\"height\":[0,1710]}]}],[0,{\"id\":[0,\"newJob\"],\"image\":[0,{\"backdropSrc\":[0,\"/_astro/new-job.C_hegThO_Z1SgNSP.webp\"],\"backdropSrcSet\":[0,\"/_astro/new-job.C_hegThO_Z1uvN02.webp 64w, /_astro/new-job.C_hegThO_Z1SgNSP.webp 128w\"],\"src\":[0,\"/_astro/new-job.C_hegThO_Z2tG1Gu.webp\"],\"srcSet\":[0,\"/_astro/new-job.C_hegThO_LWeAv.webp 640w, /_astro/new-job.C_hegThO_Z22V3N4.webp 832w, /_astro/new-job.C_hegThO_1tcrJL.webp 1080w, /_astro/new-job.C_hegThO_Z1P69AS.webp 1440w, /_astro/new-job.C_hegThO_ZRjClE.webp 1920w, /_astro/new-job.C_hegThO_Z2tG1Gu.webp 2000w\"],\"mobileSrcSet\":[0,\"/_astro/new-job.C_hegThO_Zl8rwN.webp 360w, /_astro/new-job.C_hegThO_1eSxMO.webp 480w, /_astro/new-job.C_hegThO_MQ9nM.webp 640w, /_astro/new-job.C_hegThO_Z2aePXA.webp 832w, /_astro/new-job.C_hegThO_Z1Pwwe8.webp 1080w, /_astro/new-job.C_hegThO_Z1xDrdt.webp 1082w\"],\"width\":[0,2000],\"height\":[0,1334]}]}],[0,{\"id\":[0,\"newBusiness\"],\"image\":[0,{\"backdropSrc\":[0,\"/_astro/new-business.D8WzdOqW_2hdm2T.webp\"],\"backdropSrcSet\":[0,\"/_astro/new-business.D8WzdOqW_HGX5f.webp 64w, /_astro/new-business.D8WzdOqW_2hdm2T.webp 128w\"],\"src\":[0,\"/_astro/new-business.D8WzdOqW_ZXW9v7.webp\"],\"srcSet\":[0,\"/_astro/new-business.D8WzdOqW_1c8Ogr.webp 640w, /_astro/new-business.D8WzdOqW_2rD5CN.webp 832w, /_astro/new-business.D8WzdOqW_1AK0da.webp 1080w, /_astro/new-business.D8WzdOqW_Jj21I.webp 1440w, /_astro/new-business.D8WzdOqW_1DDljS.webp 1920w, /_astro/new-business.D8WzdOqW_ZXW9v7.webp 2000w\"],\"mobileSrcSet\":[0,\"/_astro/new-business.D8WzdOqW_FBp3Y.webp 360w, /_astro/new-business.D8WzdOqW_Z1jUk3K.webp 480w, /_astro/new-business.D8WzdOqW_Z1Vob3F.webp 640w, /_astro/new-business.D8WzdOqW_ZswS8B.webp 832w, /_astro/new-business.D8WzdOqW_ZNJ9t7.webp 1080w, /_astro/new-business.D8WzdOqW_2x2Rrw.webp 1440w, /_astro/new-business.D8WzdOqW_ZxuMrW.webp 1587w\"],\"width\":[0,2000],\"height\":[0,1957]}]}],[0,{\"id\":[0,\"addressChange\"],\"image\":[0,{\"backdropSrc\":[0,\"/_astro/address-change.CgPY5X1Q_Z1l3c5K.webp\"],\"backdropSrcSet\":[0,\"/_astro/address-change.CgPY5X1Q_1GMQXC.webp 64w, /_astro/address-change.CgPY5X1Q_Z1l3c5K.webp 128w\"],\"src\":[0,\"/_astro/address-change.CgPY5X1Q_Z1RqMCu.webp\"],\"srcSet\":[0,\"/_astro/address-change.CgPY5X1Q_ZeswgX.webp 640w, /_astro/address-change.CgPY5X1Q_Z1cseFY.webp 832w, /_astro/address-change.CgPY5X1Q_ZvyO5B.webp 1080w, /_astro/address-change.CgPY5X1Q_Z1HJcAu.webp 1440w, /_astro/address-change.CgPY5X1Q_1RuqDA.webp 1920w, /_astro/address-change.CgPY5X1Q_Z1RqMCu.webp 2000w\"],\"mobileSrcSet\":[0,\"/_astro/address-change.CgPY5X1Q_2sxcQ9.webp 360w, /_astro/address-change.CgPY5X1Q_Z1xK3tH.webp 480w, /_astro/address-change.CgPY5X1Q_2iSHbx.webp 640w, /_astro/address-change.CgPY5X1Q_n0MJf.webp 832w, /_astro/address-change.CgPY5X1Q_24VRr9.webp 1080w, /_astro/address-change.CgPY5X1Q_Z27osqq.webp 1083w\"],\"width\":[0,2000],\"height\":[0,1335]}]}],[0,{\"id\":[0,\"passport\"],\"image\":[0,{\"backdropSrc\":[0,\"/_astro/child-passport.HGvPBa9L_2dovfU.webp\"],\"backdropSrcSet\":[0,\"/_astro/child-passport.HGvPBa9L_kKeq9.webp 64w, /_astro/child-passport.HGvPBa9L_2dovfU.webp 128w\"],\"src\":[0,\"/_astro/child-passport.HGvPBa9L_Z18saoo.webp\"],\"srcSet\":[0,\"/_astro/child-passport.HGvPBa9L_Z1KcWJe.webp 640w, /_astro/child-passport.HGvPBa9L_2lYsEG.webp 832w, /_astro/child-passport.HGvPBa9L_ZOIzsU.webp 1080w, /_astro/child-passport.HGvPBa9L_Z21SWXN.webp 1440w, /_astro/child-passport.HGvPBa9L_Z2sI4Vf.webp 1920w, /_astro/child-passport.HGvPBa9L_Z18saoo.webp 2000w\"],\"mobileSrcSet\":[0,\"/_astro/child-passport.HGvPBa9L_VMLnS.webp 360w, /_astro/child-passport.HGvPBa9L_20GDQX.webp 480w, /_astro/child-passport.HGvPBa9L_M9gIh.webp 640w, /_astro/child-passport.HGvPBa9L_Z18ICI1.webp 832w, /_astro/child-passport.HGvPBa9L_ZktE9Y.webp 1080w, /_astro/child-passport.HGvPBa9L_Z1nxXzH.webp 1081w\"],\"width\":[0,2000],\"height\":[0,1333]}]}],[0,{\"id\":[0,\"militaryService\"],\"image\":[0,{\"backdropSrc\":[0,\"/_astro/military-service.CGQr56Od_Z2lHDwS.webp\"],\"backdropSrcSet\":[0,\"/_astro/military-service.CGQr56Od_OT2Fe.webp 64w, /_astro/military-service.CGQr56Od_Z2lHDwS.webp 128w\"],\"src\":[0,\"/_astro/military-service.CGQr56Od_1FdAyG.webp\"],\"srcSet\":[0,\"/_astro/military-service.CGQr56Od_Z1zlqwu.webp 640w, /_astro/military-service.CGQr56Od_1GXESY.webp 832w, /_astro/military-service.CGQr56Od_Z1DbGOQ.webp 1080w, /_astro/military-service.CGQr56Od_1WUyIg.webp 1440w, /_astro/military-service.CGQr56Od_Z2kewgw.webp 1920w, /_astro/military-service.CGQr56Od_1FdAyG.webp 2000w\"],\"mobileSrcSet\":[0,\"/_astro/military-service.CGQr56Od_Z2jX7Ak.webp 360w, /_astro/military-service.CGQr56Od_2bLj9u.webp 480w, /_astro/military-service.CGQr56Od_1GN9XO.webp 640w, /_astro/military-service.CGQr56Od_Z177th8.webp 832w, /_astro/military-service.CGQr56Od_Z146SBH.webp 1080w, /_astro/military-service.CGQr56Od_phPeY.webp 1217w\"],\"width\":[0,2000],\"height\":[0,1500]}]}]]]}", client: "load", opts: "{\"name\":\"HomePageIsland\",\"value\":true}", "await-children": "" } as any)}>
        <div className="contents" data-slot="chat-page-frame">
          <div className="flex flex-col min-h-dvh bg-background-primary text-primary" data-chrome-canvas="light" data-site-import-carousel-root="1">
            <a className={"fixed top-3 left-3 z-floating rounded-40 bg-background-primary px-4 py-2.5 type-body-m font-medium text-primary \x2dtranslate-y-[\x3300%] pointer-events-none \x66ocus:\x70ointer-events-auto \x66ocus:\x74ranslate-y-0 transition-[translate] duration-200 ease-out \x6dotion-reduce:\x74ransition-none \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none"} href="#landing-main">Skip to main content</a>
            <div style={{ minHeight: "calc(40px + env(safe-area-inset-top))" }} data-slot="nav-header-flow">
              <div className={"pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] z-30 relative visible \x74ranslate-y-0 bg-background-primary"}>
                <div className={"grid grid-rows-[1fr] \x62g-inherit"} data-slot="gov-banner-row">
                  <div className="min-h-0 overflow-hidden">
                    <div className="">
                      <ImportedSectionUSGovernmentWebsites openGovDialog={openGovDialog} onOpenGov={() => setOpenGovDialog(true)} />
                    </div>
                  </div>
                </div>
                <div className={"absolute \x69nset-x-0 top-full"}>
                  <header className={"relative items-center p-6 grid grid-cols-[minmax(0,1fr)_auto] gap-3 \x6dax-[\x3320px]:\x67rid-cols-1 site-header \x6dx-(\x2d-site-header-inset) w-[calc(100%-2*var(--site-header-inset))] mt-4 sm:px-6 \x6dax-mobile:\x70-3 [--site-header-inset:0.75rem] mobile:[--site-header-inset:calc((100%-var(--site-frame-width))/2+1.5rem)]"} ref={node => { menuRoot0.current = node; }} data-site-import-scroll-header={"{\"desktop\":{\"added\":[\"sm:px-12\",\"[--site-header-inset:0px]\"],\"removed\":[\"mt-4\",\"sm:px-6\",\"max-mobile:p-3\",\"[--site-header-inset:0.75rem]\",\"mobile:[--site-header-inset:calc((100%-var(--site-frame-width))/2+1.5rem)]\"],\"threshold\":648},\"mobile\":{\"added\":[\"sm:px-12\",\"[--site-header-inset:0px]\"],\"removed\":[\"mt-4\",\"sm:px-6\",\"max-mobile:p-3\",\"[--site-header-inset:0.75rem]\",\"mobile:[--site-header-inset:calc((100%-var(--site-frame-width))/2+1.5rem)]\"],\"threshold\":633}}"}>
                    <div className="relative flex min-w-0 flex-1 items-center gap-2">
                      <a className="flex min-w-0 max-w-full items-center gap-2.5 site-home-link" aria-label="America.gov home" href="/">
                        <svg className="text-primary h-auto w-[156px] max-w-full overflow-visible" aria-hidden="true" width="159" height="23" viewBox="0 0 159 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g data-slot="header-flag">
                            <g className="pointer-events-none">
                              <image x="0" y="1" width="30" height="17" href="/site-assets/us-flag.svg" />
                            </g>
                            <rect width="31" height="17" y="1" fill="transparent" />
                          </g>
                          <svg x="37" y="0" width="121.058" height="22.25" viewBox="0 0 121.058 22.25" fill="currentColor">
                            <path d="M41.5724 16.102C40.3881 16.102 39.5069 15.657 38.8131 14.6689C38.1397 13.7101 37.7664 12.3853 37.7664 10.8381V10.6859H45.3783L45.5247 10.5395C45.5613 9.14299 45.1163 7.7026 44.2716 6.83602C43.4724 6.01628 42.398 5.5625 41.1332 5.5625C38.0885 5.5625 35.8635 8.21933 35.8635 11.8525C35.8635 13.7086 36.3114 15.2983 37.159 16.4518C38.0416 17.6522 39.3488 18.2977 40.8405 18.2977C42.9747 18.2977 44.6215 16.8441 45.6711 14.199L45.0811 13.9062C44.2599 15.373 42.9586 16.102 41.5724 16.102ZM40.6941 6.73355C42.1213 6.73355 43.0391 7.74651 43.1826 9.66118H37.7664C38.2129 6.98679 40.0032 6.73355 40.6941 6.73355Z" />
                            <path d="M66.1645 16.102C63.7711 16.102 62.3703 14.1522 62.3703 11.0035C62.3703 8.86194 63.433 6.73355 65.7253 6.73355C66.7661 6.73355 67.3355 7.06291 67.3355 7.9046V8.63651C67.3355 9.46357 67.8698 10.1003 68.653 10.1003C69.2736 10.1003 69.9704 9.62605 69.9704 8.75655C69.9704 6.87115 68.2153 5.5625 65.8717 5.5625C64.4342 5.5625 63.0539 6.10265 62.0409 7.1727C60.9079 8.37156 60.3092 10.0476 60.3092 12.0033C60.3092 15.7111 62.2839 18.2977 65.2862 18.2977C68.5066 18.2977 69.6776 15.3701 70.1168 13.7599L69.5312 13.4671C68.2958 15.7375 67.1525 16.102 66.1645 16.102Z" />
                            <path d="M80.6562 16.8163C80.2815 16.8163 80.2171 16.5162 80.2171 15.8092V9.95395C80.2171 7.03803 78.7899 5.5625 75.8257 5.5625C73.0444 5.5625 71.5806 7.02632 71.5806 8.78289C71.5806 9.68168 72.3315 10.1003 72.898 10.1003C73.6241 10.1003 74.2155 9.5148 74.2155 8.63651V8.05099C74.2155 7.02632 75.1523 6.73355 75.8257 6.73355C77.2412 6.73355 77.875 7.51084 77.875 9.66118V10.3931C73.7163 11.7047 71.1414 12.5229 71.1414 15.2237C71.1414 16.9803 72.3842 18.2977 74.1027 18.2977C75.8213 18.2977 76.9499 17.2233 77.875 16.2484C78.0214 17.8586 78.6655 18.2977 79.778 18.2977C80.7382 18.2977 81.5799 17.5482 82.1201 16.3947L81.5345 16.102C81.2315 16.525 80.9212 16.8163 80.6562 16.8163ZM77.875 15.0773C76.9967 15.9556 76.0306 16.4635 75.2123 16.4635C74.173 16.4635 73.6299 15.6643 73.6299 14.4918C73.6299 12.7484 75.1333 12.2346 77.875 11.2714V15.0773Z" />
                            <path d="M116.959 5.85526V6.58717C118.423 6.58717 118.569 7.31908 117.984 8.78289L115.641 14.4918L113.299 8.34375C112.86 7.1727 113.007 6.58717 114.617 6.58717V5.85526H109.201V6.58717C109.786 6.58717 110.079 6.73355 110.372 7.31908C110.487 7.55036 114.91 18.0049 114.91 18.0049H115.349L119.447 8.19737C119.887 7.02632 120.179 6.58717 121.058 6.58717V5.85526H116.959Z" />
                            <path d="M34.0659 15.9571V9.61141C34.0659 6.97655 32.9285 5.5625 30.8485 5.5625C30.2044 5.5625 28.5224 5.71035 26.8947 7.46546C26.4424 6.18901 25.5319 5.5625 24.112 5.5625C22.6921 5.5625 21.2531 6.60181 20.451 7.46546V5.85526L20.1582 5.41612L16.3523 7.19612L16.5089 7.75822C16.5089 7.75822 17.0842 7.61038 17.377 7.61038C17.8161 7.61038 18.1089 7.90314 18.1089 8.34229V16.2484C18.1089 16.8954 17.6697 17.4194 16.9378 17.4194C16.4972 17.4194 16.1078 17.1764 15.9117 16.8149C14.7436 14.6382 8.59553 0 8.59553 0H8.15638L1.90296 15.3042C1.37306 16.6187 0.787533 17.1266 0 17.2745V18.0049H4.49684V17.2745C4.2802 17.2745 3.62002 17.2774 3.32579 16.8353C3.04474 16.4108 3.12086 15.7565 3.47363 14.9177L4.36656 12.7367H11.1821L12.0501 14.7992C12.4 15.6204 12.4263 16.2645 12.1292 16.7124C11.8701 17.1047 11.2728 17.2745 10.6434 17.2745V18.0049H21.9148L21.906 17.2745C20.7437 17.2745 20.451 16.9817 20.451 15.9571L20.4671 8.49013C21.1229 7.7509 22.127 7.31908 22.9395 7.31908C24.2979 7.31908 24.9888 8.01585 24.9888 9.95395V15.9571C24.9888 16.9817 24.696 17.2745 23.525 17.2745V18.0049H28.7947V17.2745C27.6237 17.2745 27.3309 16.9817 27.3309 15.9571V9.95395C27.3309 9.50309 27.3309 9.07566 27.1845 8.49013C27.7481 7.90314 28.6747 7.31908 29.673 7.31908C31.0666 7.31908 31.7224 8.13589 31.7224 10.1003V15.9571C31.7224 16.9817 31.4296 17.2745 30.2585 17.2745V18.0049H35.5283V17.2745C34.3601 17.2745 34.0688 16.9817 34.0645 15.9571H34.0659ZM4.90525 11.4178L7.74066 4.39145L10.6419 11.4178H4.90525Z" />
                            <path d="M58.5526 15.9571V5.85526L58.2599 5.41612L54.8521 6.8448C54.7818 6.05141 54.189 5.52883 53.3341 5.52883C52.7867 5.52883 52.2026 5.75572 51.5966 6.20511C51.1735 6.51837 50.6993 6.97069 50.2938 7.46546V5.85526L50.001 5.41612L46.1951 7.19758L46.3517 7.75969C46.3517 7.75969 46.927 7.61184 47.2198 7.61184C47.6589 7.61184 47.9517 7.9046 47.9517 8.34375V15.9556C47.9517 16.9803 47.6589 17.273 46.4879 17.273V18.0035H51.7576V17.273C50.5865 17.273 50.2938 16.9803 50.2938 15.9556V8.63505C50.7036 8.01732 51.355 7.51669 51.8718 7.51669C52.1148 7.51669 52.2494 7.66015 52.4178 7.84166C52.6461 8.08612 52.9286 8.39059 53.5713 8.39059C54.069 8.39059 54.4905 8.11832 54.7101 7.66015C54.858 7.6338 55.1873 7.61038 55.4801 7.61184C55.9192 7.61184 56.212 7.9046 56.212 8.34375V15.9556C56.212 16.9803 55.9192 17.273 54.7482 17.273V18.0035H60.0179V17.273C58.8469 17.273 58.5541 16.9803 58.5541 15.9556L58.5526 15.9571Z" />
                            <path d="M57.2352 4.09868C58.1245 4.09868 58.8454 3.37777 58.8454 2.48849C58.8454 1.5992 58.1245 0.878289 57.2352 0.878289C56.3459 0.878289 55.625 1.5992 55.625 2.48849C55.625 3.37777 56.3459 4.09868 57.2352 4.09868Z" />
                            <path d="M84.6085 18.2977C85.4978 18.2977 86.2187 17.5768 86.2187 16.6875C86.2187 15.7982 85.4978 15.0773 84.6085 15.0773C83.7193 15.0773 82.9984 15.7982 82.9984 16.6875C82.9984 17.5768 83.7193 18.2977 84.6085 18.2977Z" />
                            <path d="M96.0131 15.5545C94.9211 15.1607 93.9213 15.2237 92.3111 15.0773C90.9908 14.9573 89.9559 14.8314 89.669 14.7187C89.4099 14.6162 89.2898 14.4654 89.2898 14.2429C89.3337 13.795 89.8519 13.533 90.3306 13.3456C90.8254 13.5183 91.3684 13.6135 91.9452 13.6135C94.5069 13.6135 96.4098 11.7383 96.4098 9.5148C96.4098 8.50038 96.0131 7.58988 95.3398 6.89896C95.5506 6.6384 95.8682 6.29441 96.1171 6.29441C96.5562 6.29441 96.6294 7.1727 97.5809 7.1727C98.3128 7.1727 98.7519 6.58717 98.7519 6.00164C98.7519 5.26974 98.1664 4.68421 97.4345 4.68421C96.4215 4.68421 95.694 5.40002 94.5449 6.26513C93.8233 5.82013 92.9333 5.5625 91.9452 5.5625C89.3835 5.5625 87.4806 7.29127 87.4806 9.5148C87.4806 10.8893 88.2081 12.1292 89.3689 12.8772C88.9634 13.0997 88.6194 13.3441 88.3486 13.6091C87.4806 14.3454 87.5171 15.474 88.2198 16.1283C88.4101 16.3084 88.6545 16.4606 88.9473 16.5806C87.8377 17.2569 86.8028 18.3211 86.8043 19.5785C86.8599 21.5664 88.9444 22.2515 90.9937 22.2515C93.3358 22.2515 95.8902 21.4098 97.2618 19.5844C97.9542 18.6841 98.0171 17.2086 97.3276 16.3918C97.0085 16.0156 96.5665 15.7346 96.0146 15.556L96.0131 15.5545ZM91.3392 6.48763C92.6361 6.25928 93.6271 7.40398 93.9213 9.07566C94.2156 10.7473 93.9213 12.2961 92.4048 12.542C91.1416 12.7469 90.1169 11.4792 89.8227 9.80757C89.5284 8.13589 90.0422 6.71599 91.3392 6.48763ZM94.6825 20.1348C93.4529 20.5578 90.8327 20.6647 89.5914 20.0674C88.6062 19.6839 88.4394 18.4748 89.0776 17.6975C89.2957 17.4223 89.6236 17.1384 90.0525 16.8544C90.6848 16.9964 93.3505 17.1998 94.0575 17.2789C94.8743 17.3638 96.6865 17.5189 96.6733 18.4207C96.587 19.3092 95.6735 19.7966 94.6825 20.1348Z" />
                            <path d="M104.224 5.5625C101.038 5.5625 98.222 8.19444 98.222 11.7105C98.222 15.2266 100.564 18.2977 103.785 18.2977C107.005 18.2977 109.786 15.5164 109.755 11.8569C109.726 8.34375 107.409 5.5625 104.224 5.5625ZM104.705 17.0798C102.574 17.4165 101.341 15.2398 100.867 12.2434C100.419 9.40794 101.385 7.08194 103.319 6.776C105.289 6.46421 106.655 8.54722 107.103 11.3782C107.58 14.401 106.623 16.7753 104.705 17.0783V17.0798Z" />
                          </svg>
                        </svg>
                      </a>
                    </div>
                    <div className="relative flex min-w-0 flex-1 items-center justify-end gap-2">
                      <div className={"site-menu-trigger relative \x6austify-self-end"}>
                        <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: "rgb(0, 38, 100)", borderRadius: "22px", transform: "none", transformOrigin: "50% 50% 0px" } as CSSProperties} aria-hidden="true">
                          <div className={"absolute inset-0 rounded-[inherit] \x73hadow-[\x30_0_0_1px_var(\x2d-color-border-quaternary),\x32px_11px_24px_#\x30000001a,\x38px_42px_43px_#\x300000017,\x318px_95px_58px_#\x30000000d]"} style={{ opacity: "0" }} />
                        </div>
                        <div className="relative" style={{ opacity: "1" }}>
                          <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 rounded-40 pb-0.5 leading-none disabled:bg-background-tertiary disabled:text-text-disabled type-label-m-emphasis relative h-11 bg-blue-700 px-5 tracking-[-0.03em] text-white \x62ackdrop-blur-frost \x61fter:\x61bsolute \x61fter:\x69nset-x-0 \x61fter:\x74op-1/\x32 \x61fter:\x68-11 \x61fter:\x2dtranslate-y-1/\x32 hover:bg-blue-800 active:bg-blue-700 active:text-white \x6dotion-reduce:\x74ransition-none"} aria-expanded={openMenu0 === "observed-1"} onClick={event => { event.preventDefault(); event.stopPropagation(); setOpenMenu0(open => open === "observed-1" ? null : "observed-1"); }} type="button" tabIndex={0} id="base-ui-_r1r_4_" aria-haspopup="dialog" data-slot="sheet-trigger" aria-controls="_r1r_3_">Menu</button>
                        </div>
                      </div>
                    </div>
                  </header>
                </div>
              </div>
            </div>
            <p className={"\x73r-only"} aria-live="polite" />
            <div className="flex min-h-0 flex-1 flex-col" data-slot="home-landing">
              <main className={"flex flex-col \x67ap-site-section \x6dobile:\x67ap-site-section-lg text-pretty \x6futline-none"} id="landing-main" tabIndex={-1}>
                <div className={"relative flex flex-col overflow-x-clip mobile:mx-auto \x6dobile:\x77-(\x2d-site-frame-width)"} data-slot="carousel" data-has-own-composer="">
                  <section className={"relative isolate flex flex-col items-center rounded-40 pt-40 pb-10 mobile:min-h-[calc(100svh-92px)] \x6dobile:\x6austify-center mobile:rounded-48 \x6dobile:\x70x-site-gutter mobile:pt-36 mobile:pb-36"}>
                    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-40 bg-grey-50 squircle [clip-path:inset(0_round_var(--radius-40))] mobile:rounded-48 mobile:[clip-path:inset(0_round_var(--radius-48))]" aria-hidden="true">
                      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.5),black)]">
                        <div className={"absolute top-[-16%] left-[-12%] h-[132%] w-[124%] opacity-10 \x64ark:\x6fpacity-5"}>
                          <div className="absolute inset-0" style={{ opacity: "0" }} aria-hidden="true">
                            <picture>
                              <img className={"absolute inset-0 size-full object-cover [&]:max-w-none"} alt="" decoding="async" draggable="false" height="1333" loading="eager" fetchPriority="low" sizes="64px" width="2000" srcSet="/site-assets/0a7aabcd52dc33a3.webp 64w, /site-assets/3f87f5eeb3397696.webp 128w" src="/site-assets/3f87f5eeb3397696.webp" />
                            </picture>
                          </div>
                          <div className="absolute inset-0" style={{ opacity: "1" }} aria-hidden="false">
                            <picture>
                              <img className={"absolute inset-0 size-full object-cover [&]:max-w-none"} alt="" decoding="async" draggable="false" height="1335" loading="eager" fetchPriority="low" sizes="64px" width="2000" srcSet="/site-assets/07283de05f67c3ed.webp 64w, /site-assets/d6a5f274d016c06e.webp 128w" src="/site-assets/d6a5f274d016c06e.webp" />
                            </picture>
                          </div>
                          <div className="absolute inset-0" style={{ opacity: "0" }} aria-hidden="true">
                            <picture>
                              <img className={"absolute inset-0 size-full object-cover [&]:max-w-none"} alt="" decoding="async" draggable="false" height="1769" loading="eager" fetchPriority="low" sizes="64px" width="2000" srcSet="/site-assets/6df0b9cefa8b7cfc.webp 64w, /site-assets/26eec92a0f108fff.webp 128w" src="/site-assets/26eec92a0f108fff.webp" />
                            </picture>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"flex w-full justify-center mobile:mx-auto \x6dobile:\x67rid \x6dobile:\x6dax-w-(\x2d-container-site) mobile:grid-cols-[repeat(var(--site-grid-columns),minmax(0,1fr))] \x6dobile:\x67ap-x-site-gutter"}>
                      <div className={"flex w-[round(down,min(100%,687.5px),1px)] flex-col items-center gap-[62px] mobile:col-span-full mobile:w-[round(down,100%,1px)] mobile:gap-12 \x73ite-desktop:\x63ol-span-8 \x73ite-desktop:\x63ol-start-3"}>
                        <div className="landing-heading flex w-full flex-col items-center gap-4 text-center px-8 mobile:gap-5 mobile:px-0">
                          <div data-site-hero-enter="0">
                            <h1 className={"text-text-primary type-site-hero \x6dax-mobile:\x74ext-[\x63lamp(\x336px,\x312vw,\x348px)]"}>Hello,
      America</h1>
                          </div>
                          <div data-site-hero-enter="1">
                            <p className={"text-text-secondary type-home-supporting text-pretty \x6dax-mobile:\x74ext-balance"}>Whatever you need from government, start here.</p>
                          </div>
                        </div>
                        <div className="relative w-full">
                          <div className={"absolute \x69nset-x-4 top-4 z-20"} data-site-hero-enter="2">
                            <div>
                              <div className="relative flex w-full flex-col items-center">
                                <div className="contents">
                                  <div className="contents">
                                    <div className="w-full" data-slot="hero-ask-pill">
                                      <div className="relative flex w-full flex-col items-stretch">
                                        <div className="relative [--corner-scale:1] [corner-shape:round] rounded-32 mobile:rounded-[48px]" data-slot="chat-input-surface">
                                          <div className="relative">
                                            <div className="w-full relative">
                                              <form onSubmit={handleDemoSubmit} className={"group flex w-full cursor-text \x62order \x62order-solid \x62order-transparent \x6futline-1 \x68as-[\x74extarea:\x64isabled]:\x63ursor-not-allowed px-5 ease-out-quint \x73hadow-composer-sm \x6dobile:\x73hadow-none min-h-14 py-2.5 pr-3 pl-6 mobile:min-h-0 bg-background-primary mobile:py-[23px] mobile:pl-10 mobile:pr-[23px] rounded-32 mobile:rounded-[48px] transition-[outline-color,box-shadow] duration-700 ease-out-quint relative z-10 flex-col items-stretch overflow-clip \x68as-[[\x64ata-slot=\x63hat-input-drop-zone]]:\x6fverflow-visible \x68as-[[\x64ata-slot=\x63hat-input-drop-zone]]:\x6futline-none \x6dax-md:\x6din-h-16 \x6dax-md:\x74ransition-[\x70adding] \x6dax-md:\x64uration-250 \x6dax-md:\x65ase-drawer \x6dotion-reduce:\x74ransition-none \x6dax-md:\x70-3 \x72ing-border-secondary \x72ing-2 \x6futline-transparent"} style={{ opacity: "1" }} data-slot="chat-input-shell" aria-label="Describe what you need">
                                                <div className="contents">
                                                  <label className={"\x73r-only"} id="_r1r_6_" htmlFor="_r1r_6_-field">Describe what you need</label>
                                                  <div className={"w-full shrink-0 overflow-visible \x64rop-shadow-[\x30_10px_20px_rgba(\x31,\x314,\x336,\x30.\x308)]"} style={{ height: "0px" }}>
                                                    <div className={"flex items-start gap-2 overflow-x-auto \x6fverscroll-x-contain [scrollbar-width:none] -ml-4"} />
                                                  </div>
                                                  <div style={{ opacity: "1", filter: "blur(0px)" } as CSSProperties} data-slot="chat-input-row">
                                                    <div className={"relative z-10 flex min-h-9 w-full items-end gap-1 \x6dax-md:\x66lex-col \x6dax-md:\x67ap-1"}>
                                                      <div className={"relative flex min-w-0 flex-1 self-center text-[length:var(--text-body-m)] \x6dax-md:\x69tems-center mobile:font-sans-display \x6dobile:\x74ext-[\x31.\x33125rem] \x6dax-md:\x73elf-start \x6dax-md:\x74ransition-[\x77idth] \x6dax-md:\x64uration-250 \x6dax-md:\x65ase-drawer \x6dotion-reduce:\x74ransition-none \x6dax-md:\x6din-h-0 \x6dax-md:\x77-full \x6dax-md:\x70x-2 \x6dax-md:\x70t-[\x33px]"}>
                                                        <div className="peer relative flex min-w-0 flex-1">
                                                          <textarea className={"type-body-m -my-2 min-w-0 flex-1 resize-none \x6fverscroll-contain bg-transparent py-2 leading-normal \x6futline-none \x70laceholder:\x6fverflow-hidden \x70laceholder:\x74ext-ellipsis \x70laceholder:\x77hitespace-nowrap \x64isabled:\x63ursor-not-allowed \x70laceholder:\x74ransition-colors \x70laceholder:\x64uration-200 \x70laceholder:\x65ase-out-quint \x6dotion-reduce:\x70laceholder:\x74ransition-none [scrollbar-width:none] \x70laceholder:\x74ext-secondary mobile:tracking-sans-display text-primary \x6candscape-phone:\x6din-h-[\x63alc(\x32lh+\x31rem)]"} style={{ fontSize: "inherit", maskImage: "none", height: "48px", overflowY: "hidden" } as CSSProperties} rows={1} id="_r1r_6_-field" name="message" aria-describedby="_r1r_6_-example" placeholder=" " role="combobox" aria-expanded="false" aria-autocomplete="list" />
                                                        </div>
                                                        <span className={"\x73r-only"} id="_r1r_6_-example">Example question: I’m a veteran. How do I get care?</span>
                                                        <span className={"\x70eer-has-[\x74extarea:\x6eot(:\x70laceholder-shown)]:\x68idden type-body-m pointer-events-none absolute \x69nset-x-0 \x2dinset-y-2 flex items-center whitespace-nowrap leading-normal [font-size:inherit] overflow-hidden \x73upports-[\x2dwebkit-touch-callout:\x6eone]:\x77ill-change-transform transition-colors duration-200 ease-out-quint \x6dotion-reduce:\x74ransition-none text-secondary \x6dax-md:\x69nset-x-2 \x6dax-md:\x2dtop-[\x35px] mobile:tracking-sans-display"} data-slot="chat-input-placeholder" aria-hidden="true">
                                                          <span className={"relative -top-px block h-lh w-full \x6candscape-phone:\x68-[\x32lh] [--marquee-play-state:paused]"}>
                                                            <span className={"absolute \x69nset-x-0 -my-2 overflow-x-clip overflow-y-visible py-2 whitespace-nowrap \x6candscape-phone:\x6cine-clamp-2 \x6candscape-phone:\x77hitespace-normal"} style={{ opacity: "0", "--marquee-duration": "10s" } as CSSProperties}>
                                                              <span className="home-prompt-track">
                                                                <span><span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>Try</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>‘</span><span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>How</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>do</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>I</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>replace</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>my</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>social</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>security</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>card</span><span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>?</span><span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "1.03535e-13", filter: "blur(6px)" } as CSSProperties}>’</span></span>
                                                                <span><span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>Try</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>‘</span><span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>How</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>do</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>I</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>replace</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>my</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>social</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>security</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>card</span><span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>?</span><span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "1.03535e-13", filter: "blur(6px)" } as CSSProperties}>’</span></span>
                                                              </span>
                                                            </span>
                                                            <span className={"absolute \x69nset-x-0 -my-2 overflow-x-clip overflow-y-visible py-2 whitespace-nowrap \x6candscape-phone:\x6cine-clamp-2 \x6candscape-phone:\x77hitespace-normal"} style={{ opacity: "0", "--marquee-duration": "10.675s" } as CSSProperties}>
                                                              <span className="home-prompt-track">
                                                                <span><span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>Try</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>‘</span><span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>How</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>do</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>I</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>book</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>a</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>campsite</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>in</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>a</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>national</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>park</span><span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>?</span><span className="inline-block" style={{ transform: "translateY(-99.9999%)", opacity: "2.18658e-12", filter: "blur(5.99999px)" } as CSSProperties}>’</span></span>
                                                                <span><span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>Try</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>‘</span><span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>How</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>do</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>I</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>book</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>a</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>campsite</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>in</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>a</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>national</span>{" "}<span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>park</span><span className="inline-block" style={{ transform: "translateY(-100%)", opacity: "0", filter: "blur(6px)" } as CSSProperties}>?</span><span className="inline-block" style={{ transform: "translateY(-99.9999%)", opacity: "2.18658e-12", filter: "blur(5.99999px)" } as CSSProperties}>’</span></span>
                                                              </span>
                                                            </span>
                                                            <span className={"absolute \x69nset-x-0 -my-2 overflow-x-clip overflow-y-visible py-2 whitespace-nowrap \x6candscape-phone:\x6cine-clamp-2 \x6candscape-phone:\x77hitespace-normal"} style={{ opacity: "1", "--marquee-duration": "7.975s" } as CSSProperties} data-selected="true">
                                                              <span className="home-prompt-track">
                                                                <span><span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>Try</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>‘</span><span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>I’m</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>a</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>veteran</span><span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>.</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>How</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>do</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>I</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>get</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>care</span><span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>?</span><span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>’</span></span>
                                                                <span><span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>Try</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>‘</span><span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>I’m</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>a</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>veteran</span><span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>.</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>How</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>do</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>I</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>get</span>{" "}<span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>care</span><span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>?</span><span className="inline-block" style={{ transform: "none", opacity: "1", filter: "none" } as CSSProperties}>’</span></span>
                                                              </span>
                                                            </span>
                                                            <span className={"absolute \x69nset-x-0 -my-2 overflow-x-clip overflow-y-visible py-2 whitespace-nowrap \x6candscape-phone:\x6cine-clamp-2 \x6candscape-phone:\x77hitespace-normal"} style={{ opacity: "0", "--marquee-duration": "11.75s" } as CSSProperties}>
                                                              <span className="home-prompt-track">
                                                                <span><span className="inline-block">Try</span>{" "}<span className="inline-block">‘</span><span className="inline-block">I</span>{" "}<span className="inline-block">just</span>{" "}<span className="inline-block">got</span>{" "}<span className="inline-block">married</span><span className="inline-block">.</span>{" "}<span className="inline-block">How</span>{" "}<span className="inline-block">do</span>{" "}<span className="inline-block">I</span>{" "}<span className="inline-block">change</span>{" "}<span className="inline-block">my</span>{" "}<span className="inline-block">last</span>{" "}<span className="inline-block">name</span><span className="inline-block">?</span><span className="inline-block">’</span></span>
                                                                <span><span className="inline-block">Try</span>{" "}<span className="inline-block">‘</span><span className="inline-block">I</span>{" "}<span className="inline-block">just</span>{" "}<span className="inline-block">got</span>{" "}<span className="inline-block">married</span><span className="inline-block">.</span>{" "}<span className="inline-block">How</span>{" "}<span className="inline-block">do</span>{" "}<span className="inline-block">I</span>{" "}<span className="inline-block">change</span>{" "}<span className="inline-block">my</span>{" "}<span className="inline-block">last</span>{" "}<span className="inline-block">name</span><span className="inline-block">?</span><span className="inline-block">’</span></span>
                                                              </span>
                                                            </span>
                                                            <span className={"absolute \x69nset-x-0 -my-2 overflow-x-clip overflow-y-visible py-2 whitespace-nowrap \x6candscape-phone:\x6cine-clamp-2 \x6candscape-phone:\x77hitespace-normal"} style={{ opacity: "0", "--marquee-duration": "7.9s" } as CSSProperties}>
                                                              <span className="home-prompt-track">
                                                                <span><span className="inline-block">Try</span>{" "}<span className="inline-block">‘</span><span className="inline-block">When</span>{" "}<span className="inline-block">do</span>{" "}<span className="inline-block">I</span>{" "}<span className="inline-block">qualify</span>{" "}<span className="inline-block">for</span>{" "}<span className="inline-block">Medicare</span><span className="inline-block">?</span><span className="inline-block">’</span></span>
                                                                <span><span className="inline-block">Try</span>{" "}<span className="inline-block">‘</span><span className="inline-block">When</span>{" "}<span className="inline-block">do</span>{" "}<span className="inline-block">I</span>{" "}<span className="inline-block">qualify</span>{" "}<span className="inline-block">for</span>{" "}<span className="inline-block">Medicare</span><span className="inline-block">?</span><span className="inline-block">’</span></span>
                                                              </span>
                                                            </span>
                                                            <span className={"absolute \x69nset-x-0 -my-2 overflow-x-clip overflow-y-visible py-2 whitespace-nowrap \x6candscape-phone:\x6cine-clamp-2 \x6candscape-phone:\x77hitespace-normal"} style={{ opacity: "0", "--marquee-duration": "5.975s" } as CSSProperties}>
                                                              <span className="home-prompt-track">
                                                                <span><span className="inline-block">Try</span>{" "}<span className="inline-block">‘</span><span className="inline-block">Help</span>{" "}<span className="inline-block">me</span>{" "}<span className="inline-block">find</span>{" "}<span className="inline-block">a</span>{" "}<span className="inline-block">new</span>{" "}<span className="inline-block">job</span><span className="inline-block">’</span></span>
                                                                <span><span className="inline-block">Try</span>{" "}<span className="inline-block">‘</span><span className="inline-block">Help</span>{" "}<span className="inline-block">me</span>{" "}<span className="inline-block">find</span>{" "}<span className="inline-block">a</span>{" "}<span className="inline-block">new</span>{" "}<span className="inline-block">job</span><span className="inline-block">’</span></span>
                                                              </span>
                                                            </span>
                                                            <span className={"absolute \x69nset-x-0 -my-2 overflow-x-clip overflow-y-visible py-2 whitespace-nowrap \x6candscape-phone:\x6cine-clamp-2 \x6candscape-phone:\x77hitespace-normal"} style={{ opacity: "0", "--marquee-duration": "8.825s" } as CSSProperties}>
                                                              <span className="home-prompt-track">
                                                                <span><span className="inline-block">Try</span>{" "}<span className="inline-block">‘</span><span className="inline-block">How</span>{" "}<span className="inline-block">do</span>{" "}<span className="inline-block">I</span>{" "}<span className="inline-block">register</span>{" "}<span className="inline-block">my</span>{" "}<span className="inline-block">new</span>{" "}<span className="inline-block">business</span><span className="inline-block">?</span><span className="inline-block">’</span></span>
                                                                <span><span className="inline-block">Try</span>{" "}<span className="inline-block">‘</span><span className="inline-block">How</span>{" "}<span className="inline-block">do</span>{" "}<span className="inline-block">I</span>{" "}<span className="inline-block">register</span>{" "}<span className="inline-block">my</span>{" "}<span className="inline-block">new</span>{" "}<span className="inline-block">business</span><span className="inline-block">?</span><span className="inline-block">’</span></span>
                                                              </span>
                                                            </span>
                                                            <span className={"absolute \x69nset-x-0 -my-2 overflow-x-clip overflow-y-visible py-2 whitespace-nowrap \x6candscape-phone:\x6cine-clamp-2 \x6candscape-phone:\x77hitespace-normal"} style={{ opacity: "0", "--marquee-duration": "9.925s" } as CSSProperties}>
                                                              <span className="home-prompt-track">
                                                                <span><span className="inline-block">Try</span>{" "}<span className="inline-block">‘</span><span className="inline-block">How</span>{" "}<span className="inline-block">do</span>{" "}<span className="inline-block">I</span>{" "}<span className="inline-block">update</span>{" "}<span className="inline-block">my</span>{" "}<span className="inline-block">address</span>{" "}<span className="inline-block">with</span>{" "}<span className="inline-block">USPS</span><span className="inline-block">?</span><span className="inline-block">’</span></span>
                                                                <span><span className="inline-block">Try</span>{" "}<span className="inline-block">‘</span><span className="inline-block">How</span>{" "}<span className="inline-block">do</span>{" "}<span className="inline-block">I</span>{" "}<span className="inline-block">update</span>{" "}<span className="inline-block">my</span>{" "}<span className="inline-block">address</span>{" "}<span className="inline-block">with</span>{" "}<span className="inline-block">USPS</span><span className="inline-block">?</span><span className="inline-block">’</span></span>
                                                              </span>
                                                            </span>
                                                            <span className={"absolute \x69nset-x-0 -my-2 overflow-x-clip overflow-y-visible py-2 whitespace-nowrap \x6candscape-phone:\x6cine-clamp-2 \x6candscape-phone:\x77hitespace-normal"} style={{ opacity: "0", "--marquee-duration": "9.05s" } as CSSProperties}>
                                                              <span className="home-prompt-track">
                                                                <span><span className="inline-block">Try</span>{" "}<span className="inline-block">‘</span><span className="inline-block">How</span>{" "}<span className="inline-block">do</span>{" "}<span className="inline-block">I</span>{" "}<span className="inline-block">get</span>{" "}<span className="inline-block">a</span>{" "}<span className="inline-block">passport</span>{" "}<span className="inline-block">for</span>{" "}<span className="inline-block">my</span>{" "}<span className="inline-block">child</span><span className="inline-block">?</span><span className="inline-block">’</span></span>
                                                                <span><span className="inline-block">Try</span>{" "}<span className="inline-block">‘</span><span className="inline-block">How</span>{" "}<span className="inline-block">do</span>{" "}<span className="inline-block">I</span>{" "}<span className="inline-block">get</span>{" "}<span className="inline-block">a</span>{" "}<span className="inline-block">passport</span>{" "}<span className="inline-block">for</span>{" "}<span className="inline-block">my</span>{" "}<span className="inline-block">child</span><span className="inline-block">?</span><span className="inline-block">’</span></span>
                                                              </span>
                                                            </span>
                                                            <span className={"absolute \x69nset-x-0 -my-2 overflow-x-clip overflow-y-visible py-2 whitespace-nowrap \x6candscape-phone:\x6cine-clamp-2 \x6candscape-phone:\x77hitespace-normal"} style={{ opacity: "0", "--marquee-duration": "9.85s" } as CSSProperties}>
                                                              <span className="home-prompt-track">
                                                                <span><span className="inline-block">Try</span>{" "}<span className="inline-block">‘</span><span className="inline-block">Where</span>{" "}<span className="inline-block">can</span>{" "}<span className="inline-block">I</span>{" "}<span className="inline-block">enlist</span>{" "}<span className="inline-block">in</span>{" "}<span className="inline-block">the</span>{" "}<span className="inline-block">armed</span>{" "}<span className="inline-block">services</span><span className="inline-block">?</span><span className="inline-block">’</span></span>
                                                                <span><span className="inline-block">Try</span>{" "}<span className="inline-block">‘</span><span className="inline-block">Where</span>{" "}<span className="inline-block">can</span>{" "}<span className="inline-block">I</span>{" "}<span className="inline-block">enlist</span>{" "}<span className="inline-block">in</span>{" "}<span className="inline-block">the</span>{" "}<span className="inline-block">armed</span>{" "}<span className="inline-block">services</span><span className="inline-block">?</span><span className="inline-block">’</span></span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </span>
                                                      </div>
                                                      <div className={"flex min-h-9 shrink-0 items-center gap-1 \x6dax-md:\x72elative \x6dax-md:\x73elf-end \x6dax-md:\x74ransition-[\x6dargin-top,\x6dargin-right] \x6dax-md:\x64uration-250 \x6dax-md:\x65ase-drawer \x6dotion-reduce:\x74ransition-none \x6dax-md:\x6dt-0 \x6dax-md:\x6dr-0"}>
                                                        <div className="flex shrink-0 items-center">
                                                          <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 bg-transparent text-text-primary hover:bg-background-tertiary focus-visible:bg-background-tertiary active:text-text-disabled \x64isabled:\x62g-transparent disabled:text-text-disabled rounded-full p-0 \x64isabled:\x63ursor-not-allowed \x64isabled:\x68over:\x62g-transparent \x6dotion-reduce:\x74ransition-none size-10 min-w-10 mobile:size-12 mobile:min-w-12 gap-0"} type="button" tabIndex={0} aria-label="Upload PDF" id="base-ui-_r1r_c_">
                                                            <span className="flex size-5 shrink-0 items-center justify-center">
                                                              <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                <path d="M13 4V14C13 15.66 11.66 17 10 17C8.34 17 7 15.66 7 14V4C7 3.45 7.45 3 8 3C8.55 3 9 3.45 9 4V15H11V4C11 2.34 9.66 1 8 1C6.34 1 5 2.34 5 4V14C5 16.76 7.24 19 10 19C12.76 19 15 16.76 15 14V4" fill="currentColor" />
                                                              </svg>
                                                            </span>
                                                          </button>
                                                        </div>
                                                        <div className="flex shrink-0 items-center">
                                                          <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 bg-transparent text-text-primary hover:bg-background-tertiary focus-visible:bg-background-tertiary active:text-text-disabled \x64isabled:\x62g-transparent rounded-full p-0 \x64isabled:\x68over:\x62g-transparent \x6dotion-reduce:\x74ransition-none size-10 min-w-10 mobile:size-12 mobile:min-w-12 disabled:cursor-pointer disabled:text-primary"} type="button" tabIndex={0} aria-label="Voice input" id="base-ui-_r1r_f_">
                                                            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                              <path d="M10 11C11.66 11 13 9.66 13 8V4C13 2.34 11.66 1 10 1C8.34 1 7 2.34 7 4V8C7 9.66 8.34 11 10 11ZM9 4C9 3.45 9.45 3 10 3C10.55 3 11 3.45 11 4V8C11 8.55 10.55 9 10 9C9.45 9 9 8.55 9 8V4Z" fill="currentColor" />
                                                              <path d="M11 14.92C14.39 14.43 17 11.52 17 8H15C15 10.76 12.76 13 10 13C7.24 13 5 10.76 5 8H3C3 11.53 5.61 14.43 9 14.92V17H6V19H14V17H11V14.92Z" fill="currentColor" />
                                                            </svg>
                                                          </button>
                                                        </div>
                                                        <div className="shrink-0" style={{ opacity: "1", transform: "none" }}>
                                                          <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 bg-blue-700 text-white \x73hadow-elevation-1 hover:bg-blue-800 focus-visible:bg-blue-700 active:bg-blue-700 \x61ctive:\x73hadow-none rounded-full p-0 \x61ctive:\x73cale-100 transition-[background-color,color,box-shadow] duration-200 ease-standard \x6dotion-reduce:\x74ransition-none \x73hadow-[\x30px_10px_40px_0px_rgba(\x30,\x30,\x30,\x30.\x308)] \x64isabled:\x63ursor-not-allowed disabled:bg-background-tertiary disabled:text-text-disabled \x64isabled:\x73hadow-none size-10 mobile:size-12"} type="submit" tabIndex={0} aria-label="Send message" aria-describedby="_r1r_6_-example">
                                                            <span className="flex items-center justify-center" style={{ opacity: "1", transform: "none" }}>
                                                              <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                <path d="M10 3L8.59 4.41L13.17 9H3V11H13.17L8.59 15.59L10 17L17 10L10 3Z" fill="currentColor" />
                                                              </svg>
                                                            </span>
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="grid transition-[grid-template-rows,margin-bottom] duration-300 ease-out-quint mobile:-ml-[var(--rail-start)] mobile:-mr-[var(--rail-end)] grid-rows-[0fr]" style={{ "--rail-start": "28px", "--rail-end": "11px" } as CSSProperties}>
                                                    <div className="-mx-2 overflow-hidden px-2 mobile:mx-0 mobile:px-0">
                                                      <div className={"\x62order-border-tertiary transition-opacity duration-200 mt-3 \x62order-t pt-3 mobile:mx-1 opacity-0"} />
                                                    </div>
                                                  </div>
                                                </div>
                                              </form>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div role="region" aria-roledescription="carousel" aria-label="Example questions" data-site-import-carousel-root="0">{carouselContent0}</div>
                        </div>
                      </div>
                    </div>
                    <div className={"relative z-20 mt-8 \x6dobile:\x61bsolute mobile:bottom-10 mobile:left-12 mobile:mt-0"} data-site-hero-enter="4">
                      <a className={"group/fraud-launch inline-flex h-11 items-center gap-2 rounded-full bg-background-primary pr-3.5 pl-2.25 \x6futline-1 \x6futline-border-tertiary transition-[scale,outline-color] \x68over:\x6futline-border-secondary \x61ctive:\x6futline-border-tertiary type-body-m font-medium text-text-primary \x73hadow-elevation-1 duration-200 ease-[cubic-bezier(.22,1,.36,1)] \x61ctive:\x73cale-[\x30.\x397] \x6dotion-reduce:\x74ransition-none \x6dotion-reduce:\x61ctive:\x73cale-100 \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none"} href="/fraud"><span className="mr-1 rounded-full bg-text-primary px-2 py-1 type-body-s text-text-primary-invert">New</span>Report government fraud<svg className={"text-text-secondary transition-colors duration-200 \x67roup-hover/\x66raud-launch:\x74ext-text-primary \x6dotion-reduce:\x74ransition-none"} fill="none" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M8.35 3.29L15.06 10L8.35 16.71L6.94 15.29L12.23 10L6.94 4.71L8.35 3.29Z" fill="currentColor" /></svg></a>
                    </div>
                  </section>
                </div>
                <ImportedSection />
                <ImportedSection29000WebsitesInto />
                <ImportedSectionMoreComingIn2027 />
              </main>
              <ImportedFooter openFeedback={openFeedback} onOpenFeedback={() => setOpenFeedback(true)} />
            </div>
          </div>
          {/* Floating Bottom Chat Dock on Scroll */}
          <div
            className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ease-out ${
              isScrolledDown
                ? "bottom-4 sm:bottom-6 opacity-100 translate-y-0 pointer-events-auto"
                : "bottom-0 opacity-0 translate-y-8 pointer-events-none"
            } w-[calc(100vw-32px)] max-w-[676px]`}
            data-slot="ask-floating-dock"
          >
            <div className="relative flex w-full flex-col items-center">
              {/* Privacy and How SI works badge */}
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-2 transition-opacity duration-200">
                <a
                  href="/privacy-policy"
                  className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors underline decoration-dotted underline-offset-2"
                >
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Your privacy
                </a>
                <span>·</span>
                <a
                  href="/#about"
                  className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors underline decoration-dotted underline-offset-2"
                >
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  How SI works
                </a>
              </div>

              {/* Chat Input Capsule */}
              <div className="relative w-full rounded-full shadow-2xl bg-white dark:bg-[#121622] border border-black/10 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 p-1.5 sm:p-2 transition-colors">
                <form onSubmit={handleDemoSubmit} className="flex items-center w-full gap-2 pl-4 pr-1 sm:pl-6 sm:pr-1.5">
                  <input
                    type="text"
                    name="message"
                    placeholder="Ask anything…"
                    className="flex-1 min-w-0 bg-transparent text-[15px] sm:text-base text-[#000c1f] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById("hero-pdf-file-input") as HTMLInputElement | null;
                        input?.click();
                      }}
                      className="inline-flex size-8 sm:size-9 items-center justify-center rounded-full text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                      aria-label="Upload PDF"
                      title="Upload PDF"
                    >
                      <svg fill="none" height="18" viewBox="0 0 20 20" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 4V14C13 15.66 11.66 17 10 17C8.34 17 7 15.66 7 14V4C7 3.45 7.45 3 8 3C8.55 3 9 3.45 9 4V15H11V4C11 2.34 9.66 1 8 1C6.34 1 5 2.34 5 4V14C5 16.76 7.24 19 10 19C12.76 19 15 16.76 15 14V4" fill="currentColor" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="inline-flex size-8 sm:size-9 items-center justify-center rounded-full text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                      aria-label="Voice input"
                      title="Voice input"
                    >
                      <svg fill="none" height="18" viewBox="0 0 20 20" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 11C11.66 11 13 9.66 13 8V4C13 2.34 11.66 1 10 1C8.34 1 7 2.34 7 4V8C7 9.66 8.34 11 10 11ZM9 4C9 3.45 9.45 3 10 3C10.55 3 11 3.45 11 4V8C11 8.55 10.55 9 10 9C9.45 9 9 8.55 9 8V4Z" fill="currentColor" />
                        <path d="M11 14.92C14.39 14.43 17 11.52 17 8H15C15 10.76 12.76 13 10 13C7.24 13 5 10.76 5 8H3C3 11.53 5.61 14.43 9 14.92V17H6V19H14V17H11V14.92Z" fill="currentColor" />
                      </svg>
                    </button>
                    <button
                      type="submit"
                      className="inline-flex size-8 sm:size-9 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-md transition-all ml-1 cursor-pointer"
                      aria-label="Send message"
                    >
                      <svg fill="none" height="18" viewBox="0 0 20 20" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L8.59 4.41L13.17 9H3V11H13.17L8.59 15.59L10 17L17 10L10 3Z" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <input id="hero-pdf-file-input" aria-label="Upload PDF" accept="application/pdf,.pdf" hidden type="file" />
        </div>
        <section aria-label="Notifications alt+T" tabIndex={-1} aria-live="polite" aria-relevant="additions text" aria-atomic="false" />
      </div>
      <div className={"fixed \x6futline-none top-[var(--dialog-viewport-center,50%)] left-1/2 z-modal flex max-h-[min(calc(100vh-112px),calc(var(--dialog-viewport-height,100vh)-32px))] max-w-[calc(100vw-32px)] \x2dtranslate-x-1/\x32 \x2dtranslate-y-1/\x32 flex-col overflow-hidden rounded-40 \x73hadow-widget bg-background-primary \x62ackdrop-blur-[\x30px] transition-[opacity,scale] duration-200 ease-out \x64ata-starting-style:\x73cale-[\x30.\x397] \x64ata-starting-style:\x6fpacity-0 \x64ata-ending-style:\x73cale-[\x30.\x396] \x64ata-ending-style:\x6fpacity-0 \x64ata-ending-style:\x64uration-280 \x64ata-ending-style:\x65ase-in w-[432px]"} style={{ "--nested-dialogs": "0", "--sheet-close-size": "36px", "--dialog-viewport-center": "432px", "--dialog-viewport-height": "864px", display: openGovDialog ? undefined : ("none") } as CSSProperties} data-open="" id="_r1r_0_" role="dialog" tabIndex={-1} data-sheet-surface="true" aria-labelledby="base-ui-_r1r_22_" hidden={openGovDialog ? undefined : (true)} data-site-import-observed-popup="">
        <h2 className={"type-body-m font-medium text-foreground \x73r-only"} id="base-ui-_r1r_22_" data-slot="sheet-title">U.S. Government Websites</h2>
        <div className="flex w-full shrink-0 items-center gap-3 p-4">
          <div className="invisible flex items-center gap-1" aria-hidden="true" inert>
            <div className="flex items-center gap-1">
              <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 p-0 bg-background-tertiary hover:bg-background-secondary active:bg-background-tertiary disabled:bg-background-tertiary disabled:text-text-disabled size-[var(--sheet-close-size,36px)] rounded-full text-foreground \x62ackdrop-blur-frost"} type="button" tabIndex={0} data-slot="sheet-close" lang="en" aria-label="Close" onClick={event => { event.preventDefault(); event.stopPropagation(); setOpenGovDialog(false); }}>
                <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 5.4L14.6 4L10 8.6L5.4 4L4 5.4L8.6 10L4 14.6L5.4 16L10 11.4L14.6 16L16 14.6L11.4 10L16 5.4Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
          <span className="flex-1 type-label-m-emphasis text-primary text-center">U.S. Government Websites</span>
          <div className="flex items-center gap-1">
            <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 p-0 bg-background-tertiary hover:bg-background-secondary active:bg-background-tertiary disabled:bg-background-tertiary disabled:text-text-disabled size-[var(--sheet-close-size,36px)] rounded-full text-foreground \x62ackdrop-blur-frost"} type="button" tabIndex={0} data-slot="sheet-close" lang="en" aria-label="Close" onClick={event => { event.preventDefault(); event.stopPropagation(); setOpenGovDialog(false); }}>
              <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 5.4L14.6 4L10 8.6L5.4 4L4 5.4L8.6 10L4 14.6L5.4 16L10 11.4L14.6 16L16 14.6L11.4 10L16 5.4Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative flex min-h-0 flex-col flex-1">
          <div className={"min-h-0 flex-1 overflow-y-auto \x6fverscroll-contain \x66ocus-visible:\x73hadow-[\x69nset_0_0_0_2px_#\x66ff,\x69nset_0_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none flex flex-col gap-6 [scrollbar-width:none] px-6 pt-4 pb-[calc(2.5rem+var(--sheet-bottom-overlap,0px))] mobile:px-10 md:pt-2"}>
            <div className="flex flex-col">
              <div className="flex flex-col items-start gap-2">
                <span className="flex shrink-0 items-center text-primary">
                  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 5.028L16.896 7.2H7.104L12 5.028ZM12 2.4L1.2 7.2V9.6H22.8V7.2L12 2.4Z" fill="currentColor" />
                    <path d="M7.2 10.8H4.8V18H7.2V10.8Z" fill="currentColor" />
                    <path d="M13.2 10.8H10.8V18H13.2V10.8Z" fill="currentColor" />
                    <path d="M19.2 10.8H16.8V18H19.2V10.8Z" fill="currentColor" />
                    <path d="M22.8 19.2H1.2V21.6H22.8V19.2Z" fill="currentColor" />
                  </svg>
                </span>
                <h3 className="type-body-m text-primary">Official websites use .gov</h3>
              </div>
              <p className="type-body-m text-secondary pr-4">A .gov website belongs to an official government organization in the United States.</p>
            </div>
            <div className="relative h-0 w-full" aria-hidden="true">
              <div className={"absolute \x69nset-x-0 bottom-0 h-px bg-border-tertiary"} />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col items-start gap-2">
                <span className="flex shrink-0 items-center text-primary">
                  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M18.0001 8.40007H16.8001V6.00007C16.8001 3.34807 14.6521 1.20007 12.0001 1.20007C9.3481 1.20007 7.2001 3.34807 7.2001 6.00007V8.40007H6.0001C4.6801 8.40007 3.6001 9.48007 3.6001 10.8001V20.4001C3.6001 21.7201 4.6801 22.8001 6.0001 22.8001H18.0001C19.3201 22.8001 20.4001 21.7201 20.4001 20.4001V10.8001C20.4001 9.48007 19.3201 8.40007 18.0001 8.40007ZM9.6001 6.00007C9.6001 4.68007 10.6801 3.60007 12.0001 3.60007C13.3201 3.60007 14.4001 4.68007 14.4001 6.00007V8.40007H9.6001V6.00007ZM18.0001 20.4001H6.0001V10.8001H18.0001V20.4001Z" fill="currentColor" />
                    <path d="M13.2001 13.2001H10.8001V18.0001H13.2001V13.2001Z" fill="currentColor" />
                  </svg>
                </span>
                <h3 className="type-body-m text-primary">Secure .gov websites use HTTPS</h3>
              </div>
              <p className="type-body-m text-secondary pr-4">A lock or https:// means you’ve safely connected to the .gov website. Share sensitive information only on official, secure websites.</p>
            </div>
          </div>
          <div className={"pointer-events-none absolute \x69nset-x-0 top-0 \x62g-linear-to-b \x66rom-background-primary \x74o-background-primary/\x30 transition-[opacity,visibility] duration-200 ease-out \x6dotion-reduce:\x74ransition-none invisible opacity-0 h-8 \x62ackdrop-blur-none"} style={{ maskImage: "linear-gradient(black, transparent)" } as CSSProperties} aria-hidden="true" data-slot="scroll-fade-mask" data-side="top" />
          <div className={"pointer-events-none absolute \x69nset-x-0 bottom-0 \x62g-linear-to-t \x66rom-background-primary \x74o-background-primary/\x30 transition-[opacity,visibility] duration-200 ease-out \x6dotion-reduce:\x74ransition-none invisible opacity-0 h-8 \x62ackdrop-blur-none"} style={{ maskImage: "linear-gradient(to top, black, transparent)" } as CSSProperties} aria-hidden="true" data-slot="scroll-fade-mask" data-side="bottom" />
        </div>
      </div>
      <SiteMenuSheet
        open={openMenu0 === "observed-1"}
        onClose={() => setOpenMenu0(null)}
        onOpenFeedback={() => setOpenFeedback(true)}
      />

      <div className={"fixed top-[var(--dialog-viewport-center,50%)] left-1/2 z-modal flex max-h-[min(calc(100vh-112px),calc(var(--dialog-viewport-height,100vh)-32px))] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 w-[min(432px,calc(100vw-32px))] flex-col overflow-hidden rounded-24 bg-background-primary shadow-widget p-6"} style={{ display: openFeedback ? undefined : ("none") } as CSSProperties} role="dialog" aria-modal="true" tabIndex={-1} aria-labelledby="imported-feedback-title" hidden={openFeedback ? undefined : (true)} data-site-import-reconstructed-popup="">
        <div className="relative mb-5 flex items-center justify-center">
          <h2 className={"type-label-m-emphasis text-primary"} id="imported-feedback-title">Submit feedback</h2>
          <button className={"absolute right-[-8px] inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-background-tertiary text-foreground hover:bg-background-secondary"} type="button" aria-label="Close" onClick={event => { event.preventDefault(); event.stopPropagation(); setOpenFeedback(false); }}>
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16 5.4L14.6 4L10 8.6L5.4 4L4 5.4L8.6 10L4 14.6L5.4 16L10 11.4L14.6 16L16 14.6L11.4 10L16 5.4Z" fill="currentColor" /></svg>
          </button>
        </div>
        <textarea className={"mb-4 min-h-[136px] w-full resize-none rounded-12 bg-background-primary px-4 py-3 type-body-m text-primary outline-1 outline-border-tertiary placeholder:text-text-disabled"} placeholder="Add details" aria-label="Feedback details" />
        <button disabled className={"mb-3 h-11 w-full cursor-not-allowed rounded-40 bg-background-tertiary type-body-m font-medium text-text-disabled"} type="button">Submit</button>
        <p className={"text-center text-[0.875rem] text-secondary"}>This form is for website feedback only. We can&apos;t respond to personal questions or requests for customer support.</p>
      </div>
    </>
  );
}

function ImportedSectionUSGovernmentWebsites({ openGovDialog, onOpenGov }: { openGovDialog: boolean; onOpenGov: () => void }) {
  return (
    <section className="w-full" aria-label="U.S. Government Websites" data-slot="gov-banner">
      <div className="mx-auto flex min-h-10 py-3 max-w-site items-center justify-center gap-2 page-gutter" data-site-import-desktop-variant="">
        <button className={"group flex cursor-pointer items-center gap-1.5 rounded-full \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none"} type="button" tabIndex={0} id="base-ui-_r1r_5g_" aria-haspopup="dialog" aria-expanded={openGovDialog} data-slot="sheet-trigger" onClick={event => { event.preventDefault(); event.stopPropagation(); onOpenGov(); }}>
          <span className="flex items-center gap-1">
            <span className="flex items-center pt-px">
              <span className={"type-label-s flex h-2.5 items-end text-secondary transition-colors duration-200 \x67roup-hover:\x74ext-primary"}>An official website of the United States government</span>
            </span>
            <span className={"flex size-4 shrink-0 items-center justify-center text-tertiary transition-colors duration-200 \x67roup-hover:\x74ext-primary"}>
              <svg fill="none" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11 15H9V9H11V15Z" fill="currentColor" />
                <path d="M11.2 6.2C11.2 6.86 10.9 7.4 10 7.4C9.1 7.4 8.8 6.86 8.8 6.2C8.8 5.54 9.1 5 10 5C10.9 5 11.2 5.54 11.2 6.2Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M10 1C5 1 1 5 1 10C1 15 5 19 10 19C15 19 19 15 19 10C19 5 15 1 10 1ZM10 3C13.9 3 17 6.1 17 10C17 13.9 13.9 17 10 17C6.1 17 3 13.9 3 10C3 6.1 6.1 3 10 3Z" fill="currentColor" />
              </svg>
            </span>
          </span>
        </button>
      </div>
      <div className="mx-auto flex min-h-10 py-3 max-w-site items-center justify-center gap-2 page-gutter" style={{ "--site-import-responsive-display": "flex" } as CSSProperties} data-site-import-mobile-variant="">
        <button className={"group flex cursor-pointer items-center gap-1.5 rounded-full \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none"} type="button" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
          <span className="flex items-center gap-1">
            <span className="flex items-center pt-px">
              <span className={"type-label-s flex h-2.5 items-end text-secondary transition-colors duration-200 \x67roup-hover:\x74ext-primary"}>An official website of the United States government</span>
            </span>
            <span className={"flex size-4 shrink-0 items-center justify-center text-tertiary transition-colors duration-200 \x67roup-hover:\x74ext-primary"}>
              <svg fill="none" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11 15H9V9H11V15Z" fill="currentColor" />
                <path d="M11.2 6.2C11.2 6.86 10.9 7.4 10 7.4C9.1 7.4 8.8 6.86 8.8 6.2C8.8 5.54 9.1 5 10 5C10.9 5 11.2 5.54 11.2 6.2Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M10 1C5 1 1 5 1 10C1 15 5 19 10 19C15 19 19 15 19 10C19 5 15 1 10 1ZM10 3C13.9 3 17 6.1 17 10C17 13.9 13.9 17 10 17C6.1 17 3 13.9 3 10C3 6.1 6.1 3 10 3Z" fill="currentColor" />
              </svg>
            </span>
          </span>
        </button>
      </div>
    </section>
  );
}

function ImportedSection() {
  const [copiedFingerprint, setCopiedFingerprint] = useState(false);

  const handleFingerprintClick = () => {
    setCopiedFingerprint(true);
    setTimeout(() => setCopiedFingerprint(false), 2000);
  };

  return (
    <section className="site-container site-grid @container max-mobile:[--site-grid-margin:48px] py-16 md:py-28" id="about">
      <div className="home-manifesto col-span-full justify-self-center text-center text-[#000c1f] dark:text-white font-serif tracking-tight text-[1.4rem] leading-[1.3] sm:text-[2rem] sm:leading-[1.2] md:text-[3.25rem] md:leading-[1.12] lg:text-[4.25rem] lg:leading-[1.08] max-w-[340px] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto" lang="en">
        <p className="sr-only">
          America.gov uses SI to get simple answers only from official government sources. It’s free to use, never includes ads, and keeps your privacy protected.
        </p>

        {/* Line 1: America.gov [→] uses SI */}
        <div className="mb-2 sm:mb-4">
          <span className="inline-block transition-opacity duration-300">America.gov</span>{" "}
          <span className="inline-flex align-middle mx-1.5 md:mx-3" data-slot="manifesto-chip">
            <a
              href="/chat"
              className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white size-7 sm:size-8 md:size-14 lg:size-16 shadow-md transition-transform duration-200"
              aria-label="Open chat"
              title="Open chat"
            >
              <svg className="size-3.5 sm:size-4 md:size-7 lg:size-8" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10 3L8.59 4.41L13.17 9H3V11H13.17L8.59 15.59L10 17L17 10L10 3Z" fill="currentColor" />
              </svg>
            </a>
          </span>{" "}
          <span className="inline-block transition-opacity duration-300">uses SI</span>
        </div>

        {/* Line 2: to get simple answers only */}
        <div className="mb-2 sm:mb-4">
          <span className="inline-block transition-opacity duration-300">to get simple answers only</span>
        </div>

        {/* Line 3: from [agency seals] official */}
        <div className="mb-2 sm:mb-4">
          <span className="inline-block transition-opacity duration-300">from</span>{" "}
          <span className="inline-flex align-middle mx-1.5 sm:mx-2 md:mx-4" data-slot="manifesto-chip">
            <span
              className="relative inline-flex items-center h-7 sm:h-8 md:h-16 lg:h-20 w-14 sm:w-16 md:w-36 lg:w-44 shrink-0"
              title="Official Agency Sources: DOI, State Department, Commerce"
            >
              <img
                className="absolute top-0 left-0 size-7 sm:size-8 md:size-16 lg:size-20 rounded-full object-contain shadow-md border border-white/20 bg-white"
                sizes="96px"
                alt="DOI seal"
                loading="eager"
                src="/site-assets/6b0e58ea2470c358-c45111fe79f447f74baa0a959314adb0.png"
              />
              <img
                className="absolute top-0 left-4 sm:left-5 md:left-10 lg:left-12 size-7 sm:size-8 md:size-16 lg:size-20 rounded-full object-contain shadow-md border border-white/20 bg-white z-10"
                sizes="96px"
                alt="State Department seal"
                loading="eager"
                src="/site-assets/ac9ec418e5b87762-f595254bb5ee2630436109fee6101659.png"
              />
              <img
                className="absolute top-0 left-8 sm:left-9 md:left-20 lg:left-24 size-7 sm:size-8 md:size-16 lg:size-20 rounded-full object-contain shadow-md border border-white/20 bg-white z-20"
                sizes="96px"
                alt="Commerce seal"
                loading="eager"
                src="/site-assets/f8771bab4355a2c8-bbad8e97f6ed9607bb4b97ed05f21110.png"
              />
            </span>
          </span>{" "}
          <span className="inline-block transition-opacity duration-300">official</span>
        </div>

        {/* Line 4: government sources. It’s */}
        <div className="mb-2 sm:mb-4">
          <span className="inline-block transition-opacity duration-300">government sources. It’s</span>
        </div>

        {/* Line 5: free to use, never includes */}
        <div className="mb-2 sm:mb-4">
          <span className="inline-block transition-opacity duration-300">free to use, never includes</span>
        </div>

        {/* Line 6: ads, and keeps [fingerprint] your */}
        <div className="mb-2 sm:mb-4">
          <span className="inline-block transition-opacity duration-300">ads, and keeps</span>{" "}
          <span className="inline-flex align-middle mx-1.5 md:mx-3" data-slot="manifesto-chip">
            <button
              type="button"
              onClick={handleFingerprintClick}
              className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#161a24] text-[#ff3388] border border-white/10 size-7 sm:size-8 md:size-14 lg:size-16 p-1 sm:p-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
              aria-label="Privacy protected with SI"
              title={copiedFingerprint ? "Privacy Guaranteed" : "Privacy Protected"}
            >
              {copiedFingerprint ? (
                <svg className="size-3.5 sm:size-4 md:size-8 lg:size-9 text-green-400" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.7 9.7 7.95 14.6 17.3 4.7" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" />
                </svg>
              ) : (
                <svg className="size-4 sm:size-5 md:size-8 lg:size-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11m0 0a8.003 8.003 0 0015.357 2m-1.357 5H18" />
                </svg>
              )}
            </button>
          </span>{" "}
          <span className="inline-block transition-opacity duration-300">your</span>
        </div>

        {/* Line 7: privacy protected. */}
        <div>
          <span className="inline-block transition-opacity duration-300">privacy protected.</span>
        </div>
      </div>
    </section>
  );
}

function ImportedSection29000WebsitesInto() {
  return (
    <section className="site-container flex flex-col items-center gap-20 mobile:gap-30" id="how-it-works">
      <div className="site-grid w-full items-center gap-y-10">
        <div className={"col-span-full flex min-w-0 justify-center \x73ite-desktop:\x63ol-span-4 \x73ite-desktop:\x63ol-start-3"}>
          <div className={"squircle relative aspect-square w-full max-w-md shrink-0 overflow-hidden \x72ounded-site-bento isolate bg-background-primary-invert \x64ark:\x62g-black"} data-slot="federal-orbit">
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
              <div className="absolute inset-0">
                <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                  <img style={{ display: "block", width: "448px", height: "448px" }} width="448" height="448" src="data:image/webp;base64,UklGRtABAABXRUJQVlA4WAoAAAAQAAAAvwEAvwEAQUxQSBsAAAABBxAREVDQtg1T/vC744j+Z/jPf/7zn//8LwEAVlA4II4BAABQLQCdASrAAcABPjEYjESiIaEQBAAgAwS0t3C7sI2gBPYB77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+1YAAD+//gtkAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==" data-site-import-static-fallback="canvas" alt="" />
                </div>
              </div>
            </div>
            <p className={"\x73r-only text-primary-invert"} id="_r1r_v_">An animated sphere of government website previews rotates, illustrating 29,000 websites brought together in one place.</p>
            <div className="absolute right-6 bottom-6 z-10">
              <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 focus-visible:bg-background-tertiary \x64isabled:\x62g-transparent disabled:text-text-disabled group/playback-control \x73croll-m-2 rounded-full p-0 \x61ctive:\x73cale-95 \x6dotion-reduce:\x74ransition-none \x6dotion-reduce:\x61ctive:\x73cale-100 size-9 \x73ite-desktop:\x73ize-11 \x62order \x62order-blue-900/\x32 \x62g-background-primary-invert/\x350 text-text-primary-invert \x62ackdrop-blur-frost \x68over:\x62g-background-primary-invert/\x360 \x61ctive:\x62g-background-primary-invert/\x360 active:text-text-primary-invert \x64ark:\x62g-black/\x350 \x64ark:\x74ext-text-primary \x64ark:\x68over:\x62g-black/\x360 \x64ark:\x61ctive:\x62g-black/\x360 \x64ark:\x61ctive:\x74ext-text-primary [&\x5fsvg]:\x73ize-5"} type="button" tabIndex={0} data-slot="carousel-playback" aria-label="Pause animation" aria-describedby="_r1r_v_">
                <div className={"relative \x67roup-focus-visible/\x70layback-control:[&>\x64iv]:\x74ransition-none"}>
                  <div className={"absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-150 ease-out-quint \x6dotion-reduce:\x74ransition-opacity [transform:scale(0.97)] opacity-0 \x6dotion-reduce:\x74ransform-none"} aria-hidden="true">
                    <svg fill="none" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M6 3L18 10L6 17L6 3Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className={"transition-[opacity,transform] duration-150 ease-out-quint \x6dotion-reduce:\x74ransition-opacity transform-none opacity-100"} aria-hidden="false">
                    <svg fill="none" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M8 4C8 3.45 7.55 3 7 3H5C4.45 3 4 3.45 4 4V16C4 16.55 4.45 17 5 17H7C7.55 17 8 16.55 8 16V4Z" fill="currentColor" />
                      <path d="M16 4C16 3.45 15.55 3 15 3H13C12.45 3 12 3.45 12 4V16C12 16.55 12.45 17 13 17H15C15.55 17 16 16.55 16 16V4Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className={"col-span-full flex w-full max-w-md flex-col justify-center gap-8 justify-self-center \x6dax-site-desktop:\x69nset-site-media-copy \x73ite-desktop:\x63ol-span-4 \x73ite-desktop:\x63ol-start-8 \x73ite-desktop:\x6dax-w-none"}>
          <div className="flex max-w-xs flex-col gap-6 mobile:max-w-77">
            <h2 className={"type-feature-heading text-text-primary \x6dobile:\x77hitespace-pre-line"}>29,000 websites into one.</h2>
            <p className="type-site-body text-text-secondary">No more wandering from site to site. America.gov brings the government together in one place.</p>
          </div>
          <a className={"site-underline-link relative inline-block \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none w-fit rounded-4 type-site-cta text-text-primary \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-4"} href="/how-it-works">See how it works</a>
        </div>
      </div>
      <div className="site-grid w-full items-center gap-y-10">
        <div className={"col-span-full flex min-w-0 justify-center \x73ite-desktop:\x63ol-span-4 \x73ite-desktop:\x63ol-start-3"}>
          <div className={"squircle relative aspect-square w-full max-w-md shrink-0 overflow-hidden \x72ounded-site-bento home-privacy-sky grid place-items-center p-4"}>
            <svg className="home-privacy-stars pointer-events-none absolute inset-0 size-full [fill:rgb(179,217,255)]" data-slot="privacy-sky" aria-hidden="true" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
              <g style={{ animationDelay: "0s", animationDuration: "10s" } as CSSProperties}>
                <circle cx="130.24457082210574" cy="327.7246920581092" r="0.8" />
                <circle cx="323.61587850318756" cy="34.45911297749262" r="0.4" />
                <circle cx="290.4707940557273" cy="238.96680949546862" r="0.4" />
                <circle cx="357.88602567918133" cy="63.56630636000773" r="0.4" />
                <circle cx="207.3785864544334" cy="251.06063147468376" r="0.4" />
                <circle cx="217.96533348388039" cy="346.99884992151055" r="0.4" />
                <circle cx="152.4440258377581" cy="92.88489551981911" r="0.4" />
                <circle cx="82.32292383327149" cy="47.60365863330662" r="0.8" />
                <circle cx="92.99667239101836" cy="93.4041365453595" r="0.4" />
                <circle cx="10.474624406197108" cy="52.906490382156335" r="0.4" />
                <circle cx="294.8467514663207" cy="73.48974740598351" r="0.4" />
                <circle cx="137.32467984373216" cy="65.24102955299895" r="0.4" />
                <circle cx="169.6671764158964" cy="186.12279074586695" r="0.4" />
                <circle cx="299.5829663443146" cy="275.1627386169275" r="0.4" />
                <circle cx="374.21324821189046" cy="287.6583921708516" r="0.8" />
                <circle cx="180.93952963827178" cy="261.6932938224636" r="0.4" />
                <circle cx="202.11680565553252" cy="248.38329873455223" r="0.4" />
                <circle cx="297.56198808172485" cy="330.43304897655617" r="0.4" />
                <circle cx="296.0126447258517" cy="157.88995998736937" r="0.4" />
                <circle cx="302.51744665874867" cy="322.038238440291" r="0.4" />
              </g>
              <g style={{ animationDelay: "-1.7s", animationDuration: "11s" } as CSSProperties}>
                <circle cx="114.89420617581345" cy="34.590202633989975" r="0.8" />
                <circle cx="130.54398828353442" cy="214.81368475797353" r="0.4" />
                <circle cx="27.946813928429037" cy="138.32465149043855" r="0.4" />
                <circle cx="376.4886742339513" cy="370.2911033775308" r="0.4" />
                <circle cx="168.67958040093072" cy="133.3716739609372" r="0.4" />
                <circle cx="241.65792873318424" cy="41.561707071377896" r="0.4" />
                <circle cx="54.730746761197224" cy="23.516712528362405" r="0.4" />
                <circle cx="170.16392250952777" cy="259.53501168696675" r="0.8" />
                <circle cx="186.99320975283626" cy="314.221513204393" r="0.4" />
                <circle cx="316.05749583395664" cy="7.548594940453768" r="0.4" />
                <circle cx="123.65648460399825" cy="260.9530718444148" r="0.4" />
                <circle cx="117.97237759747077" cy="344.91956851052237" r="0.4" />
                <circle cx="293.04585597710684" cy="16.423129636677913" r="0.4" />
                <circle cx="142.0196045190096" cy="40.46981236315332" r="0.4" />
                <circle cx="60.13737206277483" cy="358.106349024456" r="0.8" />
                <circle cx="2.453901871922426" cy="345.6249368711724" r="0.4" />
                <circle cx="32.985076593467966" cy="308.60931098541187" r="0.4" />
                <circle cx="270.19352792412974" cy="380.8545964086079" r="0.4" />
                <circle cx="246.29624295776011" cy="252.44460226676892" r="0.4" />
                <circle cx="15.015902783488855" cy="241.71081401291303" r="0.4" />
              </g>
              <g style={{ animationDelay: "-3.4s", animationDuration: "12s" } as CSSProperties}>
                <circle cx="331.3606479248847" cy="335.5861947602534" r="0.8" />
                <circle cx="312.65505825867876" cy="192.46184235671535" r="0.4" />
                <circle cx="174.66368803288788" cy="65.92535581148695" r="0.4" />
                <circle cx="285.3342591988621" cy="84.18087461031973" r="0.4" />
                <circle cx="196.1730870360043" cy="16.70193323516287" r="0.4" />
                <circle cx="202.97649269959948" cy="329.2988943875571" r="0.4" />
                <circle cx="305.9199515293585" cy="271.7841614896315" r="0.4" />
                <circle cx="141.25327035289956" cy="273.2960198627552" r="0.8" />
                <circle cx="329.87873211095575" cy="309.54288419452496" r="0.4" />
                <circle cx="76.53363371791784" cy="73.87552621948998" r="0.4" />
                <circle cx="195.29721490107477" cy="145.83295273187105" r="0.4" />
                <circle cx="166.696243948536" cy="22.45130006049294" r="0.4" />
                <circle cx="130.88019166898448" cy="279.31491839990485" r="0.4" />
                <circle cx="36.62771747622173" cy="387.8533357143169" r="0.4" />
                <circle cx="355.40494174783817" cy="27.319538615483907" r="0.8" />
                <circle cx="112.95278306643013" cy="149.77816887258086" r="0.4" />
                <circle cx="357.47281190706417" cy="217.36862875986844" r="0.4" />
                <circle cx="189.98297413927503" cy="388.20811030163895" r="0.4" />
                <circle cx="212.96090475298115" cy="70.16002347663743" r="0.4" />
                <circle cx="341.719000870944" cy="354.66693139424024" r="0.4" />
              </g>
              <g style={{ animationDelay: "-5.1s", animationDuration: "13s" } as CSSProperties}>
                <circle cx="316.8135946150869" cy="268.55702275788644" r="0.8" />
                <circle cx="235.58082908857614" cy="274.8699544026749" r="0.4" />
                <circle cx="256.73893059574766" cy="3.3951801364310086" r="0.4" />
                <circle cx="84.8525811554282" cy="214.8256607557414" r="0.4" />
                <circle cx="354.08093705191277" cy="391.4645877244766" r="0.4" />
                <circle cx="396.6687953376095" cy="217.8368366061477" r="0.4" />
                <circle cx="155.90152291115373" cy="123.97139098902699" r="0.4" />
                <circle cx="218.8679605256766" cy="237.80574273550883" r="0.8" />
                <circle cx="14.074026970774867" cy="225.5613648907456" r="0.4" />
                <circle cx="118.3359707112686" cy="390.6317982400651" r="0.4" />
                <circle cx="274.3530214007478" cy="66.12233930791263" r="0.4" />
                <circle cx="36.93202939393814" cy="266.026330619934" r="0.4" />
                <circle cx="221.95280574669596" cy="166.8716412052163" r="0.4" />
                <circle cx="339.90690695354715" cy="360.9895865418366" r="0.4" />
                <circle cx="305.65032974409405" cy="240.2419917692896" r="0.8" />
                <circle cx="154.53704635147005" cy="105.96008244610857" r="0.4" />
                <circle cx="312.0338544540573" cy="63.20242582296487" r="0.4" />
                <circle cx="221.3668377691647" cy="288.65866738560726" r="0.4" />
                <circle cx="333.5421719966689" cy="98.70399744104361" r="0.4" />
                <circle cx="388.85435569973197" cy="185.1450662186835" r="0.4" />
              </g>
              <g style={{ animationDelay: "-6.8s", animationDuration: "14s" } as CSSProperties}>
                <circle cx="149.83080536403577" cy="139.36973899253644" r="0.8" />
                <circle cx="77.91814438824076" cy="203.8785726443166" r="0.4" />
                <circle cx="182.3052590189036" cy="360.9810421079601" r="0.4" />
                <circle cx="375.4019519954454" cy="387.880654662149" r="0.4" />
                <circle cx="6.194223339844029" cy="323.71349709283095" r="0.4" />
                <circle cx="148.12101228744723" cy="304.4795360445278" r="0.4" />
                <circle cx="394.71024737140397" cy="18.354423364507966" r="0.4" />
                <circle cx="96.38400278345216" cy="305.9291935496731" r="0.8" />
                <circle cx="241.98183760163374" cy="3.580105528817512" r="0.4" />
                <circle cx="186.1916650115745" cy="162.87212847091723" r="0.4" />
                <circle cx="93.98392512521241" cy="38.48680471710395" r="0.4" />
                <circle cx="109.21355719547137" cy="279.72869564418943" r="0.4" />
                <circle cx="348.8815452437848" cy="284.7999047167832" r="0.4" />
                <circle cx="16.50188039002387" cy="324.4799129694002" r="0.4" />
                <circle cx="109.06402588298079" cy="333.44281463650987" r="0.8" />
                <circle cx="130.65113513948745" cy="255.05840567784617" r="0.4" />
                <circle cx="59.31902910815552" cy="156.2214496625529" r="0.4" />
                <circle cx="108.85657959879609" cy="135.5410865653539" r="0.4" />
                <circle cx="276.9436355403741" cy="286.01987964939326" r="0.4" />
                <circle cx="305.47307448578067" cy="121.32569504028652" r="0.4" />
              </g>
              <g style={{ animationDelay: "-8.5s", animationDuration: "15s" } as CSSProperties}>
                <circle cx="59.49317604827229" cy="277.12092125293566" r="0.8" />
                <circle cx="224.0907104947837" cy="309.3048992494005" r="0.4" />
                <circle cx="255.7156936811225" cy="324.0514814417111" r="0.4" />
                <circle cx="285.64487713447306" cy="396.13966764882207" r="0.4" />
                <circle cx="172.6570672472917" cy="390.5125587567454" r="0.4" />
                <circle cx="145.69578227819875" cy="275.12193605125503" r="0.4" />
                <circle cx="337.3294248493039" cy="376.4757655488211" r="0.4" />
                <circle cx="146.49700390873477" cy="392.9637284047203" r="0.8" />
                <circle cx="237.0460109319538" cy="316.6449414449744" r="0.4" />
                <circle cx="278.08505531866103" cy="196.14131564740092" r="0.4" />
                <circle cx="88.8456019180012" cy="286.61246752817533" r="0.4" />
                <circle cx="152.13953952188604" cy="249.6224176196847" r="0.4" />
                <circle cx="221.49952248146292" cy="209.04344965529162" r="0.4" />
                <circle cx="235.81106788333273" cy="179.61139036051463" r="0.4" />
                <circle cx="188.96604319452308" cy="144.38475816132268" r="0.8" />
                <circle cx="137.3391472388903" cy="311.80102802754845" r="0.4" />
                <circle cx="253.38909548299853" cy="261.73459630808793" r="0.4" />
                <circle cx="290.9124743840948" cy="133.53308738733176" r="0.4" />
                <circle cx="35.5703589040786" cy="291.3236066728132" r="0.4" />
                <circle cx="164.9495128018316" cy="382.91608969448134" r="0.4" />
              </g>
              <g className="privacy-companion-star">
                <circle cx="310" cy="82" r="1.1" />
              </g>
            </svg>
            <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 bg-transparent focus-visible:bg-background-tertiary active:text-text-disabled \x64isabled:\x62g-transparent disabled:text-text-disabled absolute top-[13%] left-[18%] z-10 size-11 \x2dtranslate-1/\x32 rounded-full p-0 text-text-primary-invert \x68over:\x62g-transparent \x64ark:\x74ext-text-primary \x61ctive:\x73cale-100"} type="button" tabIndex={0} aria-label="Make a shooting star">
              <svg className="privacy-star-beacon size-2" style={{ animationPlayState: "paused" } as CSSProperties} aria-hidden="true" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="1.1" fill="currentColor" />
                <path d="M4 1v6M1 4h6" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
              </svg>
            </button>
            <span className={"\x73r-only"} role="status" />
            <div className={"home-privacy-lock relative grid size-[130px] shrink-0 place-items-center rounded-full \x62g-[#\x656e8ea] text-black \x73hadow-glass-toast"} data-visible="false" aria-hidden="true">
              <span className="pointer-events-none absolute top-1/2 left-1/2 size-px" />
              <svg fill="none" height="44" viewBox="0 0 20 20" width="44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path data-slot="lock-shackle" d="M14 7V5C14 2.79 12.21 1 10 1C7.79 1 6 2.79 6 5V11H8V5C8 3.9 8.9 3 10 3C11.1 3 12 3.9 12 5V7H14Z" fill="currentColor" />
                <path d="M15 7H5C3.9 7 3 7.9 3 9V17C3 18.1 3.9 19 5 19H15C16.1 19 17 18.1 17 17V9C17 7.9 16.1 7 15 7ZM11 15H9V11H11V15Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
        <div className={"col-span-full flex w-full max-w-md flex-col justify-center gap-8 justify-self-center \x6dax-site-desktop:\x69nset-site-media-copy \x73ite-desktop:\x63ol-span-4 \x73ite-desktop:\x63ol-start-8 \x73ite-desktop:\x6dax-w-none"}>
          <div className="flex max-w-xs flex-col gap-6 mobile:max-w-77">
            <h2 className={"type-feature-heading text-text-primary \x6dobile:\x77hitespace-pre-line"}>America.gov keeps your data private.</h2>
            <p className="type-site-body text-text-secondary">Your personal information isn’t collected or stored, and your conversation disappears when you leave.</p>
          </div>
          <a className={"site-underline-link relative inline-block \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none w-fit rounded-4 type-site-cta text-text-primary \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-4"} href="/privacy">Learn about privacy</a>
        </div>
      </div>
      <div className="site-grid w-full items-center gap-y-10">
        <div className={"col-span-full flex min-w-0 justify-center \x73ite-desktop:\x63ol-span-4 \x73ite-desktop:\x63ol-start-3"}>
          <div className={"squircle relative aspect-square w-full max-w-md shrink-0 overflow-hidden \x72ounded-site-bento bg-surface-muted"}>
            <div className="absolute -inset-[18%] grid grid-cols-3 grid-rows-3 gap-8" aria-hidden="true">
              <div className={"relative min-h-0 min-w-0 rounded-full bg-white \x73hadow-[\x30_8px_24px_rgb(\x31_14_36/\x312%)]"}>
                <div className="absolute inset-4">
                  <img className={"size-full object-contain [&]:max-w-none"} alt="" decoding="async" loading="lazy" src="/site-assets/dd3bb5792687c34a-98a684da2d8cb6721da1dfe1f55bfb03.png" />
                </div>
              </div>
              <div className={"relative min-h-0 min-w-0 rounded-full bg-white \x73hadow-[\x30_8px_24px_rgb(\x31_14_36/\x312%)]"}>
                <div className="absolute inset-4">
                  <img className={"size-full object-contain [&]:max-w-none"} alt="" decoding="async" loading="lazy" src="/site-assets/ce1636f0f4b9b1a8-e017296a51a37365d3a1174f02be4f8c.png" />
                </div>
              </div>
              <div className={"relative min-h-0 min-w-0 rounded-full bg-white \x73hadow-[\x30_8px_24px_rgb(\x31_14_36/\x312%)]"}>
                <div className="absolute inset-4">
                  <img className={"size-full object-contain [&]:max-w-none"} alt="" decoding="async" loading="lazy" src="/site-assets/f8771bab4355a2c8-bbad8e97f6ed9607bb4b97ed05f21110.png" />
                </div>
              </div>
              <div className={"relative min-h-0 min-w-0 rounded-full bg-white \x73hadow-[\x30_8px_24px_rgb(\x31_14_36/\x312%)]"}>
                <div className="absolute inset-4">
                  <img className={"size-full object-contain [&]:max-w-none"} alt="" decoding="async" loading="lazy" src="/site-assets/6b0e58ea2470c358-c45111fe79f447f74baa0a959314adb0.png" />
                </div>
              </div>
              <div className={"relative min-h-0 min-w-0 rounded-full bg-white \x73hadow-[\x30_8px_24px_rgb(\x31_14_36/\x312%)]"}>
                <div className="absolute inset-4">
                  <img className={"size-full object-contain [&]:max-w-none"} alt="" decoding="async" loading="lazy" src="/site-assets/f70c6662db9f1a47-dbf5e7d1bb2d323971a0681d3566827f.png" />
                </div>
              </div>
              <div className={"relative min-h-0 min-w-0 rounded-full bg-white \x73hadow-[\x30_8px_24px_rgb(\x31_14_36/\x312%)]"}>
                <div className="absolute inset-4">
                  <img className={"size-full object-contain [&]:max-w-none"} alt="" decoding="async" loading="lazy" src="/site-assets/a819cba5b82ca1e6-31ca272de7196825f4a72c1372acddd4.png" />
                </div>
              </div>
              <div className={"relative min-h-0 min-w-0 rounded-full bg-white \x73hadow-[\x30_8px_24px_rgb(\x31_14_36/\x312%)]"}>
                <div className="absolute inset-4">
                  <img className={"size-full object-contain [&]:max-w-none"} alt="" decoding="async" loading="lazy" src="/site-assets/2ff7c9bca89d098e-263849edaa9f7198e4851806d420ec04.png" />
                </div>
              </div>
              <div className={"relative min-h-0 min-w-0 rounded-full bg-white \x73hadow-[\x30_8px_24px_rgb(\x31_14_36/\x312%)]"}>
                <div className="absolute inset-4">
                  <img className={"size-full object-contain [&]:max-w-none"} alt="" decoding="async" loading="lazy" src="/site-assets/387879ba8b7a3241-86f79df517a979773e88202ee4c9e752.png" />
                </div>
              </div>
              <div className={"relative min-h-0 min-w-0 rounded-full bg-white \x73hadow-[\x30_8px_24px_rgb(\x31_14_36/\x312%)]"}>
                <div className="absolute inset-4">
                  <img className={"size-full object-contain [&]:max-w-none"} alt="" decoding="async" loading="lazy" src="/site-assets/d380101b6cc6f02c-cd3c311e5b31fcced836aac74441df32.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"col-span-full flex w-full max-w-md flex-col justify-center gap-8 justify-self-center \x6dax-site-desktop:\x69nset-site-media-copy \x73ite-desktop:\x63ol-span-4 \x73ite-desktop:\x63ol-start-8 \x73ite-desktop:\x6dax-w-none"}>
          <div className="flex max-w-xs flex-col gap-6 mobile:max-w-77">
            <h2 className={"type-feature-heading text-text-primary \x6dobile:\x77hitespace-pre-line"}>Clear answers. Official sources.</h2>
            <p className="type-site-body text-text-secondary">Every answer is exclusively sourced from federal, state, and local websites.</p>
          </div>
          <a className={"site-underline-link relative inline-block \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none w-fit rounded-4 type-site-cta text-text-primary \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-4"} href="/how-it-works">Learn about sources</a>
        </div>
      </div>
      <div className="site-grid w-full items-center gap-y-10">
        <div className={"col-span-full flex min-w-0 justify-center \x73ite-desktop:\x63ol-span-4 \x73ite-desktop:\x63ol-start-3"}>
          <div className={"squircle relative aspect-square w-full max-w-md shrink-0 overflow-hidden \x72ounded-site-bento browser-card @container"} data-slot="browser-feature">
            <div className={"artwork-scale relative block h-[453px] w-[453px] \x6frigin-top-left select-none [--artwork-width:453px]"} aria-hidden="true">
              <div className={"browser-dock absolute top-[131px] left-[56px] flex h-[192px] w-[800px] items-center gap-8 rounded-[68px] \x62g-background-primary/\x350 p-9"}>
                <span className={"grid size-[120px] shrink-0 place-items-center rounded-32 \x62order \x62order-border-quaternary bg-background-primary \x73hadow-elevation-1"}>
                  <span className="block size-24 overflow-hidden rounded-full">
                    <img className={"size-24 [&]:max-w-none"} alt="" src="/site-assets/498713f9417f8018-18990e53fb6ce15232c1802791e04e82.png" />
                  </span>
                </span>
                <span className={"grid size-[120px] shrink-0 place-items-center rounded-32 \x62order \x62order-border-quaternary bg-background-primary \x73hadow-elevation-1"}>
                  <img className={"size-24 [&]:max-w-none"} alt="" src="/site-assets/550c3a12e5730639-4ebe0fc9e915ed3e215baea050368cc5.png" />
                </span>
                <span className={"grid size-[120px] shrink-0 place-items-center rounded-32 \x62order \x62order-border-quaternary bg-background-primary \x73hadow-elevation-1"}>
                  <img className={"size-24 [&]:max-w-none"} alt="" src="/site-assets/bdb01ace473549ad-79384b5751416f2cf2409ddb1fbd7b8d.png" />
                </span>
                <span className={"grid size-[120px] shrink-0 place-items-center rounded-32 \x62order \x62order-border-quaternary bg-background-primary \x73hadow-elevation-1"}>
                  <img className={"size-24 [&]:max-w-none"} alt="" src="/site-assets/980a56907b2ce966-88da1b7579a6cfd3a1ff9e9993656760.png" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={"col-span-full flex w-full max-w-md flex-col justify-center gap-8 justify-self-center \x6dax-site-desktop:\x69nset-site-media-copy \x73ite-desktop:\x63ol-span-4 \x73ite-desktop:\x63ol-start-8 \x73ite-desktop:\x6dax-w-none"}>
          <div className="flex max-w-xs flex-col gap-6 mobile:max-w-77">
            <h2 className={"type-feature-heading text-text-primary \x6dobile:\x77hitespace-pre-line"}>No app to download.</h2>
            <p className="type-site-body text-text-secondary">Just open America.gov in your browser on your phone, tablet, or computer.</p>
          </div>
          <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 bg-transparent focus-visible:bg-background-tertiary active:text-text-disabled \x64isabled:\x62g-transparent disabled:text-text-disabled site-underline-link h-auto min-h-0 w-fit rounded-4 p-0 type-site-cta text-text-primary \x68over:\x62g-transparent"} type="button" tabIndex={0}>Ask a question</button>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionMoreComingIn2027() {
  return (
    <section className={"relative z-10 overflow-x-clip overflow-y-visible pt-0 mobile:pt-0 \x73ite-desktop:\x70t-0"} id="upcoming-features" aria-labelledby="coming-in-2027">
      <div className={"site-container relative z-10 flex justify-center \x6dax-mobile:\x70x-8"}>
        <div className="flex w-full max-w-172 flex-col items-center gap-8 text-center">
          <div className="flex w-full flex-col items-center gap-5 mobile:gap-6">
            <h2 className={"type-section-heading text-text-primary \x6dax-mobile:\x74ext-[\x348px] \x73ite-desktop:\x74ext-[\x396px] \x73ite-desktop:\x74racking-[\x2d0.\x306em]"} id="coming-in-2027">More coming in 2027</h2>
            <p className={"max-w-128 px-px type-site-body \x74ext-text-primary/\x370"}>Going beyond answers, you’ll be able to complete forms, track progress, and organize everything in one place.</p>
          </div>
          <a className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-14 min-h-14 rounded-40 px-6 pb-0.5 type-body-m leading-none bg-background-tertiary text-text-primary hover:bg-background-secondary active:bg-background-tertiary disabled:bg-background-tertiary disabled:text-text-disabled \x6dotion-reduce:\x74ransition-none"} href="/coming-soon">See what’s ahead</a>
        </div>
      </div>
      <ul className={"\x73r-only"} role="list" aria-label="Previews of services planned for 2027">
        <li>Find federal jobs matched to your experience. The preview shows uploading a resume and comparing job matches, with details about the agency, location, salary, and remote work.</li>
        <li>Choose a campground. The preview shows a map and four campgrounds near Greer, Arizona, with photos and addresses.</li>
        <li>Compare medication costs. The preview shows adding Albuterol HFA and choosing its form, strength, and package size.</li>
        <li>Choose preferred pharmacies. The preview shows nearby pharmacies on a map, with their names, addresses, and selections.</li>
        <li>Update your legal name across agencies. The preview shows selecting Social Security, MyTravelGov, CBP Trusted Traveler Programs, and Global Entry / TSA PreCheck.</li>
        <li>Find housing. The preview shows a photo and address for Mocksville Place, a multifamily housing development in North Carolina.</li>
        <li>Apply for a passport and track its progress. The preview shows confirming a passport photo, submitting an application, and tracking it from submitted to processing with an estimated arrival date.</li>
        <li>Sign in to access services. The preview shows a Login button.</li>
      </ul>
      <div className="home-roadmap-artwork" lang="en">
        <div className="absolute inset-0">
          <div className="home-roadmap-canvas type-body-s artwork-scale select-none" aria-hidden="true" lang="en">
            <div className="roadmap-pharmacies roadmap-card" data-roadmap-preview="true">
              <div className="contents" inert>
                <p className="roadmap-card-title">Add your preferred pharmacies</p>
                <div className="roadmap-map relative h-[314px] overflow-hidden">
                  <img className={"map-artwork absolute right-0 bottom-0 h-[552px] w-[895px] max-w-none [&]:max-w-none"} alt="" loading="lazy" src="/site-assets/33d2190bb40b91ff.png" />
                  <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-9 rounded-40 px-3 pb-0.5 type-body-m leading-none \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x73hadow-elevation-1 \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-control-label roadmap-map-control absolute top-3 left-3 gap-1 pr-2"} type="button" tabIndex={0}>20006 <svg fill="none" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10 12.23L4.71 6.94L3.29 8.35L10 15.06L16.71 8.35L15.29 6.94L10 12.23Z" fill="currentColor" /></svg></button>
                  <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 size-8 rounded-full p-0 \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x73hadow-elevation-1 \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-map-control absolute top-3 right-3"} type="button" tabIndex={0} aria-label="Expand pharmacy map">
                    <img className={"map-glyph [&]:max-w-none"} style={{ aspectRatio: "14 / 14" }} alt="" />
                  </button>
                  <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 size-8 rounded-full p-0 bg-blue-700 text-white \x73hadow-elevation-1 hover:bg-blue-800 focus-visible:bg-blue-700 active:bg-blue-700 \x61ctive:\x73hadow-none disabled:bg-blue-700-10 disabled:text-text-disabled \x64isabled:\x73hadow-none absolute \x74op-(\x2d-marker-top) \x6ceft-(\x2d-marker-left)"} style={{ "--marker-left": "140px", "--marker-top": "146px" } as CSSProperties} type="button" tabIndex={0} aria-label="Selected pharmacy location">
                    <img className={"size-5 [&]:max-w-none"} style={{ aspectRatio: "20 / 20" }} alt="" />
                  </button>
                  <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 size-8 rounded-full p-0 \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x73hadow-elevation-1 \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none absolute \x74op-(\x2d-marker-top) \x6ceft-(\x2d-marker-left) roadmap-map-control"} style={{ "--marker-left": "253px", "--marker-top": "196px" } as CSSProperties} type="button" tabIndex={0} aria-label="Pharmacy location">
                    <img className={"size-5 map-glyph [&]:max-w-none"} style={{ aspectRatio: "20 / 20" }} alt="" />
                  </button>
                  <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 size-8 rounded-full p-0 \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x73hadow-elevation-1 \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none absolute \x74op-(\x2d-marker-top) \x6ceft-(\x2d-marker-left) roadmap-map-control"} style={{ "--marker-left": "193px", "--marker-top": "128px" } as CSSProperties} type="button" tabIndex={0} aria-label="Pharmacy location">
                    <img className={"size-5 map-glyph [&]:max-w-none"} style={{ aspectRatio: "20 / 20" }} alt="" />
                  </button>
                  <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 size-8 rounded-full p-0 \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x73hadow-elevation-1 \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none absolute \x74op-(\x2d-marker-top) \x6ceft-(\x2d-marker-left) roadmap-map-control"} style={{ "--marker-left": "99px", "--marker-top": "121px" } as CSSProperties} type="button" tabIndex={0} aria-label="Pharmacy location">
                    <img className={"size-5 map-glyph [&]:max-w-none"} style={{ aspectRatio: "20 / 20" }} alt="" />
                  </button>
                  <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 size-8 rounded-full p-0 \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x73hadow-elevation-1 \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none absolute \x74op-(\x2d-marker-top) \x6ceft-(\x2d-marker-left) roadmap-map-control"} style={{ "--marker-left": "158px", "--marker-top": "222px" } as CSSProperties} type="button" tabIndex={0} aria-label="Pharmacy location">
                    <img className={"size-5 map-glyph [&]:max-w-none"} style={{ aspectRatio: "20 / 20" }} alt="" />
                  </button>
                  <div className={"absolute bottom-4 left-1/2 flex \x2dtranslate-x-1/\x32 gap-2"}>
                    <div className={"flex w-[282px] shrink-0 items-center gap-3 rounded-16 bg-background-primary p-4 \x73hadow-elevation-1 \x6futline \x6futline-border-tertiary"}>
                      <img className={"size-12 shrink-0 rounded-8 object-cover [&]:max-w-none"} alt="" loading="lazy" src="/site-assets/b64f8a648b217823.png" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">Ridgeview Pharmacy</p>
                        <p className="truncate text-secondary">1124 Patton Ave, Reston, VA</p>
                      </div>
                      <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-9 rounded-40 px-3 pb-0.5 type-body-m leading-none bg-blue-700 text-white \x73hadow-elevation-1 hover:bg-blue-800 focus-visible:bg-blue-700 active:bg-blue-700 \x61ctive:\x73hadow-none disabled:bg-blue-700-10 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-control-label w-15.5"} type="button" tabIndex={0} aria-label="Ridgeview Pharmacy selected">
                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 5.4L16.6 4L7.9 13.2L3.4 9L2 10.4L8 16L18 5.4Z" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                    <div className={"flex w-[282px] shrink-0 items-center gap-3 rounded-16 bg-background-primary p-4 \x73hadow-elevation-1 \x6futline \x6futline-border-tertiary"}>
                      <img className={"size-12 shrink-0 rounded-8 object-cover [&]:max-w-none"} alt="" loading="lazy" src="/site-assets/a4764ee297453a76.png" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">Town Center Pharmacy</p>
                        <p className="truncate text-secondary">1800 Old Reston Ave, Reston, VA</p>
                      </div>
                      <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-9 rounded-40 px-3 pb-0.5 type-body-m leading-none bg-blue-700 text-white \x73hadow-elevation-1 hover:bg-blue-800 focus-visible:bg-blue-700 active:bg-blue-700 \x61ctive:\x73hadow-none disabled:bg-blue-700-10 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-control-label w-15.5"} type="button" tabIndex={0} aria-label="Town Center Pharmacy selected">
                        <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 5.4L16.6 4L7.9 13.2L3.4 9L2 10.4L8 16L18 5.4Z" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                    <div className={"flex w-[282px] shrink-0 items-center gap-3 rounded-16 bg-background-primary p-4 \x73hadow-elevation-1 \x6futline \x6futline-border-tertiary"}>
                      <img className={"size-12 shrink-0 rounded-8 object-cover [&]:max-w-none"} alt="" loading="lazy" src="/site-assets/b5121cea21d0696a.png" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">Lakeside Drug</p>
                        <p className="truncate text-secondary">2200 Sunrise Valley Dr, Reston, VA</p>
                      </div>
                      <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-9 rounded-40 px-3 pb-0.5 type-body-m leading-none bg-background-tertiary text-text-primary hover:bg-background-secondary active:bg-background-tertiary disabled:bg-background-tertiary disabled:text-text-disabled roadmap-control-label w-15.5"} type="button" tabIndex={0} aria-label="Add Lakeside Drug">Add</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="roadmap-campground roadmap-card" data-roadmap-preview="true">
              <div className="contents" inert>
                <p className="roadmap-card-title">Choose a campground near Greer, AZ</p>
                <div className="roadmap-map relative h-[294px] overflow-hidden">
                  <img className={"roadmap-camp-map map-artwork [&]:max-w-none"} alt="" loading="lazy" src="/site-assets/b86c1ca5c392c15f.png" />
                  <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 size-8 rounded-full p-0 \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x73hadow-elevation-1 \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-map-control absolute \x74op-(\x2d-marker-top) \x6ceft-(\x2d-marker-left)"} style={{ "--marker-left": "84px", "--marker-top": "48px" } as CSSProperties} type="button" tabIndex={0} aria-label="Campground location">
                    <img className={"map-glyph [&]:max-w-none"} style={{ aspectRatio: "16 / 15" }} alt="" />
                  </button>
                  <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 size-8 rounded-full p-0 \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x73hadow-elevation-1 \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-map-control absolute \x74op-(\x2d-marker-top) \x6ceft-(\x2d-marker-left)"} style={{ "--marker-left": "236px", "--marker-top": "92px" } as CSSProperties} type="button" tabIndex={0} aria-label="Campground location">
                    <img className={"map-glyph [&]:max-w-none"} style={{ aspectRatio: "16 / 15" }} alt="" />
                  </button>
                  <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 size-8 rounded-full p-0 \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x73hadow-elevation-1 \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-map-control absolute \x74op-(\x2d-marker-top) \x6ceft-(\x2d-marker-left)"} style={{ "--marker-left": "56px", "--marker-top": "158px" } as CSSProperties} type="button" tabIndex={0} aria-label="Campground location">
                    <img className={"map-glyph [&]:max-w-none"} style={{ aspectRatio: "16 / 15" }} alt="" />
                  </button>
                  <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 size-8 rounded-full p-0 \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x73hadow-elevation-1 \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-map-control absolute \x74op-(\x2d-marker-top) \x6ceft-(\x2d-marker-left)"} style={{ "--marker-left": "282px", "--marker-top": "198px" } as CSSProperties} type="button" tabIndex={0} aria-label="Campground location">
                    <img className={"map-glyph [&]:max-w-none"} style={{ aspectRatio: "16 / 15" }} alt="" />
                  </button>
                  <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-9 rounded-40 px-3 pb-0.5 type-body-m leading-none \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x73hadow-elevation-1 \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-control-label roadmap-map-control absolute top-2 left-2 gap-1 pr-2"} type="button" tabIndex={0}>85927 <svg fill="none" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10 12.23L4.71 6.94L3.29 8.35L10 15.06L16.71 8.35L15.29 6.94L10 12.23Z" fill="currentColor" /></svg></button>
                  <div className="absolute right-2 bottom-2 flex flex-col gap-2">
                    <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 size-8 rounded-full p-0 \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x73hadow-elevation-1 \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-map-control"} type="button" tabIndex={0} aria-label="Locate campground">
                      <img className={"map-glyph [&]:max-w-none"} style={{ aspectRatio: "14 / 14" }} alt="" />
                    </button>
                    <div className={"roadmap-map-control flex flex-col overflow-hidden rounded-full bg-background-primary \x73hadow-elevation-1"}>
                      <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 size-8 rounded-full p-0 bg-transparent text-text-primary hover:bg-background-tertiary focus-visible:bg-background-tertiary active:text-text-disabled \x64isabled:\x62g-transparent disabled:text-text-disabled"} type="button" tabIndex={0} aria-label="Zoom in">
                        <img className={"map-glyph [&]:max-w-none"} style={{ aspectRatio: "14 / 14" }} alt="" />
                      </button>
                      <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 size-8 rounded-full p-0 bg-transparent text-text-primary hover:bg-background-tertiary focus-visible:bg-background-tertiary active:text-text-disabled \x64isabled:\x62g-transparent disabled:text-text-disabled"} type="button" tabIndex={0} aria-label="Zoom out">
                        <img className={"map-glyph [&]:max-w-none"} style={{ aspectRatio: "14 / 14" }} alt="" />
                      </button>
                    </div>
                  </div>
                  <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 size-8 rounded-full p-0 \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x73hadow-elevation-1 \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-map-control absolute top-2 right-2"} type="button" tabIndex={0} aria-label="Orient map">
                    <img className={"map-glyph [&]:max-w-none"} style={{ aspectRatio: "14 / 14" }} alt="" />
                  </button>
                </div>
              </div>
            </div>
            <div className="roadmap-medication roadmap-card" data-roadmap-preview="true">
              <div className="contents" inert>
                <p className="roadmap-card-title">Add your medications</p>
                <div className={"flex h-14 items-center rounded-full \x62order \x62order-border-tertiary px-5 text-secondary"}>Search medications</div>
                <div className="roadmap-inset flex flex-col gap-4 p-6">
                  <div className={"flex items-center gap-2 \x62order-b \x62order-border-tertiary pb-4"}>
                    <div className={"relative size-8 overflow-hidden rounded-8 \x62order \x62order-border-quaternary"}>
                      <img className={"absolute top-[-36.36%] left-[-33.01%] h-[172.73%] w-[161.47%] max-w-none [&]:max-w-none"} alt="" loading="lazy" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAABkCAYAAADkBDymAAABY2lDQ1BrQ0dDb2xvclNwYWNlRGlzcGxheVAzAAAokX2QsUvDUBDGv1aloHUQHRwcMolDlJIKuji0FURxCFXB6pS+pqmQxkeSIgU3/4GC/4EKzm4Whzo6OAiik+jm5KTgouV5L4mkInqP435877vjOCA5bnBu9wOoO75bXMorm6UtJfWMBL0gDObxnK6vSv6uP+P9PvTeTstZv///jcGK6TGqn5QZxl0fSKjE+p7PJe8Tj7m0FHFLshXyieRyyOeBZ71YIL4mVljNqBC/EKvlHt3q4brdYNEOcvu06WysyTmUE1jEDjxw2DDQhAId2T/8s4G/gF1yN+FSn4UafOrJkSInmMTLcMAwA5VYQ4ZSk3eO7ncX3U+NtYMnYKEjhLiItZUOcDZHJ2vH2tQ8MDIEXLW54RqB1EeZrFaB11NguASM3lDPtlfNauH26Tww8CjE2ySQOgS6LSE+joToHlPzA3DpfAEDp2ITpJYOWwAAAARjSUNQDA0AAW4D4+8AAAA4ZVhJZk1NACoAAAAIAAGHaQAEAAAAAQAAABoAAAAAAAKgAgAEAAAAAQAAAF2gAwAEAAAAAQAAAGQAAAAAVDfTIQAAAZ9pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTgwODwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xOTM0PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Ctm+zXcAAAgLSURBVHgB7ZvZbtxGEEWL+6wa2ZbjGDHyAcmDvyL+bL/kE/ISIECC2EJgK45tafbhlnu7h5xFEmQ9SNUEmgJFstlkNU/fKRZ7Cf45/70WvzwqgfBRrXljhoCHriAED91DVyCgYNIr3UNXIKBg0ivdQ1cgoGDSK91DVyCgYNIr3UNXIKBg0ivdQ1cgoGDSK91DVyCgYNIr3UNXIKBg0ivdQ1cgoGDSK91DVyCgYNIr3UNXIKBg0ivdQ1cgoGAyVrD5TSaDIJC6roXbKIok5DGuLMvSpPMmPN/FxUnoeZ5LUQpgxzKdXsmHDx9kPltImiVy9vyZTMZjSdPErKyUri3OQa+qSr58mUp/OJHTJ2fy51/v5e3bX+Xdu3c4PpU3b95ILxvLbH4pz55OAD7tGnNxDjrdR75ZS5IWEoah9Pt9wJ7IYnkmw9FICvwKZrMpXEsheV5IlmWdczNORS90FZsNXEtVw5WkUlWlLJcLrEukb2Q+n0Hhc1RGZIAzvYtL4Nr49E1eSllHMuiPpShy+XjxUf779AnA57Jer2VyciLPv3shgZQyHKQymYw7x90x91LDXfQkTgZQuUhVV8alRHAzC6p9tYbKEcXg3TkcjOB6ks4BZ4Gdci8sEMPAEqFLjb8gQPFwXMDP05eXcDcCjTN8rJDOl24XF8egN+EfkIOnPcJ/AsZaw9ejJkzs3kXYTZkdg374sWOPLGhTUPDvYFjesG63jkFvy3V9B64mgG+H4I0Lup6hOymOvUi34OhC9hhyP8ALlHE7wZvjDrsZN5VO/01Fm9YWuhS+PEMDPY4jieJ459eZsWOLm0o3EBG9YEtlU+FRYkEnAB4nicRoBGNlEPn+r6IL/N2EDphEyZAxwkrIKdUP4IzZ2VSwRrhYVXA1QSxJ3C3szkE3uAE9wqd+jbgxprLLBOFiJRvE6lzL1Qrqj/CB1Jcsjbog7oMyugWdn5oATrfBr1F+JG3yjfn836ARrCwKpLP8/MfYHcG89+kHFXrvgyBMJIiybRMA2mCqwih832nT8xhvb9601u/f25DyBQ5GL8bBtFhqQ/koQjk6bDN3ZMdB6CRHBRM+d0GYL1F7tP1/fHxw0vkDR6EfcaOfR5IBv60ANoyZY/4SOra4Bf02gA3gLfgAx6wGtwr/7TXvXLkbN9IqeZewVbp9OCbbU02Gb39o7ZyOQd+LRo5Vv3Uxjas/Pq0N8j72HYPeqBePABdysOy1r5szx+cPMrt94Bz03Wuxgb59YaKkNqX5Nexyuo34eumcg34wagufnw16Im8Uzl46HpnjDrJ3DjqbAdplu2vg2u9/C1oqs7Wn3XuEtvy37DhXYgtyp2+W26SxMlo/3nRk8OxhXqa4vjgH3QKz6Bt4BmsDfMvYfi61361N1k5s3YJ+p2gBmfVh6oSZ77zAyUpwq2n3TkTNi9VuD38P1y9mEzGaLTG6B1tTP7gOHSDaleUW9Jso3iRotLtzwBG78pqF2Q4ux/livZTVv+dSLi/BPpUQPVDZ2SuJsyEyH+RubvMoW7egHz0y3bjVtJFpe7bVOZKXSw4yRbs7zhpho0UGPXzYR0fIGh0gF39Lcf6bVGXOHHLy+hcZ/vgzKkHv0fUstwhv3rGYD2EbskiiRs3wOwTsUcgE9KVuO7DNUDxkoEeRwYnI5HsJphecwoGKQG1waB57nOxdbjb+wKnOQm+e2zoB2+tPhVuVAxlOFBifXiF+5wgB9Koa0hFieP4+qgrX1Ojuw+SB9edzezvADsZPpXqVY3RBxmwqi6PQd5/6lsuWDjfwOaY3CdRXGDpdoA+13x+YGRkhXAi7qTkwqeTXLNSdL2ey/vpJqs1ManRqBycvZUzV81YqyMWxmRigYJoBANQCOcRCddf02VBsgU7qNSYM1GWBWRt4SebQOsa1l8hDf17C9RjoGO/OIdYbzt4A9BSTDpqQX4m5Y9Bvo0B1b/kbhcJ/c4oMJ4FFAJz2+qiNSsISA5CMM6eMMcQakwqW04XMvs6lXm2gbgy53uCl29zsNnsPnO6ce7Fq3ntqAt875BuSPUdUOmdnEHqW9eGjMe0RlWFic+Tnu7IqN4hsVrJcYP4SFY6X6Bqq99D3gBq4VCGjDMLGbgucEgdgAudY9cAMRhKZwcXEyZVkvcyMcWSrDAcpFXAvASBXHCuD/dWStVBgHE17xz3Lj7vrlNLrGmos4Yvx8QNOUCoHF2FnS99s6KvByEzoxXjG+Rx+HVnGJ2MoHr4dauewuwK+PMT9wnyN+2B0GJx9jjVIeohydh9Vj4vbWnMKOsWMQND8j8Cll9YYKJpIkQSyXItcfl3AjyMKAfUIo3eZn1+mOaIWTgKrGJXA/ZgYHgqP4V6q2RXO5ZKjssoCF2YD5NF9bF3rBu/xP6jR0oeaA0AHfcyUHo368vR0bHz0YjHHjLsvMhr25IeXP2Ey2LC9xt7N3iCfX8n7iz/kczqSdHQqGapp9OKVhIjrNRfnpjTeBYPugwtdCH01B5iaiOXIVZtmAORZTC8RMq4kRljJae8pJgOHik0ALLtulbME91yaGXWESr9OV1KXR8SbeyLPYPJEhhMq30ZBHP2rvXQO+r2AsUK43uuih8+s+xp/+Odz0oKHrlAtHrqHrkBAwaRXuoeuQEDBpFe6h65AQMGkV7qHrkBAwaRXuoeuQEDBpFe6h65AQMGkV7qHrkBAwaRXuoeuQEDBpFe6h65AQMGkV7qHrkBAwaRXuoeuQEDBpFe6h65AQMHk/5CUDQqQJm4EAAAAAElFTkSuQmCC" />
                      <img className={"absolute -top-2 -left-2 max-w-none [&]:max-w-none"} alt="" loading="lazy" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">Albuterol</p>
                      <p className="text-secondary">90 mcg</p>
                    </div>
                    <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-9 rounded-40 px-3 pb-0.5 type-body-m leading-none bg-background-tertiary text-text-primary hover:bg-background-secondary active:bg-background-tertiary disabled:bg-background-tertiary disabled:text-text-disabled roadmap-small-button"} type="button" tabIndex={0}>Remove</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 shrink-0 text-secondary">Form</span>
                    <div className="flex h-10 flex-1 items-center rounded-full bg-background-tertiary p-1">
                      <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-11 min-h-11 rounded-40 px-5 pb-0.5 type-body-m leading-none \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-segment \x73hadow-elevation-1"} type="button" tabIndex={0}>Inhaler</button>
                      <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-11 min-h-11 rounded-40 px-5 pb-0.5 type-body-m leading-none bg-transparent hover:bg-background-tertiary focus-visible:bg-background-tertiary active:text-text-disabled \x64isabled:\x62g-transparent disabled:text-text-disabled roadmap-segment text-secondary"} type="button" tabIndex={0}>Tablet</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-20 shrink-0 text-secondary">Size</span>
                    <div className="flex h-10 flex-1 items-center rounded-full bg-background-tertiary p-1">
                      <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-11 min-h-11 rounded-40 px-5 pb-0.5 type-body-m leading-none bg-transparent hover:bg-background-tertiary focus-visible:bg-background-tertiary active:text-text-disabled \x64isabled:\x62g-transparent disabled:text-text-disabled roadmap-segment text-secondary"} type="button" tabIndex={0}>6g</button>
                      <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-11 min-h-11 rounded-40 px-5 pb-0.5 type-body-m leading-none \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-segment \x73hadow-elevation-1"} type="button" tabIndex={0}>8g</button>
                      <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-11 min-h-11 rounded-40 px-5 pb-0.5 type-body-m leading-none bg-transparent hover:bg-background-tertiary focus-visible:bg-background-tertiary active:text-text-disabled \x64isabled:\x62g-transparent disabled:text-text-disabled roadmap-segment text-secondary"} type="button" tabIndex={0}>20g</button>
                    </div>
                  </div>
                </div>
                <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-14 min-h-14 rounded-40 px-6 pb-0.5 type-body-m leading-none bg-blue-700 text-white \x73hadow-elevation-1 hover:bg-blue-800 focus-visible:bg-blue-700 active:bg-blue-700 \x61ctive:\x73hadow-none disabled:bg-blue-700-10 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-action"} type="button" tabIndex={0}>Compare prices</button>
              </div>
            </div>
            <div className="roadmap-resume" data-roadmap-preview="true">
              <div className="contents" inert>
                <div className={"roadmap-card-title flex h-50 items-center justify-center squircle rounded-40 \x62order-2 \x62order-dotted \x62order-blue-600 \x62g-blue-600/\x35 text-link"}>Drop resume anywhere</div>
                <div className="absolute top-[167px] left-[298px] z-2 flex items-start gap-1">
                  <div className="relative h-12 w-[39px] shrink-0">
                    <img className={"absolute top-[-65.625px] left-[-87.5px] max-w-none [&]:max-w-none"} alt="" loading="lazy" />
                  </div>
                  <span className="rounded-full bg-blue-600 px-1 py-px whitespace-nowrap text-primary-invert">Resume_2026.pdf</span>
                </div>
                <img className={"artwork-cursor absolute top-[181px] left-[379px] z-2 h-[30px] w-auto [&]:max-w-none"} style={{ aspectRatio: "51 / 61" }} alt="" />
              </div>
            </div>
            <div className="roadmap-name roadmap-card" data-roadmap-preview="true">
              <div className="contents" inert>
                <p className="roadmap-card-title">Choose where you want to update your name</p>
                <div className={"roadmap-inset \x64ivide-y \x64ivide-border-tertiary px-6 py-2"}>
                  <div className="flex h-16 items-center gap-3">
                    <img className={"size-9 shrink-0 object-contain [&]:max-w-none"} alt="" loading="lazy" src="/site-assets/e4d437cfab12b57f-eb32dffcf14636c1c156b39fdfcf090b.png" />
                    <span className={"group/checkbox flex w-full items-center gap-3 rounded-8 text-left \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none cursor-pointer roadmap-agency-checkbox"} data-checked="" role="checkbox" tabIndex={0} id="base-ui-_r1r_11_" aria-checked="true" aria-labelledby="_r1r_10_-label">
                      <span className={"flex size-5 shrink-0 items-center justify-center rounded-[6px] \x62order text-white transition-colors duration-300 ease-out-quint \x62order-blue-700 bg-blue-700"}>
                        <span data-checked="">
                          <svg data-checked="" fill="none" height="14" viewBox="0 0 20 20" width="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path className={"[stroke-dasharray:100] transition-[stroke-dashoffset,opacity] [transition-timing-function:var(--ease-out-quint),linear] \x6dotion-reduce:\x74ransition-none opacity-100 [stroke-dashoffset:0] [transition-duration:300ms,0ms]"} d="M2.7 9.7 7.95 14.6 17.3 4.7" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" {...({ pathLength: "100" } as any)} />
                          </svg>
                        </span>
                      </span>
                      <span className="min-w-0 flex-1 text-pretty text-secondary type-body-m" id="_r1r_10_-label">
                        <label htmlFor="_r1r_10_">Social Security Administration</label>
                      </span>
                    </span>
                    <input style={{ clipPath: "inset(50%)", overflow: "hidden", whiteSpace: "nowrap", border: "0px", padding: "0px", width: "1px", height: "1px", margin: "-1px", position: "fixed", top: "0px", left: "0px" } as CSSProperties} id="_r1r_10_" tabIndex={-1} aria-hidden="true" type="checkbox" defaultChecked />
                  </div>
                  <div className="flex h-16 items-center gap-3">
                    <img className={"size-9 shrink-0 object-contain [&]:max-w-none"} alt="" loading="lazy" src="/site-assets/0fb1b30ae5543ce7-f9df3057238739aa153e5c030737469a.png" />
                    <span className={"group/checkbox flex w-full items-center gap-3 rounded-8 text-left \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none cursor-pointer roadmap-agency-checkbox"} data-checked="" role="checkbox" tabIndex={0} id="base-ui-_r1r_15_" aria-checked="true" aria-labelledby="_r1r_14_-label">
                      <span className={"flex size-5 shrink-0 items-center justify-center rounded-[6px] \x62order text-white transition-colors duration-300 ease-out-quint \x62order-blue-700 bg-blue-700"}>
                        <span data-checked="">
                          <svg data-checked="" fill="none" height="14" viewBox="0 0 20 20" width="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path className={"[stroke-dasharray:100] transition-[stroke-dashoffset,opacity] [transition-timing-function:var(--ease-out-quint),linear] \x6dotion-reduce:\x74ransition-none opacity-100 [stroke-dashoffset:0] [transition-duration:300ms,0ms]"} d="M2.7 9.7 7.95 14.6 17.3 4.7" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" {...({ pathLength: "100" } as any)} />
                          </svg>
                        </span>
                      </span>
                      <span className="min-w-0 flex-1 text-pretty text-secondary type-body-m" id="_r1r_14_-label">
                        <label htmlFor="_r1r_14_">State Department</label>
                      </span>
                    </span>
                    <input style={{ clipPath: "inset(50%)", overflow: "hidden", whiteSpace: "nowrap", border: "0px", padding: "0px", width: "1px", height: "1px", margin: "-1px", position: "fixed", top: "0px", left: "0px" } as CSSProperties} id="_r1r_14_" tabIndex={-1} aria-hidden="true" type="checkbox" defaultChecked />
                  </div>
                  <div className="flex h-16 items-center gap-3">
                    <img className={"size-9 shrink-0 object-contain [&]:max-w-none"} alt="" loading="lazy" src="/site-assets/6b39d439968082a9.png" />
                    <span className={"group/checkbox flex w-full items-center gap-3 rounded-8 text-left \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none cursor-pointer roadmap-agency-checkbox"} data-checked="" role="checkbox" tabIndex={0} id="base-ui-_r1r_19_" aria-checked="true" aria-labelledby="_r1r_18_-label">
                      <span className={"flex size-5 shrink-0 items-center justify-center rounded-[6px] \x62order text-white transition-colors duration-300 ease-out-quint \x62order-blue-700 bg-blue-700"}>
                        <span data-checked="">
                          <svg data-checked="" fill="none" height="14" viewBox="0 0 20 20" width="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path className={"[stroke-dasharray:100] transition-[stroke-dashoffset,opacity] [transition-timing-function:var(--ease-out-quint),linear] \x6dotion-reduce:\x74ransition-none opacity-100 [stroke-dashoffset:0] [transition-duration:300ms,0ms]"} d="M2.7 9.7 7.95 14.6 17.3 4.7" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" {...({ pathLength: "100" } as any)} />
                          </svg>
                        </span>
                      </span>
                      <span className="min-w-0 flex-1 text-pretty text-secondary type-body-m" id="_r1r_18_-label">
                        <label htmlFor="_r1r_18_">Global Entry</label>
                      </span>
                    </span>
                    <input style={{ clipPath: "inset(50%)", overflow: "hidden", whiteSpace: "nowrap", border: "0px", padding: "0px", width: "1px", height: "1px", margin: "-1px", position: "fixed", top: "0px", left: "0px" } as CSSProperties} id="_r1r_18_" tabIndex={-1} aria-hidden="true" type="checkbox" defaultChecked />
                  </div>
                </div>
                <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-14 min-h-14 rounded-40 px-6 pb-0.5 type-body-m leading-none bg-blue-700 text-white \x73hadow-elevation-1 hover:bg-blue-800 focus-visible:bg-blue-700 active:bg-blue-700 \x61ctive:\x73hadow-none disabled:bg-blue-700-10 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-action"} type="button" tabIndex={0}>Change name</button>
              </div>
            </div>
            <div className={"roadmap-housing overflow-hidden rounded-40 bg-background-primary squircle \x6futline \x6futline-border-quaternary"} data-roadmap-preview="true">
              <div className="contents" inert>
                <div className="relative h-[161px] overflow-hidden">
                  <img className={"absolute top-[-21px] left-[-13px] h-[214px] w-[322px] max-w-none object-cover [&]:max-w-none"} alt="" loading="lazy" src="/site-assets/0c8c0fba40af8f68.png" />
                </div>
                <div className="type-body-s flex flex-col gap-1 p-5">
                  <p className="font-medium">Mocksville Place, Multifamily housing development</p>
                  <p className="text-secondary">401 N Main St,<br />Mocksville, NC 27028</p>
                </div>
              </div>
            </div>
            <div className="roadmap-login" data-roadmap-preview="true">
              <div className="contents" inert>
                <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 min-h-14 rounded-40 px-6 type-body-m leading-none \x62order \x62order-border-tertiary bg-background-primary text-text-primary \x73hadow-elevation-1 \x68over:\x62order-border-primary \x61ctive:\x62order-border-tertiary \x64isabled:\x62order-transparent \x64isabled:\x62g-background-primary/\x385 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-login-button h-17 gap-4 py-3 pr-8 pl-3"} type="button" tabIndex={0}><span className="relative size-11"><img className={"absolute top-[-31px] left-[-41px] max-w-none [&]:max-w-none"} alt="" loading="lazy" width="126" height="126" src="/site-assets/5ee5fdab0b17f084.png" /></span>Login.gov</button>
              </div>
            </div>
            <div className="roadmap-passport roadmap-passport-status roadmap-card gap-5" data-roadmap-preview="true">
              <div className="contents" inert>
                <div className="type-body-s flex items-center gap-4">
                  <img className={"h-[46px] w-[33px] object-cover [&]:max-w-none"} alt="" loading="lazy" width="33" height="46" src="/site-assets/1ca0aff235cc1c41.png" />
                  <div>
                    <p className="font-medium">Passport</p>
                    <p className="text-secondary">Arrives by Nov 5, 2026</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-x-1 gap-y-2 text-center text-secondary">
                  <div className="flex flex-col gap-2">
                    <span className="h-1 rounded-full bg-blue-500" />
                    <span>Submitted</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className={"h-1 rounded-full \x62g-blue-500/\x340"} />
                    <span>Processing</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="h-1 rounded-full bg-border-tertiary" />
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="roadmap-photo roadmap-card" data-roadmap-preview="true">
              <div className="contents" inert>
                <p className="roadmap-card-title">Confirm your photo</p>
                <div className={"relative h-52 overflow-hidden \x72ounded-b-16 \x6dask-[\x6cinear-gradient(\x74o_bottom,\x74ransparent,#\x3000_62px)]"}>
                  <div className={"absolute \x2dinset-x-1.\x35 top-[-73px] h-[281px]"}>
                    <img className={"absolute top-[-53.87%] left-[-0.08%] h-[153.87%] w-[100.23%] max-w-none [&]:max-w-none"} alt="" loading="lazy" src="/site-assets/f060990176119dd2.png" />
                  </div>
                  <img className={"absolute top-[3px] left-[-6px] h-[205px] w-[326px] max-w-none [&]:max-w-none"} alt="" loading="lazy" src="/site-assets/91753b5ac816ae01.png" />
                </div>
                <button className={"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 h-14 min-h-14 rounded-40 px-6 pb-0.5 type-body-m leading-none bg-blue-700 text-white \x73hadow-elevation-1 hover:bg-blue-800 focus-visible:bg-blue-700 active:bg-blue-700 \x61ctive:\x73hadow-none disabled:bg-blue-700-10 disabled:text-text-disabled \x64isabled:\x73hadow-none roadmap-action"} type="button" tabIndex={0}>Submit passport application</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedFooter({ openFeedback, onOpenFeedback }: { openFeedback: boolean; onOpenFeedback: () => void }) {
  return (
    <footer className={"pb-24 text-pretty text-black \x64ark:\x74ext-text-primary \x73ite-desktop:\x70b-30 \x70t-site-section \x6dobile:\x70t-site-section-lg"} data-slot="site-footer">
      <div className={"mx-auto w-[calc(100%-var(--site-grid-margin)*2)] site-grid gap-y-20 \x73ite-desktop:\x67ap-y-36 \x73ite-desktop:[\x2d-site-grid-margin:\x396px]"}>
        <nav className="col-span-full min-w-0 text-center wrap-anywhere" aria-label="Footer">
          <ul className={"type-section-heading flex flex-col items-center gap-2.5 \x6dax-mobile:\x67ap-6"}>
            <li className="max-w-full">
              <a className={"max-w-full rounded-8 bg-transparent \x64ecoration-[\x6dax(\x31.\x35px,\x30.\x303em)] \x75nderline-offset-[\x6dax(\x34px,\x30.\x312em)] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none block px-2"} href="/how-it-works">How it works</a>
            </li>
            <li className="max-w-full">
              <a className={"max-w-full rounded-8 bg-transparent \x64ecoration-[\x6dax(\x31.\x35px,\x30.\x303em)] \x75nderline-offset-[\x6dax(\x34px,\x30.\x312em)] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none block px-2"} href="/privacy">Privacy</a>
            </li>
            <li className="max-w-full">
              <a className={"max-w-full rounded-8 bg-transparent \x64ecoration-[\x6dax(\x31.\x35px,\x30.\x303em)] \x75nderline-offset-[\x6dax(\x34px,\x30.\x312em)] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none block px-2"} href="/about">About</a>
            </li>
            <li className="max-w-full">
              <a className={"max-w-full rounded-8 bg-transparent \x64ecoration-[\x6dax(\x31.\x35px,\x30.\x303em)] \x75nderline-offset-[\x6dax(\x34px,\x30.\x312em)] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none block px-2"} href="/coming-soon">Coming soon</a>
            </li>
            <li className="max-w-full">
              <a className={"max-w-full rounded-8 bg-transparent \x64ecoration-[\x6dax(\x31.\x35px,\x30.\x303em)] \x75nderline-offset-[\x6dax(\x34px,\x30.\x312em)] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none block px-2"} href="/releases">Releases</a>
            </li>
            <li className="max-w-full">
              <a className={"max-w-full rounded-8 bg-transparent \x64ecoration-[\x6dax(\x31.\x35px,\x30.\x303em)] \x75nderline-offset-[\x6dax(\x34px,\x30.\x312em)] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none block px-2"} href="/faq">Frequently asked questions</a>
            </li>
            <li className="max-w-full">
              <button className={"shrink-0 cursor-pointer items-center justify-center gap-2 transition-[color,background-color,border-color,box-shadow,scale,opacity] duration-200 ease-out-quint \x61ctive:\x73cale-press \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 focus-visible:bg-background-tertiary \x64isabled:\x62g-transparent disabled:text-text-disabled max-w-full rounded-8 bg-transparent \x64ecoration-[\x6dax(\x31.\x35px,\x30.\x303em)] \x75nderline-offset-[\x6dax(\x34px,\x30.\x312em)] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none type-section-heading block h-auto min-h-0 px-2 py-0 font-normal text-inherit \x68over:\x62g-transparent \x61ctive:\x73cale-100 active:text-inherit"} type="button" tabIndex={0} aria-haspopup="dialog" aria-expanded={openFeedback} onClick={event => { event.preventDefault(); event.stopPropagation(); onOpenFeedback(); }}>Submit feedback</button>
            </li>
          </ul>
        </nav>
        <div className="@container/footer col-span-full flex min-w-0 flex-col items-center gap-4 mobile:gap-2.5">
          <svg className="h-auto w-full" viewBox="0 0 1390 263.577" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="America.gov" role="img">
            <path d="M531.113 169.119C524.608 185.522 509.336 216.065 474.834 216.065C438.635 216.065 417.141 184.108 417.141 140.273C417.141 99.2655 441.463 66.4598 478.793 66.4598C510.468 66.4598 531.113 89.9328 530.264 122.173L528.285 123.87H437.503V128.112C437.503 165.442 455.037 193.44 485.581 193.44C505.943 193.44 518.669 180.431 526.588 166.291L531.113 169.119ZM438.352 114.82H503.68C502.266 90.7812 491.802 76.6408 473.137 76.6408C452.492 76.6408 441.463 93.8921 438.352 114.82Z" />
            <path d="M576.927 65.8942L578.624 67.591C578.341 73.53 578.342 82.5798 578.059 91.9125C587.957 78.9033 601.815 66.4598 615.389 66.4598C625.288 66.4598 632.358 72.6815 632.358 82.8626C632.358 90.7812 626.984 98.1342 618.217 98.1342C605.491 98.1342 605.774 87.6703 597.855 87.6703C591.068 87.6703 583.432 95.589 578.059 103.79V188.067C578.059 201.359 583.998 207.298 598.421 207.298V212.671H531.961V207.298C546.667 207.298 552.606 201.359 552.606 188.067V106.053C552.606 95.3061 552.04 88.5188 542.708 88.5188C538.183 88.5188 535.072 89.9328 533.375 90.4984L531.395 85.6907L576.927 65.8942Z" />
            <path d="M671.951 66.177L673.648 67.8738C673.082 77.7721 672.799 99.5483 672.799 116.234V188.067C672.799 201.359 679.021 207.298 693.444 207.298V212.671H626.984V207.298C641.69 207.298 647.347 201.359 647.347 188.067V106.053C647.347 95.3061 646.781 88.5188 637.448 88.5188C633.206 88.5188 630.095 89.9328 628.398 90.4984L626.419 85.6907L671.951 66.177ZM639.145 23.7558C639.145 13.292 647.629 5.65615 657.245 5.65615C667.709 5.65615 675.344 13.5748 675.344 23.7558C675.344 33.3713 667.143 41.8555 657.245 41.8555C647.347 41.8555 639.145 33.3713 639.145 23.7558Z" />
            <path d="M689.485 143.101C689.485 93.6093 722.008 66.4598 755.096 66.4598C784.225 66.4598 801.477 83.1454 801.477 103.508C801.477 110.861 796.669 117.365 787.336 117.365C778.004 117.365 773.196 110.578 773.196 102.376C773.196 98.417 773.479 96.7202 773.479 92.4781C773.479 82.297 766.974 75.5096 752.834 75.5096C725.967 75.5096 711.544 101.528 711.544 130.091C711.544 168.27 729.644 192.592 759.338 192.592C781.68 192.592 793.841 177.32 802.608 161.2L807.133 164.028C799.78 181.845 785.922 216.065 748.309 216.065C715.503 216.065 689.485 189.764 689.485 143.101Z" />
            <path d="M937.507 195.703C933.265 204.753 925.346 216.065 911.206 216.065C897.066 216.065 891.127 206.167 891.127 190.047C878.683 203.621 863.694 216.065 844.463 216.065C823.253 216.065 810.244 200.511 810.244 181.845C810.244 150.736 839.373 139.424 890.561 123.304V114.82C890.561 87.6703 880.946 74.6612 863.694 74.6612C850.12 74.6612 840.787 80.883 840.787 94.4577C840.787 98.6998 841.353 100.679 841.353 104.639C841.353 112.275 836.545 117.365 828.343 117.365C819.294 117.365 815.617 111.143 815.617 104.073C815.617 84.2767 834 66.7426 864.543 66.7426C900.742 66.7426 916.014 84.8423 916.014 117.365V188.067C916.014 195.42 916.014 201.076 922.236 201.076C926.76 201.076 930.72 196.834 933.548 192.875L937.507 195.703ZM890.561 182.128V130.94C856.624 142.818 836.545 150.736 836.545 173.078C836.545 188.35 845.029 196.834 857.755 196.834C869.068 196.834 880.097 190.895 890.561 182.128Z" />
            <path d="M406.041 188.067V113.406C406.041 85.1251 395.294 66.4598 369.276 66.4598C349.479 66.4598 332.511 78.9033 321.764 91.064C317.239 76.0752 306.493 66.4598 288.11 66.4598C269.728 66.4598 253.042 78.3377 243.427 89.9328C243.427 81.1658 243.427 73.2472 243.709 67.591L242.013 65.8942L196.481 85.6907L198.46 90.4984C200.157 89.9328 203.268 88.5188 207.793 88.5188C217.126 88.5188 217.691 95.3061 217.691 106.053V188.067C217.691 195.95 215.605 201.677 210.868 205.035C204.187 209.773 194.713 208.111 189.516 201.783C186.335 197.93 183.295 192.344 179.901 184.391L101.28 0H98.4524L23.1902 182.128C16.12 199.662 9.04984 205.884 0 207.581V212.671H52.0719V207.298C41.8555 207.298 29.6948 199.945 39.5931 176.472L50.6226 149.605H134.086L144.833 175.058C155.297 199.662 140.025 207.298 127.582 207.298V212.671H260.395V207.298C248.234 207.298 243.144 201.359 243.144 188.067V99.8311C250.497 91.3468 263.223 83.9938 274.253 83.9938C292.918 83.9938 299.423 97.5686 299.423 119.345V188.067C299.423 201.359 294.332 207.298 282.171 207.298V212.671H342.409V207.298C330.249 207.298 324.875 201.359 324.875 188.067V113.406C324.875 108.315 324.592 103.79 323.744 99.2655C331.38 91.064 343.258 83.9938 355.136 83.9938C374.084 83.9938 380.588 97.003 380.588 119.345V188.067C380.588 201.359 375.498 207.298 363.054 207.298V212.671H426.403V207.298C411.98 207.298 406.041 201.359 406.041 188.067ZM55.9959 136.879L91.9478 49.4913L128.713 136.879H55.9959Z" />
            <path d="M951.648 197.965C951.648 187.501 960.132 179.866 969.747 179.866C980.211 179.866 987.847 187.784 987.847 197.965C987.847 207.581 979.645 216.065 969.747 216.065C959.849 216.065 951.648 207.581 951.648 197.965Z" />
            <path d="M1091.35 79.7517C1100.12 87.9531 1105.49 99.2655 1105.49 111.992C1105.49 136.879 1089.94 159.503 1056.29 159.503C1049.5 159.503 1042.99 158.372 1037.34 156.393C1028.85 160.069 1023.48 164.594 1023.48 169.119C1023.48 175.623 1031.12 177.32 1044.69 178.734L1080.89 182.128C1105.21 184.391 1123.31 191.178 1123.31 213.52C1123.31 240.669 1087.4 263.577 1045.26 263.577C1016.13 263.577 997.179 251.699 997.179 233.033C997.179 220.024 1007.64 207.015 1025.18 197.4C1014.15 194.006 1007.93 188.35 1007.93 178.734C1007.93 167.705 1016.69 159.786 1029.99 153.282C1015.56 145.646 1006.23 131.506 1006.23 114.82C1006.23 92.1953 1022.07 66.4598 1055.16 66.4598C1067.03 66.4598 1077.78 69.8535 1085.98 75.5096C1095.03 65.0457 1106.06 55.9959 1117.37 55.9959C1126.14 55.9959 1132.08 61.0864 1132.08 69.2879C1132.08 75.5096 1127.55 81.7314 1119.92 81.7314C1109.74 81.7314 1109.45 72.6815 1102.38 72.6815C1098.42 72.6815 1094.18 75.7924 1091.35 79.7517ZM1032.25 199.097C1021.5 207.015 1017.26 214.085 1017.26 222.852C1017.26 238.69 1033.38 245.477 1056.29 245.477C1097.86 245.477 1113.7 230.771 1113.7 220.307C1113.7 208.146 1097.01 206.45 1079.48 204.47L1045.26 201.076C1040.45 200.511 1036.49 199.662 1032.25 199.097ZM1080.32 120.759C1080.32 103.79 1074.1 74.6612 1052.61 74.6612C1038.19 74.6612 1030.83 87.6703 1030.83 105.77C1030.83 122.173 1036.77 151.302 1058.55 151.302C1072.41 151.302 1080.32 138.859 1080.32 120.759Z" />
            <path d="M1125.01 142.252C1125.01 96.7202 1156.97 66.4598 1193.73 66.4598C1235.02 66.4598 1260.19 101.528 1260.19 140.555C1260.19 186.087 1227.95 216.065 1191.19 216.065C1149.9 216.065 1125.01 180.997 1125.01 142.252ZM1231.63 151.302C1231.63 116.234 1218.34 76.358 1188.92 76.358C1166.86 76.358 1153.57 96.1546 1153.29 131.506C1153.01 166.291 1166.58 206.167 1195.99 206.167C1218.34 206.167 1231.63 186.653 1231.63 151.302Z" />
            <path d="M1390 69.8535V74.944C1384.06 76.6409 1376.99 81.4486 1370.77 96.1546L1320.71 216.631H1318.73L1267.83 94.7405C1261.89 80.3173 1258.78 76.6409 1251.71 74.944V69.8535H1313.64V75.2268C1302.05 75.2268 1288.75 80.0345 1298.09 102.659L1327.78 174.492L1357.19 103.508C1366.24 81.7314 1354.93 75.2268 1344.18 75.2268V69.8535H1390Z" />
          </svg>
          <div className={"type-body-m font-body font-normal grid w-full min-w-0 grid-cols-1 items-center gap-8 pt-4 pb-8 @\x35xl/\x66ooter:\x67rid-cols-[\x6dinmax(\x30,\x6dax-content)\x5fauto_minmax(\x30,\x6dax-content)] @\x35xl/\x66ooter:\x6austify-center @\x35xl/\x66ooter:\x67ap-x-12 @\x35xl/\x66ooter:\x67ap-y-6"}>
            <p className={"flex min-w-0 max-w-full flex-col items-center gap-4 text-center leading-normal @\x35xl/\x66ooter:\x66lex-row @\x35xl/\x66ooter:\x74ext-start"}>
              <span className={"size-10 shrink-0 \x62g-current \x6dask-contain \x6dask-center \x6dask-no-repeat \x6dask-[\x75rl(/\x69mages/\x68ome/\x66ooter/\x67sa.\x73vg)]"} aria-hidden="true" />
              <span className={"min-w-0 max-w-80 whitespace-normal @\x35xl/\x66ooter:\x6dax-w-none"}>Powered by U.S.
    <a className={"max-w-full bg-transparent \x64ecoration-[\x6dax(\x31.\x35px,\x30.\x303em)] \x75nderline-offset-[\x6dax(\x34px,\x30.\x312em)] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none inline-block rounded-4"} href="https://gsa.gov" rel="noopener noreferrer" target="_blank">General Services Administration</a></span>
            </p>
            <div className={"flex min-w-0 items-center justify-center gap-4 @\x35xl/\x66ooter:\x67ap-6"}>
              <span className={"h-20.5 w-[30.3px] shrink-0 \x2dscale-x-100 \x62g-current \x6dask-contain \x6dask-center \x6dask-no-repeat"} style={{ maskImage: "url(\"/site-assets/4ac7788a10c93abc-e504a3e19c3adb8d8bedf4e9525515a7.png\")" } as CSSProperties} aria-hidden="true" />
              <p className="max-w-78.5 text-center font-medium">Every federal agency, working together</p>
              <span className={"h-20.5 w-[30.3px] shrink-0 \x62g-current \x6dask-contain \x6dask-center \x6dask-no-repeat"} style={{ maskImage: "url(\"/site-assets/4ac7788a10c93abc-e504a3e19c3adb8d8bedf4e9525515a7.png\")" } as CSSProperties} aria-hidden="true" />
            </div>
            <div className={"mt-4 flex min-w-0 max-w-full flex-wrap items-center justify-center gap-y-2 @\x35xl/\x66ooter:\x63ol-span-full @\x35xl/\x66ooter:\x72ow-start-2 @\x35xl/\x66ooter:\x6dt-6"}>
              <span className="min-w-0 max-w-full">
                <a className={"max-w-full rounded-8 bg-transparent \x64ecoration-[\x6dax(\x31.\x35px,\x30.\x303em)] \x75nderline-offset-[\x6dax(\x34px,\x30.\x312em)] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none inline-block px-2 py-2 text-center @\x35xl/\x66ooter:\x70x-3"} href="/privacy-policy">Privacy policy</a>
              </span>
              <span className="min-w-0 max-w-full">
                <a className={"max-w-full rounded-8 bg-transparent \x64ecoration-[\x6dax(\x31.\x35px,\x30.\x303em)] \x75nderline-offset-[\x6dax(\x34px,\x30.\x312em)] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none inline-block px-2 py-2 text-center @\x35xl/\x66ooter:\x70x-3"} href="/terms">Terms of use</a>
              </span>
              <div className="inline-flex max-w-full items-center">
                <div className="relative inline-block max-w-40 shrink-0">
                  <div>
                    <span role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="bb-customSelect-2RjJb-panel" aria-activedescendant="bb-customSelect-2RjJb-selectedOption" hidden>
                      <span>English</span>
                    </span>
                    <select className={"peer max-w-full field-sizing-content cursor-pointer appearance-none truncate rounded-8 \x62order \x62order-transparent bg-transparent \x64ecoration-[\x6dax(\x31.\x35px,\x30.\x303em)] \x75nderline-offset-[\x6dax(\x34px,\x30.\x312em)] \x6futline-none select-none \x68over:\x75nderline \x66ocus-visible:\x75nderline type-body-m font-body font-normal min-h-11 pe-8 ps-3 text-inherit \x64isabled:\x70ointer-events-none disabled:opacity-50 \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none"} aria-label="Language" defaultValue="en">
                      <option className={"\x62g-[\x43anvas] \x74ext-[\x43anvasText]"} value="en" lang="en">English</option>
                      <option className={"\x62g-[\x43anvas] \x74ext-[\x43anvasText]"} value="fr" lang="fr">Français</option>
                      <option className={"\x62g-[\x43anvas] \x74ext-[\x43anvasText]"} value="es" lang="es">Español</option>
                    </select>
                    <div id="bb-customSelect-2RjJb-panel" role="listbox" hidden>
                      <div role="option" id="bb-customSelect-2RjJb-selectedOption">English</div>
                      <div role="option">Français</div>
                      <div role="option">Español</div>
                    </div>
                  </div>
                  <svg className={"pointer-events-none absolute \x65nd-2.\x35 top-1/2 \x2dtranslate-y-1/\x32 text-inherit \x70eer-open:\x72otate-180"} fill="none" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 12.23L4.71 6.94L3.29 8.35L10 15.06L16.71 8.35L15.29 6.94L10 12.23Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
            <p className={"min-w-0 max-w-80 justify-self-center text-center leading-normal @\x35xl/\x66ooter:\x63ol-start-3 @\x35xl/\x66ooter:\x72ow-start-1 @\x35xl/\x66ooter:\x6dax-w-none @\x35xl/\x66ooter:\x6austify-self-end @\x35xl/\x66ooter:\x74ext-end"}>Designed &amp; Engineered in D.C. <span>by <a className={"max-w-full bg-transparent \x64ecoration-[\x6dax(\x31.\x35px,\x30.\x303em)] \x75nderline-offset-[\x6dax(\x34px,\x30.\x312em)] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none inline-block rounded-4"} href="https://ndstudio.gov" rel="noopener noreferrer" target="_blank">National Design Studio</a></span></p>
          </div>
          <p className={"type-site-notice text-center text-text-tertiary \x65mpty:\x68idden"} role="status" aria-live="polite" />
        </div>
      </div>
    </footer>
  );
}

function ImportedNavMenu({ openFeedback, onOpenFeedback }: { openFeedback: boolean; onOpenFeedback: () => void }) {
  return (
    <nav className="flex flex-col gap-12" aria-label="Menu">
      <ul className="flex flex-col items-center gap-1">
        <li className="max-w-full" style={{ opacity: "1", transform: "none" }}>
          <a className={"block rounded-8 text-center text-inherit decoration-from-font [text-underline-position:from-font] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none font-sans-display text-[clamp(1.5rem,4.5dvh,2rem)] leading-[1.25] font-medium tracking-(--tracking-body) \x6dobile:\x74ext-[\x32rem] underline site-home-link"} aria-current="page" href="/" tabIndex={0}>Home</a>
        </li>
        <li className="max-w-full" style={{ opacity: "1", transform: "none" }}>
          <a className={"block rounded-8 text-center text-inherit decoration-from-font [text-underline-position:from-font] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none font-sans-display text-[clamp(1.5rem,4.5dvh,2rem)] leading-[1.25] font-medium tracking-(--tracking-body) \x6dobile:\x74ext-[\x32rem]"} href="/how-it-works" tabIndex={0}>How it works</a>
        </li>
        <li className="max-w-full" style={{ opacity: "1", transform: "none" }}>
          <a className={"block rounded-8 text-center text-inherit decoration-from-font [text-underline-position:from-font] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none font-sans-display text-[clamp(1.5rem,4.5dvh,2rem)] leading-[1.25] font-medium tracking-(--tracking-body) \x6dobile:\x74ext-[\x32rem]"} href="/privacy" tabIndex={0}>Privacy</a>
        </li>
        <li className="max-w-full" style={{ opacity: "1", transform: "none" }}>
          <a className={"block rounded-8 text-center text-inherit decoration-from-font [text-underline-position:from-font] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none font-sans-display text-[clamp(1.5rem,4.5dvh,2rem)] leading-[1.25] font-medium tracking-(--tracking-body) \x6dobile:\x74ext-[\x32rem]"} href="/about" tabIndex={0}>About</a>
        </li>
        <li className="max-w-full" style={{ opacity: "1", transform: "none" }}>
          <a className={"block rounded-8 text-center text-inherit decoration-from-font [text-underline-position:from-font] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none font-sans-display text-[clamp(1.5rem,4.5dvh,2rem)] leading-[1.25] font-medium tracking-(--tracking-body) \x6dobile:\x74ext-[\x32rem]"} href="/coming-soon" tabIndex={0}>Coming soon</a>
        </li>
        <li className="max-w-full" style={{ opacity: "1" }} data-site-import-responsive="1287">
          <a className={"block rounded-8 text-center text-inherit decoration-from-font [text-underline-position:from-font] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none font-sans-display text-[clamp(1.5rem,4.5dvh,2rem)] leading-[1.25] font-medium tracking-(--tracking-body) \x6dobile:\x74ext-[\x32rem]"} href="/releases" tabIndex={0}>Releases</a>
        </li>
        <li className="max-w-full" style={{ opacity: "1" }} data-site-import-responsive="1289">
          <a className={"block rounded-8 text-center text-inherit decoration-from-font [text-underline-position:from-font] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none font-sans-display text-[clamp(1.5rem,4.5dvh,2rem)] leading-[1.25] font-medium tracking-(--tracking-body) \x6dobile:\x74ext-[\x32rem]"} href="/faq" tabIndex={0}>FAQ</a>
        </li>
        <li className="max-w-full" style={{ opacity: "1" }} data-site-import-responsive="1291">
          <button className={"shrink-0 cursor-pointer items-center justify-center gap-2 duration-200 ease-out-quint \x61ctive:\x73cale-press \x64isabled:\x70ointer-events-none [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 type-body-m bg-transparent focus-visible:bg-background-tertiary \x64isabled:\x62g-transparent disabled:text-text-disabled h-auto min-h-0 max-w-full whitespace-normal p-0 transition-none \x68over:\x62g-transparent \x61ctive:\x73cale-100 active:text-inherit block rounded-8 text-center text-inherit decoration-from-font [text-underline-position:from-font] \x68over:\x75nderline \x66ocus-visible:\x75nderline \x66ocus-visible:\x73hadow-[\x30_0_0_2px_#\x66ff,\x30_0_0_4px_var(\x2d-color-black-100)] \x66ocus-visible:\x6futline-none font-sans-display text-[clamp(1.5rem,4.5dvh,2rem)] leading-[1.25] font-medium tracking-(--tracking-body) \x6dobile:\x74ext-[\x32rem]"} type="button" tabIndex={0} aria-haspopup="dialog" aria-expanded={openFeedback} onClick={event => { event.preventDefault(); event.stopPropagation(); onOpenFeedback(); }}>
            <span className={"font-sans-display text-[clamp(1.5rem,4.5dvh,2rem)] leading-[1.25] font-medium tracking-(--tracking-body) \x6dobile:\x74ext-[\x32rem]"}>Submit feedback</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}


function useImportedLayout() {
  useEffect(() => {
    const scrollingAreas = Array.from(document.querySelectorAll<HTMLElement>("[data-site-import-scroll-root]"));
    const scrollTop = () =>
      scrollingAreas.find(
        (node) =>
          node.clientHeight > 0 &&
          node.scrollHeight > node.clientHeight &&
          /^(auto|scroll)$/.test(getComputedStyle(node).overflowY),
      )?.scrollTop ?? window.scrollY;
    const scrollHeaders = Array.from(document.querySelectorAll<HTMLElement>("[data-site-import-scroll-header]"))
      .slice(0, 128)
      .flatMap((node) => {
        try {
          const states = JSON.parse(node.dataset["siteImportScrollHeader"] || "{}");
          if (!states || typeof states !== "object") return [];
          for (const key of ["desktop", "mobile"]) {
            const state = states[key];
            if (
              !state ||
              !Array.isArray(state.added) ||
              !Array.isArray(state.removed) ||
              state.added.length + state.removed.length > 32
            )
              delete states[key];
          }
          return [
            {
              node,
              states,
              original: new Set(node.classList),
              originalFill: node.getAttribute("fill"),
              transform: node.style.getPropertyValue("transform"),
              priority: node.style.getPropertyPriority("transform"),
            },
          ];
        } catch {
          return [];
        }
      });
    function syncScrollHeaders(reset = false) {
      for (const { node, states, original, originalFill, transform, priority } of scrollHeaders) {
        if (!reset && node.getAttribute("data-import-menu-open") === "true") continue;
        const state = states[innerWidth < 768 ? "mobile" : "desktop"];
        if ([states.desktop, states.mobile].some((entry) => entry && Object.hasOwn(entry, "fill"))) {
          if (originalFill === null) node.removeAttribute("fill");
          else node.setAttribute("fill", originalFill);
        }
        if (states.desktop?.transform || states.mobile?.transform) {
          if (transform) node.style.setProperty("transform", transform, priority);
          else node.style.removeProperty("transform");
        }
        for (const value of [states.desktop, states.mobile].filter(Boolean) as {
          added: string[];
          removed: string[];
        }[]) {
          for (const token of [...(value.added || []), ...(value.removed || [])]) {
            if (typeof token !== "string" || !token || /\s/.test(token)) continue;
            node.classList.toggle(token, original.has(token));
          }
        }
        if (reset || !state || !Number.isFinite(state.threshold) || scrollTop() < state.threshold) continue;
        let until = state.until;
        if (
          typeof state.untilAnchor === "string" &&
          /^\d$/.test(state.untilAnchor) &&
          Number.isFinite(state.untilProgress) &&
          Math.abs(state.untilProgress) <= 2
        ) {
          const anchor = document.querySelector<HTMLElement>(
            '[data-site-import-header-end="' + state.untilAnchor + '"]',
          );
          if (anchor) until = anchor.getBoundingClientRect().top + scrollTop() + innerHeight * state.untilProgress;
        }
        if (Number.isFinite(until) && scrollTop() >= until) continue;
        if (state.fill === null) node.removeAttribute("fill");
        else if (typeof state.fill === "string" && state.fill.length <= 256 && !/url\(/i.test(state.fill))
          node.setAttribute("fill", state.fill);
        if (
          typeof state.transform === "string" &&
          state.transform.length <= 128 &&
          CSS.supports("transform", state.transform)
        )
          node.style.setProperty("transform", state.transform, "important");
        for (const token of state.added || [])
          if (typeof token === "string" && token && !/\s/.test(token)) node.classList.add(token);
        for (const token of state.removed || [])
          if (typeof token === "string" && token && !/\s/.test(token)) node.classList.remove(token);
      }
    }
    const handleScroll = () => {
      syncScrollHeaders();
    };
    function resizeSummaries() {
      syncScrollHeaders();
    }
    document.addEventListener("load", handleScroll, true);
    resizeSummaries();
    const parallaxFrame = requestAnimationFrame(handleScroll);
    window.addEventListener("resize", resizeSummaries);
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    return () => {
      cancelAnimationFrame(parallaxFrame);
      syncScrollHeaders(true);
      document.removeEventListener("load", handleScroll, true);
      window.removeEventListener("resize", resizeSummaries);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, []);
}
