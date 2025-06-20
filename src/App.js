import React, { useState, useEffect } from "react";

const generalSymptoms = [
  "Fatigue", "Fever", "Cough", "Congestion", "Headache",
  "MS symptoms (numbness, tingling, etc.)", "Shortness of breath", "Other"
];

const vaginalSymptoms = [
  "Pain or burning", "Unusual discharge", "Itching or irritation",
  "Frequent or urgent urination", "Pelvic or cramping pain"
];

export default function SymptomTracker() {
  const [entries, setEntries] = useState(() => {
  const saved = localStorage.getItem("symptomEntries");
  return saved ? JSON.parse(saved) : [];
});

const [todaySymptoms, setTodaySymptoms] = useState({});
const [vaginalToday, setVaginalToday] = useState({});
const [note, setNote] = useState("");

// Save to localStorage anytime entries change
useEffect(() => {
  localStorage.setItem("symptomEntries", JSON.stringify(entries));
}, [entries]);

const handleSubmit = () => {
  const date = new Date().toISOString().split("T")[0];
  const newEntry = {
    date,
    symptoms: todaySymptoms,
    vaginal: vaginalToday,
    note
  };
  setEntries([...entries, newEntry]);
  setTodaySymptoms({});
  setVaginalToday({});
  setNote("");
};


  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daily Symptom Tracker</h1>
      <h2 className="text-lg font-semibold mt-4">General Symptoms</h2>
      <div className="mb-4">
        {generalSymptoms.map(symptom => (
          <div key={symptom} className="mb-1">
            <label className="flex items-center">
    <input
       type="checkbox"
       id={symptom}
        checked={todaySymptoms[symptom] === true}
        onChange={(e) =>
          setTodaySymptoms({
            ...todaySymptoms,
            [symptom]: e.target.checked,
          })
        }
  />
              {symptom}
            </label>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-semibold mt-4">Vaginal & Urinary Symptoms</h2>
      <div className="mb-4">
        {vaginalSymptoms.map(symptom => (
          <div key={symptom} className="mb-1">
            <label className="flex items-center">
<input
  type="checkbox"
  id={symptom}
  checked={vaginalToday[symptom] === true}
  onChange={(e) =>
    setVaginalToday({
      ...vaginalToday,
      [symptom]: e.target.checked,
    })
  }
/>
              {symptom}
            </label>
          </div>
        ))}
      </div>
      <textarea className="w-full mt-2 p-2 border rounded" rows="3"
        placeholder="Additional notes (e.g. meds, stress, food, etc.)"
        value={note} onChange={(e) => setNote(e.target.value)}></textarea>
      <button onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2">
        Save Today
      </button>
      <h2 className="text-xl font-semibold mt-6">Past Entries</h2>
      <ul className="mt-2 space-y-2">
        {entries.map((entry, index) => (
          <li key={index} className="p-2 border rounded">
            <strong>{entry.date}</strong>
            <div className="text-sm">
              <div><span className="font-semibold">General:</span> {Object.keys(entry.symptoms).filter(s => entry.symptoms[s]).join(", ")}</div>
              <div><span className="font-semibold">Vaginal/Urinary:</span> {Object.keys(entry.vaginal).filter(s => entry.vaginal[s]).join(", ")}</div>
              {entry.note && <div className="mt-1 italic">Note: {entry.note}</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 
