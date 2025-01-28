import React, { useState, useEffect } from 'react';

const Reminder = () => {
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [times, setTimes] = useState('');

  // Request notification permission on load
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const addMedicine = () => {
    if (!medicineName || !dosage || !frequency || !times) {
      alert('Please fill in all fields');
      return;
    }

    const newMedicine = {
      id: Date.now(),
      name: medicineName,
      dosage,
      frequency,
      times: times.split(',').map(time => time.trim()),
    };

    setMedicines([...medicines, newMedicine]);
    setMedicineName('');
    setDosage('');
    setFrequency('');
    setTimes('');

    // Show popup immediately with the medicine details
    alert(`TIME FOR THE MEDICINE!\nName: ${newMedicine.name}\nDosage: ${newMedicine.dosage}\nTimes: ${newMedicine.times.join(', ')}`);
  };

  const deleteMedicine = (id) => {
    setMedicines(medicines.filter(medicine => medicine.id !== id));
  };

  const sendAlertNotification = (medicine) => {
    alert(`Time to take your medicine: ${medicine.name}\nDosage: ${medicine.dosage}`);
  };

  // Check every minute if it's time for any medication
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      medicines.forEach(medicine => {
        if (medicine.times.includes(currentTime)) {
          sendAlertNotification(medicine);
        }
      });
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [medicines]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-50 text-teal-900">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">Medicine Reminder</h1>
  
        <input
          type="text"
          placeholder="Medicine Name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          className="w-full p-3 mb-3 border border-teal-200 bg-teal-50 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-300 text-teal-900"
        />
        <input
          type="text"
          placeholder="Dosage (e.g., 500mg)"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          className="w-full p-3 mb-3 border border-teal-200 bg-teal-50 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-300 text-teal-900"
        />
        <input
          type="text"
          placeholder="Frequency (e.g., twice a day)"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full p-3 mb-3 border border-teal-200 bg-teal-50 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-300 text-teal-900"
        />
        <input
          type="text"
          placeholder="Times (e.g., 9:00 AM, 5:00 PM)"
          value={times}
          onChange={(e) => setTimes(e.target.value)}
          className="w-full p-3 mb-3 border border-teal-200 bg-teal-50 rounded-lg focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-300 text-teal-900"
        />
  
        <button
          onClick={addMedicine}
          className="w-full p-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-300"
        >
          Add Medicine
        </button>
  
        <div className="mt-6">
          {medicines.map((medicine) => (
            <div key={medicine.id} className="p-4 mb-4 bg-teal-50 rounded-lg shadow-sm border border-teal-200">
              <h3 className="text-lg font-semibold text-teal-700">{medicine.name}</h3>
              <p className="text-teal-600">Dosage: {medicine.dosage}</p>
              <p className="text-teal-600">Frequency: {medicine.frequency}</p>
              <p className="text-teal-600">Times: {medicine.times.join(', ')}</p>
              <button
                onClick={() => deleteMedicine(medicine.id)}
                className="mt-2 px-3 py-1 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reminder;
