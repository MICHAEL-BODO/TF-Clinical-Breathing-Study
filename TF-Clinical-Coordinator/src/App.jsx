import React, { useState, useEffect } from 'react';
import { Users, Activity, Download, RefreshCw, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const TFClinicalCoordinator = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);
  const [newParticipant, setNewParticipant] = useState({
    id: '',
    group: '',
    age: '',
    gender: '',
    weight: '',
    height: ''
  });
  const [language, setLanguage] = useState('en');

  const techniques = {
    1: { name: 'Box Breathing (4-4-4-4)', color: 'blue' },
    2: { name: '4-7-8 Breathing', color: 'green' },
    3: { name: 'Coherence/HRV Breathing', color: 'purple' },
    4: { name: 'Physiological Sigh', color: 'orange' },
    5: { name: 'Breath Hold/Buteyko', color: 'red' }
  };

  const translations = {
    en: {
      title: 'TF Clinical Study Coordinator',
      activeSessions: 'Active Sessions',
      completedToday: 'Completed Today',
      newParticipant: 'Register New Participant',
      participantID: 'Participant ID',
      group: 'Group',
      age: 'Age',
      gender: 'Gender',
      weight: 'Weight (kg)',
      height: 'Height (cm)',
      male: 'Male',
      female: 'Female',
      register: 'REGISTER PARTICIPANT',
      export: 'EXPORT ALL DATA',
      refresh: 'REFRESH',
      noActive: 'No active sessions',
      timeRemaining: 'remaining',
      groupProgress: 'Group Progress',
      station: 'Station',
      status: 'Status',
      started: 'Started',
      completed: 'Completed',
      downloadCSV: 'Download Master CSV',
      clearData: 'Clear All Data',
      confirmClear: 'Are you sure you want to clear all session data? This cannot be undone.',
      selectGroup: 'Select Group...',
      selectGender: 'Select...'
    },
    hu: {
      title: 'TF Klinikai Tanulmány Koordinátor',
      activeSessions: 'Aktív Mérések',
      completedToday: 'Mai Befejezett Mérések',
      newParticipant: 'Új Résztvevő Regisztrálása',
      participantID: 'Résztvevő Azonosító',
      group: 'Csoport',
      age: 'Kor',
      gender: 'Nem',
      weight: 'Súly (kg)',
      height: 'Magasság (cm)',
      male: 'Férfi',
      female: 'Nő',
      register: 'RÉSZTVEVŐ REGISZTRÁLÁSA',
      export: 'ÖSSZES ADAT EXPORTÁLÁSA',
      refresh: 'FRISSÍTÉS',
      noActive: 'Nincsenek aktív mérések',
      timeRemaining: 'hátralévő',
      groupProgress: 'Csoport Előrehaladás',
      station: 'Állomás',
      status: 'Státusz',
      started: 'Elindítva',
      completed: 'Befejezve',
      downloadCSV: 'Mester CSV Letöltése',
      clearData: 'Összes Adat Törlése',
      confirmClear: 'Biztosan törölni szeretné az összes mérési adatot? Ez a művelet nem vonható vissza.',
      selectGroup: 'Válassz Csoportot...',
      selectGender: 'Válassz...'
    }
  };

  const t = translations[language];

  useEffect(() => {
    loadSessions();
    const interval = setInterval(loadSessions, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadSessions = () => {
    const storedSessions = JSON.parse(localStorage.getItem('tfClinicalSessions') || '[]');
    setSessions(storedSessions);

    const now = new Date();
    const active = storedSessions.filter(s => {
      const endTime = new Date(s.endTime);
      const timeDiff = (endTime - now) / 1000;
      return timeDiff > -60 && timeDiff < 300;
    });
    setActiveSessions(active);
  };

  const handleRegister = () => {
    if (!newParticipant.id || !newParticipant.group) {
      alert('Please fill in Participant ID and Group');
      return;
    }

    const participant = {
      ...newParticipant,
      registeredAt: new Date().toISOString(),
      technique: techniques[newParticipant.group].name
    };

    const participants = JSON.parse(localStorage.getItem('tfClinicalParticipants') || '[]');
    participants.push(participant);
    localStorage.setItem('tfClinicalParticipants', JSON.stringify(participants));

    setNewParticipant({
      id: '',
      group: '',
      age: '',
      gender: '',
      weight: '',
      height: ''
    });

    alert(`Participant ${participant.id} registered successfully!`);
  };

  const exportAllData = () => {
    const participants = JSON.parse(localStorage.getItem('tfClinicalParticipants') || '[]');
    const sessions = JSON.parse(localStorage.getItem('tfClinicalSessions') || '[]');

    const masterData = participants.map(p => {
      const session = sessions.find(s => s.participantId === p.id);
      return {
        ParticipantID: p.id,
        Group: p.group,
        Technique: p.technique,
        Age: p.age,
        Gender: p.gender,
        Weight_kg: p.weight,
        Height_cm: p.height,
        RegisteredAt: p.registeredAt,
        SessionStart: session?.startTime || '',
        SessionEnd: session?.endTime || '',
        CyclesCompleted: session?.cyclesCompleted || '',
        CompletionStatus: session?.completionStatus || 'Pending',
        ViennaTestPre_File: `VT_${p.id}_PRE.csv`,
        NeXus_File: `NX_${p.id}.edf`,
        ViennaTestPost_File: `VT_${p.id}_POST.csv`
      };
    });

    const headers = Object.keys(masterData[0] || {});
    const csvContent = [
      headers.join(','),
      ...masterData.map(row => headers.map(h => row[h]).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TF_Clinical_Master_Data_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    if (window.confirm(t.confirmClear)) {
      localStorage.removeItem('tfClinicalSessions');
      localStorage.removeItem('tfClinicalParticipants');
      setSessions([]);
      setActiveSessions([]);
      alert('All data cleared successfully');
    }
  };

  const getGroupStats = () => {
    const participants = JSON.parse(localStorage.getItem('tfClinicalParticipants') || '[]');
    const stats = {};
    for (let i = 1; i <= 5; i++) {
      const count = participants.filter(p => parseInt(p.group) === i).length;
      stats[i] = count;
    }
    return stats;
  };

  const groupStats = getGroupStats();
  const totalCompleted = sessions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <Activity className="text-blue-600" />
            {t.title}
          </h1>
          <button
            onClick={() => setLanguage(language === 'en' ? 'hu' : 'en')}
            className="px-4 py-2 bg-white rounded-lg shadow text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {language === 'en' ? '🇭🇺 Magyar' : '🇬🇧 English'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.completedToday}</p>
                <p className="text-4xl font-bold text-green-600">{totalCompleted}/50</p>
              </div>
              <CheckCircle size={48} className="text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.activeSessions}</p>
                <p className="text-4xl font-bold text-blue-600">{activeSessions.length}</p>
              </div>
              <Clock size={48} className="text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <button
              onClick={loadSessions}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <RefreshCw size={20} />
              {t.refresh}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{t.groupProgress}</h2>
          <div className="space-y-3">
            {Object.entries(techniques).map(([key, tech]) => (
              <div key={key} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium text-gray-700">
                  {t.group} {key}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500 flex items-center justify-end px-3"
                    style={{ width: `${(groupStats[key] / 10) * 100}%` }}
                  >
                    <span className="text-white font-bold text-sm">
                      {groupStats[key]}/10
                    </span>
                  </div>
                </div>
                <div className="w-48 text-sm text-gray-600">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{t.activeSessions}</h2>
            {activeSessions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle size={48} className="mx-auto mb-2 opacity-50" />
                <p>{t.noActive}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeSessions.map((session, idx) => {
                  const endTime = new Date(session.endTime);
                  const now = new Date();
                  const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
                  const mins = Math.floor(remaining / 60);
                  const secs = remaining % 60;

                  return (
                    <div key={idx} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-lg">{session.participantId}</p>
                          <p className="text-sm text-gray-600">
                            {t.group} {session.group} - {session.technique}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-mono font-bold text-blue-600">
                            {mins}:{secs.toString().padStart(2, '0')}
                          </p>
                          <p className="text-xs text-gray-500">{t.timeRemaining}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{t.newParticipant}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.participantID} *
                </label>
                <input
                  type="text"
                  value={newParticipant.id}
                  onChange={(e) => setNewParticipant({...newParticipant, id: e.target.value})}
                  placeholder="P-001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.group} *
                </label>
                <select
                  value={newParticipant.group}
                  onChange={(e) => setNewParticipant({...newParticipant, group: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t.selectGroup}</option>
                  {Object.entries(techniques).map(([key, tech]) => (
                    <option key={key} value={key}>
                      {t.group} {key}: {tech.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.age}
                  </label>
                  <input
                    type="number"
                    value={newParticipant.age}
                    onChange={(e) => setNewParticipant({...newParticipant, age: e.target.value})}
                    placeholder="22"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.gender}
                  </label>
                  <select
                    value={newParticipant.gender}
                    onChange={(e) => setNewParticipant({...newParticipant, gender: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{t.selectGender}</option>
                    <option value="M">{t.male}</option>
                    <option value="F">{t.female}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.weight}
                  </label>
                  <input
                    type="number"
                    value={newParticipant.weight}
                    onChange={(e) => setNewParticipant({...newParticipant, weight: e.target.value})}
                    placeholder="70"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.height}
                  </label>
                  <input
                    type="number"
                    value={newParticipant.height}
                    onChange={(e) => setNewParticipant({...newParticipant, height: e.target.value})}
                    placeholder="175"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleRegister}
                className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Users size={20} />
                {t.register}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{t.export}</h2>
          <div className="flex gap-4">
            <button
              onClick={exportAllData}
              className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={20} />
              {t.downloadCSV}
            </button>
            <button
              onClick={clearAllData}
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
            >
              {t.clearData}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TFClinicalCoordinator;
