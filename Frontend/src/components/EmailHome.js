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
      <nav className="navbar"> 
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">Cop</Link>
        </div>
        <form onSubmit={this.handleSubmit}>
        <label>Enter Your Email:
          <input type="email" value={this.state.value} onChange={this.handleChange} />
        </label>
        
        <button type="submit" value="Submit">Submit</button>
      </form>
      </nav>
      </>
    )
  }
}

export default EmailHome;