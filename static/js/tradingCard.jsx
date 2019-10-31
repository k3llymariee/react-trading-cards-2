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
      <div>{tradingCards}</div>
    );
  }
}

ReactDOM.render(
  <TradingCardContainer />,
  document.getElementById('container')
);
