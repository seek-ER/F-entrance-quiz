import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      teams: [],
      isInput: false,
      inputStudent: '',
    };
  }

  componentDidMount = () => {
    if (sessionStorage.getItem('teams') !== null) {
      this.setState({
        teams: JSON.parse(sessionStorage.getItem('teams')),
      });
    }
    this.getStudents();
  };

  getStudents = async () => {
    const URL = 'http://localhost:8080/students';
    const response = await fetch(URL);
    const data = await response.json();
    const map = new Map(Object.entries(data));
    const arr = [...map];
    this.setState({
      students: arr,
    });
  };

  handleClick = async () => {
    const URL = 'http://localhost:8080/grouping';
    const response = await fetch(URL);
    const data = await response.json();
    let teams = [];
    data.map((students) => {
      const map = new Map(Object.entries(students));
      const arr = [...map];
      teams.push(arr);
    });
    this.setState({
      teams: teams,
    });
    sessionStorage.setItem('teams', JSON.stringify(this.state.teams));
  };

  handleInput = () => {
    this.setState({
      isInput: !this.state.isInput,
    });
  };

  handleChange = (e) => {
    this.setState({
      inputStudent: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    if (e.keyCode !== 13) {
      return;
    }
    await fetch('http://localhost:8080/student', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputStudent: this.state.inputStudent,
      }),
    }).then((response) => {
      if (response.status === 201) {
        alert('添加成功');
      }
    });
    this.getStudents();
    this.setState({
      inputStudent: '',
    });
    this.handleInput();
  };

  render() {
    return (
      <div data-testid="app" className="App">
        <div className="GroupingList">
          <div className="GroupingTab">
            <label>分组列表</label>
            <input type="button" value="分组学员" onClick={this.handleClick} />
          </div>
          <div className="TeamLists">
            {this.state.teams.map((team, index) => (
              <div className="List" key={index}>
                <div className="ListBar">{index + 1} 组</div>
                <div key={index} className="Students">
                  {team.map((student) => (
                    <div key={student[0]} className="Student">
                      {student[0]}.{student[1]}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="StudentList">
          <label>学员列表</label>
          <div className="List">
            {this.state.students.map((student) => (
              <span key={student[0]} className="Student">
                {student[0]}.{student[1]}
              </span>
            ))}
            {!this.state.isInput && (
              <input type="button" value="+添加学员" onClick={this.handleInput} />
            )}
            {this.state.isInput && (
              <input
                type="input"
                value={this.state.inputStudent}
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
