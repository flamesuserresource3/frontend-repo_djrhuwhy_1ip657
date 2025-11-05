import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, CheckCircle, Target } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
              <CheckCircle className="h-4 w-4" />
              YourGoals • Stay on track every week
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Reach your weekly goals with focus and clarity
            </h1>
            <p className="max-w-xl text-slate-600">
              Set a target, log every session, and get personalized AI feedback at the end of each week. Simple, clear, and motivating.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#auth"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-white shadow-sm transition hover:bg-blue-700"
              >
                <Rocket className="h-4 w-4" />
                Get Started
              </a>
              <a
                href="#dashboard"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <Target className="h-4 w-4" />
                See how it works
              </a>
            </div>
          </div>

          <div className="relative h-[420px] w-full rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-blue-50/60 shadow-sm">
            <div className="absolute inset-0">
              <Spline
                scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-white/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
