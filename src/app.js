import React, { Component } from 'react';
import Madlib from './components/madlib';
import Alert from './components/alerts';
import { getPrice, toDollars } from './helpers/api';
import { sayCurrentPrice } from './helpers/voice';
import axios from 'axios';
import './styles/app.css';
import bitcoin from './images/bitcoin.svg';
import ethereum from './images/ethereum.svg';
import litecoin from './images/litecoin.svg';
import sound from './images/sound.svg';

class App extends Component {
  constructor() {
    super();

    this.state = {
      alerts: [],
      prices: {
        btc: '',
        eth: '',
        ltc: ''
      }
    }
  }

  addAlert(item) {
    if (this.state.alerts.length >= 3) {
      alert('Sorry, you can only have a max of 3 alerts right now. We\'re working to change this.');
      return;
    }
    const currentPrice = toDollars(this.state.prices[item.coin]);
    item = Object.assign(item, { startingPrice: currentPrice, lastPrice: null });
    this.setState({
      alerts: [...this.state.alerts, item]
    });
  }

  removeAlert(index) {
    this.setState((prevState) => {
      return {
        alerts: prevState.alerts.filter((_, i) => {
          return i !== index;
        })
      }
    });
  }

  componentDidMount() {
    this.checkForPrices();
    this.startPolling();
  }

  startPolling() {
    setInterval(() => {
      this.checkForPrices();
    }, 7500);
  }

  // updateAlert(id, obj = {}) {
  //
  //   this.setState((prevState) => {
  //     // pluck alert from array
  //     const item = prevState.alerts.slice(id, 1)[0];
  //
  //     // make copy of alert and alter it as necessary
  //     const newObj = Object.assign(item, obj);
  //
  //     // create new array with element in the same place
  //     const newArray = prevState.alerts.slice(id, 1, newObj);
  //
  //     // set state with new array
  //     return {
  //       alerts: newArray
  //     }
  //   });
  // }

  checkForPrices() {

    axios.all([getPrice('btc'), getPrice('eth'), getPrice('ltc')])
      .then(axios.spread((btc, eth, ltc) => {

        const updatedPrices = {
          btc: btc.data.price,
          eth: eth.data.price,
          ltc: ltc.data.price
        }

        const prices = Object.assign(this.state.prices, updatedPrices);

        const alerts = this.state.alerts.map((alert) => {
          const updatedPrice = updatedPrices[alert.coin];
          const checkAgainst = alert.lastPrice ? alert.lastPrice : alert.startingPrice;

          if (Math.abs(updatedPrice - checkAgainst) >= alert.diff) {

            sayCurrentPrice(alert.coin, toDollars(updatedPrices[alert.coin]));

            return Object.assign(alert, { lastPrice: toDollars(updatedPrice) });

          } else {
            return alert;
          }
        });

        this.setState({
          alerts,
          prices
        });

      })
    );
  }

  render() {
    return (
      <div>
        <nav className={`nav ${this.state.alerts.length > 0 ? 'alerts-active': ''}`}>
          <h1 className="logo">CoinNoise</h1>
          <div className="right-side">
            <span><img src={bitcoin} alt="Bitcoin logo" className="coin-image"/> {toDollars(this.state.prices['btc'])}</span>
            <span><img src={ethereum} alt="Ethereum logo" className="coin-image"/> {toDollars(this.state.prices['eth'])}</span>
            <span><img src={litecoin} alt="Litecoin logo" className="coin-image"/> {toDollars(this.state.prices['ltc'])}</span>
          </div>
        </nav>
        <div className={`main ${this.state.alerts.length > 0 ? 'alerts-active': ''}`}>
          <div>
            <h2>Spoken Price Notifications for <br/><span>Cryptocurrencies</span></h2>
            <h3 className="more-info">
            Just leave this tab open. Your crypto-butler will track the price and let you know when
            the price moves more than your specified amount.
            <span onClick={() => sayCurrentPrice('btc', toDollars(this.state.prices['btc']) )}>Try it out now.</span>
            <img className="sound" src={sound} />
            </h3>
          </div>
          <Madlib addAlert={this.addAlert.bind(this)} prices={this.state.prices}/>
        </div>
        <div className={`alert-list ${(this.state.alerts.length > 0) ? 'side-active' : ''}`}>
          <h4>Active Notifications</h4>
          <ul className="list-holder">
            { this.state.alerts.map((alert, i) => {
              return <Alert key={i} alert={alert} remove={this.removeAlert.bind(this, i)}/>
            }) }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

// TODO:
// 1) Local Storage
// 2) Percent changes
// 3) More coins?
// 4) More exchanges
// 5) Email / SMS Alerts
