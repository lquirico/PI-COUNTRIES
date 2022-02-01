import axios from "axios";


export function getCountries(){
    return function (dispatch){
        axios.get("http://localhost:3001/countries")
        .then ((response) => {
            console.log(response.data)
            return dispatch({
                type: "GET_COUNTRIES",
                payload: response.data
            })
        })
        .catch((error) => {
            console.error(error)
        })
    }
}
// export function getCountries (){
//     return async function (dispatch) {
//         var json = await axios.get("http://localhost:3001/countries")
//         return dispatch({
//             type: "GET_COUNTRIES",
//             payload: json.data,
//         })
//     }
// }

export function getNameCountrie (name) {
    return function (dispatch){
        axios.get("http://localhost:3001/countriesN?name=" + name)
        .then ((response) => {
            console.log(response.data)
            return dispatch({
                type: "GET_NAME",
                payload: response.data
            })
        })
        .catch ((error) => {
            console.error(error)
        })
    }
}

// export function getNameCountrie (name){
//     return async function (dispatch){
//         var json = await axios.get("http://localhost:3001/countriesN?name=" + name)
//         return dispatch({
//             type: "GET_NAME",
//             payload: json.data
//         })
//     }
// }

export function filterByName (payload){
    return {
        type: "FILTER_BY_NAME",
        payload,
    }

}

export function filterByPoblation (payload){
    return {
        type: "FILTER_BY_POBLATION",
        payload,
    }
}

export function getContinent () {
    return function (dispatch) {
        axios.get("http://localhost:3001/continents")
        .then ((response) => {
            console.log(response.data)
            return dispatch({
                type: "GET_CONTINENTS",
                payload: response.data, 
            })
        })
        .catch((error) => {
            console.error(error)
        })
    }
}
// export function getContinent (){
//     return async function (dispatch) {
//         var json = await axios.get("http://localhost:3001/continents")
//         return dispatch({
//             type: "GET_CONTINENTS",
//             payload: json.data,
//         })
//     }
// }

export function getActivities (){
    return function (dispatch){
        axios.get("http://localhost:3001/activities")
        .then ((response) => {
            console.log(response.data)
            return dispatch ({
                type: "GET_ACTIVITIES",
                payload: response.data,
            })
        })
    }
}

// export function getActivities (){
//     return async function (dispatch){
//         var json = await axios.get("http://localhost:3001/activities")
//         console.log(json.data)
        
//         return dispatch({
//             type: "GET_ACTIVITIES",
//             payload: json.data,
//         })
//     }
// }

export function filterByActivities (payload) {
    return {
        type: "FILTER_BY_ACTIVITIES",
        payload,
    }
}

 export function filterByContinent (payload) {
     return {
         type: "FILTER_BY_CONTINENT",
         payload,
     }
 }

export function getDetail (id) {
    return function (dispatch) {
        axios.get("http://localhost:3001/countries/" + id)
        .then ((response) => {
            console.log(response.data)
            return dispatch({
                type: "GET_DETAIL",
                 payload: response.data
            })
        })
        .catch((error) => {
            console.error(error)
        })
    }
}

//  export function getDetail (id) {
//      return async function (dispatch) {
//          try {
//              var json = await axios.get("http://localhost:3001/countries/" + id);
//              return dispatch ({
//                  type: "GET_DETAIL",
//                  payload: json.data
//              })
//          }
//          catch(error){
//              console.log(error)
//          }
//      }
//  }

 export function getClean () {
    return {
      type: "GET_CLEAN",
    }
  }

  export function createActivity (payload) {
      return async function () {
          var data = await axios.post("http://localhost:3001/activity", payload);
          return data
      }
  }

