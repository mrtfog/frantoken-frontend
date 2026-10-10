import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AnnouncementBanner } from "@/components/common/AnnouncementBanner";
import { SiteFooter } from "@/components/common/SiteFooter";
import { SiteHeader } from "@/components/common/SiteHeader";
import { ButtonLink } from "@/components/ui";
import { pillars, questions, roles } from "../constants/homepage.constants";
import { HomeHeroArt } from "./HomeHeroArt";
import { HomeReveal } from "./HomeReveal";
import { HomeStages } from "./HomeStages";
import { HomeTicker } from "./HomeTicker";

const pillarIcons = { sparkles: Sparkles, blocks: Boxes, trending: TrendingUp };
const textLinkClass =
  "inline-flex w-fit items-center gap-3 border-b border-current pb-1 text-[13px] font-extrabold transition-[gap] duration-200 hover:gap-5 motion-reduce:transition-none";
const sectionLabelClass =
  "flex items-center gap-3 text-[10px] font-black tracking-[0.17em] uppercase";

export function Homepage() {
  return (
    <div
      id="inicio"
      className="min-w-[320px] overflow-clip bg-[#f3f2e9] text-[#09262a]"
    >
      <AnnouncementBanner />
      <SiteHeader />
      <main>
        <section
          className="relative isolate overflow-hidden bg-[#09262a] px-5 pt-[76px] pb-6 text-[#f3f2e9] sm:px-8 sm:pt-24 lg:px-10 lg:pt-[105px]"
          aria-labelledby="hero-title"
        >
          <div
            className="pointer-events-none absolute top-[12%] right-[4%] h-[420px] w-[420px] rounded-full bg-[#1b4d4a]/55 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-[180px] -left-[160px] h-[400px] w-[400px] rounded-full bg-[#123f3d]/60 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(90deg,transparent_calc(100%_-_1px),#b6d0c0_calc(100%_-_1px)),linear-gradient(0deg,transparent_calc(100%_-_1px),#b6d0c0_calc(100%_-_1px))] [background-size:70px_70px] [mask-image:linear-gradient(to_right,transparent,black_55%,black)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-[1400px] items-center gap-7 lg:min-h-[565px] lg:grid-cols-[1.06fr_0.94fr] lg:gap-4">
            <div className="relative z-10">
              <HomeReveal
                immediate
                className={`${sectionLabelClass} text-[#d5f36a]`}
              >
                <span className="h-px w-[26px] bg-[#d5f36a]" /> UNA NUEVA MIRADA
                SOBRE FRANQUICIAS
              </HomeReveal>
              <HomeReveal immediate delay={0.1}>
                <h1
                  id="hero-title"
                  className="mt-6 mb-5 max-w-[780px] text-[clamp(49px,12vw,82px)] leading-[0.99] font-medium tracking-[-0.065em] lg:text-[clamp(66px,6.4vw,106px)]"
                >
                  Grandes ideas.
                  <br />
                  <em className="font-serif font-normal text-[#d5f36a] sm:whitespace-nowrap">
                    En movimiento.
                  </em>
                </h1>
              </HomeReveal>
              <HomeReveal immediate delay={0.2}>
                <p className="mb-0 max-w-[475px] text-[16px] leading-[1.6] text-[#d3e0d9]">
                  Pensamos proyectos de franquicia que unen análisis, estructura
                  y operación. Para transformar una posibilidad en algo
                  concreto, paso a paso.
                </p>
              </HomeReveal>
              <HomeReveal
                immediate
                delay={0.3}
                className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-7"
              >
                <ButtonLink href="#modelo">
                  Conocé cómo funciona{" "}
                  <ArrowUpRight
                    className="h-[18px] w-[18px]"
                    aria-hidden="true"
                  />
                </ButtonLink>
                <a className={`${textLinkClass} text-[#f3f2e9]`} href="#que-es">
                  ¿Qué es FranToken?{" "}
                  <ArrowRight
                    className="h-[18px] w-[18px]"
                    aria-hidden="true"
                  />
                </a>
              </HomeReveal>
            </div>
            <HomeHeroArt />
          </div>
          <div className="relative mx-auto mt-11 flex max-w-[1400px] justify-between gap-3 border-t border-[#f3f2e9]/20 pt-4 text-[9px] font-black tracking-[0.14em] text-[#a4b8ad] uppercase lg:mt-8">
            <span>01 — UNA IDEA EN CONSTRUCCIÓN</span>
            <span className="hidden sm:inline">DESLIZÁ PARA EXPLORAR ↓</span>
          </div>
        </section>

        <HomeTicker />

        <section
          id="que-es"
          className="scroll-mt-20 px-5 py-[90px] sm:px-8 lg:px-10 lg:py-[145px]"
          aria-labelledby="intro-title"
        >
          <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.25fr_1fr] lg:gap-9">
            <HomeReveal
              className={`${sectionLabelClass} self-start text-[#4a7068]`}
            >
              <span className="text-[#859e75]">/ 01</span> LA IDEA
            </HomeReveal>
            <div>
              <HomeReveal>
                <h2
                  id="intro-title"
                  className="mb-7 max-w-[1030px] text-[clamp(39px,9vw,76px)] leading-[1.03] font-medium tracking-[-0.065em]"
                >
                  Las franquicias tienen potencial.
                  <br />
                  <span className="text-[#81988c]">
                    Los buenos proyectos tienen método.
                  </span>
                </h2>
              </HomeReveal>
              <HomeReveal delay={0.1}>
                <p className="max-w-[680px] text-[16px] leading-[1.7] text-[#365358]">
                  FranToken propone una forma de evaluar proyectos de
                  franquicia, darles una estructura de financiación y acompañar
                  su operación con roles definidos e información para seguir lo
                  que pasa.
                </p>
              </HomeReveal>
              <HomeReveal delay={0.18} className="mt-5">
                <a className={textLinkClass} href="#modelo">
                  Descubrí el recorrido{" "}
                  <ArrowUpRight
                    className="h-[18px] w-[18px]"
                    aria-hidden="true"
                  />
                </a>
              </HomeReveal>
            </div>
          </div>
          <div className="mx-auto mt-[70px] grid max-w-[1400px] border-t border-[#09262a]/20 sm:grid-cols-3 lg:mt-[120px]">
            {pillars.map((pillar, index) => {
              const Icon = pillarIcons[pillar.icon];
              return (
                <HomeReveal
                  key={pillar.number}
                  delay={index * 0.08}
                  className="min-h-[210px] border-b border-[#09262a]/20 px-1 py-6 sm:border-r sm:px-5 lg:min-h-[250px] lg:px-9 lg:py-7 last:sm:border-r-0 first:sm:pl-0"
                >
                  <div className="flex items-start justify-between text-[10px] font-black tracking-[0.12em] text-[#67817a]">
                    <Icon
                      className="h-8 w-8 stroke-[1.5] text-[#315f58]"
                      aria-hidden="true"
                    />
                    <span>{pillar.number} / 03</span>
                  </div>
                  <h3 className="mt-9 mb-2 font-serif text-[24px] font-normal tracking-[-0.04em] lg:mt-[60px] lg:text-[27px]">
                    {pillar.title}
                  </h3>
                  <p className="mb-0 max-w-[320px] text-[14px] leading-[1.55] text-[#526b67]">
                    {pillar.body}
                  </p>
                </HomeReveal>
              );
            })}
          </div>
        </section>

        <section
          id="modelo"
          className="scroll-mt-20 bg-[#dfe9dc] px-5 py-[90px] sm:px-8 lg:px-10 lg:py-[145px]"
          aria-labelledby="model-title"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-4 lg:grid-cols-[0.25fr_0.95fr_0.5fr] lg:items-end lg:gap-9">
              <HomeReveal
                className={`${sectionLabelClass} self-start text-[#4a7068]`}
              >
                <span className="text-[#859e75]">/ 02</span> EL RECORRIDO
              </HomeReveal>
              <HomeReveal>
                <h2
                  id="model-title"
                  className="mb-0 text-[clamp(39px,9vw,76px)] leading-[1.03] font-medium tracking-[-0.065em]"
                >
                  De la posibilidad
                  <br />
                  <em className="font-serif font-normal text-[#668675]">
                    al proyecto.
                  </em>
                </h2>
              </HomeReveal>
              <HomeReveal delay={0.1}>
                <p className="mb-0 max-w-[425px] text-[15px] leading-[1.65] text-[#47645c]">
                  Una secuencia para entender cómo se plantea cada etapa.
                  Seleccioná un paso para explorarlo.
                </p>
              </HomeReveal>
            </div>
            <HomeStages />
            <p className="mt-6 mb-0 max-w-[790px] text-[12px] leading-[1.5] text-[#526d62]">
              Este recorrido describe el modelo de negocio propuesto. No
              constituye una oferta de inversión ni confirma una operación en
              marcha.
            </p>
          </div>
        </section>

        <section
          id="roles"
          className="scroll-mt-20 px-5 py-[90px] sm:px-8 lg:px-10 lg:py-[145px]"
          aria-labelledby="roles-title"
        >
          <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:gap-[100px]">
            <HomeReveal>
              <div className={`${sectionLabelClass} text-[#4a7068]`}>
                <span className="text-[#859e75]">/ 03</span> LAS PIEZAS
              </div>
              <h2
                id="roles-title"
                className="mt-7 mb-5 text-[clamp(39px,9vw,76px)] leading-[1.03] font-medium tracking-[-0.065em]"
              >
                Cada actor tiene
                <br />
                <em className="font-serif font-normal text-[#849b88]">
                  su lugar.
                </em>
              </h2>
              <p className="max-w-[445px] text-[15px] leading-[1.65] text-[#506963]">
                Una estructura clara empieza por saber quién hace qué. Los
                participantes y contratos concretos se definen para cada
                proyecto.
              </p>
            </HomeReveal>
            <div className="border-t border-[#09262a]/20">
              {roles.map((role, index) => (
                <HomeReveal
                  key={role.number}
                  delay={index * 0.07}
                  className="grid min-h-[120px] grid-cols-[35px_1fr_20px] items-start gap-3 border-b border-[#09262a]/20 py-6"
                >
                  <span className="grid h-[29px] w-[29px] place-items-center rounded-full border border-[#77948a] text-[11px]">
                    {role.number}
                  </span>
                  <div>
                    <h3 className="mb-1.5 font-serif text-[23px] font-normal tracking-[-0.04em]">
                      {role.title}
                    </h3>
                    <p className="mb-0 max-w-[430px] text-[13px] leading-[1.5] text-[#59706b]">
                      {role.body}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 text-[#679077]"
                    aria-hidden="true"
                  />
                </HomeReveal>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden bg-[#09262a] px-5 py-[90px] text-[#f3f2e9] sm:px-8 lg:px-10 lg:py-[145px]"
          aria-labelledby="principle-title"
        >
          <div className="relative z-10 mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-[60px]">
            <HomeReveal>
              <div className={`${sectionLabelClass} text-[#d5f36a]`}>
                <span>/ 04</span> LO IMPORTANTE
              </div>
              <h2
                id="principle-title"
                className="mt-6 mb-0 max-w-[850px] text-[clamp(42px,9vw,82px)] leading-[1.04] font-medium tracking-[-0.065em]"
              >
                La claridad también
                <br />
                es parte del proyecto<span className="text-[#d5f36a]">.</span>
              </h2>
            </HomeReveal>
            <HomeReveal delay={0.12}>
              <p className="mb-7 max-w-[500px] text-[16px] leading-[1.7] text-[#c5d6cb]">
                Antes de presentar una oportunidad concreta, tienen que estar
                definidos sus costos, riesgos, derechos, responsables y
                documentos. Cada decisión merece información verificable.
              </p>
              <a
                className={`${textLinkClass} text-[#f3f2e9]`}
                href="#preguntas"
              >
                Leé las preguntas frecuentes{" "}
                <ArrowUpRight
                  className="h-[18px] w-[18px]"
                  aria-hidden="true"
                />
              </a>
            </HomeReveal>
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-9 -bottom-[135px] text-[440px] leading-none text-[#d5f36a]/[0.07]"
          >
            ✳
          </span>
        </section>

        <section
          id="preguntas"
          className="scroll-mt-20 px-5 py-[90px] sm:px-8 lg:px-10 lg:py-[145px]"
          aria-labelledby="faq-title"
        >
          <div className="mx-auto grid max-w-[1400px] gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-[100px]">
            <HomeReveal>
              <div className={`${sectionLabelClass} text-[#4a7068]`}>
                <span className="text-[#859e75]">/ 05</span> EN CLARO
              </div>
              <h2
                id="faq-title"
                className="mt-7 mb-0 text-[clamp(39px,9vw,76px)] leading-[1.03] font-medium tracking-[-0.065em]"
              >
                Preguntas
                <br />
                <em className="font-serif font-normal text-[#87a08b]">
                  necesarias.
                </em>
              </h2>
            </HomeReveal>
            <div className="border-t border-[#09262a]/20">
              {questions.map((item, index) => (
                <HomeReveal key={item.question} delay={index * 0.06}>
                  <details className="group border-b border-[#09262a]/20">
                    <summary className="flex min-h-[78px] cursor-pointer list-none items-center justify-between gap-5 font-serif text-[19px] tracking-[-0.035em] sm:text-[22px] [&::-webkit-details-marker]:hidden">
                      <span>{item.question}</span>
                      <Plus
                        className="h-7 w-7 shrink-0 rounded-full border border-[#89a091] p-1 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="mr-10 mb-6 max-w-[640px] text-[14px] leading-[1.7] text-[#506b62]">
                      {item.answer}
                    </p>
                  </details>
                </HomeReveal>
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden bg-[#d5f36a] px-5 py-[90px] sm:px-8 lg:px-10 lg:py-[145px]"
          aria-labelledby="closing-title"
        >
          <div className="relative z-10 mx-auto max-w-[1400px]">
            <HomeReveal>
              <Sparkles className="h-9 w-9 stroke-[1.5]" aria-hidden="true" />
              <h2
                id="closing-title"
                className="mt-4 mb-5 text-[clamp(45px,10vw,93px)] leading-[1.02] font-medium tracking-[-0.065em]"
              >
                Las buenas ideas
                <br />
                merecen{" "}
                <em className="font-serif font-normal sm:whitespace-nowrap">
                  estructura.
                </em>
              </h2>
              <p className="mb-7 max-w-[465px] text-[15px] leading-[1.65]">
                Conocé el modelo que estamos construyendo para proyectos de
                franquicia.
              </p>
              <ButtonLink href="#modelo" variant="dark">
                Volver al modelo{" "}
                <ArrowUpRight
                  className="h-[18px] w-[18px]"
                  aria-hidden="true"
                />
              </ButtonLink>
            </HomeReveal>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-[100px] -bottom-[210px] grid h-[320px] w-[320px] -rotate-[16deg] place-items-center rounded-full border border-[#09262a]/25 lg:right-[5%] lg:-bottom-[275px] lg:h-[500px] lg:w-[500px]"
            >
              <div className="absolute -inset-x-[45px] inset-y-[25px] rounded-full border border-[#09262a]/20" />
              <span className="font-serif text-[100px] italic text-[#09262a]/15">
                FT
              </span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
