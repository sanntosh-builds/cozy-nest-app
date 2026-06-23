import React, { useState } from 'react';
import { Lock, MapPin, Wifi, ShieldCheck, Moon, Sparkles, Heart, Flame, PartyPopper, Plus, Camera, MessageCircle, User, ChevronDown, TreePine, Copy, Check } from 'lucide-react';

const COLORS = {
  bg: '#1F1421',
  bgDeep: '#150D17',
  amber: '#E8A33D',
  amberSoft: '#F2C879',
  cream: '#F5EDE4',
  clay: '#8B3A2B',
  muted: '#B8ADB1',
  faint: '#6b606e',
};

function NestMotif({ size = 480 }) {
  return (
    <svg
      viewBox="0 0 400 400"
      style={{ width: size, height: size, position: 'absolute', top: -size * 0.18, right: -size * 0.18, opacity: 0.65 }}
      fill="none"
    >
      {[...Array(7)].map((_, i) => {
        const r = 40 + i * 22;
        return (
          <circle
            key={i}
            cx="200"
            cy="200"
            r={r}
            stroke={i % 2 === 0 ? COLORS.amber : COLORS.clay}
            strokeOpacity={0.18 + i * 0.04}
            strokeWidth="1.5"
            strokeDasharray={`${8 + i * 2} ${6 + i}`}
          />
        );
      })}
    </svg>
  );
}

const PRICING = { hourly: 1500, overnight: 2800 };
const DURATION_LABEL = { hourly: '4-hour stay', overnight: 'Overnight stay' };
const EXTEND_PRICE = 800;
const MOODS = [
  { key: 'plain', label: 'Just the stay', icon: Moon, addon: 0, desc: 'No extras' },
  { key: 'candle', label: 'Candlelit Dinner', icon: Heart, addon: 1200, desc: 'Private dinner setup in your cottage' },
  { key: 'bonfire', label: 'Bonfire Night', icon: Flame, addon: 800, desc: 'Bonfire, snacks, music under the stars' },
  { key: 'celebration', label: 'Celebration', icon: PartyPopper, addon: 1500, desc: 'Cake, flowers, decoration' },
];
const FAQS = [
  { q: 'Will we have privacy from other guests?', a: 'Yes. Each cottage is freestanding and separate from the others, so you will not be sharing walls or common spaces with other guests.' },
  { q: 'How far is Sankhu from Kathmandu?', a: 'About 45 to 60 minutes by car from central Kathmandu, through quiet countryside roads.' },
  { q: 'What if my plans change?', a: 'You can cancel free of charge up to 2 hours before your check-in time, no questions asked.' },
];

const PAYMENT = {
  whatsapp: '9779863668193',
  esewaId: '9863668193',
  khaltiId: '9863668193',
};

export default function CozyNest() {
  const [duration, setDuration] = useState('overnight');
  const [mood, setMood] = useState('plain');
  const [date, setDate] = useState('');
  const [step, setStep] = useState('browse');
  const [extraHours, setExtraHours] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [copied, setCopied] = useState('');

  const moodInfo = MOODS.find((m) => m.key === mood);
  const basePrice = PRICING[duration] + moodInfo.addon;
  const price = basePrice + extraHours * EXTEND_PRICE;

  function handleReserve(e) {
    e.preventDefault();
    if (!date) return;
    setStep('payment');
  }

  function handleCopy(text, label) {
    navigator.clipboard?.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  }

  const confirmMessage = `Hi! I'd like to book Tree House Resort, Sankhu — ${DURATION_LABEL[duration]} on ${date}${
    moodInfo.key !== 'plain' ? ` with ${moodInfo.label}` : ''
  }. Total: Rs ${price}. I've sent the payment, please confirm my booking.`;
  const confirmWaLink = `https://wa.me/${PAYMENT.whatsapp}?text=${encodeURIComponent(confirmMessage)}`;

  return (
    <div style={{ background: COLORS.bgDeep, color: COLORS.cream, minHeight: '100vh', fontFamily: "'Work Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.8); }
      `}</style>

      {/* NAV */}
      <nav className="px-6 py-5 flex items-center justify-between">
        <span style={{ fontFamily: "'Fraunces', serif", color: COLORS.cream }} className="text-lg">
          Cozy<span style={{ color: COLORS.amber }}>Nest</span>
        </span>
        <span style={{ color: COLORS.faint, fontFamily: "'JetBrains Mono', monospace" }} className="text-xs">
          Sankhu
        </span>
      </nav>

      {/* HERO */}
      <header
        className="relative overflow-hidden px-6 py-20 md:py-28"
        style={{ background: `radial-gradient(circle at 70% 30%, ${COLORS.bg}, ${COLORS.bgDeep})` }}
      >
        <NestMotif />
        <div className="relative max-w-xl">
          <p
            style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.amberSoft, letterSpacing: '0.15em' }}
            className="text-xs uppercase mb-4"
          >
            Sankhu · for two only
          </p>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, lineHeight: 1.05 }} className="text-4xl md:text-5xl mb-5">
            A quiet cottage,<br />just for the two of you.
          </h1>
          <p style={{ color: COLORS.muted }} className="text-base md:text-lg max-w-md">
            One private treehouse cottage, away from the city and away from other guests. Cozy Nest sets aside a single cottage at the resort, reserved entirely for your time together.
          </p>
          <p className="flex items-center gap-2 text-sm mt-4" style={{ color: COLORS.amberSoft }}>
            <User size={14} /> Run personally — every booking handled by me, not a call center.
          </p>
        </div>
      </header>

      {/* LISTING */}
      <main className="px-6 -mt-10 md:-mt-14 relative z-10 max-w-3xl mx-auto pb-24">
        <section className="rounded-2xl p-6 md:p-8" style={{ background: COLORS.bg, border: `1px solid ${COLORS.clay}33` }}>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-24 md:h-32 rounded-xl flex flex-col items-center justify-center gap-1.5"
                style={{ background: `${COLORS.amber}0F`, border: `2px dashed ${COLORS.amber}80` }}
              >
                <Camera size={20} style={{ color: COLORS.amberSoft }} />
                <span className="text-xs font-medium" style={{ color: COLORS.amberSoft }}>Add photo {n}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-center -mt-4 mb-6" style={{ color: COLORS.faint }}>
            Tap to upload once your property photos are ready
          </p>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 style={{ fontFamily: "'Fraunces', serif" }} className="text-2xl">Tree House Resort, Sankhu</h2>
              <p className="flex items-center gap-1 text-sm mt-1" style={{ color: COLORS.muted }}>
                <MapPin size={14} /> Cottage number & directions shared after booking
              </p>
              <div
                className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs"
                style={{ background: `${COLORS.amber}1A`, color: COLORS.amberSoft, border: `1px solid ${COLORS.amber}40` }}
              >
                <ShieldCheck size={12} />
                Privacy Score: New listing — be our first review
              </div>
            </div>
            <div className="text-right">
              <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.amberSoft }} className="text-2xl">
                Rs {price.toLocaleString()}
              </p>
              <p className="text-xs" style={{ color: COLORS.muted }}>
                {duration === 'hourly' ? 'for 3-4 hours' : 'overnight'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { icon: TreePine, label: 'Freestanding cottage' },
              { icon: ShieldCheck, label: 'Away from other guests' },
              { icon: Moon, label: 'Quiet, peaceful setting' },
              { icon: Wifi, label: 'Wi-Fi available' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm">
                <Icon size={16} style={{ color: COLORS.amber }} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="h-px my-6" style={{ background: `${COLORS.clay}33` }} />

          {step === 'browse' && (
            <form onSubmit={handleReserve} className="space-y-5">
              <div>
                <label
                  className="text-xs uppercase tracking-wide block mb-2"
                  style={{ color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Choose your time
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { key: 'hourly', label: '3-4 hours' },
                    { key: 'overnight', label: 'Overnight' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.key}
                      onClick={() => setDuration(opt.key)}
                      className="px-4 py-2 rounded-full text-sm transition"
                      style={{
                        background: duration === opt.key ? COLORS.amber : 'transparent',
                        color: duration === opt.key ? COLORS.bgDeep : COLORS.cream,
                        border: `1px solid ${duration === opt.key ? COLORS.amber : '#4a3a4d'}`,
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className="text-xs uppercase tracking-wide block mb-2"
                  style={{ color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Add a touch (optional)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MOODS.map((m) => {
                    const Icon = m.icon;
                    const active = mood === m.key;
                    return (
                      <button
                        type="button"
                        key={m.key}
                        onClick={() => setMood(m.key)}
                        className="text-left rounded-xl p-3 transition"
                        style={{
                          background: active ? `${COLORS.amber}1A` : 'transparent',
                          border: `1px solid ${active ? COLORS.amber : '#4a3a4d'}`,
                        }}
                      >
                        <Icon size={16} style={{ color: active ? COLORS.amber : COLORS.muted }} className="mb-1" />
                        <p className="text-sm" style={{ color: COLORS.cream }}>{m.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: COLORS.faint }}>
                          {m.addon === 0 ? m.desc : `${m.desc} · +Rs ${m.addon}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  className="text-xs uppercase tracking-wide block mb-2"
                  style={{ color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                  style={{ background: COLORS.bgDeep, border: '1px solid #4a3a4d', color: COLORS.cream }}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full py-3 font-medium transition hover:opacity-90"
                style={{ background: COLORS.amber, color: COLORS.bgDeep }}
              >
                Continue — Rs {price.toLocaleString()}
              </button>

              <a
                href={`https://wa.me/${PAYMENT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-full py-3 text-sm transition hover:opacity-90"
                style={{ border: '1px solid #4a3a4d', color: COLORS.cream }}
              >
                <MessageCircle size={16} /> Ask a question on WhatsApp first
              </a>

              <p className="text-xs text-center" style={{ color: COLORS.faint }}>
                Pay via eSewa or Khalti, then confirm on WhatsApp.<br />
                Free cancellation up to 2 hours before check-in.
              </p>
            </form>
          )}

          {step === 'payment' && (
            <div className="py-2">
              <h3 style={{ fontFamily: "'Fraunces', serif" }} className="text-xl mb-2 text-center">Send your payment</h3>
              <p className="text-sm mb-5 text-center" style={{ color: COLORS.muted }}>
                {DURATION_LABEL[duration]} on {date}
                {moodInfo.key !== 'plain' ? ` · ${moodInfo.label}` : ''} — Rs {price.toLocaleString()}
              </p>

              <div className="space-y-3 mb-5">
                {[
                  { label: 'eSewa', id: PAYMENT.esewaId },
                  { label: 'Khalti', id: PAYMENT.khaltiId },
                ].map((p) => (
                  <div
                    key={p.label}
                    className="flex items-center justify-between rounded-xl p-4"
                    style={{ background: COLORS.bgDeep, border: `1px solid ${COLORS.clay}33` }}
                  >
                    <div>
                      <p className="text-xs" style={{ color: COLORS.faint }}>{p.label} number</p>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.cream }} className="text-sm mt-0.5">{p.id}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(p.id, p.label)}
                      className="flex items-center gap-1 rounded-full px-3 py-2 text-xs"
                      style={{ border: '1px solid #4a3a4d', color: COLORS.muted }}
                    >
                      {copied === p.label ? <Check size={14} style={{ color: COLORS.amber }} /> : <Copy size={14} />}
                      {copied === p.label ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-xs text-center mb-5" style={{ color: COLORS.faint }}>
                Send Rs {price.toLocaleString()} to either number above, then tap below to confirm.
              </p>

              <a
                href={confirmWaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setStep('submitted')}
                className="w-full flex items-center justify-center gap-2 rounded-full py-3 font-medium transition hover:opacity-90"
                style={{ background: COLORS.amber, color: COLORS.bgDeep }}
              >
                <MessageCircle size={16} /> I've paid — confirm on WhatsApp
              </a>

              <button onClick={() => setStep('browse')} className="w-full text-center text-sm underline mt-4" style={{ color: COLORS.muted }}>
                Back
              </button>
            </div>
          )}

          {step === 'submitted' && (
            <div className="text-center py-4">
              <Sparkles size={28} style={{ color: COLORS.amber }} className="mx-auto mb-3" />
              <h3 style={{ fontFamily: "'Fraunces', serif" }} className="text-xl mb-2">Booking request sent</h3>
              <p className="text-sm mb-5" style={{ color: COLORS.muted }}>
                {DURATION_LABEL[duration]} on {date}
                {moodInfo.key !== 'plain' ? ` · ${moodInfo.label}` : ''}.
              </p>
              <div
                className="rounded-xl p-4 text-left text-sm space-y-2"
                style={{ background: COLORS.bgDeep, border: `1px solid ${COLORS.clay}33` }}
              >
                <p><span style={{ color: COLORS.amberSoft }}>Status:</span> Waiting for confirmation on WhatsApp.</p>
                <p><span style={{ color: COLORS.amberSoft }}>Cottage & directions:</span> Sent once confirmed.</p>
                <p><span style={{ color: COLORS.amberSoft }}>Check-in:</span> Self entry, no front desk.</p>
                <p><span style={{ color: COLORS.amberSoft }}>Total:</span> Rs {price.toLocaleString()}</p>
              </div>

              <div
                className="rounded-xl p-4 mt-4 flex items-center justify-between"
                style={{ background: `${COLORS.amber}14`, border: `1px solid ${COLORS.amber}40` }}
              >
                <p className="text-sm text-left" style={{ color: COLORS.cream }}>
                  Not ready to leave?<br />
                  <span style={{ color: COLORS.faint }} className="text-xs">Add an hour, no need to rebook.</span>
                </p>
                <button
                  onClick={() => setExtraHours((h) => h + 1)}
                  className="flex items-center gap-1 rounded-full px-3 py-2 text-xs font-medium whitespace-nowrap"
                  style={{ background: COLORS.amber, color: COLORS.bgDeep }}
                >
                  <Plus size={14} /> Rs {EXTEND_PRICE}
                </button>
              </div>

              <button onClick={() => { setStep('browse'); setExtraHours(0); }} className="mt-5 text-sm underline" style={{ color: COLORS.muted }}>
                Make another booking
              </button>
            </div>
          )}
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-10">
          <h3 style={{ fontFamily: "'Fraunces', serif" }} className="text-lg mb-4 text-center">How it works</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { step: '01', label: 'Reserve', desc: 'Pick your time and pay securely' },
              { step: '02', label: 'Get the address', desc: 'Sent to you before check-in' },
              { step: '03', label: 'Let yourself in', desc: 'No staff, no front desk' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <p style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.amber }} className="text-xs mb-1">{s.step}</p>
                <p className="text-sm font-medium mb-1" style={{ color: COLORS.cream }}>{s.label}</p>
                <p className="text-xs" style={{ color: COLORS.faint }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h3 style={{ fontFamily: "'Fraunces', serif" }} className="text-lg mb-4 text-center">Good to know</h3>
          <div className="space-y-2">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${COLORS.clay}33` }}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-sm"
                    style={{ color: COLORS.cream, background: COLORS.bg }}
                  >
                    {f.q}
                    <ChevronDown
                      size={16}
                      style={{ color: COLORS.muted, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                    />
                  </button>
                  {open && (
                    <p className="px-4 pb-4 text-sm" style={{ color: COLORS.muted, background: COLORS.bg }}>
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <p className="text-center text-xs mt-8" style={{ color: COLORS.faint, fontFamily: "'JetBrains Mono', monospace" }}>
          Cozy Nest · one home, fully yours, for as long as you've booked it.
        </p>
      </main>
    </div>
  );
}
