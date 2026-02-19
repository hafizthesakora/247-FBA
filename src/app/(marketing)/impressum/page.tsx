import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum — Legal information as required by DDG §5.",
};

export default function ImpressumPage() {
  return (
    <>
      <section className="pt-32 pb-8 bg-navy-900">
        <Container>
          <h1 className="font-heading text-4xl font-bold text-white">
            Impressum
          </h1>
        </Container>
      </section>

      <Section bg="white">
        <Container size="narrow">
          <div className="prose prose-gray max-w-none">
            <h2 className="font-heading text-xl font-bold text-text-dark mb-4">
              Angaben gemäß DDG §5
            </h2>

            <div className="space-y-6 text-text-secondary leading-relaxed">
              <div>
                <h3 className="font-semibold text-text-dark mb-2">Firmenname</h3>
                <p>
                  24/7 FBA Prep &amp; Fulfillment
                  <br />
                  Musterstraße 1
                  <br />
                  72622 Nürtingen
                  <br />
                  Deutschland
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-dark mb-2">Kontakt</h3>
                <p>
                  Telefon: +49 (0) 7022 123456
                  <br />
                  E-Mail: info@247fba.de
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-dark mb-2">
                  Vertretungsberechtigte Person
                </h3>
                <p>[Name des Geschäftsführers]</p>
              </div>

              <div>
                <h3 className="font-semibold text-text-dark mb-2">
                  Registereintrag
                </h3>
                <p>
                  Handelsregister: [Amtsgericht]
                  <br />
                  Registernummer: HRB [Nummer]
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-dark mb-2">
                  Umsatzsteuer-ID
                </h3>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß §27a
                  Umsatzsteuergesetz:
                  <br />
                  DE [Nummer]
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-dark mb-2">
                  Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
                </h3>
                <p>
                  [Name]
                  <br />
                  [Adresse]
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-dark mb-2">
                  Streitschlichtung
                </h3>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit. Wir sind nicht
                  verpflichtet und nicht bereit, an einem
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
