import React, { Component, PureComponent } from 'react';
import fire from './config/Fire';
import TopNavBar from './TopNavBar'
import './App.css';
import './PollBoard.css';
import {Pie, Doughnut} from 'react-chartjs-2';

class UserComponent extends Component{
    //this will essentially be the profile section
    constructor(props){
        super(props);
        this.state = {displayProfile: true, username: "", password: "", email: "", classyear: ""}
    }


    sendToProfile = () => {
        if(fire.auth().currentUser){
            this.props.history.push('/Profile');
        }
    }

    sendToHome = () => {
        if(fire.auth().currentUser){
            this.props.history.push('/Home');
        }
    }

    logout = () => {
        fire.auth().signOut();
    }

    changeDisplay = () =>{
        this.setState({displayProfile: !this.state.displayProfile})
    }

    dataFunc = (labelInputs, dataInputs) => {
        const data = {labels: labelInputs, 
                    datasets: [{backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#8884d8", '#B21F00','#C9DE00','#2FDE00','#00A6B4','#6800B4'], 
                    data: dataInputs}]}
        return(data)
    }

    optionsFunc = (titleInput) => {
        const options = {title:{display:true, text: titleInput, fontSize: 30, fontColor: '#FFFFFF'},
            legend: {display:true, position:'right', labels:{fontSize: 15, fontColor: '#FFFFFF'}}
        }
        return(options)
    }

    pieFunc = (labelInputs, dataInputs, titleInput) => {
        const pie = <Pie data={this.dataFunc(labelInputs, dataInputs)} options={this.optionsFunc(titleInput)}/>
        return(pie)
    }
    
    // dataFunc = (labelInputs, dataInputs) => {
    //     const data = {labels: labelInputs, 
    //                 datasets: [{backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#8884d8", '#B21F00','#C9DE00','#2FDE00','#00A6B4','#6800B4'], 
    //                 data: dataInputs}]}
    //     return(data)
    // }

    // optionsFunc = (titleInput) => {
    //     const options = {title:{display:true, text: titleInput, fontSize: 30, fontColor: '#FFFFFF'},
    //         legend: {display:true, position:'right', labels:{fontSize: 15, fontColor: '#FFFFFF'}}
    //     }
    //     return(options)
    // }

    // pieFunc = (labelInputs, dataInputs, titleInput) => {
    //     const pie = <Pie data={this.dataFunc(labelInputs, dataInputs)} options={this.optionsFunc(titleInput)}/>
    //     return(pie)
    // }
    
    //methods that pull as the user information from the DB 
    //************ */

    //the profile section should essentially display either the indivials info, or their myPolls
    render(){
        var myPolls =(
            <div>
                <button onClick ={this.changeDisplay} className = "toggleButtons">Back to Profile</button>
                <h1>My Polls</h1>
                {/* need some way of pulling all of the users previous polls from the db-- can mostly likely do this with associated 
                user tag on each poll */}
            </div>
        );

        var displayedScreen = null;       
        if(this.state.displayProfile == false){
                displayedScreen = myPolls;
        }

        // Colors that can accomodate for up to 10 answer choices 
        const Colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#8884d8", '#B21F00','#C9DE00','#2FDE00','#00A6B4','#6800B4']; 

        return(
            <div>
                {displayedScreen}
                <div className="flex-container-profile">
                    <div className="flex-child-topBar flex-container">
                        <div className="flex-child-Dartmouth">
                            <img src={require('./DartmouthLogo.png')} className="topLeftLogo"/>
                        </div>
                    </div>
                    <div className="flex-child-topBar">
                        <h1 className="dartPollTitle"> DartPoll</h1>
                    </div>
                    <div className="flex-child-topBar">
                        <div className="signedInAs">
                            <p className="signedInAsText">Signed in as</p>
                        </div>
                        <div className="flex-container">
                            <div id="homeIconDiv" onClick={this.sendToHome} className="flex-child-icons iconDivs">
                                <a id="homeIcon" onClick={this.sendToHome}>
                                    <img src={require('./home.png')} width="50" height="50"/>
                                    <p className="iconText">Home</p>
                                </a>
                            </div>
                            <div onClick={this.sendToProfile} className="flex-child-icons iconDivsAtProfile">
                                <a onClick={this.sendToProfile}>
                                    <img src={require('./profile.png')} width="50" height="50"/>
                                    <p className="iconText">Profile</p>
                                </a>
                            </div>
                            <div onClick={this.logout} className="flex-child-icons iconDivs">
                                <a onClick={this.logout}>
                                    <img src={require('./logout.png')} width="50" height="50"/>
                                    <p className="iconText">Logout</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="userInfo">
                    <div className="userInfoBox">
                        <div className="flex-container">
                            <div className="flex-child-profile">
                                <div>
                                    <p className="userInfoText">Username:</p>
                                    <hr className="userInfoLineLeft"></hr>
                                    <p className="userInfoText">Password:</p>
                                    <hr className="userInfoLineLeft"></hr>
                                    <p className="userInfoText">Email:</p>
                                    <hr className="userInfoLineLeft"></hr>
                                    <p className="userInfoText">Other Stuff:</p>
                                    <hr className="userInfoLineLeft"></hr>
                                </div>
                            </div>
                            <div className="flex-child-profile">
                                <div>
                                    <p className="userInfoText">Dev Kapadia</p>
                                    <hr className="userInfoLineRight"></hr>
                                    <p className="userInfoText">deviscool</p>
                                    <hr className="userInfoLineRight"></hr>
                                    <p className="userInfoText">devkkapadia@gmail.com</p>
                                    <hr className="userInfoLineRight"></hr>
                                    <p className="userInfoText">Corresponding info</p>
                                    <hr className="userInfoLineRight"></hr>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent:'center', flexWrap: 'wrap', height: '100vh'}}>
                <Pie data={this.dataFunc(['Hop', 'Collis', 'KAF','Foco', 'Novak'], [140, 33, 27, 21, 6])} options={this.optionsFunc('Best Place to Eat on Campus')}/>
            </div>

            {/* Pass in Labels and Pass in Voting Numbers into Data Func; Pass in Title into Options Func  */}
            {/* <Pie data={this.dataFunc(['Hop', 'Collis', 'KAF','Foco', 'Novak'], [140, 33, 27, 21, 6])} options={this.optionsFunc('Best Place to Eat on Campus')}/> */}

                {/* <div className = "pollBackground">
                        <h1> Question 1: Who is the best professor at Dartmouth? </h1>
                        <div style={{ justifyContent: 'center'}}> 
                        <PieChart width={500} height={500}>
                        <Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={200} label = {renderCustomizedLabel}>
                        {data01.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} label/>)}
                        </Pie>
                        <Tooltip />
                        </PieChart>
                        </div>

                        <h1> Question 2: When do you think we will return to campus? </h1>
                        <PieChart width={500} height={500}>
                        <Pie dataKey="value" isAnimationActive={false} data={data02} cx={200} cy={200} outerRadius={200}>
                        {data02.map((entry, index) => <Cell key={`cell-${"hello"}`} fill={COLORS[index % COLORS.length]} label = {renderCustomizedLabel}/>)}
                        </Pie>
                        <Tooltip />
                        </PieChart>

                        <h1> We aren't using this chart anymore </h1>
                        <PieChart width={500} height={500}>
                        <Pie data={data} cx={200} cy={200} labelLine={false} label={renderCustomizedLabel}  outerRadius={200} fill="#8884d8" dataKey="value">
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        </PieChart>
                </div> */}
            </div>
        );
    }
}
export default UserComponent;