import React from 'react';
import './App.css';
import Form from './components/Form';
import Card from './components/Card';
import DeleteButton from './components/DeleteButton';
import Filter from './components/Filter';

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
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      savedCards: [],
      filter: {
        name: '',
        rarity: '',
      },
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
            name: cardName,
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
        cardRare: 'normal',
        cardTrunfo: false,
      };
    });
  }

  verifySuperTrunfo = () => {
    const { savedCards } = this.state;
    return savedCards.some((card) => card.isTrunfo);
  }

  deleteCard = ({ target }) => {
    const { savedCards } = this.state;
    this.setState({ savedCards: savedCards.filter((card) => card.name !== target.name) });
  }

  saveFilter = ({ target }) => {
    this.setState(({ filter }) => {
      if (target.name === 'name') {
        return {
          filter: {
            [target.name]: target.value,
            rarity: filter.rarity,
          },
        };
      } if (target.name === 'rarity') {
        return {
          filter: {
            name: filter.name,
            [target.name]: target.value,
          },
        };
      }
    });
  }

  filterCardsToName = () => {
    const { savedCards, filter } = this.state;
    const filteredCards = savedCards.filter((card) => card.name.includes(filter.name));

    return filteredCards;
  }

  filterCardsToRarity = () => {
    const { savedCards, filter } = this.state;
    const filteredCards = savedCards.filter((card) => card.rare === filter.rarity);
    if (filter.rarity === 'todas') return savedCards;

    return filteredCards;
  }

  filterCards = () => {
    const { savedCards, filter } = this.state;

    if (filter.name.length > 0 && filter.rarity.length > 0) {
      return this.filterCardsToRarity().filter((card) => card.name.includes(filter.name));
    } if (filter.name.length > 0) {
      return this.filterCardsToName();
    } if (filter.rarity.length > 0) {
      return this.filterCardsToRarity();
    }
    return savedCards;
  };

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
      filter,
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
          <section className="filter-sec">
            <p>Todas as cartas</p>
            <Filter filter={ filter } saveFilter={ this.saveFilter } />
          </section>
          <section className="card-saved-sec">
            {
              this.filterCards().map((card) => ( // lembre-se que map deve retornar um array de objetos html, por isso usamos os () no lugar das {}.
                <div key={ card.name }>
                  <Card
                    cardName={ card.name }
                    cardDescription={ card.description }
                    cardAttr1={ card.firstAttr }
                    cardAttr2={ card.secondAttr }
                    cardAttr3={ card.thirdAttr }
                    cardImage={ card.image }
                    cardRare={ card.rare }
                    cardTrunfo={ card.isTrunfo }
                  />
                  <DeleteButton deleteCard={ this.deleteCard } name={ card.name } />
                </div>
              ))
            }
          </section>
        </section>
      </main>
    );
  }
}

export default App;
