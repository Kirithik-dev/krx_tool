import { AtmosphericVideo } from '../components/AtmosphericVideo';
import { TextReveal } from '../components/TextReveal';
import { KRX_CONTENT } from '../data/krxContent';

export function Scene05Engineering() {
  const { eyebrow, headline, microcopy, videoSrc, imageSrc, imageAlt, areas } =
    KRX_CONTENT.engineering;

  return (
    <section
      id="engineering"
      aria-label="Engineering"
      className="relative w-full bg-[#141414] text-[#F3F1ED] py-24 md:py-40 overflow-x-clip"
    >
      {/* Atmospheric hardware & circuitry backdrop */}
      <AtmosphericVideo
        src={videoSrc}
        poster={imageSrc}
        alt={imageAlt}
        className="!absolute inset-0 h-full w-full opacity-35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#141414] via-[#141414]/65 to-[#141414]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#141414]/88 via-[#141414]/72 to-[#141414]/88"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left Sticky Editorial Lead */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <TextReveal delay={0} duration={750} variant="glide">
              <p className="text-xs tracking-[0.16em] uppercase text-[#D8B879]">
                {eyebrow}
              </p>
            </TextReveal>

            <TextReveal delay={90} duration={950} variant="mask">
              <h2 className="font-display text-[clamp(2.6rem,4.8vw,4.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-balance pb-1">
                {headline}
              </h2>
            </TextReveal>

            <TextReveal delay={180} duration={850} variant="glide">
              <p className="font-display italic text-lg text-[#F3F1ED]/55">
                {microcopy}
              </p>
            </TextReveal>
          </div>

          {/* Right: Editorial Engineering Disciplines */}
          <div className="lg:col-span-6 lg:col-start-7 divide-y divide-[#F3F1ED]/12 border-t border-b border-[#F3F1ED]/12">
            {areas.map((area, idx) => (
              <TextReveal key={area.title} delay={idx * 65} duration={850} variant="glide">
                <article className="py-8 md:py-10 space-y-3">
                  <h3 className="font-display text-2xl md:text-4xl font-light text-[#F3F1ED]">
                    {area.title}
                  </h3>
                  <p className="max-w-xl text-sm md:text-base leading-[1.78] text-[#F3F1ED]/72">
                    {area.description}
                  </p>
                </article>
              </TextReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
