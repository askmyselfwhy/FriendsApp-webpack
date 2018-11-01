import React from 'react';
import PropTypes from 'prop-types';

const UserCard = (props) => {
  const {
    onSelectUser, onDeleteUser, user, isSelected,
  } = props;
  return (
    <li className={`user-card ${isSelected && 'user-card--selected'}`}>
      <button className="content" type="button" onClick={onSelectUser.bind(this, user.id)}>
        <div>
          <p>
            UserID:
            {user.id}
          </p>
          <p>
            Name:
            {user.name}
          </p>
        </div>
      </button>
      <button type="button" className="user-card__btn-delete" onClick={onDeleteUser.bind(this, user.id)}>X</button>
    </li>
  );
};
UserCard.propTypes = {
  onSelectUser: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  isSelected: PropTypes.bool.isRequired,
};
export default UserCard;
