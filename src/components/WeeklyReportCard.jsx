import React, { useMemo, useState } from 'react';
import { BarChart3, CheckCircle } from 'lucide-react';

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diffToMonday = (day + 6) % 7;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - diffToMonday);
  return d;
}

function weekKey(date) {
  const d = startOfWeek(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function WeeklyReportCard({ goal, logs }) {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState('');

  const currentWeek = useMemo(() => weekKey(new Date()), []);
  const weeklyCount = useMemo(() => {
    const k = weekKey(new Date());
    return logs.filter((iso) => weekKey(new Date(iso)) === k).length;
  }, [logs]);

  async function generateReport() {
    setLoading(true);
    // Static UI preview: emulate an AI response
    await new Promise((r) => setTimeout(r, 800));

    const met = weeklyCount >= (Number(goal.target) || 0);
    const guidance = met
      ? `Great job maintaining consistency on ${goal.name}. Keep the momentum by scheduling sessions at the same time of day and progressively increasing difficulty.`
      : `You logged ${weeklyCount} of ${goal.target}. Pick two specific days and set a 15-minute minimum to lower friction. Stack the task with an existing routine (e.g., after breakfast).`;

    const next = `For next week, aim for ${goal.target} sessions. Prepare reminders and a simple checklist to mark completion immediately after each session.`;

    setReport(`${met ? 'You met your goal 🎉' : 'You are getting closer 💪'}\n\n${guidance}\n\n${next}`);
    setLoading(false);
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Weekly AI Report</h3>
              <p className="text-sm text-slate-500">Week starting {currentWeek}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600">
              <p>
                {goal.name}: {weeklyCount} / {goal.target} sessions this week
              </p>
            </div>
            <button
              onClick={generateReport}
              disabled={loading}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium text-white shadow-sm transition ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              <CheckCircle className="h-4 w-4" />
              {loading ? 'Generating…' : 'Generate AI summary'}
            </button>
          </div>
          {report && (
            <div className="mt-4 rounded-lg border border-slate-200 bg-blue-50/50 p-4 text-slate-700">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{report}</pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
