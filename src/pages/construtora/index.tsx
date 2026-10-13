import { ContactSection, type ContactConfig } from "../../components/ContactSection";
import { Bento } from "./Bento";
import { Featured } from "./Featured";
import { Hero } from "./Hero";
import { InteriorsBridge } from "./InteriorsBridge";
import { Method } from "./Method";
import { Projects, projects } from "./Projects";
import { Stats } from "./Stats";
import { Testimonials } from "./Testimonials";

const contact: ContactConfig = {
  title: "Agende uma visita ao decorado.",
  accentWords: [3, 4],
  text: "Nosso time comercial atende no stand do Edifício Jacarandá e por videochamada. Respondemos em até um dia útil.",
  submitLabel: "Agendar visita",
  interestLabel: "Empreendimento de interesse",
  interests: [...projects.map((p) => p.name), "Ainda não sei"],
  info: [
    { icon: "map", label: "Stand de vendas", value: "Rua Domingos de Morais, 2187, Vila Mariana" },
    { icon: "phone", label: "Telefone e WhatsApp", value: "(11) 97412-0583", href: "tel:+5511974120583" },
    { icon: "clock", label: "Horário", value: "Segunda a sábado, das 9h às 19h" },
  ],
  successText: "Um consultor vai ligar em até um dia útil para combinar o melhor horário da sua visita.",
};

export default function ConstrutoraPage() {
  return (
    <>
      <Hero />
      <Stats />
      <Projects />
      <Featured />
      <Method />
      <Bento />
      <InteriorsBridge />
      <Testimonials />
      <ContactSection config={contact} />
    </>
  );
}
