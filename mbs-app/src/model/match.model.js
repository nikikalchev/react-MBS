import PropTypes from 'prop-types'

export class Match {
    matchId = undefined;
    constructor(team1Id, team2Id, leagueId) {
        this.team1 = team1Id;
        this.team2 = team2Id;
        this.league = leagueId;
    }
}

export const MatchType = PropTypes.shape({
    matchId: PropTypes.number,
    team1Id: PropTypes.number,
    team2Id: PropTypes.number,
    leagueId: PropTypes.number
})