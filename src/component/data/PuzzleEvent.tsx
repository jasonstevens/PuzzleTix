export interface PuzzleEvent {
  id: number;
  shortName: string;
  shortLabel?: string;
  name: string;
  fullname?: string;
  organisation: number;
  active?: boolean;
  logo?: string;
  ready?: boolean;
  complete?: boolean;
  when?: string;
  reportGraphic?: string;
  tableAllocation?: boolean;
  format?: number; // Blank / 0 = Normal, 1 = Online
  volunteers: boolean;
  spectators: number;
  finder: boolean;
  divisions: number[];
}

export const getEvents = () => {
  return data;
}

export function getEvent(shortName: string): PuzzleEvent {
  return data.filter(event => event.shortName == shortName)[0];
}

const data: PuzzleEvent[] =
  [
    {
      id: 10,
      name: "Cardiff Championships 2026",
      shortName: "cardiff2026",
      shortLabel: "WALES",
      organisation: 1,
      logo: "/events/cardiff2026.png",
      ready: true,
      volunteers: true,
      spectators: 3,
      finder: true,
      divisions: [1, 2, 4],
    },
    {
      id: 11,
      name: "UK Nationals 2026",
      shortName: "uk2026",
      shortLabel: "UKM",
      organisation: 1,
      logo: "/events/uknationals2026.png",
      ready: true,
      volunteers: true,
      spectators: 0,
      finder: true,
      divisions: [1, 2, 4],
    },

    {
      id: 0,
      name: "Alderaan Imperial",
      shortName: "alderaan",
      shortLabel: "ALD",
      organisation: 1,
      logo: "/events/alderaan.png",
      ready: true,
      volunteers: true,
      spectators: 5,
      finder: false,
      divisions: [1, 2, 4],
    },
  ]