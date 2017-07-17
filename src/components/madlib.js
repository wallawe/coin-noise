import React, { Component } from 'react';
import { toDollars } from '../helpers/api';
import '../styles/sentence.css';

export default class Madlib extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coin: 'btc',
      unit: 'usd',
      diff: 3
    }
  }

  handleSave() {
    if (this.state.diff) {
      this.props.addAlert(this.state);
    } else {
      alert('Make sure you\'ve added a deviation amount');
    }
  }

  handleCoinChange(e) {
    this.setState({
      coin: e.target.value
    });
  }

  handleAmountChange(e) {
    this.setState({
      diff: e.target.value
    });
  }

  render() {
    return (
      <div className="madlib">
        <p>Tell me when

        <select value={this.state.coin} onChange={this.handleCoinChange.bind(this)}>
          <option value="btc">Bitcoin</option>
          <option value="eth">Ethereum</option>
          <option value="ltc">Litecoin</option>
        </select>
        </p>

        <p>
          deviates by
          <input type="number" name="amount" value={this.state.diff} onChange={this.handleAmountChange.bind(this)} />
          dollars
        </p>

        <p>
          from the current price of <strong>${toDollars(this.props.prices[this.state.coin])}</strong>
        </p>

        <div className="text-center">
          <button onClick={this.handleSave.bind(this)} className="btn">Save Alert</button>
        </div>
      </div>
    )
  }
}


// TODO:
// 1) Local Storage
// 2) Percent changes
// 3) more coins?
