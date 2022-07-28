import React from 'react';
import PropTypes from 'prop-types';

class DeleteButton extends React.Component {
  render() {
    const { deleteCard, name } = this.props;

    return (
      <button
        name={ name }
        type="button"
        onClick={ deleteCard }
        data-testid="delete-button"
      >
        Excluir
      </button>
    );
  }
}

DeleteButton.propTypes = {
  deleteCard: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default DeleteButton;
