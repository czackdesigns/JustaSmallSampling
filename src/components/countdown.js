import React from 'react'
import moment from 'moment'
import styles from './countdown.module.scss'

export default class Countdown extends React.Component {
  constructor() {
    super()

    this.state = {
      now: moment()
    }
  }

  updateClock() {
    setInterval(() => this.setState({ now:moment() }), 1000)
  }

  render() {
    const toEndMS = moment([2021, 0, 20, 12]).diff(this.state.now)
    const toEndDays = Math.floor(toEndMS / (1000 * 60 * 60 * 24))
    const toEndHours = Math.floor(toEndMS / (1000 * 60 * 60) % 24)
    const toEndMinutes = Math.floor(toEndMS / (1000 * 60) % 60)
    const toEndSeconds = Math.floor(toEndMS / (1000) % 60)


    return (
      <div id={styles.countdown_container}>
        <div>
          <h3>{toEndDays}</h3>
          <h4>Days</h4>
        </div>
        <div className={styles.offColor}>
          <h3>{toEndHours}</h3>
          <h4>Hours</h4>
        </div>
        <div>
          <h3>{toEndMinutes}</h3>
          <h4>Minutes</h4>
        </div>
        <div className={styles.offColor}>
          <h3>{toEndSeconds}</h3>
          <h4>Seconds</h4>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.updateClock()
  }
}