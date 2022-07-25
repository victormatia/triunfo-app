import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        {/* htmlFor é um identificador para o label, sem ele o lint reclama */}
        <label htmlFor="name">
          Nome
          <input type="text" data-testid="name-input" />
        </label>

        <label htmlFor="description">
          Descrição
          <textarea data-testid="description-input">
            Descreva a carta aqui
          </textarea>
        </label>

        <label htmlFor="attribute1">
          Atributo 1
          <input type="number" data-testid="attr1-input" />
        </label>

        <label htmlFor="attribute2">
          Atributo 2
          <input type="number" data-testid="attr2-input" />
        </label>

        <label htmlFor="attribute3">
          Atributo 3
          <input type="number" data-testid="attr3-input" />
        </label>

        <label htmlFor="image">
          Imagem
          <input type="text" data-testid="image-input" />
        </label>

        <select data-testid="rare-input">
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito raro</option>
        </select>

        <label htmlFor="super-trunfo">
          Super Trunfo
          <input type="checkbox" name="super-trunfo" data-testid="trunfo-input" />
        </label>

        <button type="submit" data-testid="save-button">Salvar</button>
      </form>
    );
  }
}

export default Form;
