import { useEffect, useState } from 'react'
import { Button } from './Button'
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from './ChatLine'
import { useCookies } from 'react-cookie'
import { Readable } from 'stream'

const COOKIE_NAME = 'nextjs-example-ai-chat-gpt3'

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: ChatGPTMessage[] = [
  {
    role: 'assistant',
    content: 'Bonjour ! Je suis ici pour vous aider. Que souhaitez-vous savoir sur L\'AIDE MOBILI-JEUNE® ?',
  },
]

const InputMessage = ({ input, setInput, sendMessage }: any) => (
  <div className="mt-6 flex clear-both">
    <input
      type="text"
      aria-label="chat input"
      required
      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
      value={input}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          sendMessage(input)
          setInput('')
        }
      }}
      placeholder={ 'qu\'est-ce que l\'aide mobili-jeune ?' }
      onChange={(e) => {
        setInput(e.target.value)
      }}
    />
    <Button
      type="submit"
      className="ml-4 flex-none"
      onClick={() => {
        sendMessage(input)
        setInput('')
      }}
    >
      Envoyez
    </Button>
  </div>
)

export function Chat() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useCookies([COOKIE_NAME])

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7)
      setCookie(COOKIE_NAME, randomId)
    }
  }, [cookie, setCookie])

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true)
    const newMessages = [
      ...messages,
      { role: 'user', content: message } as ChatGPTMessage,
    ]
    setMessages(newMessages)
    const last10messages = newMessages.slice(-10) // remember last 10 messages

    let question = message ;
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        history,
      }),
    });
   
    console.log('Edge function returned.')

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const _temp = await response.json();

    console.log(_temp.sourceDocuments);
    setMessages([
      ...newMessages,
      { role: 'assistant', content: _temp.text } as ChatGPTMessage,
    ])
    setLoading(false);


    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    // const reader = data.getReader()
    // const decoder = new TextDecoder()
    // let done = false

    // let lastMessage = ''

    // while (!done) {
    //   const { value, done: doneReading } = await reader.read()
    //   done = doneReading
    //   const chunkValue = decoder.decode(value)

    //   lastMessage = lastMessage + chunkValue

    //   setMessages([
    //     ...newMessages,
    //     { role: 'assistant', content: lastMessage } as ChatGPTMessage,
    //   ])

    //   setLoading(false)
    // }
  }

  return (
    <div className="rounded-2xl border-zinc-100  lg:border lg:p-6">
      {messages.map(({ content, role }, index) => (
        <ChatLine key={index} role={role} content={content} />
      ))}

      {loading && <LoadingChatLine />}

   
      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}

      />
    </div>
  )
}
