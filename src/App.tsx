import { useState } from 'react';

type AttemptResult = 'low' | 'high' | 'correct';
type Status = 'idle' | AttemptResult | 'invalid';

type Attempt = {
  id: number;
  attemptNumber: number;
  value: number;
  result: AttemptResult;
};

const MIN_VALUE = 1;
const MAX_VALUE = 100;

const generateTarget = () =>
  Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;

const statusMessages: Record<Status, string> = {
  idle: 'Calibrate your scanner to begin the mission. Tune the controls and prepare to decode the hidden frequency.',
  low: 'Signal amplitude below target. Increase your frequency spectrum to continue the scan.',
  high: 'Signal amplitude above safe threshold. Reduce power to locate the hidden channel.',
  correct:
    'Access granted! Quantum lock disengaged — the station acknowledges your alignment.',
  invalid:
    'Input recognized as cosmic noise. Enter a whole number within the calibrated range to proceed.'
};

const messageStyles: Record<Status, string> = {
  idle: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-100 shadow-[0_0_20px_rgba(14,165,233,0.12)]',
  low: 'border-amber-500/30 bg-amber-500/10 text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.15)]',
  high: 'border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-100 shadow-[0_0_20px_rgba(217,70,239,0.12)]',
  correct:
    'border-emerald-500/40 bg-emerald-500/15 text-emerald-100 shadow-[0_0_28px_rgba(16,185,129,0.25)]',
  invalid: 'border-rose-500/40 bg-rose-500/10 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.18)]'
};

const statusLabels: Record<Status, string> = {
  idle: 'Standby',
  low: 'Amplify',
  high: 'Dampen',
  correct: 'Access Granted',
  invalid: 'Calibration Error'
};

const statusBadgeStyles: Record<Status, string> = {
  idle: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-100',
  low: 'border-amber-500/40 bg-amber-500/10 text-amber-100',
  high: 'border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-100',
  correct: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-100',
  invalid: 'border-rose-500/40 bg-rose-500/10 text-rose-100'
};

const resultBadgeStyles: Record<AttemptResult, string> = {
  low: 'border-amber-500/40 bg-amber-500/10 text-amber-200',
  high: 'border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-200',
  correct: 'border-emerald-500/50 bg-emerald-500/20 text-emerald-200'
};

const resultBadgeLabels: Record<AttemptResult, string> = {
  low: 'Increase Output',
  high: 'Reduce Output',
  correct: 'Perfect Alignment'
};

function App() {
  const [target, setTarget] = useState(() => generateTarget());
  const [guess, setGuess] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState(statusMessages.idle);
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  const isMissionComplete = status === 'correct';

  const handleGuess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isMissionComplete) {
      return;
    }

    const normalized = guess.trim();

    if (normalized === '') {
      setStatus('invalid');
      setMessage('Scanner requires a numerical frequency before transmission can begin.');
      return;
    }

    const numericGuess = Number(normalized);

    if (Number.isNaN(numericGuess) || !Number.isInteger(numericGuess)) {
      setStatus('invalid');
      setMessage('Only whole number frequencies are recognized by the console. Adjust your input.');
      return;
    }

    if (numericGuess < MIN_VALUE || numericGuess > MAX_VALUE) {
      setStatus('invalid');
      setMessage('Frequency out of range. Keep transmissions within the calibrated spectrum.');
      return;
    }

    const result: AttemptResult =
      numericGuess === target ? 'correct' : numericGuess < target ? 'low' : 'high';

    const attemptNumber = attempts.length + 1;
    const variance = Math.abs(numericGuess - target);

    const newAttempt: Attempt = {
      id: Date.now(),
      attemptNumber,
      value: numericGuess,
      result
    };

    setAttempts((prev) => [...prev, newAttempt]);

    if (result === 'correct') {
      setStatus('correct');
      setMessage(
        `Access granted! Quantum lock disengaged after ${attemptNumber} ${
          attemptNumber === 1 ? 'transmission' : 'transmissions'
        }.`
      );
      setGuess('');
      return;
    }

    const proximityHint =
      variance <= 2
        ? 'Proximity alert: you are within two units of the target frequency.'
        : variance <= 5
          ? 'Telemetry indicates you are extremely close to alignment.'
          : variance <= 10
            ? 'Trajectory stabilizing — continue fine tuning.'
            : '';

    if (result === 'low') {
      setStatus('low');
      setMessage(
        `${statusMessages.low}${proximityHint ? ` ${proximityHint}` : ''}`
      );
    } else {
      setStatus('high');
      setMessage(
        `${statusMessages.high}${proximityHint ? ` ${proximityHint}` : ''}`
      );
    }

    setGuess('');
  };

  const handleReset = () => {
    setTarget(generateTarget());
    setGuess('');
    setStatus('idle');
    setMessage(statusMessages.idle);
    setAttempts([]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-cyan-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.16),_transparent_55%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(115deg,rgba(6,182,212,0.1)_0%,rgba(129,140,248,0.15)_40%,rgba(236,72,153,0.08)_100%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle,_rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-4xl rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-8 shadow-[0_40px_120px_rgba(14,165,233,0.2)] backdrop-blur-xl">
          <header className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-cyan-400/70">
              Galactic Command
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              Quantum Guess Protocol
            </h1>
            <p className="mt-4 text-base text-cyan-100/70 sm:text-lg">
              Decode the hidden frequency between {MIN_VALUE} and {MAX_VALUE}. Each attempt refines your scanner&apos;s alignment with the orbital relay.
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-2xl border border-cyan-500/10 bg-slate-950/60 p-6 shadow-inner">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">Scanner Console</h2>
                <span
                  className={`rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.35em] ${statusBadgeStyles[status]}`}
                >
                  {statusLabels[status]}
                </span>
              </div>

              <p
                className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-relaxed ${messageStyles[status]}`}
              >
                {message}
              </p>

              <form onSubmit={handleGuess} className="mt-6 space-y-4">
                <label className="block text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/80">
                  Enter Frequency
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={MIN_VALUE}
                    max={MAX_VALUE}
                    value={guess}
                    onChange={(event) => setGuess(event.target.value)}
                    className="w-full rounded-2xl border border-cyan-500/30 bg-slate-950/80 px-5 py-3 text-lg text-cyan-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-50"
                    placeholder={`Try a value between ${MIN_VALUE}-${MAX_VALUE}`}
                    disabled={isMissionComplete}
                  />
                  <button
                    type="submit"
                    className="w-full rounded-2xl border border-cyan-400/40 bg-cyan-500/20 px-5 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    disabled={isMissionComplete}
                  >
                    Transmit Guess
                  </button>
                </div>
              </form>

              <div className="mt-6 flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                <div className="min-w-[160px] flex-1 rounded-2xl border border-cyan-500/20 bg-slate-950/50 px-4 py-3">
                  <p className="text-[0.65rem] text-cyan-400/70">Calibrated Range</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {MIN_VALUE} - {MAX_VALUE}
                  </p>
                </div>
                <div className="min-w-[160px] flex-1 rounded-2xl border border-cyan-500/20 bg-slate-950/50 px-4 py-3">
                  <p className="text-[0.65rem] text-cyan-400/70">Attempts Logged</p>
                  <p className="mt-2 text-xl font-semibold text-white">{attempts.length}</p>
                </div>
                <div className="min-w-[160px] flex-1 rounded-2xl border border-cyan-500/20 bg-slate-950/50 px-4 py-3">
                  <p className="text-[0.65rem] text-cyan-400/70">Quantum Key</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {isMissionComplete ? target : '???'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-6 w-full rounded-2xl border border-fuchsia-400/30 bg-fuchsia-500/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-200 transition hover:border-fuchsia-200 hover:bg-fuchsia-500/20 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/40"
              >
                {isMissionComplete ? 'Launch New Mission' : 'Reset Calibration'}
              </button>
            </section>

            <section className="rounded-2xl border border-fuchsia-500/10 bg-slate-950/60 p-6 shadow-inner">
              <h2 className="text-lg font-semibold text-white">Telemetry Log</h2>
              <p className="mt-2 text-sm text-cyan-100/70">
                Incoming data packets from each transmission attempt are cataloged here.
              </p>

              {attempts.length > 0 ? (
                <ul className="mt-5 max-h-[320px] space-y-4 overflow-y-auto pr-1">
                  {[...attempts].reverse().map((attempt) => (
                    <li
                      key={attempt.id}
                      className="rounded-2xl border border-cyan-500/10 bg-slate-900/60 px-4 py-4"
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-cyan-300/70">
                        <span>Attempt {attempt.attemptNumber}</span>
                        <span className={`rounded-full border px-3 py-1 ${resultBadgeStyles[attempt.result]}`}>
                          {resultBadgeLabels[attempt.result]}
                        </span>
                      </div>
                      <p className="mt-3 text-3xl font-semibold text-white">
                        #{attempt.value.toString().padStart(2, '0')}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-6 rounded-2xl border border-cyan-500/10 bg-slate-900/50 px-4 py-6 text-sm text-cyan-100/60">
                  Awaiting first transmission. Stabilize the console and send your opening guess.
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
