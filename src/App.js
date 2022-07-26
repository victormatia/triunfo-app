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
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
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
