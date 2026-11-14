// srs.js — répétition espacée (variante de SM-2). Pur : la date est toujours passée en argument.
export const DAY = 86400000;
export const GRADES = ['Raté', 'Difficile', 'Bien', 'Facile'];

export function newState() {
  return { ease: 2.5, interval: 0, reps: 0, lapses: 0, due: 0, last: 0 };
}

/** Applique une note (0 raté, 1 difficile, 2 bien, 3 facile) et renvoie le nouvel état. */
export function review(state, grade, now) {
  const s = { ...newState(), ...state };
  if (grade <= 0) {
    return { ...s, reps: 0, lapses: s.lapses + 1, interval: 0, ease: Math.max(1.3, s.ease - 0.2), due: now + 10 * 60000, last: now };
  }
  let interval, ease = s.ease;
  if (grade === 1) {
    interval = s.reps === 0 ? 1 : Math.max(1, Math.round(s.interval * 1.2));
    ease = Math.max(1.3, ease - 0.15);
  } else if (grade === 2) {
    interval = s.reps === 0 ? 1 : s.reps === 1 ? 3 : Math.max(s.interval + 1, Math.round(s.interval * ease));
  } else {
    interval = s.reps === 0 ? 3 : Math.max(s.interval + 2, Math.round(s.interval * ease * 1.3));
    ease = Math.min(3.0, ease + 0.15);
  }
  return { ...s, reps: s.reps + 1, interval, ease, due: now + interval * DAY, last: now };
}

export const isDue = (state, now) => !state || state.due <= now;

/** Trie des identifiants : d'abord les éléments dus (les plus en retard en premier), puis les nouveaux. */
export function queue(ids, srsMap, now, { limitNew = 10 } = {}) {
  const due = [], fresh = [];
  for (const id of ids) {
    const s = srsMap[id];
    if (!s) fresh.push(id);
    else if (s.due <= now) due.push(id);
  }
  due.sort((a, b) => srsMap[a].due - srsMap[b].due);
  return [...due, ...fresh.slice(0, limitNew)];
}

export function stats(ids, srsMap, now) {
  let due = 0, fresh = 0, learning = 0, mature = 0;
  for (const id of ids) {
    const s = srsMap[id];
    if (!s) fresh++;
    else {
      if (s.due <= now) due++;
      if (s.interval >= 21) mature++; else learning++;
    }
  }
  return { due, fresh, learning, mature, total: ids.length };
}

export function nextLabel(state, grade, now) {
  const r = review(state || newState(), grade, now);
  if (r.interval === 0) return '10 min';
  return r.interval === 1 ? '1 j' : r.interval < 30 ? `${r.interval} j` : `${Math.round(r.interval / 30)} mois`;
}
