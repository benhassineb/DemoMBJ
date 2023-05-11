import { Layout, Text, Page } from '@vercel/examples-ui'
import { Chat } from '../components/Chat'

function Home() {
  return (
    <Page className="flex flex-col gap-12">
         <>
              <p> Cette IA a utilisé uniquement les informations présentées dans ces deux pages web pour acquérir autant de connaissances que possible sur L'aide MOBILI-JEUNE :</p>

              <ul>
                <li><a href="https://mobilijeune.actionlogement.fr/faq">https://mobilijeune.actionlogement.fr/faq</a></li>
                <li><a href="https://groupe-reussite.fr/ressources/financement-etudes-logement-aide-mobili-jeune/">https://groupe-reussite.fr/ressources/financement-etudes-logement-aide-mobili-jeune/</a></li>
              </ul>
              <p>En enrichissant les données fournies et en les rendant plus précises et plus pertinentes, on peut améliorer significativement la qualité des réponses.</p>

            </>

      <section className="flex flex-col gap-3">
        <Text variant="h2">ChatBot MOBILI-JEUNE®:</Text>
        <div className="lg:w-2/3">
          <Chat />
        </div>
      </section>
    </Page>
  )
}

Home.Layout = Layout

export default Home
