import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import recipes from './../data/characterClasses.json';
import features from './../data/features.json';


class App extends Component {
  render() {
    
    // var text = recipes.Fighter.LevelRecipes.map(function (d){
    //   return <p>{d}</p>
    // });
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>Level</h2>
          <h3>Updating DnD 5e Characters Made Easy</h3>
        </div>
        {/*<div className="chooseOptions">
          <p className="App-intro">
            Choose a Class!
          </p>
          <form action="/action_page.php">
            <select name="ClassSelection">
                <option value="bard">Bard</option>
                <option value="druid">Druid</option>
                <option value="fighter">Fighter</option>
            </select>
            <p className="App-intro">
              Choose a level!
            </p>
            <select name="LevelSelection">
                <option value="l1">1</option>
                <option value="l2">2</option>
                <option value="l3">3</option>
                <option value="l4">4</option>
                <option value="l5">5</option>
                <option value="l6">6</option>
                <option value="l7">7</option>
                <option value="l8">8</option>
                <option value="l1">9</option>
                <option value="l2">10</option>
                <option value="l3">11</option>
                <option value="l4">12</option>
                <option value="l5">13</option>
                <option value="l6">14</option>
                <option value="l7">15</option>
                <option value="l8">16</option>
                <option value="l5">17</option>
                <option value="l6">18</option>
                <option value="l7">19</option>
                <option value="l8">20</option>
            </select>
            <br></br>
            <input type="submit"/>
          </form>
        </div>*/}
        <p>
          {getStep('Fighter', 0, 2)}
        </p>
        <ul id="description"></ul>
      </div>
    );


    function getStep(characterClass, level, step){
      // var name = recipes.Fighter.LevelRecipes[level - 1][step];
      // var url;
      console.log("TEST: trying to get Fighter Level 1- " + characterClass + ", " + (level + 1));
      // for(var i = 0; i < features.length; i++)
      // {
      //   if(features[i].name === name)
      //   {
      //     url = features[i].url;
      //     console.log(name + ", " + url);
      //   }
      // }
      // get from url
      console.log("TEST: getting rage from: http://www.dnd5eapi.co/api/features/1")
      extractText("http://www.dnd5eapi.co/api/features/1");
    };

    function createNode(element) {
        return document.createElement(element);
    }
    function append(parent, el) {
      return parent.appendChild(el);
    }

    function extractText(url){
        const ul = document.getElementById('description');
        
        fetch(url)
        .then(response => {response.json()})
        .then(function(data){
            var name = data.name;
            console.log(name);
            return name;
            // var desc = data.desc;
            
            // return desc.map(function(paragraph) {
            //     var li = createNode('li')
            //     var span = createNode('span')
            //     span.innerHTML = `${desc}`;
            //     append(li, span);
            //     append(ul, li);
            // })
        })
      // {
      //   method: 'get'
      // }).then(function(response) {
      //   console.log(response);
      //   return <p>{response}</p>;
      // }).catch(function(err) {
      //   // Error :(
      //   console.log("oops");
      // });
      
      // var xml = new XMLHttpRequest();
      // xml.onreadystatechange=function()
      // {
      //     if (xml.readyState==4 && xml.status==200)
      //     {
      //         return xml.responseText;
      //     }
      // }
      // xml.open("GET", url, false );
      // xml.send();
    }

  }
}

export default App;
