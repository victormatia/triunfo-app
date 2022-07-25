import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <form>
        {/* htmlFor é um identificador para o label, sem ele o lint reclama */}
        <label htmlFor="name-input">
          Nome
          <input
            type="text"
            value={ cardName }
            onChange={ onInputChange }
            data-testid="name-input"
          />
        </label>

        <label htmlFor="description-input">
          Descrição
          <textarea
            value={ cardDescription }
            onChange={ onInputChange }
            data-testid="description-input"
          >
            Descreva a carta aqui
          </textarea>
        </label>

        <label htmlFor="attr1-input">
          Atributo 1
          <input
            type="number"
            value={ cardAttr1 }
            onChange={ onInputChange }
            data-testid="attr1-input"
          />
        </label>

        <label htmlFor="attr2-input">
          Atributo 2
          <input
            type="number"
            value={ cardAttr2 }
            onChange={ onInputChange }
            data-testid="attr2-input"
          />
        </label>

        <label htmlFor="attr3-input">
          Atributo 3
          <input
            type="number"
            value={ cardAttr3 }
            onChange={ onInputChange }
            data-testid="attr3-input"
          />
        </label>

        <label htmlFor="image-input">
          Imagem
          <input
            type="text"
            value={ cardImage }
            onChange={ onInputChange }
            data-testid="image-input"
          />
        </label>

        <select
          htmlFor="rare-input"
          value={ cardRare }
          onChange={ onInputChange }
          data-testid="rare-input"
        >
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito raro</option>
        </select>

        <label htmlFor="trunfo-input">
          Super Trunfo
          <input
            type="checkbox"
            name="super-trunfo"
            checked={ cardTrunfo }
            onChange={ onInputChange }
            data-testid="trunfo-input"
          />
        </label>

        <button
          htmlFor="save-button"
          type="submit"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
          data-testid="save-button"
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
