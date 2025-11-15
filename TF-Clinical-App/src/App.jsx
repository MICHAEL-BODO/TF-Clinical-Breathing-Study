import React, { useState, useEffect } from 'react';
import { Circle, Square, Wind, Waves, Timer } from 'lucide-react';

const TFClinicalBreathingApp = () => {
  const [screen, setScreen] = useState('checkin'); // checkin, instructions, breathing, complete
  const [participantId, setParticipantId] = useState('');
  const [group, setGroup] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [isActive, setIsActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [phaseTimer, setPhaseTimer] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [language, setLanguage] = useState('en'); // en or hu

  const techniques = {
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
        en: 'Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds. Repeat.',
        hu: 'Lélegezz be 4 másodpercig, tartsd 4 másodpercig, lélegezz ki 4 másodpercig, tartsd 4 másodpercig. Ismételd.'
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
        en: 'Breathe in through your nose for 4 seconds, hold for 7 seconds, breathe out through your mouth for 8 seconds.',
        hu: 'Lélegezz be az orrodon keresztül 4 másodpercig, tartsd 7 másodpercig, lélegezz ki a szádon keresztül 8 másodpercig.'
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
        en: 'Breathe in for 6 seconds, breathe out for 6 seconds. Maintain a smooth, relaxed rhythm (5 breaths per minute).',
        hu: 'Lélegezz be 6 másodpercig, lélegezz ki 6 másodpercig. Tartsd fenn a sima, nyugodt ritmust (5 lélegzet percenként).'
      },
      icon: Waves
    },
    4: {
      name: { en: 'Physiological Sigh', hu: 'Fiziológiai Sóhaj' },
      nameShort: 'Physiological Sigh',
      phases: [
        { name: 'inhale1', duration: 2, label: { en: 'Breathe In', hu: 'Lélegezz be' } },
        { name: 'inhale2', duration: 1, label: { en: 'Breathe In More', hu: 'Még többet be' } },
        { name: 'exhale', duration: 6, label: { en: 'Long Exhale', hu: 'Hosszú kilégzés' } }
      ],
      instructions: {
        en: 'Take a deep breath in, then take another quick breath in to fill your lungs completely, then exhale slowly for 6 seconds.',
        hu: 'Vegyél egy mély lélegzetet, majd vegyél még egy gyors lélegzetet a tüdőd teljes megtöltéséhez, majd lélegezz ki lassan 6 másodpercig.'
      },
      icon: Wind
    },
    5: {
      name: { en: 'Breath Hold (Buteyko)', hu: 'Légzésvisszatartás (Buteyko)' },
      nameShort: 'Breath Hold/Buteyko',
      phases: [
        { name: 'breathe', duration: 3, label: { en: 'Normal Breath', hu: 'Normál légzés' } },
        { name: 'hold', duration: 10, label: { en: 'Hold (comfortable)', hu: 'Tartsd (kényelmesen)' } },
        { name: 'recover', duration: 5, label: { en: 'Recovery Breathing', hu: 'Helyreállító légzés' } }
      ],
      instructions: {
        en: 'Take a normal breath, then hold your breath comfortably (not to maximum), then breathe normally to recover. Hold time adjusts to your comfort.',
        hu: 'Vegyél egy normál lélegzetet, majd tartsd vissza a lélegzeted kényelmesen (ne a maximumig), majd lélegezz normálisan a helyreállításhoz. A tartási idő igazodik a kényelmedhez.'
      },
      icon: Timer
    }
  };

  const translations = {
    en: {
      title: 'TF Clinical Breathing Study',
      checkinTitle: 'Participant Check-In',
      enterID: 'Enter Your Participant ID:',
      assignedTo: 'You are assigned to:',
      start: 'START',
      ready: 'Ready to Begin?',
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
      groupLabel: 'Group'
    },
    hu: {
      title: 'TF Klinikai Légzésvizsgálat',
      checkinTitle: 'Résztvevő Bejelentkezés',
      enterID: 'Add meg a résztvevő azonosítód:',
      assignedTo: 'A következő csoportba vagy beosztva:',
      start: 'KEZDÉS',
      ready: 'Készen állsz a kezdésre?',
      instructions: 'Utasítások',
      youWillPractice: 'A következőt fogod gyakorolni:',
      for5min: '5 percig',
      followVisual: '• Kövesd a vizuális útmutatót',
      stayRelaxed: '• Maradj ellazult és kényelmes',
      notifyResearcher: '• A kutató most felhelyezi az érzékelőket',
      readyStart: 'KÉSZ - GYAKORLAT KEZDÉSE',
      sessionComplete: 'Mérés Befejezve!',
      notifyResearcherComplete: 'Kérlek értesítsd a kutatót.',
      dataRecorded: 'Az adataidat rögzítettük.',
      finish: 'BEFEJEZÉS',
      timeRemaining: 'Hátralévő idő',
      cycle: 'Ciklus',
      invalidID: 'Kérlek adj meg érvényes résztvevő azonosítót',
      groupLabel: 'Csoport'
    }
  };

  const t = translations[language];

  // Timer countdown
  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeRemaining === 0 && isActive) {
      setIsActive(false);
      setScreen('complete');
      saveSessionData();
    }
  }, [isActive, timeRemaining]);

  // Breathing phase timer
  useEffect(() => {
    if (isActive && group) {
      const currentPhase = techniques[group].phases.find(p => p.name === breathPhase);
      if (!currentPhase) return;

      const interval = setInterval(() => {
        setPhaseTimer(prev => {
          if (prev >= currentPhase.duration) {
            // Move to next phase
            const currentIndex = techniques[group].phases.findIndex(p => p.name === breathPhase);
            const nextIndex = (currentIndex + 1) % techniques[group].phases.length;
            setBreathPhase(techniques[group].phases[nextIndex].name);
            
            if (nextIndex === 0) {
              setCycleCount(prev => prev + 1);
            }
            
            // Haptic feedback
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
  }, [isActive, breathPhase, group]);

  const handleCheckin = () => {
    if (!participantId || !group) {
      alert(t.invalidID);
      return;
    }
    setScreen('instructions');
  };

  const startBreathing = () => {
    setScreen('breathing');
    setIsActive(true);
    setBreathPhase(techniques[group].phases[0].name);
    setPhaseTimer(0);
    setCycleCount(0);
  };

  const saveSessionData = () => {
    const sessionData = {
      participantId,
      group,
      technique: techniques[group].nameShort,
      startTime: new Date(Date.now() - 300000).toISOString(),
      endTime: new Date().toISOString(),
      cyclesCompleted: cycleCount,
      completionStatus: 'Complete'
    };

    // Save to localStorage for coordinator to collect
    const existingSessions = JSON.parse(localStorage.getItem('tfClinicalSessions') || '[]');
    existingSessions.push(sessionData);
    localStorage.setItem('tfClinicalSessions', JSON.stringify(existingSessions));
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
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'hu' : 'en')}
            className="px-4 py-2 bg-white rounded-lg shadow text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {language === 'en' ? '🇭🇺 Magyar' : '🇬🇧 English'}
          </button>
        </div>

        {/* Check-in Screen */}
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

        {/* Instructions Screen */}
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

        {/* Breathing Exercise Screen */}
        {screen === 'breathing' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[600px]">
            {renderBreathingAnimation()}
          </div>
        )}

        {/* Completion Screen */}
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
              <p className="text-lg"><strong>{t.groupLabel}:</strong> {group}</p>
              <p className="text-lg"><strong>ID:</strong> {participantId}</p>
              <p className="text-lg"><strong>{t.cycle}s:</strong> {cycleCount}</p>
            </div>
            <button
              onClick={() => {
                setScreen('checkin');
                setParticipantId('');
                setGroup(null);
                setTimeRemaining(300);
                setCycleCount(0);
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