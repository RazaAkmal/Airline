import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops'
import { Line } from 'react-chartjs-2'

class Charts extends Component {

  state = {
    data: {
      labels: ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Local Flights',
          data: [4, 5, 1, 10, 50, 25, 12, 43, 40, 65, 18, 34],
        },
        {
          label: 'International Flights',
          data: [14, 23, 15, 10, 32, 65, 12, 54, 25, 76, 23, 58],
        }
      ]
    }
  }

  setGradiantColor = (canvas, color) => {
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 600, 550)
    gradient.addColorStop(0, color)
    gradient.addColorStop(0.95, 'rgba(133,122,144,0.5)')
    return gradient
  }

  getChart = canvas => {
    const data = this.state.data

    if (data.datasets) {
      let colors = ['rgba(0,255,0,0.75)', 'rgba(255,0,255,0.75)'];
      data.datasets.forEach((set, i) => {
        set.backgroundColor = this.setGradiantColor(canvas, colors[i]);
        set.borderColor = "white";
        set.borderWidth = 1
      })
    }

    return data
  }

  render() {
    return (
      <>
        <Spring
          from={{ opacity: 0, marginTop: -500 }}
          to={{ opacity: 1, marginTop: 20 }}>
          {props => <div className="content chart-class" style={props}>
            <Line
              options={{
                response: true
              }}
              data={this.getChart}
            />
          </div>
          }
        </Spring>
      </>
    )
  }
}

export default Charts