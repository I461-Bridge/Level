// var featuresURL = 'http://www.dnd5eapi.co/api/features/';
// var spellsURL = 'http://www.dnd5eapi.co/api/spells/';

//module with functions to download a model from online

var controller = {

  // search: function(find) {
  //   return fetch(find)
  //     .then(function(resp) { return resp.json()})
  // },

  searchFeatures : function(find) {
    console.log(find);
    var features;
    controller.getFeatures()
      .then(data => {
        console.log("data = " +data);
        features = data;
      })
    
    // var url = controller.getUrl(features, find);
    // console.log(url);
    // return controller.getElement(url);
  },

  getFeatures : function() {
    return fetch('http://www.dnd5eapi.co/api/features/')
        .then(function(resp){ return resp.results.json()})
  },

  getSpells : function() {
    return fetch('http://www.dnd5eapi.co/api/spells/')
        .then(function(resp){ return resp.results.json()})
  },

  getUrl : function(data, find) {
    data.forEach(function(element){
      if(element.name === find){
          return element.url;
      }
    })
  },

  getElement : function(url) {
    return fetch(url)
        .then(function (resp){ return resp.json()})
  }

}

export default controller;