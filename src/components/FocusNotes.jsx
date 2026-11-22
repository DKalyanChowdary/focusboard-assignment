import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, ListChecks } from "lucide-react";

/* Slide content lives in one structured array. `card` is derived from live task stats. */
const SLIDES = [
  {
    id: "today",
    heading: "Make today count.",
    text: "A little focus goes a long way.",
    cardLabel: "Next up",
    icon: ListChecks,
    card: (s) => s.nextTask?.title ?? "All caught up",
    showProgress: true,
  },
  {
    id: "momentum",
    heading: "Keep the momentum.",
    text: "One task at a time adds up fast.",
    cardLabel: "In progress",
    icon: Clock,
    card: (s) => `${s.inProgress} ${s.inProgress === 1 ? "task" : "tasks"} moving`,
    showProgress: false,
  },
  {
    id: "wins",
    heading: "Celebrate small wins.",
    text: "Progress counts, however small.",
    cardLabel: "Completed",
    icon: CheckCircle2,
    card: (s) => `${s.completed} ${s.completed === 1 ? "task" : "tasks"} done`,
    showProgress: true,
  },
];

export default function FocusNotes({ stats }) {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;
  const slide = SLIDES[index];

  // circular navigation
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div className="focus" role="region" aria-roledescription="carousel" aria-label="Focus notes">
      <div className="focus-body" aria-live="polite">
        <p className="focus-eyebrow">
          <span>Focus notes</span>
          <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </p>
        <h2 className="focus-heading">{slide.heading}</h2>
        <p className="focus-text">{slide.text}</p>

        <div className="focus-progress-mobile" aria-hidden="true">
          <span className="bar"><span style={{ width: `${stats.completion}%` }} /></span>
          <span>{stats.completion}%</span>
        </div>

        <div className="focus-dots" role="group" aria-label="Choose slide">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={i === index ? "dot is-active" : "dot"}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="focus-card" aria-hidden="true">
        <p className="focus-card-label">{slide.cardLabel}</p>
        <p className="focus-card-title">{slide.card(stats)}</p>
        {slide.showProgress && (
          <div className="focus-card-progress">
            <span className="bar"><span style={{ width: `${stats.completion}%` }} /></span>
            <span>{stats.completion}%</span>
          </div>
        )}
      </div>

      <div className="focus-controls">
        <button type="button" className="focus-btn" onClick={prev} aria-label="Previous slide">
          <ChevronLeft size={16} aria-hidden="true" />
        </button>
        <button type="button" className="focus-btn is-light" onClick={next} aria-label="Next slide">
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}