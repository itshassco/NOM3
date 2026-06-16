import { useEffect, useRef, useState } from 'react';
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

function App() {
  const rootRef = useRef(null);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [offerVisible, setOfferVisible] = useState(true);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  useMotion(rootRef);

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
              <a href="#top" className="flex shrink-0 items-center gap-2" aria-label="Pitshanger Dental home">
                <img src={logo} alt="Pitshanger Dental logo placeholder" className="size-9 rounded-[8px] bg-white" />
                <span className="hidden text-base font-semibold text-navy sm:inline">Pitshanger Dental</span>
              </a>
              <div className="hidden gap-7 lg:flex">
                <a href="#care">About Us</a>
                <a href="#visit">Contact Us</a>
                <a href="#offers">Fee Guide</a>
                <a href="#services">Treatments</a>
                <a href="#services">Invisalign</a>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <a className="hidden items-center gap-2 px-2 text-ink/60 transition hover:text-navy md:inline-flex" href="tel:02089973012">
                <Phone size={15} />
                020 8997 3012
              </a>
              <a className="rounded-full bg-navy px-5 py-3 font-medium text-white transition hover:bg-iris" href="#visit">
                Join Private or NHS
              </a>
              <button className="grid size-10 place-items-center rounded-full bg-mist text-navy" aria-label="Open menu">
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
                <p className="text-sm font-medium text-ink/48">190+ 5-star Google reviews</p>
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

      {assistantOpen && (
        <aside className="fixed bottom-[154px] right-4 z-50 w-[min(25rem,calc(100vw-2rem))] overflow-hidden rounded-[8px] bg-white text-ink shadow-[0_24px_90px_rgba(29,39,110,0.24)] ring-1 ring-navy/10">
          <div className="flex items-center justify-between bg-navy p-4 text-white">
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="size-9 brightness-0 invert" />
              <div>
                <p className="font-semibold">Register at Pitshanger Dental</p>
                <p className="text-xs text-white/62">Private and NHS enquiries</p>
              </div>
            </div>
            <button className="grid size-8 place-items-center rounded-full bg-white/10" onClick={() => setAssistantOpen(false)} type="button" aria-label="Close registration assistant">
              <X size={16} />
            </button>
          </div>
          <div className="space-y-3 p-4">
            <p className="text-sm leading-6 text-ink/62">
              Start with a quick enquiry and the team can help you join the practice, book a new patient checkup, or ask about Invisalign and private care.
            </p>
            <a className="flex items-center justify-between rounded-[8px] bg-mist p-4 font-medium text-navy" href="tel:02089973012">
              Call 020 8997 3012 <Phone size={17} />
            </a>
            <a className="flex items-center justify-between rounded-[8px] bg-mist p-4 font-medium text-navy" href="mailto:pitshangerdental@gmail.com">
              Email the practice <Mail size={17} />
            </a>
            <a className="flex items-center justify-between rounded-[8px] bg-peach p-4 font-semibold text-ink" href="#visit">
              View registration details <ArrowRight size={17} />
            </a>
          </div>
        </aside>
      )}

      <button
        className={`t-resize fixed bottom-[86px] right-4 z-50 flex w-[60px] items-center overflow-hidden rounded-[8px] bg-ink p-3 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] ${isScrolled ? 'justify-center gap-0 sm:w-[60px]' : 'gap-3 pr-4 sm:w-[232px]'}`}
        onClick={() => setAssistantOpen((open) => !open)}
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
