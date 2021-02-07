import {
  FinishVoting,
  Invest,
  ProjectCreated,
  ProjectUpdateNextSeason,
  StartVoting,
  StateUpdate,
  VoteRecord,
  VotingCreated
} from "../generated/Contract/Contract"

import {
  createOrLoadProject,
  createOrLoadFirstSeason,
  createOrLoadTokenFirstPresale,
  createOrLoadVoting,
  createOrLoadSeries } from './helpers'

export function handleFinishVoting(event: FinishVoting): void {
  const voting = createOrLoadVoting(event.params.voting.toHex(), "");
  voting.result = event.params.result
  voting.totalNo = event.params.totalNo
  voting.totalYes = event.params.totalYes
  voting.save();
}

export function handleInvest(event: Invest): void {
  // TODO: Add user entity
}

export function handleProjectCreated(event: ProjectCreated): void {
  const project = createOrLoadProject(event.params.project.toHex(), event.params.owner.toHex());
  project.projectName = event.params.projectName;
  project.tokenName = event.params.tokenName;
  project.symbol = event.params.symbol;
  project.decimal = event.params.decimal;
  project.save();

  const season = createOrLoadFirstSeason(project.firstSeason, project.id);
  season.stakePercentsLeft = event.params.season.StakePercentsLeft;
  season.activeSeries = event.params.season.ActiveSeries;

  const presale = createOrLoadTokenFirstPresale(season.presale, season.id);
  presale.duration = event.params.season.Presale.Duration;
  presale.price = event.params.season.Presale.Price;
  presale.ownerPercent = event.params.season.Presale.OwnerPercent;
  presale.minCap = event.params.season.Presale.MinCap;
  presale.save();

  const series = event.params.season.Series;
  for (let i = 0; i < series.length; ++i) {
    const s = createOrLoadSeries(season.id.concat("" + i), season.id);
    s.duration = series[i].Duration
    s.stakeUnlock = series[i].StakeUnlock
    s.vote = series[i].Vote.toHex()
    createOrLoadVoting(s.vote, s.id);
    s.save();
  }
  season.save();
}

export function handleProjectUpdateNextSeason(
  event: ProjectUpdateNextSeason
): void {
  // TODO: Add support of next seasons
}

export function handleStartVoting(event: StartVoting): void {
  const voting = createOrLoadVoting(event.params.voting.toHex(), "");
  voting.timestampStart = event.params.timestamp
  voting.blockStart = event.params.block
  voting.totalSupply = event.params.totalSupply
  voting.save();
}

export function handleStateUpdate(event: StateUpdate): void {
  const project = createOrLoadProject(event.params.project.toHex(), "");
  project.state = event.params.state;
  project.save();
}

export function handleVoteRecord(event: VoteRecord): void {
  // TODO: Add user entity and update info about vote record
}

export function handleVotingCreated(event: VotingCreated): void {
  const voting = createOrLoadVoting(event.params.voting.toHex(), "");
  // TODO: update properties
  voting.save();
}
