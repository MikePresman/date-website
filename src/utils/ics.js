const pad = (num) => String(num).padStart(2, "0");

const formatLocal = (date) => {
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${y}${m}${d}T${hh}${mm}${ss}`;
};

const formatUtc = (date) => {
  const y = date.getUTCFullYear();
  const m = pad(date.getUTCMonth() + 1);
  const d = pad(date.getUTCDate());
  const hh = pad(date.getUTCHours());
  const mm = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());
  return `${y}${m}${d}T${hh}${mm}${ss}Z`;
};

const nextSaturday = (from = new Date()) => {
  const date = new Date(from);
  const day = date.getDay();
  const daysUntil = (6 - day + 7) % 7 || 7;
  date.setDate(date.getDate() + daysUntil);
  date.setHours(12, 0, 0, 0);
  return date;
};

export const downloadAdventureIcs = ({ selections }) => {
  const start = nextSaturday();
  const end = new Date(start);
  end.setHours(20, 0, 0, 0);

  const descriptionLines = [
    "Chosen activities:",
    ...selections.map((item) => `- ${item.emoji} ${item.label}`),
  ];

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Saturday Adventure//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:adventure-${Date.now()}@date-idea`,
    `DTSTAMP:${formatUtc(new Date())}`,
    `DTSTART:${formatLocal(start)}`,
    `DTEND:${formatLocal(end)}`,
    "SUMMARY:Adventure with Mike",
    "LOCATION:Toronto",
    `DESCRIPTION:${descriptionLines.join("\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "adventure-with-mike.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
