import React, { Component } from "react";
import Leap from "./Leaps";
import "./App.css";
import classNames from "classnames";
var setint;
var milliCounter = 0;
var secondCounter = 0;
var minuteCounter = 0;
class App extends Component {
  state = {
    minute: "00",
    second: "00",
    milli: "00",
    start: false,
    leap: false,
    all: {},
    stop: false
  };
  // var myCounter=(whichCount,limit,element,increacing)=>{
  //    if(whichCount==limit){
  //       whichCount=0;
  //       increacing++;
  //       this.setState({element:increacing<10?'0'+increacing:increacing})
  //     }

  // }
  startCount = () => {
    this.setState({ start: true, stop: false });
    setint = setInterval(() => {
      console.log(milliCounter);
      milliCounter++;
      this.setState({
        milli: milliCounter < 10 ? "0" + milliCounter : milliCounter
      });
      if (milliCounter == 10) {
        milliCounter = 0;
        secondCounter++;
        this.setState({
          second: secondCounter < 10 ? "0" + secondCounter : secondCounter
        });
      }

      if (secondCounter == 60) {
        secondCounter = 0;
        minuteCounter++;
        this.setState({
          minute: minuteCounter < 10 ? "0" + minuteCounter : minuteCounter
        });
      }
    }, 100);
  };

  stopCounter = () => {
    clearInterval(setint);
    this.setState({ stop: !this.state.stop });
  };

  leapThis = () => {
    this.setState({
      leap: true,
      all: {
        millis: this.state.milli,
        sec: this.state.second
      }
    });
    // this.setState({leap:false});
  };

  reset = () => {
    this.setState({
      minute: "00",
      second: "00",
      milli: "00",
      start: false,
      leap: false,
      all: {},
      stop: false
    });
  };

  render() {
    const { minute, second, milli, start, leap, stop } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-4">
            <div className="card text-center">
              <h1 className="display-4">
                <span className="minute mr-3">{minute}:</span>
                <span className="second mr-3">{second}:</span>
                <span className="milli mr-3">{milli}</span>
              </h1>
              <div className="buttons mt-3">
                {!start ? (
                  <button onClick={this.startCount} className="btn btn-primary">
                    Start
                  </button>
                ) : (
                  <button
                    onClick={!stop ? this.leapThis : this.reset}
                    className={classNames("btn", {
                      "btn-warning": !stop,
                      "btn-secondary": stop
                    })}
                  >
                    {!stop ? "Leap" : "Reset"}
                  </button>
                )}
                {stop ? (
                  <button
                    onClick={this.startCount}
                    className="btn btn-primary ml-2"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    className="btn btn-danger ml-2"
                    onClick={this.stopCounter}
                  >
                    Stop
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6 mx-auto">
            {leap ? (
              <Leap sec={this.state.all.sec} millis={this.state.all.millis} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
