import React from 'react';
import Axios from 'axios'
import '../style/quiz.css'


class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count : 1,
            wrong:1,
            user_name : ''
        }
    }
      onOption(questionDeatil, option) {
          console.log(this.props.questions.length,'len');
          if (!this.props.username) {
            this.setState({
                message:"Please enter your name"
            })
            
        }
        else{
            if (this.props.questions.length > this.state.count+1) {
                if(questionDeatil.correctAnswer === option) {
                    this.setState({ 
                        count: this.state.count + 1,
                        status:'',
                        message:''
                    });
                }
                else {
                    console.log('wrong');
                    this.setState({
                        message:   ("Wrong answer , choose correct option!"),
                        wrong: this.state.wrong+=1,
                    })
                }
            }
            else {
                this.handleSubmit()
                let endmessage ='hello '+ this.props.username +' you have made ' + this.state.wrong + ' mistake and refresh for play again'
                this.setState({
                    message:endmessage
                })
               
            }
        }
    }

    handleSubmit = (e) => {
        const url = 'http://localhost:8000/name';
        const newUser = {
            user_name: this.props.username,
            wrong: this.state.wrong,
        }   
        Axios.post(url, newUser).then((res) => {

            //handle your login 
            console.log(res);

        }).catch((e) => {

            //handle your errors
        });

    }
   
    
    render(){
        return (
            <div>
                <div> 
                    <h3 className='error'>{this.state.message}</h3>
                    <div className="main">
                    <div className="question">{this.props.questions[this.state.count].question}</div>
                    <div className="image"><img  className='img' src={this.props.questions[this.state.count].Images[0]} /></div> 
                    <div className="options">
                    {this.props.questions[this.state.count].options.map((option, i) => (
                    <button
                            key={i}
                            className="btn"
                            onClick={() => this.onOption(this.props.questions[this.state.count],option)}>
                            {option}                            
                    </button>
                    ))}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Question;