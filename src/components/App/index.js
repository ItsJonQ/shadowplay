import React, { Component } from 'react'
import styles from './styles.css'

const setValueFromInput = (component) => (event) => (value) => {
  const newState = {}
  newState[value] = event.target.value
  component.setState({ ...newState })

  return newState
}

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      backgroundColor: '#dddddd',
      cardColor: '#ffffff',
      shadowColor: '#000000',
      shadowOpacity: 0.2,
      shadowValue: 50,
      shadowWeight: 10
    }
    this.handleOnBackgroundColorChange = this.handleOnBackgroundColorChange.bind(this)
    this.handleOnCardColorChange = this.handleOnCardColorChange.bind(this)
    this.handleOnColorChange = this.handleOnColorChange.bind(this)
    this.handleOnControlChange = this.handleOnControlChange.bind(this)
    this.handleOnWeightChange = this.handleOnWeightChange.bind(this)
  }

  handleOnBackgroundColorChange (event) {
    setValueFromInput(this)(event)('backgroundColor')
  }

  handleOnCardColorChange (event) {
    setValueFromInput(this)(event)('cardColor')
  }

  handleOnColorChange (event) {
    setValueFromInput(this)(event)('shadowColor')
  }

  handleOnControlChange (event) {
    setValueFromInput(this)(event)('shadowValue')
  }

  handleOnWeightChange (event) {
    setValueFromInput(this)(event)('shadowWeight')
  }

  render() {
    const {
      backgroundColor,
      cardColor,
      shadowColor,
      shadowValue,
      shadowWeight,
    } = this.state

    const weight = shadowWeight / 100
    const color = makeShadowColor(shadowColor, weight)

    const sandboxStyles = {
      backgroundColor
    }
    const squareStyles = {
      backgroundColor: cardColor,
      boxShadow: makeShadowStyles(shadowValue, color)
    }

    return (
      <div id='app' className={styles.AppContainer}>
        <div className={styles.Sandbox} style={sandboxStyles}>
          <div className={styles.Square} style={squareStyles}/>
        </div>
        <div className={styles.Controls}>
          <p>
            <label>
              <strong>Amount</strong>
              <input type='range' min={0} max={100} onInput={this.handleOnControlChange} value={shadowValue} />
            </label>
          </p>
          <p>
            <label>
              <strong>Weight</strong>
              <input type='range' min={0} max={40} onInput={this.handleOnWeightChange} value={shadowWeight} />
            </label>
          </p>
          <p>
            <label>
              <strong>Color</strong>
              <input type='color' onChange={this.handleOnColorChange} value={shadowColor} />
            </label>
          </p>
          <p>
            <label>
              <strong>Card Color</strong>
              <input type='color' onChange={this.handleOnCardColorChange} value={cardColor} />
            </label>
          </p>
          <p>
            <label>
              <strong>Background Color</strong>
              <input type='color' onChange={this.handleOnBackgroundColorChange} value={backgroundColor} />
            </label>
          </p>
        </div>
      </div>
    )
  }
}

const DEFAULT = {
  color: 'rgba(0, 0, 0, 0.2)',
  matrix: [
    [0, 0.1, 0.2],
    [0, 0.2, 0.8],
    [0, 1, 3],
  ]
}

const makeMatrixShadowValues = (value = 0, matrix = DEFAULT.matrix) => {
  return matrix.map(m => m.map(v => `${(v * value).toFixed(2)}px`))
}

const makeShadowStyles = (value = 0, color = DEFAULT.color, matrix = DEFAULT.matrix) => {
  const styles = makeMatrixShadowValues(value, matrix).reduce((styles, m) => {
    return styles + m.join(' ') + ` ${color}` +','
  }, '')
  return styles.substring(0, styles.length - 1)
}

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const makeShadowColor = (hex, opacity) => {
  const rgb = hexToRgb(hex)
  return `rgba(${rgb.r.toString()}, ${rgb.g.toString()}, ${rgb.b.toString()}, ${opacity})`
}
