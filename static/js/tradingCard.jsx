class TradingCardForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      skill: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
  }

  addNewCard() {
    // FIXME
    const data = {
      name: this.state.name,
      skill: this.state.skill
    }; 

    $.post('/add-card', data, alert('we added a card!'));
  }

  updateCards() {
    alert('done adding card!');
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSkillChange(e) {
    this.setState({ skill: e.target.value });
  }

  render() {
    return (
      <form>
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />

        <label for="skill">Skill:</label>
        <input
          id="skill"
          type="text"
          value={this.state.skill}
          onChange={this.handleSkillChange}
        />

        <button onClick={this.addNewCard}>Add</button>
      </form>
    );
  }
}

class TradingCard extends React.Component {
  render() {
    return (
      <div className="card">
        <p>Name: {this.props.name}</p>
        <img src={this.props.imgUrl} />
        <p>Skill: {this.props.skill} </p>
      </div>
    );
  }
}

class TradingCardContainer extends React.Component {
  constructor() {
    super();

    this.state = {cards: []}; 
    this.updateCards = this.updateCards.bind(this);
  }

  updateCards(response) { // how does response from AJAX request flow here?
    const cards = response.cards;
    this.setState({ cards: cards});
    };
  

  getCardData() {
    $.get("/cards.json", this.updateCards); // $.get(URL, successfunction)
  }

  componentDidMount() {
    this.getCardData();
  }

  render() {
    const tradingCards = [];

    for (const currentCard of this.state.cards) {
      tradingCards.push(
        <TradingCard
          key={currentCard.name}
          name={currentCard.name}
          skill={currentCard.skill}
          imgUrl={currentCard.imgUrl}
        />
      );
    }

    return (
      <div>
        <TradingCardForm />
        <div>{tradingCards}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <TradingCardContainer />,
  document.getElementById('container')
);
