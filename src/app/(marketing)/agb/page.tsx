import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen — Terms and conditions.",
};

export default function AGBPage() {
  return (
    <>
      <section className="pt-32 pb-8 bg-navy-900">
        <Container>
          <h1 className="font-heading text-4xl font-bold text-white">
            Allgemeine Geschäftsbedingungen
          </h1>
        </Container>
      </section>

      <Section bg="white">
        <Container size="narrow">
          <div className="space-y-8 text-text-secondary leading-relaxed">
            <div>
              <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
                §1 Geltungsbereich
              </h2>
              <p>
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
                Geschäftsbeziehungen zwischen 24/7 FBA Prep &amp; Fulfillment
                (nachfolgend &ldquo;Auftragnehmer&rdquo;) und dem Kunden
                (nachfolgend &ldquo;Auftraggeber&rdquo;). Maßgeblich ist die zum
                Zeitpunkt des Vertragsschlusses gültige Fassung.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
                §2 Leistungsumfang
              </h2>
              <p>
                Der Auftragnehmer erbringt FBA-Vorbereitungsdienstleistungen
                einschließlich, aber nicht beschränkt auf: FNSKU-Etikettierung,
                Poly-Bagging, Bündelung, Qualitätsprüfung, Kartonverpackung und
                Versand an Amazon-Fulfillment-Center. Der genaue
                Leistungsumfang ergibt sich aus dem jeweiligen Angebot.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
                §3 Preise und Zahlung
              </h2>
              <p>
                Alle angegebenen Preise verstehen sich netto zuzüglich der
                gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt gemäß der
                vereinbarten Zahlungsbedingungen. Bei Zahlungsverzug werden
                Verzugszinsen in gesetzlicher Höhe berechnet.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
                §4 Lagerung
              </h2>
              <p>
                Die Lagerung der Ware erfolgt für die ersten 30 Tage
                kostenfrei. Danach fallen Lagergebühren gemäß der aktuellen
                Preisliste an. Der Auftragnehmer haftet für Schäden an der Ware
                während der Lagerung nur bei Vorsatz und grober Fahrlässigkeit.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
                §5 Haftung
              </h2>
              <p>
                Der Auftragnehmer haftet für Schäden nur bei Vorsatz und grober
                Fahrlässigkeit. Die Haftung ist auf den Warenwert begrenzt. Für
                entgangenen Gewinn oder Folgeschäden wird nicht gehaftet.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
                §6 Gerichtsstand
              </h2>
              <p>
                Gerichtsstand für alle Streitigkeiten ist Nürtingen. Es gilt
                deutsches Recht unter Ausschluss des UN-Kaufrechts.
              </p>
            </div>

            <p className="text-sm text-text-secondary italic mt-8">
              Stand: Februar 2026. Diese AGB-Vorlage muss vor Veröffentlichung
              von einem Rechtsanwalt geprüft werden.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
