import React, { useState } from 'react';

const SymptomSelection = () => {
  const [symptoms, setSymptoms] = useState({
    nausea: 'low',
    headaches: 'low',
    fever: 'low',
    bodyPains: 'low',
    breathlessness: 'low',
  });
  const [tips, setTips] = useState({
    nausea: '',
    headaches: '',
    fever: '',
    bodyPains: '',
    breathlessness: '',
  });

  const remedies = {
    nausea: {
      low: "Try sipping ginger tea or cold water to relieve mild nausea.",
      medium: "Avoid strong odors and try eating bland foods.",
      high: "Consider medication for nausea and stay hydrated. Consult a doctor if persistent.",
    },
    headaches: {
      low: "Rest in a dark, quiet room and try gentle neck stretches.",
      medium: "Drink water and try an over-the-counter pain reliever.",
      high: "Consider seeking medical attention for severe headaches.",
    },
    fever: {
      low: "Drink plenty of fluids and rest.",
      medium: "Use a cold compress and take fever-reducing medication if needed.",
      high: "High fever requires medical attention; contact your healthcare provider.",
    },
    bodyPains: {
      low: "Try light stretching or a warm bath for relief.",
      medium: "Consider over-the-counter pain relief and rest.",
      high: "For severe body pains, consult a doctor and avoid physical exertion.",
    },
    breathlessness: {
      low: "Practice deep breathing exercises to ease mild breathlessness.",
      medium: "Sit upright and focus on slow, deep breaths.",
      high: "Severe breathlessness may indicate a serious condition; seek medical help immediately.",
    },
    soreThroat: {
      low: "Gargle with warm salt water and stay hydrated.",
      medium: "Sip warm tea with honey, and use throat lozenges for relief.",
      high: "If pain persists or worsens, consult a doctor to rule out an infection.",
    },
    fatigue: {
      low: "Take short breaks and try gentle stretching or walking.",
      medium: "Ensure you’re staying hydrated and consider adjusting your sleep schedule.",
      high: "Persistent fatigue may require a medical evaluation.",
    },
    dizziness: {
      low: "Sit or lie down until it passes and drink water.",
      medium: "Avoid sudden movements and try eating something light.",
      high: "Severe or recurring dizziness warrants medical attention.",
    },
    stomachAche: {
      low: "Try drinking warm water and avoid spicy or fatty foods.",
      medium: "Use a heating pad on the stomach, and consider an over-the-counter antacid.",
      high: "Severe pain or cramping may need medical attention.",
    },
    congestion: {
      low: "Use a humidifier or inhale steam for relief.",
      medium: "Try a saline nasal spray and stay hydrated.",
      high: "Severe congestion, especially with fever, may require seeing a doctor.",
    },
    anxiety: {
      low: "Practice deep breathing and mindfulness exercises.",
      medium: "Engage in light exercise or talk to a friend for support.",
      high: "If anxiety is affecting daily life, consider consulting a mental health professional.",
    },
    cough: {
      low: "Sip warm tea with honey and avoid irritants like smoke.",
      medium: "Use a cough suppressant and stay hydrated.",
      high: "Persistent or worsening cough may need medical evaluation.",
    },
    eyeStrain: {
      low: "Rest your eyes and follow the 20-20-20 rule (look at something 20 feet away for 20 seconds every 20 minutes).",
      medium: "Use artificial tears or eye drops for moisture.",
      high: "If pain or vision issues persist, consult an eye doctor.",
    },
    backPain: {
      low: "Try gentle stretching and avoid heavy lifting.",
      medium: "Use a warm compress and consider over-the-counter pain relief.",
      high: "Severe back pain may need medical evaluation, especially if it affects movement.",
    },
    allergies: {
      low: "Rinse nasal passages with saline and keep windows closed to limit exposure.",
      medium: "Consider using over-the-counter antihistamines.",
      high: "For severe allergic reactions, seek medical help immediately.",
    },
    indigestion: {
      low: "Avoid large meals and drink water between meals.",
      medium: "Try an antacid or digestive enzyme supplement.",
      high: "Frequent indigestion may need a medical evaluation.",
    },
  };
  

  const handleSymptomChange = (e) => {
    const { name, value } = e.target;
    setSymptoms((prevSymptoms) => ({
      ...prevSymptoms,
      [name]: value,
    }));
    setTips((prevTips) => ({
      ...prevTips,
      [name]: remedies[name][value],
    }));
  };

  const handleDescriptionChange = (e) => {
    setSymptoms((prevSymptoms) => ({
      ...prevSymptoms,
      description: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let summary = "Selected Symptoms and Remedies:\n";
  
    Object.keys(symptoms).forEach((symptom) => {
      if (remedies[symptom]) {
        const severity = symptoms[symptom];
        const remedy = remedies[symptom][severity];
        summary += `${symptom.charAt(0).toUpperCase() + symptom.slice(1)} (${severity}): ${remedy}\n`;
      }
    });
  
    console.log(summary);
    alert(summary);  // Optionally, display the summary in an alert
  };
  

  return (
    <div className="flex flex-col items-center p-6 bg-teal-50 min-h-screen text-teal-900">
      <h2 className="text-3xl font-bold mb-6 text-teal-700">Select Your Symptoms</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg bg-white shadow-lg rounded-lg p-6 border border-teal-100">
        {['nausea', 'headaches', 'fever', 'bodyPains', 'breathlessness'].map((symptom) => (
          <div key={symptom} className="mb-5">
            <label className="block text-sm font-semibold text-teal-800 capitalize">{symptom}:</label>
            <select
              name={symptom}
              value={symptoms[symptom]}
              onChange={handleSymptomChange}
              className="w-full mt-1 p-2 border border-teal-200 rounded-md focus:border-teal-400 focus:ring-teal-400 bg-teal-50 text-teal-900"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <p className="mt-2 text-sm text-teal-600 italic">{tips[symptom]}</p>
          </div>
        ))}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-teal-800">Descriptive Answer:</label>
          <textarea
            name="description"
            value={symptoms.description}
            onChange={handleDescriptionChange}
            className="w-full mt-1 p-3 border border-teal-200 rounded-md focus:border-teal-400 focus:ring-teal-400 bg-teal-50 text-teal-900"
            placeholder="Describe your symptoms here..."
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  )};
          

export default SymptomSelection;
