import { useSyncExternalStore } from 'react';

// Lite-Modus für Handys und Touch-Geräte: schwere WebGL-Effekte, Blur und Dauerschleifen werden
// dort durch leichte, statische Varianten ersetzt, damit das Scrollen flüssig bleibt.
const QUERY = '(max-width: 767px), (pointer: coarse)';

const subscribe = callback => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
};

export const isLiteMode = () => window.matchMedia(QUERY).matches;

export default function useLiteMode() {
  return useSyncExternalStore(subscribe, isLiteMode, () => false);
}
