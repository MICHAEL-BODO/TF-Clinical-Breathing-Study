import React, { useState, useEffect } from 'react';
import { Users, Activity, Download, RefreshCw, CheckCircle, Clock, AlertCircle, Database, FileText, Activity as ActivityIcon } from 'lucide-react';

const TFClinicalCoordinator = () => {
  const [sessions, setSessions] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);
  const [newParticipant, setNewParticipant] = useState({
    id: '',
    group: '',
    age: '',
    gender: '',
    weight: '',
    height: ''
  });
  const [equipment, setEquipment] = useState({
    viennaTestPre: [],
    nexus: [],
    viennaTestPost: []
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
      downloadCSV: 'Download Master CSV',
      clearData: 'Clear All Data',
      confirmClear: 'Are you sure? This cannot be undone.',
      selectGroup: 'Select Group...',
      selectGender: 'Select...',
      measurementData: 'Measurement Data Collection',
      viennaTestPre: 'Vienna Test Pre-STAI',
      nexusHRV: 'NeXus-32 HRV Data',
      viennaTestPost: 'Vienna Test Post-STAI',
      completePairs: 'Complete Data Pairs',
      successRate: 'Success Rate',
      dataQuality: 'Data Quality',
      markCollected: 'Mark as Collected',
      anxietyChange: 'Anxiety Change',
      adherence: 'Adherence'
    },
    hu: {
      title: 'TF Klinikai Koordinátor',
      activeSessions: 'Aktív Mérések',
      completedToday: 'Mai Befejezett',
      newParticipant: 'Új Résztvevő',
      participantID: 'Azonosító',
      group: 'Csoport',
      age: 'Kor',
      gender: 'Nem',
      weight: 'Súly (kg)',
      height: 'Magasság (cm)',
      male: 'Férfi',
      female: 'Nő',
      register: 'REGISZTRÁCIÓ',
      export: 'EXPORT',
      refresh: 'FRISSÍTÉS',
      noActive: 'Nincs aktív',
      timeRemaining: 'hátralévő',
      groupProgress: 'Csoport Előrehaladás',
      downloadCSV: 'CSV Letöltés',
      clearData: 'Adat Törlés',
      confirmClear: 'Biztos? Nem visszavonható.',
      selectGroup: 'Válassz...',
      selectGender: 'Válassz...',
      measurementData: 'Mérési Adatok',
      viennaTestPre: 'Vienna Test Előzetes',
      nexusHRV: 'NeXus-32 HRV',
      viennaTestPost: 'Vienna Test Utólagos',
      completePairs: 'Teljes Párok',
      successRate: 'Siker Arány',
      dataQuality: 'Adat Minőség',
      markCollected: 'Jelöld Összegyűjtve',
      anxietyChange: 'Szorongás Változás',
      adherence: 'Kitartás'
    }
  };

  const t = translations[language];

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    const storedSessions = JSON.parse(localStorage.getItem('tfClinicalSessions') || '[]');
    const storedParticipants = JSON.parse(localStorage.getItem('tfClinicalParticipants') || '[]');
    const storedEquipment = JSON.parse(localStorage.getItem('tfClinicalEquipment') || '{"viennaTestPre":[],"nexus":[],"viennaTestPost":[]}');
    
    setSessions(storedSessions);
    setParticipants(storedParticipants);
    setEquipment(storedEquipment);

    const now = new Date();
    const active = storedSessions.filter(s => {
      if (!s.endTime) return false;
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

    const updatedParticipants = [...participants, participant];
    localStorage.setItem('tfClinicalParticipants', JSON.stringify(updatedParticipants));
    setParticipants(updatedParticipants);

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

  const markEquipmentCollected = (type, participantId) => {
    const updated = { ...equipment };
    if (!updated[type].includes(participantId)) {
      updated[type].push(participantId);
      localStorage.setItem('tfClinicalEquipment', JSON.stringify(updated));
      setEquipment(updated);
    }
  };

  const exportAllData = () => {
    const masterData = participants.map(p => {
      const session = sessions.find(s => s.participantId === p.id);
      const hasViennaPre = equipment.viennaTestPre.includes(p.id);
      const hasNexus = equipment.nexus.includes(p.id);
      const hasViennaPost = equipment.viennaTestPost.includes(p.id);
      
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
        AnxietyPre: session?.anxietyPreScore || '',
        AnxietyPost: session?.anxietyPostScore || '',
        AnxietyChange: session?.anxietyChange || '',
        CyclesCompleted: session?.cyclesCompleted || '',
        Adherence: session?.adherence || '',
        CompletionStatus: session?.completionStatus || 'Pending',
        ViennaTestPre_File: hasViennaPre ? `VT_${p.id}_PRE.csv` : 'MISSING',
        ViennaTestPre_Collected: hasViennaPre ? 'Yes' : 'No',
        NeXus_File: hasNexus ? `NX_${p.id}.edf` : 'MISSING',
        NeXus_Collected: hasNexus ? 'Yes' : 'No',
        ViennaTestPost_File: hasViennaPost ? `VT_${p.id}_POST.csv` : 'MISSING',
        ViennaTestPost_Collected: hasViennaPost ? 'Yes' : 'No',
        DataComplete: (hasViennaPre && hasNexus && hasViennaPost && session) ? 'Complete' : 'Incomplete'
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
      localStorage.removeItem('tfClinicalEquipment');
      setSessions([]);
      setParticipants([]);
      setEquipment({ viennaTestPre: [], nexus: [], viennaTestPost: [] });
      alert('All data cleared successfully');
    }
  };

  const getGroupStats = () => {
    const stats = {};
    for (let i = 1; i <= 5; i++) {
      const count = participants.filter(p => parseInt(p.group) === i).length;
      stats[i] = count;
    }
    return stats;
  };

  const getDataQualityStats = () => {
    const total = participants.length;
    if (total === 0) return { complete: 0, rate: 0 };
    
    const complete = participants.filter(p => {
      const hasSession = sessions.some(s => s.participantId === p.id);
      const hasViennaPre = equipment.viennaTestPre.includes(p.id);
      const hasNexus = equipment.nexus.includes(p.id);
      const hasViennaPost = equipment.viennaTestPost.includes(p.id);
      return hasSession && hasViennaPre && hasNexus && hasViennaPost;
    }).length;

    return {
      complete,
      rate: Math.round((complete / total) * 100)
    };
  };

  const groupStats = getGroupStats();
  const totalCompleted = sessions.length;
  const dataQuality = getDataQualityStats();

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.completePairs}</p>
                <p className="text-4xl font-bold text-purple-600">{dataQuality.complete}/50</p>
              </div>
              <Database size={48} className="text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <button
              onClick={loadData}
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

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <Database className="text-purple-600" />
            {t.measurementData}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <FileText className="text-blue-600" size={32} />
                <span className="text-3xl font-bold text-blue-600">
                  {equipment.viennaTestPre.length}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700">{t.viennaTestPre}</p>
              <p className="text-xs text-gray-500">CSV Files Collected</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <div className="flex items-center justify-between mb-2">
                <ActivityIcon className="text-green-600" size={32} />
                <span className="text-3xl font-bold text-green-600">
                  {equipment.nexus.length}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700">{t.nexusHRV}</p>
              <p className="text-xs text-gray-500">EDF Files Collected</p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <FileText className="text-orange-600" size={32} />
                <span className="text-3xl font-bold text-orange-600">
                  {equipment.viennaTestPost.length}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700">{t.viennaTestPost}</p>
              <p className="text-xs text-gray-500">CSV Files Collected</p>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-800">{t.dataQuality}</p>
                <p className="text-sm text-gray-600">
                  {dataQuality.complete} complete data pairs out of {participants.length} participants
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-purple-600">{dataQuality.rate}%</p>
                <p className="text-sm text-gray-600">{t.successRate}</p>
              </div>
            </div>
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
                          <p className="text-xs text-gray-500 mt-1">
                            Pre-anxiety: {session.anxietyPreScore}
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

            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-semibold text-gray-700">Recent Completions</h3>
              {sessions.slice(-5).reverse().map((session, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm">{session.participantId}</p>
                      <p className="text-xs text-gray-600">Group {session.group}</p>
                    </div>
                    <div className="text-right text-xs">
                      <p className={`font-semibold ${session.anxietyChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {t.anxietyChange}: {session.anxietyChange}
                      </p>
                      <p className="text-gray-600">{t.adherence}: {session.adherence}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">{t.markCollected}</h3>
              <div className="space-y-2">
                {participants.slice(-3).reverse().map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="font-medium">{p.id}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => markEquipmentCollected('viennaTestPre', p.id)}
                        className={`px-2 py-1 rounded text-xs ${
                          equipment.viennaTestPre.includes(p.id)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        Pre
                      </button>
                      <button
                        onClick={() => markEquipmentCollected('nexus', p.id)}
                        className={`px-2 py-1 rounded text-xs ${
                          equipment.nexus.includes(p.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        NX
                      </button>
                      <button
                        onClick={() => markEquipmentCollected('viennaTestPost', p.id)}
                        className={`px-2 py-1 rounded text-xs ${
                          equipment.viennaTestPost.includes(p.id)
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
