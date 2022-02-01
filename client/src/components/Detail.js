import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, getClean } from "../redux/actions";
import style from "../css/Detail.module.css"

export default function Detail (props) {
    const dispatch = useDispatch();
    const { id } = useParams();


    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getClean());
      }, [id])


const myCountrie = useSelector((state) => state.detail);

return (

<div className= {style.container}>
<div className={style.card} >

{  myCountrie.map(el => {
    return (
        <div>
           <img src= {el?.flags} witdh="200px" height="200px" />
           <h1> Nombre: {el?.name} </h1>
           <h2>ID: {el?.id} </h2>
           <h4> Continente: {el?.continents} </h4>
           <h4> Capital: {el?.capital} </h4>
           <h4> Subregion: {el?.subregion} </h4>
           <h4> Area:  {el?.area} km2 </h4>
           <h4> Cantidad de poblacion: {el?.population} </h4>
           <h4> Actividades turisticas: {el?.activities? el.activities.map((act) => {
    
    return (
        
        <div>
        <h4> Nombre: {act.name? act.name : "No posee actividad"} </h4>
        <h4> Nivel de dificultad: {act.difficulty? act.difficulty : "No posee actividad"} </h4>
        <h4> Tiempo estimado de duracion: {act.duration? act.duration : "No posee actividad"} </h4>
        <h4> Temporada: {act.season? act.season : "No posee actividad"} </h4>
        </div>
     ) }) :( <p> "No posee actividad" </p>) } </h4> 
           



        </div>


    )
})



}

{/* <div>

{ myCountrie.hasOwnProperty("activities")? myCountrie.activities.map(act => {
    
    return (
        <div> 
        <h2> Actividades turisticas: </h2>
        <h3> Nombre: {act.name? act.name : "No posee actividad"} </h3>
        <h3> Dificultad: {act.difficulty? act.difficulty : "No posee actividad"} </h3>
        <h3> Duracion: {act.duration? act.duration : "No posee actividad"} </h3>
        <h3> Temporada: {act.season? act.season : "No posee actividad"} </h3>
        
         </div>

    )
})
: "No se encontraron actividades"
}


</div> */}
 </div>


 <Link to = "/home"><button className={style.input}> Volver al Home </button></Link>


</div>






)
 }
