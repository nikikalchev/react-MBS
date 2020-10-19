import PropTypes from 'prop-types'
import { TeamType } from './team.model';

export class Match {
    Id = undefined;
    constructor(team1, team2, goalsTeam1, goalsTeam2) {
        this.team1 = team1;
        this.team2 = team2;
        this.goalsTeam1 = goalsTeam1;
        this.goalsTeam2 = goalsTeam2;
    }
}

export const MatchType = PropTypes.shape({
    Id: PropTypes.number,
    team1: TeamType,
    team2: TeamType,
    goalsTeam1: PropTypes.string,
    goalsTeam2: PropTypes.string
})