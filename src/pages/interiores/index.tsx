import { ContactSection, type ContactConfig } from "../../components/ContactSection";
import { Formats } from "./Formats";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { Personalize } from "./Personalize";
import { Portfolio } from "./Portfolio";
import { Quote } from "./Quote";
import { Services } from "./Services";

const contact: ContactConfig = {
  title: "Conte como você quer morar.",
  accentWords: [3, 4],
  text: "Uma arquiteta da nossa equipe retorna em até dois dias úteis para entender o imóvel, o prazo e o investimento.",
  submitLabel: "Solicitar projeto",
  interestLabel: "Formato de interesse",
  interests: ["Projeto e execução", "Projeto completo", "Consultoria", "Personalização de unidade Basalto"],
  info: [
    { icon: "map", label: "Estúdio de interiores", value: "Rua Fradique Coutinho, 914, Pinheiros" },
    { icon: "mail", label: "E-mail", value: "interiores@basalto.com.br", href: "mailto:interiores@basalto.com.br" },
    { icon: "phone", label: "Telefone", value: "(11) 3047-2190", href: "tel:+551130472190" },
  ],
  successText: "Nossa equipe de arquitetura vai entrar em contato em até dois dias úteis para marcar a primeira conversa.",
};

export default function InterioresPage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Portfolio />
      <Personalize />
      <Formats />
      <Quote />
      <ContactSection config={contact} />
    </>
  );
}
