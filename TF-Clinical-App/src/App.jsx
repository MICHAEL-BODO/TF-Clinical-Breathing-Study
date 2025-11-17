import React, { useState, useEffect, useMemo } from 'react';
import { Circle, Square, Wind, Waves, Timer } from 'lucide-react';

const TFClinicalBreathingApp = () => {
  const [screen, setScreen] = useState('checkin');
  const [participantId, setParticipantId] = useState('');
  const [group, setGroup] = useState(null);
  const [anxietyPreScore, setAnxietyPreScore] = useState(10);
  const [anxietyPostScore, setAnxietyPostScore] = useState(10);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [isActive, setIsActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [phaseTimer, setPhaseTimer] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [language, setLanguage] = useState('en');
  const [sessionStartTime, setSessionStartTime] = useState(null);

  const techniques = useMemo(() => ({
    1: {
      name: { en: 'Box Breathing', hu: 'Négyzet Légzés' },
      nameShort: 'Box Breathing (4-4-4-4)',
      phases: [
        { name: 'inhale', duration: 4, label: { en: 'Breathe In', hu: 'Lélegezz be' } },
        { name: 'hold1', duration: 4, label: { en: 'Hold', hu: 'Tartsd' } },
        { name: 'exhale', duration: 4, label: { en: 'Breathe Out', hu: 'Lélegezz ki' } },
        { name: 'hold2', duration: 4, label: { en: 'Hold', hu: 'Tartsd' } }
      ],
      instructions: {
        en: 'Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds.',
        hu: 'Lélegezz be 4 másodpercig, tartsd 4 másodpercig, lélegezz ki 4 másodpercig, tartsd 4 másodpercig.'
      },
      icon: Square
    },
    2: {
      name: { en: '4-7-8 Breathing', hu: '4-7-8 Légzés' },
      nameShort: '4-7-8 Breathing',
      phases: [
        { name: 'inhale', duration: 4, label: { en: 'Breathe In', hu: 'Lélegezz be' } },
        { name: 'hold', duration: 7, label: { en: 'Hold', hu: 'Tartsd' } },
        { name: 'exhale', duration: 8, label: { en: 'Breathe Out', hu: 'Lélegezz ki' } }
      ],
      instructions: {
        en: 'Breathe in through nose for 4 seconds, hold for 7 seconds, breathe out through mouth for 8 seconds.',
        hu: 'Lélegezz be az orrodon 4 másodpercig, tartsd 7 másodpercig, lélegezz ki a szádon 8 másodpercig.'
      },
      icon: Circle
    },
    3: {
      name: { en: 'Coherence Breathing', hu: 'Koherencia Légzés' },
      nameShort: 'Coherence/HRV Breathing',
      phases: [
        { name: 'inhale', duration: 6, label: { en: 'Breathe In', hu: 'Lélegezz be' } },
        { name: 'exhale', duration: 6, label: { en: 'Breathe Out', hu: 'Lélegezz ki' } }
      ],
      instructions: {
        en: 'Breathe in for 6 seconds, breathe out for 6 seconds. Smooth rhythm (5 breaths/min).',
        hu: 'Lélegezz be 6 másodpercig, lélegezz ki 6 másodpercig. Sima ritmus (5 lélegzet/perc).'
      },
      icon: Waves
    },
    4: {
      name: { en: 'Physiological Sigh', hu: 'Fiziológiai Sóhaj' },
      nameShort: 'Physiological Sigh',
      phases: [
        { name: 'inhale1', duration: 2, label: { en: 'Breathe In', hu: 'Lélegezz be' } },
        { name: 'inhale2', duration: 1, label: { en: 'Breathe In More', hu: 'Még többet' } },
        { name: 'exhale', duration: 6, label: { en: 'Long Exhale', hu: 'Hosszú kilégzés' } }
      ],
      instructions: {
        en: 'Deep breath in, quick breath in to fill lungs, slow exhale for 6 seconds.',
        hu: 'Mély belégzés, gyors belégzés a tüdő megtöltéséhez, lassú kilégzés 6 másodpercig.'
      },
      icon: Wind
    },
    5: {
      name: { en: 'Breath Hold', hu: 'Légzésvisszatartás' },
      nameShort: 'Breath Hold/Buteyko',
      phases: [
        { name: 'breathe', duration: 3, label: { en: 'Normal Breath', hu: 'Normál légzés' } },
        { name: 'hold', duration: 10, label: { en: 'Hold (comfortable)', hu: 'Tartsd' } },
        { name: 'recover', duration: 5, label: { en: 'Recovery', hu: 'Helyreállítás' } }
      ],
      instructions: {
        en: 'Normal breath, hold comfortably (not to maximum), breathe normally to recover.',
        hu: 'Normál légzés, tartsd kényelmesen (ne maximumig), lélegezz normálisan.'
      },
      icon: Timer
    }
  }), []);

  const translations = {
    en: {
      title: 'TF Clinical Breathing Study',
      checkinTitle: 'Participant Check-In',
      enterID: 'Enter Your Participant ID:',
      assignedTo: 'You are assigned to:',
      start: 'START',
      instructions: 'Instructions',
      youWillPractice: 'You will practice',
      for5min: 'for 5 minutes',
      followVisual: '• Follow the visual guide',
      stayRelaxed: '• Stay relaxed and comfortable',
      notifyResearcher: '• The researcher will attach sensors now',
      readyStart: 'READY - START EXERCISE',
      sessionComplete: 'Session Complete!',
      notifyResearcherComplete: 'Please notify the researcher.',
      dataRecorded: 'Your data has been recorded.',
      finish: 'FINISH',
      timeRemaining: 'Time Remaining',
      cycle: 'Cycle',
      invalidID: 'Please enter a valid Participant ID',
      groupLabel: 'Group',
      anxietyRating: 'Anxiety Rating',
      anxietyQuestion: 'How anxious do you feel right now?',
      anxietyScale: '0 = No anxiety, 21 = Extreme anxiety',
      continueBtn: 'CONTINUE',
      preAnxiety: 'Pre-Session Anxiety Assessment',
      postAnxiety: 'Post-Session Anxiety Assessment'
    },
    hu: {
      title: 'TF Klinikai Légzésvizsgálat',
      checkinTitle: 'Résztvevő Bejelentkezés',
      enterID: 'Résztvevő Azonosító:',
      assignedTo: 'Csoportod:',
      start: 'KEZDÉS',
      instructions: 'Utasítások',
      youWillPractice: 'Gyakorolni fogod:',
      for5min: '5 percig',
      followVisual: '• Kövesd a vizuális útmutatót',
      stayRelaxed: '• Maradj ellazult',
      notifyResearcher: '• A kutató felhelyezi az érzékelőket',
      readyStart: 'KÉSZ - KEZDÉS',
      sessionComplete: 'Mérés Befejezve!',
      notifyResearcherComplete: 'Értesítsd a kutatót.',
      dataRecorded: 'Az adataid rögzítve.',
      finish: 'BEFEJEZÉS',
      timeRemaining: 'Hátralévő idő',
      cycle: 'Ciklus',
      invalidID: 'Érvényes azonosítót adj meg',
      groupLabel: 'Csoport',
      anxietyRating: 'Szorongás Értékelés',
      anxietyQuestion: 'Mennyire vagy szorongó most?',
      anxietyScale: '0 = Nincs szorongás, 21 = Extrém szorongás',
      continueBtn: 'FOLYTATÁS',
      preAnxiety: 'Mérés Előtti Szorongás',
      postAnxiety: 'Mérés Utáni Szorongás'
    }
  };

  const t = translations[language];

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeRemaining === 0 && isActive) {
      setIsActive(false);
      setScreen('postAnxiety');
    }
  }, [isActive, timeRemaining]);

  useEffect(() => {
    if (isActive && group) {
      const currentPhase = techniques[group].phases.find(p => p.name === breathPhase);
      if (!currentPhase) return;

      const interval = setInterval(() => {
        setPhaseTimer(prev => {
          if (prev >= currentPhase.duration) {
            const currentIndex = techniques[group].phases.findIndex(p => p.name === breathPhase);
            const nextIndex = (currentIndex + 1) % techniques[group].phases.length;
            setBreathPhase(techniques[group].phases[nextIndex].name);
            
            if (nextIndex === 0) {
              setCycleCount(prev => prev + 1);
            }
            
            if (navigator.vibrate) {
              navigator.vibrate(100);
            }
            
            return 0;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
 }, [isActive, breathPhase, group, techniques]);

  const handleCheckin = () => {
    if (!participantId || !group) {
      alert(t.invalidID);
      return;
    }
    setScreen('preAnxiety');
  };

  const handlePreAnxietyContinue = () => {
    setScreen('instructions');
  };

  const startBreathing = () => {
    setScreen('breathing');
    setIsActive(true);
    setSessionStartTime(new Date().toISOString());
    setBreathPhase(techniques[group].phases[0].name);
    setPhaseTimer(0);
    setCycleCount(0);
  };

  const handlePostAnxietyContinue = () => {
    saveSessionData();
    setScreen('complete');
  };

  const saveSessionData = () => {
    const sessionData = {
      participantId,
      group,
      technique: techniques[group].nameShort,
      anxietyPreScore,
      anxietyPostScore,
      anxietyChange: anxietyPreScore - anxietyPostScore,
      startTime: sessionStartTime,
      endTime: new Date().toISOString(),
      cyclesCompleted: cycleCount,
      completionStatus: 'Complete',
      adherence: Math.round((cycleCount / (300 / techniques[group].phases.reduce((a,p) => a + p.duration, 0))) * 100)
    };

    const existingSessions = JSON.parse(localStorage.getItem('tfClinicalSessions') || '[]');
    existingSessions.push(sessionData);
    localStorage.setItem('tfClinicalSessions', JSON.stringify(existingSessions));
    
    console.log('Session saved:', sessionData);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderBreathingAnimation = () => {
    if (!group) return null;

    const technique = techniques[group];
    const currentPhase = technique.phases.find(p => p.name === breathPhase);
    if (!currentPhase) return null;

    const progress = phaseTimer / currentPhase.duration;
    const Icon = technique.icon;

    let scale = 1;
    let opacity = 1;

    if (breathPhase.includes('inhale')) {
      scale = 1 + (progress * 0.5);
    } else if (breathPhase.includes('exhale')) {
      scale = 1.5 - (progress * 0.5);
    } else if (breathPhase.includes('hold')) {
      scale = 1.5;
      opacity = 0.5 + (Math.sin(progress * Math.PI * 4) * 0.3);
    }

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative mb-8">
          <div 
            className="transition-all duration-1000 ease-in-out"
            style={{ 
              transform: `scale(${scale})`,
              opacity: opacity
            }}
          >
            <Icon size={200} className="text-blue-500" strokeWidth={1.5} />
          </div>
        </div>

        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800 mb-2">
            {currentPhase.label[language]}
          </div>
          <div className="text-6xl font-mono text-blue-600 mb-8">
            {currentPhase.duration - phaseTimer}
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="text-xl text-gray-600 mb-2">{t.timeRemaining}</div>
          <div className="text-3xl font-bold text-gray-800">{formatTime(timeRemaining)}</div>
          <div className="text-lg text-gray-500 mt-4">{t.cycle} {cycleCount}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'hu' : 'en')}
            className="px-4 py-2 bg-white rounded-lg shadow text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {language === 'en' ? '🇭🇺 Magyar' : '🇬🇧 English'}
          </button>
        </div>

        {screen === 'checkin' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              {t.title}
            </h1>
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">
              {t.checkinTitle}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {t.enterID}
                </label>
                <input
                  type="text"
                  value={participantId}
                  onChange={(e) => setParticipantId(e.target.value)}
                  placeholder="P-001"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {t.groupLabel}:
                </label>
                <select
                  value={group || ''}
                  onChange={(e) => setGroup(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Group...</option>
                  {Object.entries(techniques).map(([key, tech]) => (
                    <option key={key} value={key}>
                      {t.groupLabel} {key}: {tech.name[language]}
                    </option>
                  ))}
                </select>
              </div>

              {group && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-lg">
                    <span className="font-semibold">{t.assignedTo}</span>
                  </p>
                  <p className="text-xl font-bold text-blue-600 mt-2">
                    {t.groupLabel} {group} - {techniques[group].name[language]}
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckin}
                disabled={!participantId || !group}
                className="w-full py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {t.start}
              </button>
            </div>
          </div>
        )}

        {screen === 'preAnxiety' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              {t.preAnxiety}
            </h2>

            <div className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <p className="text-xl font-semibold mb-2">{t.anxietyQuestion}</p>
                <p className="text-gray-600">{t.anxietyScale}</p>
              </div>

              <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-700">
                  {t.anxietyRating}: <span className="text-3xl font-bold text-blue-600">{anxietyPreScore}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="21"
                  value={anxietyPreScore}
                  onChange={(e) => setAnxietyPreScore(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0 - No anxiety</span>
                  <span>21 - Extreme anxiety</span>
                </div>
              </div>

              <button
                onClick={handlePreAnxietyContinue}
                className="w-full py-4 bg-green-600 text-white text-xl font-bold rounded-lg hover:bg-green-700 transition-colors"
              >
                {t.continueBtn}
              </button>
            </div>
          </div>
        )}

        {screen === 'instructions' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              {t.instructions}
            </h2>

            <div className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <p className="text-lg mb-2">{t.youWillPractice}</p>
                <p className="text-2xl font-bold text-blue-600">
                  {techniques[group].name[language]}
                </p>
                <p className="text-lg text-gray-600 mt-2">{t.for5min}</p>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <p className="text-lg leading-relaxed">
                  {techniques[group].instructions[language]}
                </p>
              </div>

              <div className="space-y-2 text-lg">
                <p>{t.followVisual}</p>
                <p>{t.stayRelaxed}</p>
                <p>{t.notifyResearcher}</p>
              </div>

              <button
                onClick={startBreathing}
                className="w-full py-4 bg-green-600 text-white text-xl font-bold rounded-lg hover:bg-green-700 transition-colors"
              >
                {t.readyStart}
              </button>
            </div>
          </div>
        )}

        {screen === 'breathing' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[600px]">
            {renderBreathingAnimation()}
          </div>
        )}

        {screen === 'postAnxiety' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              {t.postAnxiety}
            </h2>

            <div className="space-y-6">
              <div className="p-6 bg-green-50 rounded-lg">
                <p className="text-xl font-semibold mb-2">{t.anxietyQuestion}</p>
                <p className="text-gray-600">{t.anxietyScale}</p>
              </div>

              <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-700">
                  {t.anxietyRating}: <span className="text-3xl font-bold text-green-600">{anxietyPostScore}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="21"
                  value={anxietyPostScore}
                  onChange={(e) => setAnxietyPostScore(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0 - No anxiety</span>
                  <span>21 - Extreme anxiety</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-lg">
                  <strong>Change:</strong>{' '}
                  <span className={anxietyPreScore - anxietyPostScore >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {anxietyPreScore - anxietyPostScore >= 0 ? '▼' : '▲'}{' '}
                    {Math.abs(anxietyPreScore - anxietyPostScore)} points
                  </span>
                </p>
              </div>

              <button
                onClick={handlePostAnxietyContinue}
                className="w-full py-4 bg-green-600 text-white text-xl font-bold rounded-lg hover:bg-green-700 transition-colors"
              >
                {t.continueBtn}
              </button>
            </div>
          </div>
        )}

        {screen === 'complete' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-4xl font-bold mb-4 text-green-600">
              {t.sessionComplete}
            </h2>
            <p className="text-xl text-gray-700 mb-2">
              {t.notifyResearcherComplete}
            </p>
            <p className="text-lg text-gray-600 mb-8">
              {t.dataRecorded}
            </p>
            <div className="p-6 bg-gray-50 rounded-lg mb-8">
              <p className="text-lg"><strong>ID:</strong> {participantId}</p>
              <p className="text-lg"><strong>{t.groupLabel}:</strong> {group}</p>
              <p className="text-lg"><strong>{t.cycle}s:</strong> {cycleCount}</p>
              <p className="text-lg"><strong>Pre-anxiety:</strong> {anxietyPreScore}</p>
              <p className="text-lg"><strong>Post-anxiety:</strong> {anxietyPostScore}</p>
              <p className="text-lg font-bold text-green-600">
                <strong>Improvement:</strong> {anxietyPreScore - anxietyPostScore} points
              </p>
            </div>
            <button
              onClick={() => {
                setScreen('checkin');
                setParticipantId('');
                setGroup(null);
                setTimeRemaining(300);
                setCycleCount(0);
                setAnxietyPreScore(10);
                setAnxietyPostScore(10);
              }}
              className="px-8 py-4 bg-blue-600 text-white text-xl font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t.finish}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TFClinicalBreathingApp;
