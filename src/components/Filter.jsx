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
          name="name"
          value={ filter.name }
          onChange={ saveFilter }
          placeholder="Digite o nome"
          data-testid="name-filter"
        />
        <select
          name="rarity"
          defaultValue="Todas"
          onChange={ saveFilter }
          data-testid="rare-filter"
        >
          <option value="todas">Todas</option>
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito raro</option>
        </select>
      </label>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rarity: PropTypes.string.isRequired,
  }).isRequired,
  saveFilter: PropTypes.func.isRequired,
};

export default Filter;
