// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/NavBar.js';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import{
  BrowserRouter,
  Routes,
  Route,
  // Link
 } from "react-router-dom"

export default class App extends Component {
  pageSize=5;
  apiKey=process.env.REACT_APP_NEWS_API;
  state={
    progress:0
  }
  setProgress=(progress)=>
  {
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <BrowserRouter>
                
             {/* Hello this is my first class based component {this.c} */}
             <Navbar/>
             <LoadingBar
                color='#f11946'
                height={3}
                progress={this.state.progress}
                
             />     

             {/* <News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general"/> */}
             <Routes>
                    <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general"/>} ></Route>
                    <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business"/>} ></Route>
                    <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>} ></Route>
                    <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general"/>}></Route>
                    <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health"/>} ></Route>
                    <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science"/>}></Route>
                    <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports"/>}></Route>
                    <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="technology" pageSize={this.pageSize} country="in" category="technology"/>}></Route>
             </Routes>
        </BrowserRouter>
        
      </div>
    )
  }
}


