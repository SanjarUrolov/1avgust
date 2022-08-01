import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './style.css'
import { BsSun } from "react-icons/bs";


class App extends React.Component {
  constructor() {
    super();
    let today = new Date(),
      time = today.getHours() + ':' + today.getMinutes();
    this.state = {
      city: {},
      forecasts: [],
      weekForecasts: 7,
      locations: 'Tashkent',
      degree: '',
      days: 7,
      currentTime: time,
      interval: ''
    }
  }

  componentDidMount() {
    axios
      .get(
        `https://community-open-weather-map.p.rapidapi.com/climate/month?q=Tashkent
        `,
        {
          headers: {
            'X-RapidAPI-Key': '2cb3af4b40mshbd08b4771897f79p190f80jsn3dbaf1cd0ec7',
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          city: res.data.city,
          forecasts: res.data.list,
          locations: ''
        })

      })
      .catch((e) => {
        console.log(e);
      });

  }

  currentTime = () => {
    this.date = new Date()
    this.n = this.state.date.toDataString();
    this.time = this.state.date.toLacalTimeString()
  }


  addWeeks = () => {
    this.setState({
      ...this.state,
      weekForecasts:
        this.state.weekForecasts + 7 > this.state.forecasts.length
          ? this.state.forecasts.length
          : this.state.weekForecasts + this.state.days,
    });

  };

  weekForecasts = [];

  componentDidUpdate() {
    axios
      .get(
        `https://community-open-weather-map.p.rapidapi.com/climate/month?q=${this.state.locations}`,
        {
          headers: {
            'X-RapidAPI-Key': '2cb3af4b40mshbd08b4771897f79p190f80jsn3dbaf1cd0ec7',
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          city: res.data.city,
          forecasts: res.data.list,
          locations: ''
        })
      })
      .catch((e) => {
        console.log(e);
      });



  }



  handleChange = (event) => {
    this.setState({
      locations: event.target.value
    })
  }

  dayChange = (e) => {
    this.setState({
      days: parseFloat(e.target.value)
    })
  }



  render() {
    this.weekForecasts = [];
    for (let i = 0; i < this.state.weekForecasts; i++) {
      this.weekForecasts.push(this.state.forecasts[i]);
    }
    return (
      <>
        <div className="main">
          <div className="weither-forecast">
            <div className="top-box">
              <div className='nav'>

                <p>Weather</p>
                <p>News & Events</p>
                <p>Latest locations</p>
              </div>
              <div>
                <div className="select-box">
                  <select name="form-select" value={this.state.locations} onChange={this.handleChange} >
                    <option value="Tashkent" >Tashkent</option>
                    <option value="Moscow"   >Moscow</option>
                    <option value="London"   >London</option>
                  </select>
                </div>
                <h1 className='location'>{this.state.city.name}</h1>
                <h2>{this.state.currentTime}</h2>
              </div>
            </div>
            <div className="bottom-box">
              <ul>
                {this.weekForecasts[0] !== undefined &&
                  this.weekForecasts.map((element, index) => {
                    let newDate = new Date();
                    newDate.setDate(newDate.getDate() + index);
                    return (
                      <li key={element.dt}>
                        <p className='date'>{newDate.toLocaleDateString()}</p>
                        <p className='sun-icon'><BsSun /></p>
                        <p className='degree'>{Math.floor(element.temp.average - 273)} °</p>
                      </li>

                    );
                  })}
                <div className="last">
                  <button onClick={this.addWeeks}>For More</button>
                  <select name="form-select2" value={this.state.days} onChange={this.dayChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                </div>
              </ul>

            </div>

          </div>

        </div>

      </>
    );
  }
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div className='main-app'>
      <App />
    </div>
  </>
);

