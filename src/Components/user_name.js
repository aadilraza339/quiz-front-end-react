import React from 'react';
import Question from './question';
import Question_data from '../assets/data';
import Axios from 'axios'
import '../style/quiz.css'
const moment = require('moment')
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

class LoginControl extends React.Component {

  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleInputChange.bind(this);
    this.state = {
      username: '',
      questions : shuffle(Question_data),
      isLoggedIn: false,
      persons: [],
    };
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    if(this.state.username){
      this.setState({
        isLoggedIn: true,
      });
    }
    else {
      this.setState({
        username: 'please enter your name*',
      });
    }
    
  }

  handleInputChange = (event) => {
    this.setState({
      username:event.target.value,
    });
  }

  componentDidMount() {
    Axios.get(`https://aadil-quiz.glitch.me/get`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <div>
      <div className='container' >
        <div className='flex'>
          <div className='text_center m_top_80'>
              <span className='heading f_26' >Special  Quiz</span>
              <Question {...this.state}/>
          </div>
          <div className='score_card m_top_80'>
              <h3 className='text_center'>Top five Gamer</h3>
            { this.state.persons.map(person => 
              <div className='user_score f_20'>
                <div className='username'>GAMER {person.user_name}</div>
                <div className='wrong'>MISTAKE = {person.wrong}</div>
                <div className='date'>DATE = {moment(person.Today).format('YYYY-MM-DD HH:MM:SS')}</div>
              </div>
            )}
          </div>
        </div>
      </div>
  </div>
    } else {
      button = 

          <form className='center m_top_80 text_center f_20 form' onSubmit={this.mySubmitHandler}>
            <span className='heading f_26' >Special  Quiz</span>  
          <h1>Welcome {this.state.username}</h1>
          <p>Enter your name:</p>
          <input className='name_input' type='text' onChange={this.handleInputChange} />
            <button className='submit' type='submit'>submit</button>
            <p>This fun quiz Game for children to learn animals name</p>
          </form>

    }

    return (
      <div >
        {button}
      </div>
    );
  }
}
export default LoginControl;

