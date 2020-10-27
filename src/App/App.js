import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }

  componentDidMount = async () => {
    const URL = 'http://localhost:8080/students';
    const response = await fetch(URL);
    const data = await response.json();
    const map = new Map(Object.entries(data));
    const arr = [...map]; // 转数组方法1
    console.log(arr);
    this.setState({
      students: arr,
    });
  };

  render() {
    return (
      <div data-testid="app" className="App">
        hello
        <div className="StudentList">
          <div>学员列表</div>
          {this.state.students.map((student) => (
            <div key={student[0]}>{student}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
