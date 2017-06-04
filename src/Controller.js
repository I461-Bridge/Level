
var apiURL = 'http://www.dnd5eapi.co/api/spells/?name=';
var controller = {
  initialSearch: function (query) {
    return fetch(apiURL + query)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
  },
  matchedNameSearch: function (url) {
    return fetch(url)
      .then(function (res) {
        if (res.ok) {
          return res.json()
        }
      })
  }

}

export default controller;