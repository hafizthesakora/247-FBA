import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung — Privacy policy as required by GDPR.",
};

export default function DatenschutzPage() {
  return (
    <>
      <section className="pt-32 pb-8 bg-navy-900">
        <Container>
          <h1 className="font-heading text-4xl font-bold text-white">
            Datenschutzerklärung
          </h1>
        </Container>
      </section>

      <Section bg="white">
        <Container size="narrow">
          <div className="space-y-8 text-text-secondary leading-relaxed">
            <div>
              <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
                1. Datenschutz auf einen Blick
              </h2>
              <h3 className="font-semibold text-text-dark mb-2">
                Allgemeine Hinweise
              </h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber,
                was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
                Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie persönlich identifiziert werden können.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
                2. Verantwortliche Stelle
              </h2>
              <p>
                24/7 FBA Prep &amp; Fulfillment
                <br />
                Musterstraße 1
                <br />
                72622 Nürtingen
                <br />
                E-Mail: info@247fba.de
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
                3. Datenerfassung auf dieser Website
              </h2>
              <h3 className="font-semibold text-text-dark mb-2">Cookies</h3>
              <p>
                Unsere Website verwendet Cookies. Das sind kleine Textdateien,
                die Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen
                uns dabei, unser Angebot nutzerfreundlicher, effektiver und
                sicherer zu machen.
              </p>
              <p className="mt-3">
                Einige Cookies sind &ldquo;Session-Cookies.&rdquo; Solche
                Cookies werden nach Ende Ihrer Browser-Sitzung von selbst
                gelöscht. Hingegen bleiben andere Cookies auf Ihrem Endgerät
                bestehen, bis Sie diese selbst löschen. Solche Cookies helfen
                uns, Sie bei Rückkehr auf unserer Website wiederzuerkennen.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
                4. Kontaktformular
              </h2>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
                werden Ihre Angaben aus dem Anfrageformular inklusive der von
                Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                Anfrage und für den Fall von Anschlussfragen bei uns
                gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung
                weiter.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
                5. Ihre Rechte
              </h2>
              <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über
                Ihre gespeicherten personenbezogenen Daten, deren Herkunft und
                Empfänger und den Zweck der Datenverarbeitung sowie ein Recht
                auf Berichtigung, Sperrung oder Löschung dieser Daten.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
                6. Hosting
              </h2>
              <p>
                Diese Website wird bei Vercel Inc. gehostet. Die Server befinden
                sich teilweise in den USA. Vercel hat sich zur Einhaltung der
                DSGVO verpflichtet.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
