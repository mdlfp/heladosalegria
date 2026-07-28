// lib/format.ts
import type { Config } from "@/validations/config";

const DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const DAY_LABELS_ES: Record<(typeof DAY_ORDER)[number], string> = {
  Monday: "Lunes",
  Tuesday: "Martes",
  Wednesday: "Miércoles",
  Thursday: "Jueves",
  Friday: "Viernes",
  Saturday: "Sábado",
  Sunday: "Domingo",
};

// Convierte "12:00:00.000" -> "12:00 p.m."
function formatTime(time: string): string {
  const [hStr, mStr] = time.split(":");
  let h = parseInt(hStr, 10);
  const suffix = h >= 12 ? "p.m." : "a.m.";
  h = h % 12 || 12;
  return `${h}:${mStr} ${suffix}`;
}

// Arma el horario semanal agrupando días consecutivos que comparten
// el mismo horario (ej. "Lunes - Viernes: Cerrado", en vez de 5 filas
// repetidas). Los días sin entrada en openingHours se marcan "Cerrado".
export function formatSchedule(config: Config) {
  const daily = DAY_ORDER.map((day) => {
    const entry = config.openingHours.find((oh) => oh.dayOfWeek === day);
    return {
      label: DAY_LABELS_ES[day],
      hours: entry
        ? `${formatTime(entry.opens)} – ${formatTime(entry.closes)}`
        : "Cerrado",
    };
  });

  const groups: { labels: string[]; hours: string }[] = [];
  for (const item of daily) {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.hours === item.hours) {
      lastGroup.labels.push(item.label);
    } else {
      groups.push({ labels: [item.label], hours: item.hours });
    }
  }

  return groups.map((group) => {
    const { labels, hours } = group;
    const label =
      labels.length === 1
        ? labels[0]
        : labels.length === 2
        ? `${labels[0]} y ${labels[1]}`
        : `${labels[0]} - ${labels[labels.length - 1]}`;
    return { day: label, hours };
  });
}

// Compone la dirección completa a partir de los campos separados,
// omitiendo los que estén vacíos.
export function formatAddress(config: Config): string {
  return [
    config.streetAddress,
    config.addressLocality,
    config.addressRegion,
    config.postalCode,
  ]
    .filter(Boolean)
    .join(", ");
}