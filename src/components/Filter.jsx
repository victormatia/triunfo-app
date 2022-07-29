import React from 'react';
import PropTypes from 'prop-types';

class Filter extends React.Component {
  render() {
    const { filter, saveFilter } = this.props;

    return (
      <label htmlFor="filter-cards">
        Filtrar cartas
        <input
          type="text"
          value={ filter }
          onChange={ saveFilter }
          placeholder="Digite uma caracteŕistica"
          data-testid="name-filter"
        />
      </label>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  saveFilter: PropTypes.func.isRequired,
};

export default Filter;
