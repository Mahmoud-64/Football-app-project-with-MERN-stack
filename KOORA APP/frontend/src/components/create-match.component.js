import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';



export default class CreateMatch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      homeTeam: '',
      awayTeam: '',
      startTime: '',
      endTime: '',
      homeTeamScore: '',
      awayTeamScore: '',
      league: '',
    }
  }

  onChangeHomeTeam = (e) => {
    this.setState({ homeTeam: e.target.value })
  }

  onChangeAwayTeam = (e) => {
    this.setState({ awayTeam: e.target.value })
  }

  onChangeStartTime = (e) => {
    this.setState({ startTime: e.target.value })
  }
  onChangeEndTime = (e) => {
    this.setState({ endTime: e.target.value })
  }

  onChangeDuration = (e) => {
    this.setState({ duration: e.target.value })
  }

  onChangeHomeTeamScore = (e) => {
    this.setState({ homeTeamScore: e.target.value })
  }
  onChangeAwayTeamScore = (e) => {
    this.setState({ awayTeamScore: e.target.value })
  }
  onChangeLeague = (e) => {
    this.setState({ league: e.target.value })
  }

  getDuration = () => {
    const start = new Date(this.state.startTime)
    const end = new Date(this.state.endTime)
    const diff = (end - start)
    return diff
  }

  notEmpty = (val) => {
    if (val.trim !== "") {
      return true
    } else {
      return false
    }
  }


  onSubmit = (e) => {
    e.preventDefault()
    const duration = this.state.endTime - this.state.startTime
    const matchObject = {
      homeTeam: this.state.homeTeam,
      awayTeam: this.state.awayTeam,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      duration: this.getDuration(),
      homeTeamScore: this.state.homeTeamScore,
      awayTeamScore: this.state.awayTeamScore,
      league: this.state.league,
    };

    axios.post('http://localhost:4000/matches/create-match', matchObject)
      .then(res => console.log(res.data));

    this.setState({
      homeTeam: '',
      awayTeam: '',
      startTime: '',
      endTime: '',
      duration: '',
      homeTeamScore: '',
      awayTeamScore: '',
      league: ''
    });

    this.props.history.push({
      pathname: '/match-list',
      created: true
    })
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="HomeTeam">
          <Form.Label>Home</Form.Label>
          <Form.Control required type="text" value={this.state.homeTeam} onChange={this.onChangeHomeTeam} />
        </Form.Group>

        <Form.Group controlId="AwayTeam">
          <Form.Label>Away</Form.Label>
          <Form.Control required type="text" value={this.state.awayTeam} onChange={this.onChangeAwayTeam} />
        </Form.Group>

        <Form.Group controlId="HomeTeamScore">
          <Form.Label>Home score</Form.Label>
          <Form.Control required type="text" value={this.state.homeTeamScore} onChange={this.onChangeHomeTeamScore} />
        </Form.Group>

        <Form.Group controlId="AwayTeamScore">
          <Form.Label>Away score</Form.Label>
          <Form.Control required type="text" value={this.state.awayTeamScore} onChange={this.onChangeAwayTeamScore} />
        </Form.Group>

        <Form.Group controlId="startDate">
          <Form.Label>starts</Form.Label>
          <Form.Control required type="datetime-local" value={this.state.startTime} onChange={this.onChangeStartTime} />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>Ends</Form.Label>
          <Form.Control required type="datetime-local" value={this.state.endTime} onChange={this.onChangeEndTime} />
        </Form.Group>

        <Form.Group controlId="league">
          <Form.Label>league</Form.Label>
          <Form.Control required type="text" value={this.state.league} onChange={this.onChangeLeague} />
        </Form.Group>

        <Button disabled={false} variant="danger" size="lg" block="block" type="submit">
          Create Match
        </Button>
      </Form>
    </div>);
  }
}
