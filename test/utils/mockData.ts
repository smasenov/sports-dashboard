import { Event } from '../../src/types/espn';

export const mockEvent: Event = {
  id: '401628442',
  uid: 's:40~l:46~e:401628442',
  date: '2024-02-08T00:00:00Z',
  name: 'Los Angeles Lakers at Boston Celtics',
  shortName: 'LAL @ BOS',
  season: {
    year: 2024,
    type: 2,
    slug: 'regular-season',
  },
  competitions: [
    {
      id: '401628442',
      uid: 's:40~l:46~e:401628442~c:401628442',
      date: '2024-02-08T00:00:00Z',
      competitors: [
        {
          id: '13',
          uid: 's:40~l:46~t:13',
          type: 'team',
          order: 0,
          homeAway: 'away',
          team: {
            id: '13',
            uid: 's:40~l:46~t:13',
            location: 'Los Angeles',
            name: 'Lakers',
            abbreviation: 'LAL',
            displayName: 'Los Angeles Lakers',
            shortDisplayName: 'Lakers',
            color: '552583',
            alternateColor: 'fdb927',
            isActive: true,
            logo: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
            logos: [
              {
                href: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
                width: 500,
                height: 500,
                alt: 'Lakers',
                rel: ['full', 'default'],
              },
            ],
          },
          score: '105',
          record: [
            {
              name: 'overall',
              type: 'total',
              summary: '24-24',
              displayValue: '24-24',
            },
          ],
        },
        {
          id: '2',
          uid: 's:40~l:46~t:2',
          type: 'team',
          order: 1,
          homeAway: 'home',
          winner: true,
          team: {
            id: '2',
            uid: 's:40~l:46~t:2',
            location: 'Boston',
            name: 'Celtics',
            abbreviation: 'BOS',
            displayName: 'Boston Celtics',
            shortDisplayName: 'Celtics',
            color: '007a33',
            alternateColor: 'ba9653',
            isActive: true,
            logo: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png',
            logos: [
              {
                href: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png',
                width: 500,
                height: 500,
                alt: 'Celtics',
                rel: ['full', 'default'],
              },
            ],
          },
          score: '110',
          record: [
            {
              name: 'overall',
              type: 'total',
              summary: '38-11',
              displayValue: '38-11',
            },
          ],
        },
      ],
      status: {
        clock: 0,
        displayClock: '0.0',
        period: 4,
        type: {
          id: '3',
          name: 'STATUS_FINAL',
          state: 'post',
          completed: true,
          description: 'Final',
          detail: 'Final',
          shortDetail: 'Final',
        },
      },
    },
  ],
  status: {
    clock: 0,
    displayClock: '0.0',
    period: 4,
    type: {
      id: '3',
      name: 'STATUS_FINAL',
      state: 'post',
      completed: true,
      description: 'Final',
      detail: 'Final',
      shortDetail: 'Final',
    },
  },
};

export const mockTeam = {
  id: '13',
  uid: 's:40~l:46~t:13',
  location: 'Los Angeles',
  name: 'Lakers',
  abbreviation: 'LAL',
  displayName: 'Los Angeles Lakers',
  shortDisplayName: 'Lakers',
  color: '552583',
  alternateColor: 'fdb927',
  isActive: true,
  logo: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
  logos: [
    {
      href: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
      width: 500,
      height: 500,
      alt: 'Lakers',
      rel: ['full', 'default'],
    },
  ],
};

export const mockScoreboardResponse = {
  leagues: [
    {
      id: '46',
      uid: 's:40~l:46',
      name: 'National Basketball Association',
      abbreviation: 'NBA',
      slug: 'nba',
    },
  ],
  events: [mockEvent],
};
