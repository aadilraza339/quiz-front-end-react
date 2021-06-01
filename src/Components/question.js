import React from 'react';
import Axios from 'axios'

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count : 1,
            wrong:0,
            user_name : '',
            hide: true,
            one_time_condition:false,
            end:5
        }
    }
      onOption(questionDeatil, option) {
            if (this.state.count < this.state.end) {
                if(questionDeatil.correctAnswer === option) {
                    this.setState({ 
                        count: this.state.count + 1,
                        status:'',
                        message:''
                    });
                }
                else {
                    if(this.state.one_time_condition) {
                        this.setState({
                            message:   ("Wrong answer , choose correct option!"),
                            wrong: this.state.wrong+=1,
                        })
                    }
                    else {
                        this.setState({
                            wrong:1,
                            message:   ("Wrong answer , choose correct option!"),
                            one_time_condition : true

                        })
                    }
                    
                }
            }
            else {
                let endmessage = 
                <div className='text_center'>
                <h4 className='f_26'> hello  {this.props.username} </h4>
                <p className='f_26'>you have made {this.state.wrong}<span className='red'> mistake </span></p>
                <span>Do you want to play continue?</span>
                <ul className='two_btn'>
                    <li className="btn" onClick={this.playAgain}><span>Yes</span></li>
                    <li className="btn" onClick={this.reStart}><span>End Game</span></li>
                </ul>
                </div>
                this.setState({
                    message:endmessage,
                    hide : false,
                    end: this.state.end+=5
                })
               
            }
        
    }
    playAgain = ()=>{
        this.setState({
            hide : true,
            count: this.state.count+1,
            message:'', 
        })
    }
    reStart = async()=>{
        await this.handleSubmit()
    }
    handleSubmit = (e) => {
        const url = 'https://aadil-quiz.glitch.me/name';
        const newUser = {
            user_name: this.props.username,
            wrong: this.state.wrong,
        }   
        Axios.post(url, newUser).then((res) => {
            window.location.reload();

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
                    <div className="main" style={{display: this.state.hide ? 'block' : 'none' }}>
                    <div className="question f_20">{this.props.questions[this.state.count].question}</div>
                    <div className="image"><img  className='img' src={this.props.questions[this.state.count].Images[0]} /></div> 
                    <div className="options m_top_30">
                    {this.props.questions[this.state.count].options.map((option, i) => (
                    <ul>
                        <li key={i} className="btn" onClick={() => this.onOption(this.props.questions[this.state.count],option)}><span>{option}</span></li>
                    </ul>
                    ))}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Question;


