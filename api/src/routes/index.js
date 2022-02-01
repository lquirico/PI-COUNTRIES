const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getCountries, findByName, findById, createActivity, newRequire, continents, allActivities} = require("../routes/countries.controller")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

 router.get("/countriesGet", getCountries),
 router.get("/countries", newRequire)
 router.get("/countries/:id", findById),
 router.get("/countriesN", findByName),
 router.post("/activity", createActivity),
 router.get("/continents", continents),
// router.get("/activitieS", findActivityByName),
router.get("/activities", allActivities)


module.exports = router;
