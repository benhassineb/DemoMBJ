import { Layout, Text, Page } from '@vercel/examples-ui'
import { Chat } from '../components/Chat'

function Home() {
  return (
    <Page className="flex flex-col gap-12">
      <text>
        Cette IA a utilisé uniquement les informations présentées dans ces deux pages web pour acquérir autant de connaissances que possible sur L'aide MOBILI-JEUNE : <br></br>
        <br></br>
        https://mobilijeune.actionlogement.fr/faq<br></br>
        https://www.actionlogement.fr/l-aide-mobili-jeune<br></br>
        <br></br>
      
        <b>En enrichissant les données fournies et en les rendant plus précises et plus pertinentes, on peut améliorer significativement la qualité des réponses.</b>
      </text>

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
