import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';


class EmailHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    // event.preventDefault();

    const user = {
      email: this.state.value
    }

    try {
      await axios({
        method: "post",
        url: "http://localhost:8080/user",
        data: user
      });
      // set alert
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

              {/* Enter Detail Here */}
              <form onSubmit={this.handleSubmit}>
                <p>Enter Your Email Adress Below</p>
                  <input type="email" value={this.state.value} onChange={this.handleChange} />
                
                <button type="submit" value="Submit">Submit</button>
              </form>

              {/* SubTitle */}
              <p className="Home-SubTitle">Your Daily Doze Of Mental Health Doctor</p>
            </div>

          </div>
        </div>
      </div>



      </>
    )
  }
}

export default EmailHome;