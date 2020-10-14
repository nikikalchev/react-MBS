import PropTypes from 'prop-types'

export class User {
  Id = undefined;
  role = 'registered';
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export const UserType = PropTypes.shape({
    Id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string
})