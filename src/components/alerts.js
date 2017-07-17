import React, { Component } from 'react';
import closeBtn from '../images/cancel.svg';
import { currencyMap } from '../helpers/voice';

export default class Alert extends Component {

  render() {
    let { coin, startingPrice, diff, unit, lastPrice } = this.props.alert;
    return (
        <li>
          <div className="content">
            <h5>{currencyMap[coin]}</h5>
            <span className="item">Started Alert At: <strong>${startingPrice}</strong></span>
            { lastPrice ?
              <span className="item">Last Price Alerted: <strong>${lastPrice}</strong></span>
              : ''
            }
            <span className="item">Deviation: <strong>${diff} {unit.toUpperCase()}</strong></span>
          </div>
          <img onClick={this.props.remove} src={closeBtn} className="close-button"/>
        </li>
    )
  }
}
