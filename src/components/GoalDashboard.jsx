import React, { useMemo, useState } from 'react';
import { Target, Plus, Flame, CheckCircle, Calendar } from 'lucide-react';

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun .. 6 Sat
  const diffToMonday = (day + 6) % 7; // Mon=0
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - diffToMonday);
  return d;
}

function weekKey(date) {
  const d = startOfWeek(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function groupLogsByWeek(logs) {
  const map = new Map();
  logs.forEach((iso) => {
    const k = weekKey(new Date(iso));
    map.set(k, (map.get(k) || 0) + 1);
  });
  return map;
}

function calcStreak(logs, target) {
  const byWeek = groupLogsByWeek(logs);
  let streak = 0;
  const todayKey = weekKey(new Date());
  let cursor = startOfWeek(new Date());
  while (true) {
    const k = weekKey(cursor);
    const count = byWeek.get(k) || 0;
    if (count >= target && target > 0) {
      streak += 1;
      // move to previous week
      const prev = new Date(cursor);
      prev.setDate(prev.getDate() - 7);
      cursor = prev;
      // avoid infinite loops by breaking on an arbitrary limit
      if (streak > 520) break; // 10 years
    } else {
      break;
    }
    if (k === todayKey && byWeek.size === 0) break;
  }
  return streak;
}

export default function GoalDashboard({ goal, onGoalChange, logs, onAddLog }) {
  const [name, setName] = useState(goal.name || '');
  const [target, setTarget] = useState(goal.target || 3);

  const currentWeekCount = useMemo(() => {
    const k = weekKey(new Date());
    const map = groupLogsByWeek(logs);
    return map.get(k) || 0;
  }, [logs]);

  const pct = useMemo(() => {
    const t = Number(target) || 0;
    if (t <= 0) return 0;
    return Math.min(100, Math.round((currentWeekCount / t) * 100));
  }, [currentWeekCount, target]);

  const streak = useMemo(() => calcStreak(logs, Number(target) || 0), [logs, target]);

  function applyGoal(e) {
    e.preventDefault();
    onGoalChange({ name: name.trim() || 'My Goal', target: Math.max(0, Number(target) || 0) });
  }

  return (
    <section id="dashboard" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Your weekly target</h3>
            </div>
            <form onSubmit={applyGoal} className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700">Task name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Morning run"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Times per week</label>
                <input
                  type="number"
                  min={0}
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-500 focus:ring"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                  Save target
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-slate-500">Current: <span className="font-medium text-slate-700">{goal.name}</span> • <span className="font-medium text-slate-700">{goal.target}</span> times/week</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">This week</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Flame className="h-4 w-4 text-orange-500" />
                Streak: <span className="font-medium text-slate-700">{streak}</span>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{goal.name}</span>
                <span className="text-slate-500">{currentWeekCount} / {goal.target}</span>
              </div>
              <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${pct >= 100 ? 'bg-green-500' : 'bg-blue-600'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => onAddLog(new Date().toISOString())}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Log a session
            </button>
            <div className="mt-4 grid gap-2">
              {logs.length === 0 ? (
                <p className="text-sm text-slate-500">No sessions logged yet. Start your streak today.</p>
              ) : (
                <div className="max-h-40 overflow-auto rounded-lg border border-slate-200">
                  <ul className="divide-y divide-slate-200 text-sm">
                    {[...logs].reverse().map((iso, i) => (
                      <li key={i} className="flex items-center justify-between px-3 py-2">
                        <span className="text-slate-700">{new Date(iso).toLocaleString()}</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
