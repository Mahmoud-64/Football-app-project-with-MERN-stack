import React, { Component, Fragment } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'



export default class MatchList extends Component {
  filterflag = true
  teamNameFilter = ""
  startDateFilter = ""
  endDateFilter = ""

  constructor(props) {
    super(props)
    this.state = {
      matches: [],
      filtered: []
    };
  }

  componentWillMount() {
    axios.get('http://localhost:4000/matches/')
      .then(res => {
        this.setState({
          matches: res.data,
          filtered: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  componentDidUpdate() {
    if (!this.filterflag || this.props.location.created) {
      if (this.props.location.created = true) {
        this.props.location.created = false
        window.location.reload();

      }
      axios.get('http://localhost:4000/matches/')
        .then(res => {
          this.setState({
            matches: res.data,
            filtered: res.data
          })
          this.filterflag = false
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }


  onChangeTeamNameFilter = (e) => {
    this.teamNameFilter = e.target.value
    this.props.location.created = false
    this.performFilter(this.teamNameFilter)
  }

  onChangeStartDateFilter = (e) => {
    this.startDateFilter = e.target.value
    this.props.location.created = false
    console.log("EEEEEEE", this.startDateFilter);
    this.performFilter(this.teamNameFilter, this.startDateFilter)
  }
  onChangeEndDateFilter = (e) => {
    this.endDateFilter = e.target.value
    this.props.location.created = false
    console.log("EEEEEEE", this.startDateFilter);
    this.performFilter(this.teamNameFilter, this.startDateFilter, this.endDateFilter)
  }

  performFilter = (name, stDate, endDate) => {
    name = this.teamNameFilter
    stDate = this.startDateFilter
    endDate = this.endDateFilter
    this.filterflag = true
    var a = []
    this.state.matches.forEach(element => {
      console.log("EEEEEEEEE", this.teamNameFilter);
      if ((element.homeTeam.includes(name) || element.awayTeam.includes(name) || (this.teamNameFilter == ""))) {
        if ((new Date(element.startTime) < new Date(stDate)) || (this.startDateFilter == "")) {
          if ((new Date(element.startTime) > new Date(endDate)) || (this.endDateFilter == "")) {
            console.log("zzzzzzz", "true");
            a.push(element)
          }
        }
      }
    });
    this.setState({ filtered: a })
  }

  getMatchStatus = (st, end) => {
    let status = "will start"
    const currentTime = new Date()
    const stt = new Date(st)
    const endd = new Date(end)
    if (stt < currentTime) {
      status = "active now "
      if (endd < currentTime) {
        status = "finished"
      }
    }
    return status
  }

  updateList = () => {
    if (this.teamNameFilter != "" || this.startDateFilter != "" || this.endDateFilter != "") {
      window.location.reload();
    }
    axios.get('http://localhost:4000/matches/')
      .then(res => {
        this.setState({
          matches: res.data,
          filtered: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }


  deleteMatch(id) {
    axios.delete('http://localhost:4000/matches/delete-match/' + id)
      .then((res) => {
        console.log('match successfully deleted!')
        this.updateList()
      }).catch((error) => {
        console.log(error)
      })
  }

  sameDay = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }


  conditional_render_date = (key) => {
    if (key == 0) {
      const date = new Date(this.state.filtered[0].startTime)
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var year = date.getFullYear();
      const newdate = year + "/" + month + "/" + day;
      return (<tr>{newdate}</tr>)
    }
    const notSameDay = !(this.sameDay(new Date(this.state.filtered[key].startTime), new Date(this.state.filtered[key - 1].startTime)))
    if (notSameDay) {
      const date = new Date(this.state.filtered[key].startTime)
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var year = date.getFullYear();
      const newdate = year + "/" + month + "/" + day;
      return (<tr>{newdate}</tr>)

    }
  }

  DataTable = () => {
    return this.state.filtered.map((res, i) => {
      return (
        <Fragment key={i}>
          {this.conditional_render_date(i)}
          <tr >
            <td>{res.homeTeam}</td>
            <td>{res.awayTeam}</td>
            <td>{res.homeTeamScore}</td>
            <td>{res.awayTeamScore}</td>
            <td style={{ minWidth: "170px" }}>{new Date(res.startTime).toDateString() + " " + new Date(res.startTime).toLocaleTimeString()}</td>
            <td style={{ minWidth: "170px" }}>{new Date(res.endTime).toDateString() + " " + new Date(res.endTime).toLocaleTimeString()}</td>
            <td>{res.duration / 60000}</td>
            <td>{res.league}</td>
            <td>{this.getMatchStatus(res.startTime, res.endTime)}</td>
            <td>

              <Link className="edit-link" to={"/edit-match/" + res._id}>
                Edit
            </Link>
              <Button onClick={() => this.deleteMatch(res._id)} size="sm" variant="danger">Delete</Button>
            </td>
          </tr>
        </Fragment>
      );
    });
  }


  render() {

    return (<div className="table">
      <Fragment>
        <Form.Group controlId="TeamNameFilter">
          <Form.Label>Name Filter</Form.Label>
          <Form.Control type="text" onChange={this.onChangeTeamNameFilter} />
        </Form.Group>

        <Form.Group controlId="startDate">
          <Form.Label>match starts before</Form.Label>
          <Form.Control type="datetime-local" onChange={this.onChangeStartDateFilter} />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>match starts after</Form.Label>
          <Form.Control type="datetime-local" onChange={this.onChangeEndDateFilter} />
        </Form.Group>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Home</th>
              <th>Away</th>
              <th>Home score</th>
              <th>Away score</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Duration (minutes)</th>
              <th>League</th>
              <th>Status</th>
              <th className="col-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.DataTable()}
          </tbody>
        </Table>
      </Fragment>
    </div>);
  }
}