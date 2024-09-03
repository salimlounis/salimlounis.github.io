// app/project/[id]/page.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";

export default async function About() {
  return (
    <main>
      <Header />
      <div className="header"></div>
      <div className="wrapper project">
        <div className="">
          <div className="text">
            <p className="mb1">
              Je suis un artiste multidisciplinaire et développeur logiciel,
              spécialisé dans les domaines de la technologie en temps réel et de
              la créativité.
            </p>
            <p className="mb1">
              Je travaille actuellement en tant que développeur logiciel senior
              @
              <a
                href="https://www.productshop.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Product Shop
              </a>
              .
            </p>
            <p className="mb1">
              ⅕ du{" "}
              <a
                href="http://collectifblackbox.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Collectif Blackbox
              </a>
              .
            </p>
            <p className="mb1">
              Tous les projets présentés sur ce site incluent à la fois des
              travaux personnels et professionnels..
            </p>
            <p className="mb1">
              Si vous avez des demandes, des commentaires ou des questions,
              n&apos;hésitez pas à me contacter 👇{" "}
              <p>
                <a href="mailto:lounissalim@gmail.com" className="regular">
                  lounissalim@gmail.com
                </a>
              </p>
            </p>
            <p className="mb1">
              <a
                href="https://www.notion.so/Salim-Lounis-8bfc3e8a5f344098898722a1cdc77869"
                target="_blank"
                rel="noopener noreferrer"
              >
                CURRICULUM VITAE
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
