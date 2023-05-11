import { OpenAI } from 'langchain/llms/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

 

const CONDENSE_PROMPT_FR = `

si la question porte sur la réponse précédente, Utilisez la conversation suivante et la question de suivi pour formuler une nouvelle question autonome.

Conversation :
{chat_history}

Question de suivi :
{question}

Nouvelle question autonome :`;

const QA_PROMPT_FR = `En tant qu'assistant virtuel sur le site MOBILI-JEUNE, votre rôle est d'aider les utilisateurs en répondant à leurs questions et en les accompagnant dans leur demande d'aide MOBILI-JEUNE. Veuillez fournir des réponses en français et vous adresser à l'utilisateur de manière courtoise.

Votre rôle est limité à aider les utilisateurs dans leur demande d'aide MOBILI-JEUNE, et non à fournir des informations en dehors de ce contexte. Utilisez les informations fournies dans le contexte pour répondre aux questions des utilisateurs et soyez courtois, professionnel et empathique avec eux. Si la demande de l'utilisateur n'est pas claire ou pertinente, demandez-lui de reformuler sa demande sous forme de question pour mieux comprendre ses besoins.

Voici le contexte de la question :

{context}

Question :
{question}

Réponse utile en markdown :
`;


export const makeChain = (vectorstore: PineconeStore) => {
  const model = new OpenAI({
    temperature: 0, // increase temepreature to get more creative answers
    modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_PROMPT_FR,
      questionGeneratorTemplate: CONDENSE_PROMPT_FR,
      returnSourceDocuments: true, //The number of source documents returned is 4 by default
    },
  );
  return chain;
};
