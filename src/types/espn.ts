// ESPN API Types

export interface Competition {
  id: string;
  uid: string;
  date: string;
  attendance?: number;
  competitors: Competitor[];
  status: CompetitionStatus;
  broadcasts?: Broadcast[];
  notes?: Note[];
}

export interface Competitor {
  id: string;
  uid: string;
  type: 'team' | 'athlete';
  order: number;
  homeAway: 'home' | 'away';
  winner?: boolean;
  team: Team;
  score: string;
  record?: Record[];
}

export interface Team {
  id: string;
  uid: string;
  location: string;
  name: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  color: string;
  alternateColor: string;
  isActive: boolean;
  logo: string;
  logos?: Logo[];
}

export interface Logo {
  href: string;
  width: number;
  height: number;
  alt: string;
  rel: string[];
}

export interface CompetitionStatus {
  clock: number;
  displayClock: string;
  period: number;
  type: StatusType;
}

export interface StatusType {
  id: string;
  name: string;
  state: 'pre' | 'in' | 'post';
  completed: boolean;
  description: string;
  detail: string;
  shortDetail: string;
}

export interface Record {
  name: string;
  type: string;
  summary: string;
  displayValue: string;
}

export interface Broadcast {
  market: string;
  names: string[];
}

export interface Note {
  type: string;
  headline: string;
}

export interface Event {
  id: string;
  uid: string;
  date: string;
  name: string;
  shortName: string;
  season: Season;
  competitions: Competition[];
  status: CompetitionStatus;
  links?: Link[];
}

export interface Season {
  year: number;
  type: number;
  slug: string;
}

export interface Link {
  language: string;
  rel: string[];
  href: string;
  text: string;
  shortText: string;
  isExternal: boolean;
  isPremium: boolean;
}

export interface Scoreboard {
  leagues: League[];
  events: Event[];
}

export interface League {
  id: string;
  uid: string;
  name: string;
  abbreviation: string;
  slug: string;
  season: Season;
  logos?: Logo[];
  calendarType: string;
  calendarIsWhitelist: boolean;
  calendarStartDate: string;
  calendarEndDate: string;
}

export interface GameSummary {
  boxscore: Boxscore;
  format: Format;
  gameInfo: GameInfo;
  leaders: Leader[];
  seasonseries?: SeasonSeries;
  standings?: Standings;
  header: Header;
  predictor?: Predictor;
  pickcenter?: PickCenter[];
  againstTheSpread?: AgainstTheSpread[];
  odds?: Odds[];
  winprobability?: WinProbability[];
  scoringPlays?: ScoringPlay[];
  videos?: Video[];
}

export interface Boxscore {
  teams: BoxscoreTeam[];
  players: Player[];
}

export interface BoxscoreTeam {
  team: Team;
  statistics: Statistic[];
}

export interface Statistic {
  name: string;
  displayName: string;
  shortDisplayName: string;
  description: string;
  abbreviation: string;
  type: string;
  displayValue: string;
}

export interface Player {
  team: Team;
  statistics: PlayerStatistic[];
}

export interface PlayerStatistic {
  name: string;
  keys: string[];
  text: string;
  labels: string[];
  descriptions: string[];
  athletes: Athlete[];
}

export interface Athlete {
  athlete: AthleteInfo;
  stats: string[];
}

export interface AthleteInfo {
  id: string;
  uid: string;
  displayName: string;
  shortName: string;
  links?: Link[];
  headshot?: string;
  jersey?: string;
  position?: Position;
}

export interface Position {
  name: string;
  displayName: string;
  abbreviation: string;
}

export interface Format {
  regulation: Regulation;
}

export interface Regulation {
  periods: number;
}

export interface GameInfo {
  venue: Venue;
  attendance?: number;
  officials?: Official[];
}

export interface Venue {
  id: string;
  fullName: string;
  address: Address;
  capacity?: number;
  indoor: boolean;
}

export interface Address {
  city: string;
  state?: string;
}

export interface Official {
  fullName: string;
  displayName: string;
  order: number;
  position?: Position;
}

export interface Leader {
  name: string;
  displayName: string;
  shortDisplayName: string;
  abbreviation: string;
  leaders: LeaderItem[];
}

export interface LeaderItem {
  displayValue: string;
  value: number;
  athlete: AthleteInfo;
  team: Team;
}

export interface SeasonSeries {
  type: string;
  title: string;
  summary: string;
  completed: boolean;
}

export interface Standings {
  fullViewLink: Link;
  groups: StandingGroup[];
}

export interface StandingGroup {
  header: string;
  href: string;
  standings: Standing[];
}

export interface Standing {
  team: Team;
  stats: StandingStat[];
}

export interface StandingStat {
  name: string;
  displayName: string;
  shortDisplayName: string;
  description: string;
  abbreviation: string;
  type: string;
  value: number;
  displayValue: string;
}

export interface Header {
  id: string;
  uid: string;
  season: Season;
  timeValid: boolean;
  competitions: Competition[];
  links?: Link[];
  league: League;
}

export interface Predictor {
  name: string;
  abbreviation: string;
  homeTeam: PredictorTeam;
  awayTeam: PredictorTeam;
}

export interface PredictorTeam {
  id: string;
  gameProjection: string;
  teamChanceLoss: string;
}

export interface PickCenter {
  provider: Provider;
  details: string;
  overUnder: number;
  spread: number;
  overOdds: number;
  underOdds: number;
  awayTeamOdds: AwayTeamOdds;
  homeTeamOdds: HomeTeamOdds;
  links?: Link[];
}

export interface Provider {
  id: string;
  name: string;
  priority: number;
}

export interface AwayTeamOdds {
  favorite: boolean;
  underdog: boolean;
  moneyLine: number;
  spreadOdds: number;
  team: Team;
}

export interface HomeTeamOdds {
  favorite: boolean;
  underdog: boolean;
  moneyLine: number;
  spreadOdds: number;
  team: Team;
}

export interface AgainstTheSpread {
  team: Team;
  records: Record[];
}

export interface Odds {
  provider: Provider;
  details: string;
  overUnder: number;
  spread: number;
  overOdds: number;
  underOdds: number;
  awayTeamOdds: AwayTeamOdds;
  homeTeamOdds: HomeTeamOdds;
  links?: Link[];
}

export interface WinProbability {
  tiePercentage: number;
  homeWinPercentage: number;
  playId: string;
}

export interface ScoringPlay {
  id: string;
  type: ScoringPlayType;
  text: string;
  awayScore: number;
  homeScore: number;
  period: Period;
  clock: Clock;
  scoringType: ScoringType;
  priority: number;
  team: Team;
}

export interface ScoringPlayType {
  id: string;
  text: string;
}

export interface Period {
  type: string;
  number: number;
}

export interface Clock {
  displayValue: string;
  seconds: number;
}

export interface ScoringType {
  name: string;
  displayName: string;
  abbreviation: string;
}

export interface Video {
  id: number;
  source: string;
  headline: string;
  caption: string;
  description: string;
  premium: boolean;
  ad: Ad;
  tracking: Tracking;
  thumbnail: string;
  duration: number;
  links: VideoLinks;
}

export interface Ad {
  sport: string;
  bundle: string;
}

export interface Tracking {
  sportName: string;
  leagueName: string;
  coverageType: string;
  trackingName: string;
  trackingId: string;
}

export interface VideoLinks {
  api: Api;
  web: Web;
  source: Source;
  mobile: Mobile;
}

export interface Api {
  self: Self;
  artwork: Self;
}

export interface Self {
  href: string;
}

export interface Web {
  href: string;
  short: Self;
  self: Self;
}

export interface Source {
  mezzanine: Self;
  flash: Self;
  hds: Self;
  HLS: HLS;
  HD: Self;
  full: Self;
  href: string;
}

export interface HLS {
  href: string;
  HD: Self;
}

export interface Mobile {
  alert: Self;
  source: Self;
  href: string;
  streaming: Self;
  progressiveDownload: Self;
}

// Teams Response
export interface TeamsResponse {
  sports: Sport[];
}

export interface Sport {
  id: string;
  uid: string;
  name: string;
  slug: string;
  leagues: LeagueDetail[];
}

export interface LeagueDetail {
  id: string;
  uid: string;
  name: string;
  abbreviation: string;
  shortName: string;
  slug: string;
  teams: TeamItem[];
}

export interface TeamItem {
  team: Team;
}
