import { BigInt, ByteArray, Address, Bytes, crypto, log, BigDecimal } from '@graphprotocol/graph-ts'
import { Project, FirstSeason, Series, TokenFirstPresale, Voting } from "../generated/schema"

export function createOrLoadProject(
    projectID: string,
    owner: string,
): Project {
    let project = Project.load(projectID)
    if (project == null) {
        project = new Project(projectID)
        project.owner = owner
        project.projectName = ''
        project.tokenName = ''
        project.symbol = ''
        project.decimal = 0
        project.state = '1'
        project.firstSeason = createOrLoadFirstSeason(projectID.concat("-1"), projectID).id

        project.save()
    }
    return project as Project
}

export function createOrLoadFirstSeason(
    seasonID: string,
    projectID: string
): FirstSeason {
    let season = FirstSeason.load(seasonID)
    if (season == null) {
        season = new FirstSeason(seasonID)
        season.project = projectID
        season.presale = createOrLoadTokenFirstPresale(seasonID.concat("Presale"), seasonID).id
        season.activeSeries = -1
        season.stakePercentsLeft = 0
        season.series = []
        season.save()
    }
    return season as FirstSeason
}

export function createOrLoadTokenFirstPresale(id: string, seasonID: string): TokenFirstPresale {
    let presale = TokenFirstPresale.load(id)
    if (presale == null) {
        presale = new TokenFirstPresale(id)
        presale.ownerPercent = 0
        presale.price = BigInt.fromI32(0)
        presale.start = BigInt.fromI32(0)
        presale.duration = BigInt.fromI32(0)
        presale.totalGenerated = BigInt.fromI32(0)
        presale.minCap = BigInt.fromI32(0)
        presale.firstSeason = seasonID

        presale.save()
    }
    return presale as TokenFirstPresale
}

export function createOrLoadSeries(seriesId: string, seasonID: string): Series {
    let series = Series.load(seriesId)
    if (series == null) {
        series = new Series(seriesId)
        series.season = seasonID
        series.start = BigInt.fromI32(0)
        series.stakeUnlock = 0
        series.duration = BigInt.fromI32(0)

        series.save()
    }
    return series as Series
}

export function createOrLoadVoting(id: string, event: string): Voting {
    let voting = Voting.load(id)
    if (voting == null) {
        voting = new Voting(id)
        voting.event = event
        voting.blockStart = BigInt.fromI32(0)
        voting.timestampStart = BigInt.fromI32(0)
        voting.result = "0"
        voting.totalSupply = BigInt.fromI32(0)
        voting.totalYes = BigInt.fromI32(0)
        voting.totalNo = BigInt.fromI32(0)

        voting.save()
    }
    return voting as Voting
}