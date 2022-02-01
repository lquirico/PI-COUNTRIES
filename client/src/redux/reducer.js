const initialState = {
    countries : [],
    allCountries: [],
    continents: [],
    detail: [],
    activities: [],
    filter: {
        continent: "all",
        activity: "all",
        nombre: "all",
        population: "all"

    },
}

function filterByName (countries, payload) {
    let order = countries
        const orderName = payload === "asc" ?
         order.sort(function(a, b){
            if (a.name > b.name) {
                return 1
               }
            if (b.name > a.name) {
                 return -1
                }
                return 0

        }) :
         order.sort(function(a, b){
            if (a.name > b.name) {
                return -1
               }
            if (b.name > a.name) {
                 return 1
                }
                return 0
        })
       return orderName
}

function filterByPoblation (countries, payload) {
    let score = countries
            const orderScore = payload === "asc" ?
             score.sort(function(a, b){
                if (a.population > b.population) {
                    return -1
                   }
                if (b.population > a.population) {
                     return 1
                    }
                    return 0
        
            }) :
             score.sort(function(a, b){
                if (a.population > b.population) {
                    return 1
                   }
                if (b.population > a.population) {
                     return -1
                    }
                    return 0
            })
            return score
}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case "GET_COUNTRIES":
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }

        case "GET_NAME":
            return {
                ...state,
                countries: action.payload
            }

        case "FILTER_BY_NAME":
            const orderName = filterByName(state.countries, action.payload)
          return {
              ...state,
              countries: orderName,
              filter: {
                  ...state.filter,
                  nombre: action.payload
              }
            //   countries: action.payload === 'all' ? state.allCountries : orderName,
          }

          case "FILTER_BY_POBLATION":
            let score = filterByPoblation(state.countries, action.payload)
              return {
                  ...state,
                  countries: score,
                  filter: {
                      ...state.filter,
                      population: action.payload
                  }
                //   countries: action.payload === 'all' ? state.allCountries : orderScore,
              }

              case "GET_CONTINENTS":
                  return {
                      ...state,
                      continents: action.payload,
                  }
                
            case "FILTER_BY_CONTINENT":
                let allContinents = [...state.allCountries]
                if (state.filter.nombre !== "all") {
                    allContinents = filterByName(allContinents, state.filter.nombre)
                }
                if (state.filter.population !== "all") {
                    allContinents = filterByPoblation(allContinents, state.filter.population)
                }
                let continentsFiltered = 
             action.payload?.includes("all")
                ? allContinents
                : allContinents?.filter((el) => el.continents?.includes(action.payload)); 
                console.log(continentsFiltered)
                
      
            return {
              ...state,
              countries: continentsFiltered, 
              filter: {
                  ...state.filter,
                  continent: action.payload
              }
            }

            case "GET_DETAIL":
                return {
                    ...state,
                    detail: action.payload
                }

            case "GET_CLEAN":
                    return {
                        ...state,
                        detail: []
                    }
            
            case "POST_ACTIVITY":
                return {
                    ...state
                }   
            
            case "GET_ACTIVITIES" :
                return {
                    ...state,
                    activities: action.payload
                }   

            case "FILTER_BY_ACTIVITIES" :
                let totalCountries = [...state.allCountries];
                if (state.filter.nombre !== "all") {
                    totalCountries = filterByName(totalCountries, state.filter.nombre)
                }
                if (state.filter.population !== "all") {
                    totalCountries = filterByPoblation(totalCountries, state.filter.population)
                }
                let CountriesFilter = action.payload.includes("all") ? totalCountries : totalCountries.filter((el) => el.activities.map((act) => act.name).includes(action.payload));
                return {
                    ...state,
                    countries: CountriesFilter,
                    filter: {
                        ...state.filter,
                        activity: action.payload
                    }
                }

            
                


            default:
                return state
    }
}

export default rootReducer;