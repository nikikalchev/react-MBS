import PropTypes from 'prop-types'

export class Team {
  teamId = undefined;
  constructor(name, leagueId, logo) {
    this.name = name;
    this.leagueId = leagueId;
    this.logo = logo;
  }
}

export const TeamType = PropTypes.shape({
    teamId: PropTypes.number,
    name: PropTypes.string,
    league: PropTypes.number,
    logo: PropTypes.string
})
