'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  Store,
  Users,
  CalendarDays,
  Clock3,
  Utensils,
  RefreshCw,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import styles from './OpportunityCard.module.css';

/* ─── hover callout content per row ─────────────────── */
const rowData = [
  {
    id: 'fee',
    label: 'Booth fee',
    value: '$125',
    Icon: Store,
    popupSide: 'left',
    popupStyle: 'float',
    popup: {
      headline: 'Accurate booth fees, shown upfront.',
      body: 'Know the full booth fee before you apply. No hidden surprises.',
      visual: 'receipt',
    },
  },
  {
    id: 'attendance',
    label: 'Expected attendance',
    value: '400–600',
    Icon: Users,
    popupSide: 'inline',
    popupStyle: 'inline',
    popup: {
      headline: 'See realistic attendance ranges before you commit.',
      body: 'Know how many people are likely to show up before you set foot in the door.',
      visual: 'range',
    },
  },
  {
    id: 'deadline',
    label: 'Application deadline',
    value: 'June 14',
    Icon: CalendarDays,
    popupSide: 'top-left',
    popupStyle: 'float',
    popup: {
      headline: 'Never miss a cutoff.',
      body: 'Exact application deadlines are clearly shown before you apply.',
      visual: 'calendar',
    },
  },
  {
    id: 'setup',
    label: 'Setup window',
    value: '8:00–9:30 AM',
    Icon: Clock3,
    popupSide: 'left',
    popupStyle: 'float',
    popup: {
      headline: 'Plan arrival with confidence.',
      body: 'Clear setup windows help vendors schedule load-in without guesswork.',
      visual: 'timeline',
    },
  },
  {
    id: 'food',
    label: 'Food permits',
    value: 'Required for prepared food',
    Icon: Utensils,
    popupSide: 'left',
    popupStyle: 'float',
    popup: {
      headline: 'Know permit requirements in advance.',
      body: 'Food vendors can see permit needs before applying, so nothing catches them off guard.',
      visual: 'permit',
    },
  },
  {
    id: 'cancellation',
    label: 'Cancellation',
    value: 'Refundable up to 7 days before',
    Icon: RefreshCw,
    popupSide: 'inline',
    popupStyle: 'inline',
    popup: {
      headline: 'Book with confidence.',
      body: 'Clear cancellation terms are visible before you apply.',
      visual: 'shield',
    },
  },
];

/* ─── individual visual widgets inside hover cards ─────── */
function ReceiptVisual() {
  return (
    <div className={styles.visual}>
      <div className={styles.receipt}>
        <div className={styles.receiptLine}>
          <span>Booth rental</span><span>$125.00</span>
        </div>
        <div className={styles.receiptLine}>
          <span>Permit fee</span><span>$0.00</span>
        </div>
        <div className={`${styles.receiptLine} ${styles.receiptTotal}`}>
          <span>Total due</span><span>$125.00</span>
        </div>
        <div className={styles.receiptBadge}>
          <CheckCircle size={13} />
          <span>No hidden fees</span>
        </div>
      </div>
    </div>
  );
}

function RangeVisual() {
  return (
    <div className={styles.rangeWrap}>
      <div className={styles.rangeTrack}>
        <div className={styles.rangeFill} />
        <div className={`${styles.rangeThumb} ${styles.rangeThumbLeft}`} />
        <div className={`${styles.rangeThumb} ${styles.rangeThumbRight}`} />
      </div>
      <div className={styles.rangeLabels}>
        <span>200</span><span>400</span><span>600</span><span>800</span>
      </div>
      <div className={styles.rangeNote}>
        <Sparkles size={11} /> Expected: <strong>400–600 visitors</strong>
      </div>
    </div>
  );
}

function CalendarVisual() {
  return (
    <div className={styles.calWrap}>
      <div className={styles.calTile}>
        <div className={styles.calMonth}>June</div>
        <div className={styles.calDay}>14</div>
      </div>
      <div className={styles.countdownRow}>
        {[['10', 'days'], ['14', 'hrs'], ['32', 'min'], ['07', 'sec']].map(([n, u]) => (
          <div key={u} className={styles.countdownCell}>
            <strong>{n}</strong>
            <span>{u}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineVisual() {
  return (
    <div className={styles.timelineWrap}>
      {[
        { label: 'Earliest load-in', time: '8:00 AM', active: false },
        { label: 'Setup window', time: '8:00–9:30 AM', active: true },
        { label: 'Event opens', time: '10:00 AM', active: false },
      ].map((item) => (
        <div key={item.label} className={`${styles.timelineItem} ${item.active ? styles.timelineActive : ''}`}>
          <div className={styles.timelineDot} />
          <div className={styles.timelineContent}>
            <span>{item.label}</span>
            <strong>{item.time}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

function PermitVisual() {
  return (
    <div className={styles.permitWrap}>
      {['Prepared food', 'Permit needed', 'Requirements surfaced early'].map((tag) => (
        <span key={tag} className={styles.permitTag}>
          <CheckCircle size={11} /> {tag}
        </span>
      ))}
    </div>
  );
}

function ShieldVisual() {
  return (
    <div className={styles.shieldWrap}>
      <div className={styles.shieldIcon}><ShieldCheck size={26} /></div>
      <div className={styles.shieldLines}>
        <p>Clear cancellation terms are visible before you apply.</p>
        <div className={styles.shieldDivider} />
        <p>Food-permit requirements are surfaced early so you can plan ahead.</p>
      </div>
    </div>
  );
}

const visuals = {
  receipt: ReceiptVisual,
  range: RangeVisual,
  calendar: CalendarVisual,
  timeline: TimelineVisual,
  permit: PermitVisual,
  shield: ShieldVisual,
};

/* ─── floating popup card ─────────────────────────────── */
function FloatCard({ popup, side, rowIndex, visible }) {
  const Visual = visuals[popup.visual];
  return (
    <div
      className={[
        styles.floatCard,
        visible ? styles.floatCardVisible : '',
        side === 'top-left'
          ? styles.floatCardTopLeft
          : side === 'left'
            ? styles.floatCardLeft
            : styles.floatCardRight,
      ].join(' ')}
      style={{ '--row-i': rowIndex }}
      aria-hidden={!visible}
    >
      <p className={styles.floatHeadline}>{popup.headline}</p>
      <p className={styles.floatBody}>{popup.body}</p>
      {Visual && <Visual />}
    </div>
  );
}

/* ─── inline expanded panel ──────────────────────────── */
function InlinePanel({ popup, visible }) {
  const Visual = visuals[popup.visual];
  return (
    <div
      className={[styles.inlinePanel, visible ? styles.inlinePanelVisible : ''].join(' ')}
      aria-hidden={!visible}
    >
      <p className={styles.inlineHeadline}>{popup.headline}</p>
      <p className={styles.inlineBody}>{popup.body}</p>
      {Visual && <Visual />}
    </div>
  );
}

/* ─── main component ─────────────────────────────────── */
export default function OpportunityCard() {
  const [hovered, setHovered] = useState(null);

  return (
    /* wrapper gives us a positioning context for float cards */
    <div className={styles.cardOuter}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Opportunity Details</span>
            <h3 className={styles.title}>Walnut Creek Weekend Market</h3>
          </div>
          <div
            className={styles.verifiedBadge}
            role="img"
            aria-label="Verified host"
            title="Verified hosts provide clearer event details and a more reliable vendor experience."
          >
            <ShieldCheck size={14} />
            <span>Verified host</span>
            <div className={styles.badgeTooltip}>
              Verified hosts provide clearer event details and a more reliable vendor experience.
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className={styles.divider}><span /></div>

        {/* Rows */}
        <div className={styles.rows}>
          {rowData.map((row, idx) => {
            const Icon = row.Icon;
            const isHovered = hovered === row.id;
            return (
              <div key={row.id}>
                <div
                  className={[styles.row, isHovered ? styles.rowHovered : ''].join(' ')}
                  onMouseEnter={() => setHovered(row.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(row.id)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                >
                  <i className={[styles.rowIcon, isHovered ? styles.rowIconHovered : ''].join(' ')}>
                    <Icon size={18} strokeWidth={2.2} />
                  </i>
                  <span className={styles.rowLabel}>{row.label}</span>
                  <em className={styles.rowDots} aria-hidden="true" />
                  <strong className={styles.rowValue}>{row.value}</strong>

                  {/* Float card rendered inside row for DOM proximity, positioned via CSS */}
                  {row.popupStyle === 'float' && (
                    <FloatCard
                      popup={row.popup}
                      side={row.popupSide}
                      rowIndex={idx}
                      visible={isHovered}
                    />
                  )}
                </div>

                {/* Inline expansion renders below the row */}
                {row.popupStyle === 'inline' && (
                  <InlinePanel popup={row.popup} visible={isHovered} />
                )}
              </div>
            );
          })}
        </div>

        {/* Trust panel */}
        <div className={styles.trustPanel}>
          <div className={styles.trustEmblem}>
            <ShieldCheck size={28} />
          </div>
          <div className={styles.trustPanelCopy}>
            <strong>Plan with confidence</strong>
            <span>This host is verified and committed to a great vendor experience.</span>
          </div>
          <svg
            className={styles.botanical}
            viewBox="0 0 150 92"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M18 82C50 48 84 24 132 10" />
            <path d="M46 56C35 42 35 28 48 16C57 31 56 45 46 56Z" />
            <path d="M72 38C65 24 69 12 84 5C89 20 84 31 72 38Z" />
            <path d="M88 32C103 23 118 23 133 34C118 42 103 41 88 32Z" />
            <path d="M55 52C71 49 84 55 94 69C78 70 65 64 55 52Z" />
            <path d="M28 72C42 71 54 77 62 89C48 89 37 83 28 72Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
