var featuresURL = 'http://www.dnd5eapi.co/api/features/';

//module with functions to download a model from online

var controller = {
  search: function(find) {
    var database = getJson(featuresURL);
    var url = getUrl(database);
    var element = getElement(url);
    return element;

    // return fetch(find)
    //   .then(function(resp) { return resp.json()})

  }
}

function getJson (databaseUrl){
    return fetch(databaseUrl)
        .then(function(resp){ return resp.results.json()})
        //     response.json().then(function (json){
        //         var data = json.results;
        //         return data;
        //     })
        //     //.then(getUrl);
        // })['catch'](function (error) {
        //     console.log(JSON.stringify(error));
        // });
}

function getUrl (json){
    //var found;
    json.forEach(function(element) {
        if(element.name == find){
            return element.url;
            //found = element;
        }
    });
    //return getElement(found.url);
}

function getElement (elementUrl){
    return fetch(elementUrl)
        .then(function (resp){ return resp.json()})
        //     response.json().then(function (data){
        //         return data;
        //     })
        //     //.then(print);
        // })['catch'](function(error){
        //     console.log(JSON.stringify(error));
        // })
}

// function print (json){
//     document.getElementById("name").innerHTML = json.name;
//     document.getElementById("url").innerHTML = json.url;
//     document.getElementById("json").innerHTML = JSON.stringify(json);
// }


export default controller;