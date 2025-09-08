import * as React from "react";
import { IconWorldCog } from "@tabler/icons-react"; // contoh pakai tabler, ganti sesuai library kamu

const MAINTENANCE_DATE = "2025-08-22T09:30:00";

function useCountdown(targetDate) {
  const calcTime = () => {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;
    return diff > 0
      ? {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        }
      : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };
  const [time, setTime] = React.useState(calcTime());

  React.useEffect(() => {
    const id = setInterval(() => setTime(calcTime()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return time;
}

export default function MaintenanceResponsive() {
  const { days, hours, minutes, seconds } = useCountdown(MAINTENANCE_DATE);

  return (
    <>
      <style>
        {`
        .maintenance-root {
          min-height: 100vh;
          min-width: 100vw;
          background: linear-gradient(135deg, #232526 0%, #18191a 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .maint-title {
          font-weight: 900;
          color: #ececec;
          letter-spacing: 2px;
          font-size: 32px;
          margin-bottom: 20px;
          text-align: center;
        }
        .maint-desc {
          color: #b0b3b8;
          font-size: 18px;
          margin-bottom: 32px;
          max-width: 420px;
          text-align: center;
        }
        .countdown-row {
          display: flex;
          flex-direction: row;
          gap: 28px;
          font-family: monospace;
          font-size: 32px;
          font-weight: 800;
          color: #ececec;
          margin-bottom: 32px;
          justify-content: center;
          align-items: center;
        }
        .cd-unit {
          text-align: center;
        }
        .cd-label {
          font-size: 14px;
          color: #888;
        }
        .maint-footer {
          color: #616770;
          font-size: 13px;
          margin-top: 0;
          margin-bottom: 6px;
          text-align: center;
        }
        @media (max-width: 600px) {
          .maint-title { font-size: 20px; }
          .maint-desc { font-size: 15px; max-width: 96vw;}
          .countdown-row { gap: 12px; font-size: 22px; }
          .cd-label { font-size: 11px; }
          .maintenance-root { padding: 6vw 2vw; }
        }
        `}
      </style>
      <div className="maintenance-root">
        <IconWorldCog size={68} style={{ color: "#bfc1c6", marginBottom: 16 }} />
        <div className="maint-title">MAINTENANCE</div>
        <div className="maint-desc">
          Our website is currently undergoing scheduled maintenance.<br />
          <b>We'll be back soon!</b>
        </div>
        <div className="maint-footer">
          &copy; {new Date().getFullYear()} ROOMS INVASION. All rights reserved.
        </div>
      </div>
    </>
  );
}
