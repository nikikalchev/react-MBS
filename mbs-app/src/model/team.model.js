import PropTypes from 'prop-types'

export class Team {
  Id = undefined;
  constructor(name, logo) {
    this.name = name;
    this.logo = logo;
  }
}

export const TeamType = PropTypes.shape({
    Id: PropTypes.number,
    name: PropTypes.string,
    logo: PropTypes.string
})
