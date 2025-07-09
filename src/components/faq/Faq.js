import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import './faq.css'

const faqData = [
  {
    question: 'É seguro comprar na Jardim Blox?',
    answer: 'Sim! Trabalhamos com segurança total durante todo o processo. Ao comprar nossos produtos, você deve concluir o pagamento diretamente pelo Mercado Pago, assegurando a privacidade dos seus dados. Sua experiência é nossa prioridade.'
  },
  {
    question: 'Como comprar?',
    answer: (
      <ol>
        <li>Acesse a página da loja.</li>
        <li>Escolha seus itens.</li>
        <li>Finalize sua compra.</li>
        <li>Aguarde nosso contato por Email, Whatsapp ou Discord.</li>
      </ol>
    )
  },
  {
    question: 'Como receber minha compra?',
    answer: 'Assim que você finalizar a compra, receberemos um e-mail com a confirmação e entraremos em contato usando os dados fornecidos. Conversaremos com você e marcaremos a entrega dos produtos.'
  },
  {
    question: 'Tive um problema, e agora?',
    answer: 'Se houver qualquer problema com a entrega dos itens, entre em contato imediatamente com nossa equipe de suporte. Resolveremos o problema o mais rápido possível.'
  },
  {
    question: 'Vocês armazenam meus dados?',
    answer: 'Não, seus dados são usados somente quando necessário para garantir a segurança durante a venda. Respeitamos a privacidade dos clientes e seguimos uma rigorosa proteção de dados.'
  }
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="faq-container">
      <h2 className="faq-title">Dúvidas Frequentes</h2>
      {faqData.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? 'open' : ''}`}
          onClick={() => toggle(index)}
        >
          <div className="faq-question">
            <span>{item.question}</span>
            <FaChevronDown className={`faq-icon ${openIndex === index ? 'rotate' : ''}`} />
          </div>
          <div className="faq-answer">
            {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FAQ
