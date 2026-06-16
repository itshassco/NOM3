import { useCallback, useEffect, useRef, useState } from 'react';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from 'lucide-react';
import logo from './assets/logo-placeholder.svg';
import googleLogo from './assets/google-logo.svg';
import heroBg from './assets/bg.png';

gsap.registerPlugin(ScrollTrigger);

const heroImage =
  'https://static.wixstatic.com/media/390c3b_bcbe409e9bf849edabeb2d3962c47d7d~mv2.avif/v1/fill/w_2007,h_872,al_c,q_85,enc_avif,quality_auto/390c3b_bcbe409e9bf849edabeb2d3962c47d7d~mv2.avif';

const principalImage =
  'https://static.wixstatic.com/media/390c3b_dc915c3093e74f8b9353773cfe4758df~mv2.png/v1/fill/w_870,h_1492,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/390c3b_dc915c3093e74f8b9353773cfe4758df~mv2.png';

const practiceImage =
  'https://static.wixstatic.com/media/390c3b_81305b80e7504a269f75869fa7c31c65~mv2.png/v1/fill/w_870,h_1194,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/390c3b_81305b80e7504a269f75869fa7c31c65~mv2.png';

const serviceImages = [
  'https://static.wixstatic.com/media/390c3b_46b04a8e37144129b7eefeef4768ff34~mv2.png/v1/crop/x_119,y_0,w_1996,h_1996/fill/w_171,h_169,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Tooth%20Exam_edited.png',
  'https://static.wixstatic.com/media/11062b_bb953b3d82e94611a73805d6459ee1fc~mv2.jpg/v1/crop/x_833,y_0,w_3333,h_3333/fill/w_180,h_180,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Dental%20Cleaning.jpg',
  'https://static.wixstatic.com/media/390c3b_f607a40edb914bebb18d03105c7c0614~mv2.jpg/v1/crop/x_0,y_1,w_1366,h_1366/fill/w_180,h_180,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Invisalign%20Consultation_edited.jpg',
  'https://static.wixstatic.com/media/390c3b_d1ccf112890e4bf29459daf47870440c~mv2.png/v1/fill/w_180,h_180,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cerec.png',
];

const proof = [
  ['Over 35 years', 'Caring for the Ealing community'],
  ['190+ 5-star reviews', 'Excellent care and patient satisfaction'],
  ['Two generations', 'Family owned and run by dentists'],
];

const steps = [
  ['1', 'Book your checkup', 'New patient checkup with Dr Rish: £49 including routine x-rays*.'],
  ['2', 'Understand your care', 'Every treatment is explained carefully with advice freely given on further care.'],
  ['3', 'Choose your treatment', 'Routine care, cosmetic dentistry, Invisalign, implants and more in one practice.'],
  ['4', 'Keep smiling', 'Customised treatment plans shaped around your needs, goals and oral health.'],
];

const inclusions = [
  ['Routine Dental Care', 'Checkups, routine treatment and continuing oral health care.'],
  ['Composite Bonding', 'Cosmetic smile improvements.'],
  ['Hygienist', 'Airflow add-ons and direct access hygienist appointments.'],
  ['Dental Implants', 'Implant treatment for missing teeth.'],
  ['Whitening', 'Professional teeth whitening.'],
  ['CEREC Same-Day Crowns', 'Same-day crown technology in practice.'],
  ['Specialist Root Canal Treatment', 'Specialist root canal care.'],
  ['Invisalign', 'Clear aligners with 3D Invisalign scanning.'],
];

const offers = [
  'New patient checkup with Dr Rish: £49 including routine x-rays*',
  'Invisalign from £2,750 including whitening and retainers, usually £4,750',
  'Airflow hygienist add-on: £19 registered patient, £29 direct access',
];

const reviews = [
  ['Ray Watkin', 'Have been with Mr Patel’s practice for 25 years now and have always had brilliant service.'],
  ['Google Reviews', 'Excellent care and patient satisfaction reflected in 190+ 5-star Google reviews.'],
  ['Pitshanger Dental', 'Generations of dentists caring for generations of smiles.'],
];

const socialLinks = {
  instagram: 'https://www.instagram.com/pitshangerdental/',
  facebook: 'https://www.facebook.com/pitshangerdentalcare',
};

const hours = [
  ['Mon', '9.00 am - 5.30 pm'],
  ['Tue', '8.30 am - 5.00 pm'],
  ['Wed', '9.00 am - 5.30 pm'],
  ['Thur', '9.00 am - 5.00 pm'],
  ['Fri', '8.30 am - 5.00 pm'],
];

const Shell = styled.div`
  min-height: 100vh;
  overflow-x: clip;
  padding-bottom: 72px;
  background: #f5f4fa;
  color: #050505;
`;

const Hero = styled.section`
  position: relative;
  min-height: calc(100svh - 16px);
  margin: 8px;
  overflow: hidden;
  border-radius: 8px;
  background: url(${heroBg}) center / cover;
  color: #070713;
`;

const Section = styled.section`
  padding: clamp(5rem, 11vw, 9rem) 0;
`;

const globalMotion = css`
  .reveal {
    opacity: 0;
    transform: translateY(34px);
  }

  .display-xl {
    font-size: clamp(42px, 5vw, 58px);
    line-height: 0.95;
    letter-spacing: 0;
  }

  .display-lg {
    font-size: clamp(36px, 4.4vw, 58px);
    line-height: 0.96;
    letter-spacing: 0;
  }

  .offer-ticker {
    animation: offer-marquee 22s linear infinite;
  }

  @keyframes offer-marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
`;

function useMotion(rootRef) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.hero-enter', { y: 22 }, { y: 0, duration: 0.85, stagger: 0.07 })
        .fromTo('.metric-enter', { y: 18 }, { y: 0, duration: 0.65, stagger: 0.06 }, '-=0.35');

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 84%',
          },
        });
      });

      gsap.to('.parallax-img', {
        yPercent: -7,
        ease: 'none',
        scrollTrigger: {
          trigger: '.photo-stack',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [rootRef]);
}

function InstagramIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 1-2.881 0 1.44 1.44 0 0 1 2.881 0z" />
    </svg>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.023 4.388 11.015 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.088 24 18.096 24 12.073z" />
    </svg>
  );
}

function App() {
  const rootRef = useRef(null);
  const [assistantMounted, setAssistantMounted] = useState(false);
  const [assistantAnimating, setAssistantAnimating] = useState(null);
  const assistantCloseTimer = useRef(null);
  const [offerVisible, setOfferVisible] = useState(true);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  useMotion(rootRef);

  const closeAssistant = useCallback(() => {
    if (!assistantMounted) return;

    setAssistantAnimating('closing');

    if (assistantCloseTimer.current) {
      clearTimeout(assistantCloseTimer.current);
    }

    const closeMs =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dropdown-close-dur')) || 150;

    assistantCloseTimer.current = window.setTimeout(() => {
      setAssistantMounted(false);
      setAssistantAnimating(null);
      assistantCloseTimer.current = null;
    }, closeMs);
  }, [assistantMounted]);

  const openAssistant = useCallback(() => {
    if (assistantCloseTimer.current) {
      clearTimeout(assistantCloseTimer.current);
      assistantCloseTimer.current = null;
    }

    setAssistantMounted(true);
    setAssistantAnimating(null);
  }, []);

  const toggleAssistant = useCallback(() => {
    if (assistantMounted && assistantAnimating !== 'closing') {
      closeAssistant();
      return;
    }

    if (!assistantMounted) {
      openAssistant();
    }
  }, [assistantAnimating, assistantMounted, closeAssistant, openAssistant]);

  useEffect(() => {
    if (!assistantMounted || assistantAnimating !== null) return undefined;

    const frame = requestAnimationFrame(() => setAssistantAnimating('open'));
    return () => cancelAnimationFrame(frame);
  }, [assistantAnimating, assistantMounted]);

  useEffect(() => {
    return () => {
      if (assistantCloseTimer.current) {
        clearTimeout(assistantCloseTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 36);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  const activeReview = reviews[reviewIndex];
  const previousReview = () => setReviewIndex((index) => (index === 0 ? reviews.length - 1 : index - 1));
  const nextReview = () => setReviewIndex((index) => (index + 1) % reviews.length);

  return (
    <Shell ref={rootRef}>
      <Global styles={globalMotion} />

      <Hero className="hero-root">
        <header
          className={`t-nav-shell fixed inset-x-0 z-50 ${isScrolled ? 'top-0' : 'top-6'}`}
        >
          <nav
            className={`t-nav-surface mx-auto flex h-[64px] items-center justify-between bg-white text-sm text-ink/62 shadow-[0_12px_45px_rgba(29,39,110,0.12)] ring-1 ring-navy/10 ${
              isScrolled
                ? 'w-full rounded-none px-5 md:px-8'
                : 'w-[min(82rem,calc(100%-1rem))] rounded-[2rem] px-4'
            }`}
          >
            <div className="flex min-w-0 items-center gap-8">
              <a href="#top" className="t-nav-brand flex shrink-0 items-center gap-2" aria-label="Pitshanger Dental home">
                <img src={logo} alt="Pitshanger Dental logo placeholder" className="size-9 rounded-[8px] bg-white" />
                <span className="hidden text-base font-semibold text-navy sm:inline">Pitshanger Dental</span>
              </a>
              <div className="hidden gap-7 lg:flex">
                <a className="t-nav-link" href="#care">About Us</a>
                <a className="t-nav-link" href="#visit">Contact Us</a>
                <a className="t-nav-link" href="#offers">Fee Guide</a>
                <a className="t-nav-link" href="#services">Treatments</a>
                <a className="t-nav-link" href="#services">Invisalign</a>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <a className="t-nav-phone hidden items-center gap-2 px-2 text-ink/60 md:inline-flex" href="tel:02089973012">
                <Phone size={15} />
                020 8997 3012
              </a>
              <a className="t-nav-cta rounded-full bg-navy px-5 py-3 font-medium text-white" href="#visit">
                Join Private or NHS
              </a>
              <button className="t-nav-menu grid size-10 place-items-center rounded-full bg-mist text-navy" aria-label="Open menu">
                <Menu size={18} />
              </button>
            </div>
          </nav>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-16px)] w-[min(82rem,calc(100%-2rem))] flex-col justify-end pb-28 pt-28 md:pb-14">
          <div className="max-w-[38rem]">
              <div className="hero-enter mb-5 inline-flex items-center gap-2 rounded-full bg-white/82 px-4 py-2 text-sm text-navy shadow-[0_10px_30px_rgba(29,39,110,0.12)]">
                <Check size={16} />
                Family owned and run for over 35 years
              </div>
              <h1 className="hero-enter display-xl max-w-[36rem] font-semibold text-ink">
                Your Ealing dentist for every smile
              </h1>
              <p className="hero-enter mt-5 max-w-[31rem] text-[clamp(1rem,1.5vw,1.18rem)] leading-7 text-ink/68">
                Cosmetic, general dentistry, Invisalign and implants. Generations of dentists caring for generations of smiles.
              </p>
              <div className="hero-enter mt-8 flex flex-wrap gap-3">
                <a className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-4 font-medium text-white transition hover:bg-iris" href="#visit">
                  Get in touch <ArrowRight size={17} />
                </a>
                <a className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 font-medium text-ink shadow-[0_10px_30px_rgba(29,39,110,0.1)] transition hover:bg-peach" href="#services">
                  See treatments
                </a>
              </div>
          </div>

          <div className="mt-12 grid max-w-3xl gap-px overflow-hidden rounded-[8px] bg-navy/10 text-ink md:grid-cols-3">
            {proof.map(([title, body]) => (
              <div className="metric-enter bg-white/82 px-5 py-4" key={title}>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-ink/58">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Hero>

      <main>
        <Section id="care" className="bg-white">
          <div className="mx-auto w-[min(82rem,calc(100%-2rem))]">
            <div className="reveal grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
              <div>
                <p className="text-sm font-medium text-ink/48">How it works</p>
              <h2 className="display-lg mt-3 max-w-[42rem] font-semibold text-ink">
                It starts with a checkup, then so much more.
              </h2>
              </div>
              <p className="max-w-[34rem] text-lg leading-8 text-ink/62">
                A comfortable route from first appointment to personalised care, using modern technology and treatment plans shaped around your goals.
              </p>
            </div>

            <div className="mt-12 grid gap-3 lg:grid-cols-4">
              {steps.map(([number, title, body], index) => (
                <article className="reveal overflow-hidden rounded-[8px] bg-[#f2f2f2]" key={title}>
                  <div className="relative h-56 bg-ink">
                    <img src={serviceImages[index]} alt="" className="h-full w-full object-cover opacity-80" />
                    <span className="absolute left-4 top-4 grid size-9 place-items-center rounded-full bg-white text-sm font-semibold text-ink">
                      {number}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-ink/58">{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section id="services" className="bg-[#f5f5f5]">
          <div className="mx-auto w-[min(82rem,calc(100%-2rem))]">
            <div className="reveal max-w-[55rem]">
              <p className="text-sm font-medium text-ink/48">Your care includes</p>
              <h2 className="display-lg mt-3 font-semibold text-ink">
                Cosmetic, general dentistry, Invisalign and implants.
              </h2>
            </div>

            <div className="mt-12 grid overflow-hidden rounded-[8px] bg-ink/10 md:grid-cols-2 lg:grid-cols-4">
              {inclusions.map(([title, body]) => (
                <article className="reveal min-h-[14rem] border-b border-r border-ink/10 bg-white p-6" key={title}>
                  <Star size={18} className="text-iris" />
                  <h3 className="mt-10 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/58">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section id="offers" className="bg-ink text-white">
          <div className="mx-auto w-[min(82rem,calc(100%-2rem))]">
            <div className="reveal">
              <p className="text-sm font-medium text-white/48">Current offers</p>
              <h2 className="display-lg mt-3 max-w-[44rem] font-semibold">
                What could make starting easier.
              </h2>
            </div>

            <div className="mt-12 grid gap-3 lg:grid-cols-3">
              {offers.map((offer, index) => (
                <article className="reveal rounded-[8px] bg-white p-6 text-ink" key={offer}>
                  <p className="text-sm text-ink/42">0{index + 1}</p>
                  <p className="mt-20 text-2xl font-semibold leading-tight">{offer}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section className="photo-stack bg-white">
          <div className="mx-auto grid w-[min(82rem,calc(100%-2rem))] gap-4 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
            <div className="reveal overflow-hidden rounded-[8px] bg-ink">
              <img src={practiceImage} alt="Pitshanger Dental practice" className="parallax-img h-full min-h-[36rem] w-full object-cover" />
            </div>
            <div className="reveal rounded-[8px] bg-[#f5f5f5] p-8 md:p-12">
              <p className="text-sm font-medium text-ink/48">About Pitshanger</p>
              <h2 className="display-lg mt-4 font-semibold">
                Why you’re in great hands.
              </h2>
              <div className="mt-10 grid gap-px overflow-hidden rounded-[8px] bg-ink/10">
                {[
                  'Caring for the community for over 35 years',
                  'Excellent care and patient satisfaction with 190+ 5-star Google reviews',
                  'Latest technology including 3D Invisalign scanning and CEREC same-day crowns',
                  'Free on-street parking',
                ].map((item) => (
                  <div className="flex items-start gap-3 bg-white p-5" key={item}>
                    <Check className="mt-1 shrink-0 text-iris" size={18} />
                    <p className="font-medium leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section className="bg-[#f5f5f5]">
          <div className="mx-auto grid w-[min(82rem,calc(100%-2rem))] gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
            <div className="reveal">
              <p className="text-sm font-medium text-ink/48">A word from the principal</p>
              <h2 className="display-lg mt-3 font-semibold">
                Your smile is our number one priority.
              </h2>
              <p className="mt-6 max-w-[38rem] text-lg leading-8 text-ink/62">
                Since opening over 35 years ago, Pitshanger Dental has become one of Ealing’s longest established and trusted dentists. The team provides care in a comfortable, relaxed environment with dentistry as its sole focus.
              </p>
            </div>
            <div className="reveal overflow-hidden rounded-[8px] bg-lavender">
              <img src={principalImage} alt="Pitshanger Dental principal" className="h-[42rem] w-full object-cover object-top" />
            </div>
          </div>
        </Section>

        <Section id="reviews" className="bg-white">
          <div className="mx-auto w-[min(82rem,calc(100%-2rem))]">
            <div className="reveal grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="flex items-center gap-2.5">
                  <img src={googleLogo} alt="" className="size-5 shrink-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-ink/48">190+ 5★ Google reviews</p>
                </div>
                <h2 className="display-lg mt-3 font-semibold">
                  Trusted by patients across Ealing.
                </h2>
              </div>
              <div className="rounded-[8px] bg-[#f5f5f5] p-4">
                <blockquote className="min-h-[20rem] rounded-[8px] bg-white p-8 text-[clamp(1.55rem,2.6vw,2.6rem)] font-semibold leading-tight">
                  “{activeReview[1]}”
                  <footer className="mt-8 flex items-center justify-between gap-4 text-base font-medium text-ink/48">
                    <span>{activeReview[0]}</span>
                    <span>{reviewIndex + 1} / {reviews.length}</span>
                  </footer>
                </blockquote>
                <div className="mt-3 flex justify-end gap-2">
                  <button
                    className="grid size-11 place-items-center rounded-full bg-ink text-white transition hover:bg-navy"
                    onClick={previousReview}
                    aria-label="Previous review"
                    type="button"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    className="grid size-11 place-items-center rounded-full bg-ink text-white transition hover:bg-navy"
                    onClick={nextReview}
                    aria-label="Next review"
                    type="button"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="gallery" className="bg-[#f5f5f5]">
          <div className="mx-auto w-[min(82rem,calc(100%-2rem))]">
            <div className="reveal grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <div>
                <p className="text-sm font-medium text-ink/48">Practice Gallery + Smile Gallery</p>
                <h2 className="display-lg mt-3 font-semibold">A closer look at the practice.</h2>
              </div>
              <p className="max-w-[34rem] text-lg leading-8 text-ink/62">
                The original site includes a practice gallery and smile gallery. These previews keep that section in the landing page structure ready for the final imagery.
              </p>
            </div>
            <div className="mt-12 grid gap-3 md:grid-cols-3">
              <img src={practiceImage} alt="Pitshanger Dental practice gallery preview" className="reveal h-80 w-full rounded-[8px] object-cover" />
              <img src={principalImage} alt="Pitshanger Dental team gallery preview" className="reveal h-80 w-full rounded-[8px] object-cover object-top" />
              <img src={serviceImages[2]} alt="Pitshanger Dental smile gallery preview" className="reveal h-80 w-full rounded-[8px] object-cover" />
            </div>
          </div>
        </Section>

        <Section id="faqs" className="bg-white">
          <div className="mx-auto w-[min(82rem,calc(100%-2rem))]">
            <div className="reveal max-w-[40rem]">
              <p className="text-sm font-medium text-ink/48">More from Pitshanger Dental</p>
              <h2 className="display-lg mt-3 font-semibold">Everything from the original site stays reachable.</h2>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-[8px] bg-ink/10 md:grid-cols-2">
              {[
                ['The Team', 'Meet the Pitshanger Dental team.'],
                ['Fee Guide', 'View fees for routine and specialist treatment.'],
                ['Invisalign Ealing', 'Learn more about clear aligner treatment.'],
                ['Referral', 'Referral information from the original site.'],
                ['Blog', 'Articles and practice updates.'],
                ['Policies', 'GDPR, privacy and complaints policy links.'],
              ].map(([title, body]) => (
                <article className="reveal bg-[#f5f5f5] p-6" key={title}>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/58">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section className="bg-[#f5f5f5]">
          <div className="mx-auto w-[min(82rem,calc(100%-2rem))]">
            <div className="reveal">
              <p className="text-sm font-medium text-ink/48">Accreditations and treatment partners</p>
              <h2 className="display-lg mt-3 max-w-[42rem] font-semibold">BDA, Invisalign, whitening and CEREC.</h2>
            </div>
            <div className="mt-10 grid gap-3 md:grid-cols-4">
              {['BDA', 'Invisalign', 'Teeth Whitening', 'CEREC Same-Day Crowns'].map((item) => (
                <div className="reveal rounded-[8px] bg-white p-8 text-center text-lg font-semibold" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="visit" className="bg-ink pb-36 text-white">
          <div className="mx-auto grid w-[min(82rem,calc(100%-2rem))] gap-4 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="reveal rounded-[8px] bg-white p-8 text-ink md:p-10">
              <p className="text-sm font-medium text-ink/48">Book an initial consultation today</p>
              <h2 className="display-lg mt-4 font-semibold">
                We’re ready to welcome you.
              </h2>
              <div className="mt-10 grid gap-3">
                <a className="flex items-center gap-3 rounded-[8px] bg-[#f5f5f5] p-4 font-medium" href="tel:02089973012">
                  <Phone size={18} /> 020 8997 3012
                </a>
                <a className="flex items-center gap-3 rounded-[8px] bg-[#f5f5f5] p-4 font-medium" href="mailto:pitshangerdental@gmail.com">
                  <Mail size={18} /> pitshangerdental@gmail.com
                </a>
                <div className="flex items-center gap-3 rounded-[8px] bg-[#f5f5f5] p-4 font-medium">
                  <MapPin size={18} /> 50 Pitshanger Lane, Ealing, London, W5 1QY
                </div>
              </div>
            </div>
            <div className="reveal rounded-[8px] bg-white/8 p-8 md:p-10">
              <div className="mb-6 flex items-center gap-3">
                <Clock3 />
                <h3 className="text-2xl font-semibold">Opening hours</h3>
              </div>
              <div className="divide-y divide-white/12">
                {hours.map(([day, time]) => (
                  <div className="flex justify-between py-4" key={day}>
                    <span className="font-semibold">{day}</span>
                    <span className="text-white/62">{time}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-white/48">Closed for lunch, 1pm - 2pm.</p>
            </div>
          </div>
        </Section>
      </main>

      <footer className="bg-ink px-4 pb-28 pt-10 text-white">
        <div className="mx-auto flex w-[min(82rem,100%)] flex-col gap-6 border-t border-white/12 pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-semibold">Pitshanger Dental</p>
            <p className="mt-2 text-sm text-white/48">Dentist in Ealing, West London. Site last updated April 2026.</p>
            <div className="mt-4 flex items-center gap-2">
              <a
                className="t-footer-social grid size-10 place-items-center rounded-full bg-white/8 text-white/72"
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pitshanger Dental on Instagram"
              >
                <InstagramIcon className="size-[18px]" />
              </a>
              <a
                className="t-footer-social grid size-10 place-items-center rounded-full bg-white/8 text-white/72"
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pitshanger Dental on Facebook"
              >
                <FacebookIcon className="size-[18px]" />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-white/58">
            <span>Sitemap</span>
            <span>GDPR + Privacy Policy</span>
            <span>Complaints Policy</span>
            <span>GDC</span>
            <span>CQC</span>
          </div>
        </div>
      </footer>

      {assistantMounted && (
        <aside
          className={`t-dropdown fixed bottom-[154px] right-4 z-50 w-[min(23rem,calc(100vw-2rem))] overflow-hidden rounded-xl bg-white text-ink shadow-[0_20px_70px_rgba(29,39,110,0.2)] ${assistantAnimating === 'open' ? 'is-open' : ''} ${assistantAnimating === 'closing' ? 'is-closing' : ''}`}
          data-origin="bottom-right"
        >
          <div className="flex items-start justify-between gap-3 bg-navy px-5 py-4 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/12">
                <img src={logo} alt="" className="size-6 brightness-0 invert" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">Register at Pitshanger Dental</p>
                <p className="mt-1 text-sm font-normal text-white/62">Private and NHS enquiries welcome</p>
              </div>
            </div>
            <button className="t-assistant-close grid size-7 shrink-0 place-items-center rounded-full bg-white/10" onClick={closeAssistant} type="button" aria-label="Close registration assistant">
              <X size={14} />
            </button>
          </div>

          <div className="space-y-5 px-5 pb-5 pt-4 text-sm font-normal">
            <p className="text-ink/62">
              Start with a quick enquiry and the team can help you join the practice, book a checkup, or ask about Invisalign and private care.
            </p>

            <div className="space-y-3">
              <p className="font-medium text-ink/42">Get in touch</p>
              <div className="space-y-2">
                <a className="t-assistant-card group flex items-center gap-3 rounded-lg bg-mist p-3" href="tel:02089973012">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-navy">
                    <Phone size={15} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-navy">Call the practice</span>
                    <span className="mt-1 block font-normal text-ink/52">020 8997 3012</span>
                  </span>
                  <ArrowRight size={14} className="t-assistant-card-arrow shrink-0 text-ink/32" />
                </a>
                <a className="t-assistant-card group flex items-center gap-3 rounded-lg bg-mist p-3" href="mailto:pitshangerdental@gmail.com">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-navy">
                    <Mail size={15} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-navy">Email the team</span>
                    <span className="mt-1 block truncate font-normal text-ink/52">pitshangerdental@gmail.com</span>
                  </span>
                  <ArrowRight size={14} className="t-assistant-card-arrow shrink-0 text-ink/32" />
                </a>
              </div>
            </div>

            <a className="t-assistant-action-primary group flex items-center gap-3 rounded-lg bg-peach p-3 text-ink" href="#visit">
              <span className="min-w-0 flex-1">
                <span className="block font-medium">View registration details</span>
                <span className="mt-1 block font-normal text-ink/58">Private and NHS patient information</span>
              </span>
              <ArrowRight size={14} className="t-assistant-card-arrow shrink-0 text-ink/32" />
            </a>

            <div className="space-y-3">
              <p className="font-medium text-ink/42">Connect online</p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  className="t-assistant-card t-assistant-card-social flex items-center gap-2.5 rounded-lg bg-mist p-3"
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pitshanger Dental on Instagram"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-navy">
                    <InstagramIcon className="size-3.5" />
                  </span>
                  <span className="font-medium text-navy">Instagram</span>
                </a>
                <a
                  className="t-assistant-card t-assistant-card-social flex items-center gap-2.5 rounded-lg bg-mist p-3"
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pitshanger Dental on Facebook"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-navy">
                    <FacebookIcon className="size-3.5" />
                  </span>
                  <span className="font-medium text-navy">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </aside>
      )}

      <button
        className={`t-resize t-assistant-trigger fixed bottom-[86px] right-4 z-50 flex w-[60px] items-center overflow-hidden rounded-[8px] bg-ink p-3 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] ${isScrolled ? 'justify-center gap-0 sm:w-[60px]' : 'gap-3 pr-4 sm:w-[232px]'}`}
        onClick={toggleAssistant}
        aria-expanded={assistantMounted && assistantAnimating === 'open'}
        aria-label="Register at Pitshanger Dental"
        type="button"
      >
        <img src={logo} alt="" className="size-9 brightness-0 invert" />
        <span className={`t-assistant-label hidden whitespace-nowrap sm:inline ${isScrolled ? 'max-w-0 -translate-x-1 opacity-0' : 'max-w-[160px] translate-x-0 opacity-100'}`}>
          Pitshanger Assistant
        </span>
      </button>

      {offerVisible && (
        <aside className="fixed inset-x-0 bottom-0 z-40 bg-white text-ink shadow-[0_-12px_40px_rgba(29,39,110,0.16)]">
          <div className="mx-auto grid h-[76px] w-full grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-3 md:px-5">
            <img src={serviceImages[0]} alt="" className="hidden h-12 w-12 rounded-[8px] object-cover sm:block" />
            <div className="min-w-0">
              <p className="hidden text-xs font-medium text-iris md:block">Special offers at Pitshanger Dental</p>
              <p className="truncate text-sm font-semibold sm:text-base">{offers[0]}</p>
            </div>
            <a className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-navy px-4 py-3 text-sm font-medium text-white transition hover:bg-iris sm:px-5" href="#offers">
              <span className="sm:hidden">Details</span>
              <span className="hidden sm:inline">Request Appointment</span>
              <ArrowRight size={16} />
            </a>
            <button className="grid size-10 shrink-0 place-items-center rounded-full bg-mist text-ink" onClick={() => setOfferVisible(false)} type="button" aria-label="Dismiss offer bar">
              <X size={16} />
            </button>
          </div>
        </aside>
      )}
    </Shell>
  );
}

export default App;
