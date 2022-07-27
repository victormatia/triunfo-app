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
            firstAttr: cardAttr1,
            secondAttr: cardAttr2,
            thirdAttr: cardAttr3,
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
      savedCards,
    } = this.state;

    return (
      <main>
        <section className="fisrt-screen">
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
        </section>

        <section className="second-screen">
          <p>Todas as cartas</p>
          {
            savedCards.map((card) => ( // lembre-se que map deve retornar um array de objetos html, por isso usamos os () no lugar das {}.
              <Card
                key={ card.name }
                cardName={ card.name }
                cardDescription={ card.description }
                cardAttr1={ card.firstAttr }
                cardAttr2={ card.secondAttr }
                cardAttr3={ card.thirdAttr }
                cardImage={ card.image }
                cardRare={ card.rare }
                cardTrunfo={ card.isTrunfo }
              />
            ))
          }
        </section>
      </main>
    );
  }
}

export default App;
