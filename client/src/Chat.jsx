import { useContext, useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import Logo from "./Logo";
import { UserContext } from "./UserContext.jsx";
import { uniqBy } from "lodash";
import axios from "axios";
import Contact from "./Contact";

export default function Chat() {
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessageText, setNewMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const { username, id, setId, setUsername } = useContext(UserContext);
  const divUnderMessages = useRef();

  // Automated responses for specific symptoms
  const symptomResponses = {
    "headache": "I'm sorry to hear you have a headache. Rest, stay hydrated, and consider taking a mild pain reliever like acetaminophen or ibuprofen. Avoid bright screens if possible.",
    "fever": "A fever could be a sign of infection. Monitor your temperature and stay hydrated. If it persists for more than 2-3 days, see a doctor. Medications like acetaminophen can help reduce fever.",
    "cough": "A cough can be caused by various things. Try drinking warm fluids, honey, and rest. For a dry cough, a cough suppressant like dextromethorphan may help. If it persists, consult a healthcare provider.",
    "sore throat": "For a sore throat, stay hydrated and try warm teas with honey. Lozenges or throat sprays containing benzocaine may provide relief. Gargling with warm salt water can also help.",
    "stomach ache": "A stomach ache could have many causes. Avoid heavy or spicy foods, and try ginger tea for relief. If pain is severe or accompanied by other symptoms, consult a doctor.",
    "runny nose": "A runny nose can be annoying. Drink plenty of fluids, and use a saline nasal spray for relief. Antihistamines like loratadine may help if it's due to allergies.",
    "nausea": "For nausea, try sipping ginger ale or ginger tea. Avoid heavy or greasy foods. Medications like ondansetron can help, but consult a doctor if nausea persists.",
    "back pain": "Back pain can be managed by resting, applying heat or cold, and gentle stretching. Over-the-counter pain relievers like ibuprofen or acetaminophen may help.",
    "allergies": "For allergy symptoms, try an antihistamine like cetirizine or loratadine. Avoid allergens if possible, and consider using an air purifier.",
    "insomnia": "For insomnia, establish a calming bedtime routine and avoid screens before bed. Melatonin supplements can be helpful but consult a doctor for persistent sleep issues.",
    "earache": "Earaches may be due to an infection or blockage. Try a warm compress and avoid inserting anything into the ear. Over-the-counter pain relievers can help with discomfort.",
    "diarrhea": "Stay hydrated with water and electrolyte solutions. Avoid dairy and rich foods. Medications like loperamide can help, but consult a doctor if symptoms persist.",
    "muscle pain": "Muscle pain can often be relieved by rest, gentle stretching, and applying heat or cold. Pain relievers like ibuprofen may help reduce inflammation.",
    "rash": "For a mild rash, avoid irritants and try an anti-itch cream like hydrocortisone. If the rash is widespread or persists, consult a healthcare provider.",
    "eye irritation": "For irritated eyes, use lubricating eye drops and avoid rubbing. If caused by allergies, antihistamine drops may help. Consult a doctor if irritation persists.",
    "constipation": "For constipation, increase fiber intake, drink plenty of water, and consider mild laxatives like polyethylene glycol if needed. Consult a doctor if it persists.",
    "indigestion": "Indigestion can be eased with antacids like Tums or Mylanta. Avoid heavy or spicy foods and try eating smaller meals.",
    "acid reflux": "Avoid trigger foods like caffeine, chocolate, and spicy dishes. An over-the-counter antacid or H2 blocker like ranitidine may help relieve symptoms.",
    "cold": "For a common cold, rest and stay hydrated. Over-the-counter medications like decongestants (pseudoephedrine) and cough syrups may help relieve symptoms.",
    "joint pain": "Joint pain can be relieved with rest, ice packs, and anti-inflammatory medications like ibuprofen. Gentle movement can also help prevent stiffness.",
    "dizziness": "For dizziness, sit or lie down until it passes. Stay hydrated, and if you feel lightheaded frequently, see a doctor.",
    "fatigue": "Fatigue can have many causes. Ensure you're getting adequate sleep, eating well, and staying hydrated. Persistent fatigue should be evaluated by a healthcare provider.",
    "burn": "For a mild burn, cool the area with running water and apply aloe vera gel. Avoid ice, and consult a doctor if the burn is severe.",
    "skin itchiness": "Apply a moisturizing lotion or hydrocortisone cream to relieve itching. If due to allergies, an antihistamine may help.",
    "toothache": "For toothache, rinse with warm salt water and avoid hard foods. Over-the-counter pain relievers like ibuprofen may help, but consult a dentist for persistent pain.",
    "dry skin": "Use a gentle moisturizer regularly and avoid hot showers. Lotions with ceramides or hyaluronic acid can provide added hydration.",
    "chest pain": "Chest pain can be serious. If mild and related to heartburn, antacids may help, but consult a doctor immediately if the pain is severe or persists.",
    "heart palpitations": "Stay calm, sit down, and take slow, deep breaths. Avoid caffeine and seek medical help if palpitations continue or worsen.",
    "shortness of breath": "Shortness of breath could indicate a serious issue. Sit down, breathe deeply, and seek medical attention if it persists.",
    "cold hands and feet": "Warm up by wearing layers or soaking in warm water. If this is a recurring issue, consult a doctor.",
    "swelling": "Elevate the affected area and apply a cold compress to reduce swelling. Anti-inflammatory medications may help if the swelling is due to injury."
  };
  

  useEffect(() => {
    initializeDummyChat(setMessages, setOnlinePeople, setOfflinePeople);
  }, []);

  function initializeDummyChat(setMessages, setOnlinePeople, setOfflinePeople) {
    const dummyUsers = [
      { id: '1', username: 'Dr. Alice Chen', specialization: 'Pediatrician' },
      { id: '2', username: 'Dr. Bob Williams', specialization: 'General Physician' },
      { id: '3', username: 'Dr. Carlos Rodriguez', specialization: 'Cardiologist' },
      { id: '4', username: 'Dr. Fatima Ali', specialization: 'Neurologist' },
      { id: '5', username: 'Dr. Priya Patel', specialization: 'Dermatologist' },
      { id: '6', username: 'Dr. Samuel Johnson', specialization: 'Orthopedic Surgeon' },
      { id: '7', username: 'Dr. Maria Gomez', specialization: 'Endocrinologist' },
      { id: '8', username: 'Dr. Ahmed Khan', specialization: 'Oncologist' },
      { id: '9', username: 'Dr. Emily Wright', specialization: 'Psychiatrist' },
      { id: '10', username: 'Dr. Jing Wu', specialization: 'Ophthalmologist' },
      { id: '11', username: 'Dr. Ramesh Singh', specialization: 'Gastroenterologist' },
      { id: '12', username: 'Dr. Nia Jackson', specialization: 'Obstetrician' },
      { id: '13', username: 'Dr. Jean-Louis Laurent', specialization: 'Radiologist' },
      { id: '14', username: 'Dr. Aisha Yusuf', specialization: 'Pulmonologist' },
      { id: '15', username: 'Dr. Oscar Martinez', specialization: 'Urologist' }
    ];
    
    // Dummy messages, defining without specialization text
    const dummyMessages = [
      { _id: '1', text: 'Hi there!', sender: '1', recipient: '2' },
      { _id: '2', text: 'Hello!', sender: '2', recipient: '1' },
      {
        _id: '3',
        text: '', // Leave empty for now
        sender: '1',
        recipient: '2'
      },
    ];
    
    // Populate specialization after defining dummyMessages
    dummyMessages[2].text = `I am your ${dummyUsers.find(user => user.id === '2').specialization}.`;
    
    console.log(dummyMessages);
    


    const onlinePeople = {};
    dummyUsers.forEach(user => {
      onlinePeople[user.id] = user.username;
    });
    setOnlinePeople(onlinePeople);

    setMessages(dummyMessages);
  }

  // Function to check for symptoms and generate automated responses
  function getAutomatedResponse(text) {
    for (const symptom in symptomResponses) {
      if (text.toLowerCase().includes(symptom)) {
        return symptomResponses[symptom];
      }
    }
    return null;
  }

  // Send message and check for automated response
  function sendMessage(ev, file = null) {
    if (ev) ev.preventDefault();
    const newMessage = {
      text: newMessageText,
      sender: id,
      recipient: selectedUserId,
      _id: Date.now(),
      file,
    };
    setMessages(prev => ([...prev, newMessage]));

    // Check if the message text contains a symptom keyword for an automated response
    const automatedResponse = getAutomatedResponse(newMessageText);
    if (automatedResponse) {
      const responseMessage = {
        text: automatedResponse,
        sender: '2', // Assuming Doctor Bob's ID
        recipient: id,
        _id: Date.now() + 1,
      };
      setMessages(prev => ([...prev, responseMessage]));
    }
    
    setNewMessageText('');  // Clear input after sending
  }

  function sendFile(ev) {
    const reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = () => {
      sendMessage(null, {
        name: ev.target.files[0].name,
        data: reader.result,
      });
    };
  }

  const messagesWithoutDupes = uniqBy(messages, '_id');

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="bg-white w-1/3 flex flex-col shadow-lg">
        <div className="flex-grow border-r border-gray-200">
          <Logo />
          <div className="overflow-y-auto mt-4">
            {Object.keys(onlinePeople).map(userId => (
              <Contact
                key={userId}
                id={userId}
                online={true}
                username={onlinePeople[userId]}
                onClick={() => { setSelectedUserId(userId); }}
                selected={userId === selectedUserId} />
            ))}
            {Object.keys(offlinePeople).map(userId => (
              <Contact
                key={userId}
                id={userId}
                online={false}
                username={offlinePeople[userId].username}
                onClick={() => setSelectedUserId(userId)}
                selected={userId === selectedUserId} />
            ))}
          </div>
        </div>
        <div className="p-4 text-center flex items-center justify-center border-t border-gray-200">
          <span className="mr-2 text-sm text-gray-700 flex items-center font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500 mr-1">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
            {username}
            {selectedUserId && onlinePeople[selectedUserId]?.specialization && (
              <span className="ml-2 text-xs text-gray-500">({onlinePeople[selectedUserId].specialization})</span>
            )}
          </span>
          <button onClick={() => alert("Initiating video call...")} className="ml-4 text-sm text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-5 0h6m-6 0l-4.553 2.276A1 1 0 013 15.382V8.618a1 1 0 011.447-.894L10 10" />
            </svg>
            Video Call
          </button>
          <button onClick={() => setId(null)} className="text-sm bg-red-500 py-1 px-3 text-white rounded-full ml-4 hover:bg-red-600">
            Log Out
          </button>
        </div>
      </div>
      <div className="flex flex-col bg-blue-50 w-2/3 p-4">
        <div className="flex-grow">
          {!selectedUserId ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-gray-400 text-lg font-medium">Chat with the best doctors available!</div>
            </div>
          ) : (
            <div className="relative h-full">
              <div className="overflow-y-scroll absolute inset-0 p-4 bg-gray-50 rounded-md shadow-inner">
                {messagesWithoutDupes.map(message => (
                  <div key={message._id} className={message.sender === id ? 'text-right' : 'text-left'}>
                    <div className={`inline-block p-3 my-2 rounded-lg text-sm shadow ${message.sender === id ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>
                      {message.text}
                      {message.file && (
                        <div>
                          <a target="_blank" className="flex items-center gap-1 border-b" href={message.file.data}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                            </svg>
                            {message.file.name}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={divUnderMessages}></div>
              </div>
            </div>
          )}
        </div>
        {!!selectedUserId && (
          <form className="flex gap-3 mt-4" onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessageText}
              onChange={ev => setNewMessageText(ev.target.value)}
              placeholder="Type your message here"
              className="flex-grow bg-white border border-gray-300 rounded-full p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
            <label className="bg-gray-200 p-2 rounded-full cursor-pointer text-gray-500 hover:bg-gray-300">
              <input type="file" className="hidden" onChange={sendFile} />
              Attach
            </label>
            <button type="submit" className="bg-blue-600 p-2 text-white rounded-full hover:bg-blue-700 shadow">
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  )};