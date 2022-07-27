import React from 'react';
import './App.css';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'Normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      savedCards: [],
    };
  }

  verifyInputsValues = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;

    const stringValidation = cardName.length > 0
      && cardDescription.length > 0
      && cardImage.length > 0;

    const maxValue = 210;
    const maxAtt = 90;
    const sumAttrValdation = parseInt(cardAttr1, 10)
      + parseInt(cardAttr2, 10)
      + parseInt(cardAttr3, 10)
      <= maxValue;

    const att1 = parseInt(cardAttr1, 10) <= maxAtt && parseInt(cardAttr1, 10) >= 0;
    const att2 = parseInt(cardAttr2, 10) <= maxAtt && parseInt(cardAttr2, 10) >= 0;
    const att3 = parseInt(cardAttr3, 10) <= maxAtt && parseInt(cardAttr3, 10) >= 0;
    const maxAttValidation = att1 && att2 && att3;

    const attValidation = sumAttrValdation && maxAttValidation;

    if (stringValidation && attValidation) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  onInputChange = ({ target }) => {
    const { name, value, checked } = target;
    const isChecked = value === 'on' ? checked : value;
    this.setState({ [name]: isChecked }, this.verifyInputsValues);
    this.verifySuperTrunfo();
  };

  onSaveButtonClick = () => {
    this.setState((prevState) => {
      const {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
      } = this.state;

      return {
        savedCards: [...prevState.savedCards,
          {
            name: cardName, // Em atribuições de chaves com o mesmo nome, podemos usar a propria chave como o valor, ao invés de cardName: cardName,
            description: cardDescription,
            attr1: cardAttr1,
            attr2: cardAttr2,
            attr3: cardAttr3,
            image: cardImage,
            rare: cardRare,
            isTrunfo: cardTrunfo,
          }],
        cardName: '',
        cardDescription: '',
        cardImage: '',
        cardAttr1: '0',
        cardAttr2: '0',
        cardAttr3: '0',
        cardRare: 'Normal',
        cardTrunfo: false,
      };
    });
  }

  verifySuperTrunfo = () => {
    const { savedCards } = this.state;
    return savedCards.some((card) => card.isTrunfo);
  }

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
      isSaveButtonDisabled,
    } = this.state;

    return (
      <main>
        <div className="form-sec">
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
            hasTrunfo={ this.verifySuperTrunfo() }
          />
        </div>

        <div className="card-sec">
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
        </div>
      </main>
    );
  }
}

export default App;
