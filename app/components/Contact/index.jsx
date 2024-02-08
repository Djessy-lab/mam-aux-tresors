import { TiPhone } from "react-icons/ti";

const Contact = () => {
  const contacts = [{ name: 'Cynthia', tel: '0699090985' }, { name: 'Annie', tel: '0675153610' }, { name: 'Coraline', tel: '0621660590' }]
  return (
    <div className="bg-[#747e7e] w-[100vw] p-10">
      <h1 className="text-center text-2xl text-white mb-10">Nous contacter</h1>
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <p className="text-white">Adresse : 6 chemin de guerrin, 33550 Capian</p>
          <p className="text-white">Email : <a href="mailto:mamauxtresors33@gmail.com" className="text-emerald-50 hover:text-emerald-200">mamauxtresors33@gmail.com</a></p>
          <div  className="flex">
          {contacts.map((contact, index) => (
              <a href={`tel:${contact.tel}`} key={index} className="flex items-center justify-center text-xl text-emerald-50 hover:text-emerald-200">
                <p className="ml-2">{contact.name}</p>
                <TiPhone size={30} />
              </a>
          ))}
          </div>
        </div>
      </div>
      <div className="p-10 flex justify-center">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d399.5580805955479!2d-0.3302667724952931!3d44.71369670153726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd553f5a34ea069d%3A0xb19de733573a3eea!2sLa%20Mam%20aux%20tr%C3%A9sors%20de%20Capian!5e1!3m2!1sfr!2sfr!4v1707251538972!5m2!1sfr!2sfr" width="600" height="450" className="rounded-xl shadow-xl" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  )
}

export default Contact
