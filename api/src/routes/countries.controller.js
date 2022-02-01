const axios = require("axios");
const e = require("express");
const { Country, Activity } = require("../db.js");
// const SITE_KEY = process.env.SITE_KEY;


const apiInfo = async (req, res) => {
    try {
        const infoURL = await axios.get("https://restcountries.com/v3/all");
        
        const countries =  await infoURL.data.map(c => {
            return {
                id: c.cca3,  
                name: c.name.common,
                flags: c.flags[0],
                continents: c.continents[0],
                capital:  c.capital?.join()? c.capital.join() : "No posee capital",
                subregion: c.subregion? c.subregion : "Se desconoce la subregion",
                area: c.area,
                population: c.population,
            }
        })
        
        return countries;
        
    }
    catch(error){
        console.log(error)
    }
};



const getCountries = async  (req, res) => {
    try {
    const allCountries = await apiInfo ();
    
    
 allCountries.forEach( (c) => {
      Country.findOrCreate({
         where: {
             id: c.id,
             name: c.name,
             flags: c.flags,
             continents: c.continents,
             capital: c.capital,
             subregion: c.subregion,
             area: c.area,
             population:c.population,
         }
     })
 })

   const totalCountries = await Country.findAll({
        include: [{
            model: Activity,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }]

    })
    
  res.json(totalCountries)
    }
    catch(error) {
        console.error(error)
    }
}


  const newRequire = async (req, res) => {
      try {
       
        const totalCountries = await Country.findAll({
            include: [{
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: {
                    attributes: [],
                }
            }]
    
        })
        
      res.json(totalCountries)
        }
        catch(error) {
            console.error(error)
        }
  }



 const findByName = async (req, res) => {
     try {

         const { name } = req.query;
          const allNames = await Country.findAll({
            include: [{
                model: Activity,
                 attributes: ["name", "difficulty", "duration", "season"],
                through: {
                    attributes: [],
                }
            }],

              where: {
                  name: name.charAt(0).toUpperCase()+name.slice(1).toLowerCase()
              }
          });
         const findName = await allNames.map(e => {
              return {
                id: e.id,
                name: e.name,
                flags: e.flags,
                continents: e.continents,
                capital: e.capital,
                subregion: e.subregion,
                area: e.area,
                population: e.population,
                activities: e.activities.map(e => {return {
                    name: e.name,
                    difficulty: e.difficulty,
                    duration: e.duration,
                    season: e.season
                }})

              }
          })
          findName.length? res.send(findName) : res.status(400).send("No se encontro el pais indicado")

     }
     catch(error) {
         console.error(error)
     }
 }

 

 const findById = async (req, res) => {
    try {

        const { id } = req.params;
         const allIds = await Country.findAll({
            include: [{
                model: Activity,
                attributes: ["name","difficulty", "duration", "season"],
                through: {
                    attributes: [],
                }
            }],

             where: {
                 id: id
             }
         });
       //   res.json(allNames)        

       //  const allCountriesName = allNames.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
         allIds.length? res.send(allIds): res.status(400).send("No se encontro el pais indicado")

    }
    catch(error) {
        console.error(error)
    }
}

 const createActivity = async (req, res) => {

         const { name, difficulty, duration, season, country } = req.body;

        const newActivity = await Activity.create({ name, difficulty, duration, season});

         let activityAndCountry = await Country.findAll({
             where: {name: country}
        })

         newActivity?.addCountry(activityAndCountry);
          res.send("Actividad creada!")

    
    
 }

 const continents = async (req, res) => {
     let countries = await apiInfo();
     let allContinents = [];
     countries.map( c => allContinents.push(c.continents) );

     const names= [...new Set(allContinents)]

     res.status(200).json(names)



 }


//  const findActivityByName = async (req, res) => {
//      const { name } = req.query
//      try {
//              const bd = await Activity.findAll({
//                  include: [{
//                  model: Country,
//                  attribute: ["name:", "flags", "continents", "capital"],
//                  through: {
//                      attributes: [],
//                  }
                 
//              }]});
//              const finalSearch = await bd.map(el=>{
//                  return{
//                      activity:el.name,
//                      season:el.season,
//                      difficulty: el.difficulty,
//                      duration: el.duration,
//                     contry: el.countries.map(el=>el.name).join(", ")?el.countries.map(el=>el.name).join(", "):'No se tiene Pais asignado',
//                     flags: el.countries.map(el=>el.flags).join(", "),
//                     continents: el.countries.map(el=>el.continents).join(", "),
//                     capital: el.countries.map(el =>el.capital).join(", ")
                
//                 }})
//                     // return res.json(bd)
//                     const resultSearch = await finalSearch.filter(el=>el.activity.toLowerCase().includes(name.toLowerCase()))
//                     resultSearch.length ?
//                      res.json(resultSearch) :
//                     res.json({message:"No se encontro la actividad con nombre "+ name.toUpperCase()})

//      }
//      catch(error) {
//          console.log(error)
//      }
//  }

 const allActivities = async (req, res) => {
     try {
        const bd = await Activity.findAll({
             include: [{
                 model: Country,
                 attribute: ["name:", "flags", "continents", "capital"],
                 through: {
                     attributes: [],
                 }
             }]}
        )
        const name = [...new Set(bd.map(c => c.name))]


        res.send(name)
     }
     catch(error) {
         console.log(error)
     }
 }







module.exports = {getCountries, findByName, newRequire, findById, createActivity, continents, allActivities}