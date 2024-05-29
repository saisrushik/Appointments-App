import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {id, title, date, isStared} = appointmentDetails
  const starImageUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStar(id)
  }
  return (
    <li className="appointment-item">
      <div className="content-container">
        <p className="appointment-title">{title}</p>
        <p className="appointment-date">Date: {date}</p>
      </div>
      <div className="star-container">
        <button
          type="button"
          className="star-button"
          data-testid="star"
          onClick={onClickStar}
        >
          <img src={starImageUrl} alt="star" className="star-image" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
