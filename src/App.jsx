import React, { useState } from 'react';
import Hero from './components/Hero';
import AuthPanel from './components/AuthPanel';
import GoalDashboard from './components/GoalDashboard';
import WeeklyReportCard from './components/WeeklyReportCard';

export default function App() {
  const [goal, setGoal] = useState({ name: 'Morning run', target: 3 });
  const [logs, setLogs] = useState([]);

  function handleAddLog(iso) {
    setLogs((prev) => [...prev, iso]);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Hero />
      <AuthPanel />
      <GoalDashboard
        goal={goal}
        onGoalChange={setGoal}
        logs={logs}
        onAddLog={handleAddLog}
      />
      <WeeklyReportCard goal={goal} logs={logs} />
      <footer className="border-t border-slate-200 bg-white py-10 text-center text-sm text-slate-500">
        Made with focus and simplicity. YourGoals • Blue and white aesthetic
      </footer>
    </div>
  );
}
