import PropTypes from 'prop-types'
import { UserType } from './user.model';

export class Betting {
    Id = undefined;
    constructor(matchId, user, prediction, match_points) {
        this.matchId = matchId;
        this.user = user;
        this.prediction = prediction;
        this.match_points = match_points;
    }
}

export const BettingType = PropTypes.shape({
    Id: PropTypes.number,
    matchId: PropTypes.string,
    user: UserType,
    prediction: PropTypes.string,
    match_points: PropTypes.number
})