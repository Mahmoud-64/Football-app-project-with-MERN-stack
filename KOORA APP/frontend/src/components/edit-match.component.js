import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditMatch extends Component {
  constructor(props) {
    super(props)


    this.state = {
      homeTeam: '',
      awayTeam: '',
      startTime: '',
      endTime: '',
      homeTeamScore: '',
      awayTeamScore: '',
      league: ''
    }


    axios.get('http://localhost:4000/matches/edit-match/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          homeTeam: res.data.homeTeam,
          awayTeam: res.data.awayTeam,
          startTime: res.data.startTime,
          endTime: res.data.endTime,
          homeTeamScore: res.data.homeTeamScore,
          awayTeamScore: res.data.homeTeamScore,
          league: res.data.league
        });
        console.log(this.state);


      })
      .catch((error) => {
        console.log(error);
      })
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

    axios.put('http://localhost:4000/matches/update-match/' + this.props.match.params.id, matchObject)
      .then((res) => {
        console.log(res.data)
        console.log('match successfully updated')
      }).catch((error) => {
        console.log(error)
      })

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
          <Form.Control type="text" value={this.state.homeTeam} onChange={this.onChangeHomeTeam} />
        </Form.Group>

        <Form.Group controlId="AwayTeam">
          <Form.Label>Away</Form.Label>
          <Form.Control type="text" value={this.state.awayTeam} onChange={this.onChangeAwayTeam} />
        </Form.Group>

        <Form.Group controlId="HomeTeamScore">
          <Form.Label>Home score</Form.Label>
          <Form.Control type="text" value={this.state.homeTeamScore} onChange={this.onChangeHomeTeamScore} />
        </Form.Group>

        <Form.Group controlId="AwayTeamScore">
          <Form.Label>Away score</Form.Label>
          <Form.Control type="text" value={this.state.awayTeamScore} onChange={this.onChangeAwayTeamScore} />
        </Form.Group>

        <Form.Group controlId="startDate">
          <Form.Label>starts</Form.Label>
          <Form.Control type="datetime-local" value={this.state.startTime} onChange={this.onChangeStartTime} />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>Ends</Form.Label>
          <Form.Control type="datetime-local" value={this.state.endTime} onChange={this.onChangeEndTime} />
          {/* <Form.Control type="datetime-local" value={this.state.endTime.substring(0, this.state.endTime.lastIndexOf('.'))} onChange={this.onChangeEndTime} /> */}
        </Form.Group>

        <Form.Group controlId="league">
          <Form.Label>league</Form.Label>
          <Form.Control type="text" value={this.state.league} onChange={this.onChangeLeague} />
        </Form.Group>


        <Button variant="danger" size="lg" block="block" type="submit">
          Update Match
        </Button>
      </Form>
    </div>);
  }
}
