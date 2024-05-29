import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem/index'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
  }

  onChangeTitleInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDateInput = evnet => {
    const datestring = evnet.target.value
    const date = format(new Date(datestring), 'dd MMMM yyyy, EEEE')
    this.setState({
      dateInput: date,
    })
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: dateInput,
      isStared: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  renderAppointmentsList = () => {
    const {appointmentsList} = this.state
    return appointmentsList.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        toggleStar={this.toggleStar}
      />
    ))
  }

  render() {
    const {titleInput, dateInput} = this.state
    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="top-container">
            <form className="top-container form" onSubmit={this.addAppointment}>
              <div className="content-container">
                <label htmlFor="title" className="title-label">
                  Title
                </label>
                <input
                  type="text"
                  className="title-input"
                  id="title"
                  placeholder="Title"
                  onChange={this.onChangeTitleInput}
                  value={titleInput}
                />
                <br />
                <label htmlFor="date" className="date-label">
                  Date
                </label>
                <input
                  type="date"
                  className="date-input"
                  id="date"
                  placeholder="dd/mm/yyyy"
                  onChange={this.onChangeDateInput}
                  value={dateInput}
                />
                <br />
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
              <div className="img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  className="appointments-img"
                  alt="appointments"
                />
              </div>
            </form>
          </div>
          <hr className="line" />
          <div className="bottom-container">
            <div className="heading-container">
              <h1 className="heading">Appointments</h1>
              <button className="starred-button" type="button">
                Starred
              </button>
            </div>
            <div className="appointments-container">
              <ul className="appointments-list">
                {this.renderAppointmentsList()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
