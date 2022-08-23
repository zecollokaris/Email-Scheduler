import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'; // Handles REST API calls to backend and retruns JSOM respone to fronted


class EmailHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: '', name: ''};

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();

    const user = {
      email: this.state.email,
      name: this.state.name
    }

    try {
      await axios({
        method: "post",
        url: "http://localhost:8080/user",
        data: user
      });
      // alert('A name was submitted: ' + this.state.value);
  } catch(err) {
      console.error(err);
    }
  }

  render() {
    return(
      <>

      <div className="Email-Scheduler">
        {/* Nav Section */}
        <nav className="NavBar"> 
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">
              <img src="/images/CopeMailerIcon2.png" className="Mailer-Icon" alt="CopeLogo" />
            </Link>
          </div>
        </nav>


        <div className="Home-Row">
          <div className="Column-One">
          <img src="/images/CopeIphone.png" className="CopePhone" alt="CopePhone" />
          </div>
          <div className="Column-Two" >

            {/* Form Section */}
            <div className="Form-Detail-Section">

              {/* Title */}
              <h1 className="Home-Title">Subscribe To Healthier Thoughts</h1>
              <img src="/images/CopeMailerIcon.png" className="Cope-Sub-Icon" alt="CopeLogo" />

              {/* Enter Detail Here */}
              <form onSubmit={this.handleSubmit}>
                <p className="EnterEmail-Text">Enter Your Name & Email Adress Below</p>
                <p className="NoSpam-Text">We'll never spam, share, or sell your information</p>

                  <div className="Input-Container">
                    {/* Name Input Section */}
                    <input className="Type-Input Name-Input" type="text" placeholder="Name" value={this.state.name} onChange={this.handleNameChange}/>
                    {/* Email Input Section */}
                    <input className="Type-Input Email-Input" id="EmailBox" type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />

                    {/* Submit Btn */}
                    <button className="SubmitBtn" type="submit" value="Submit">Subscribe</button>
                  </div>

              </form>

              {/* SubTitle */}
              <p className="Home-SubTitle">Your Daily Doze Of Mental Health Doctor!</p>
            </div>

          </div>
        </div>

      </div>



      </>
    )
  }
}

export default EmailHome;