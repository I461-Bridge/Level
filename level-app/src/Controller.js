
//module with functions to download a model from online
var controller = {
  search: function(query) {
    
    return fetch(query)
      .then(function(res) { return res.json()})

  }
}

export default controller;