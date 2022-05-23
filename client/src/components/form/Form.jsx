import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NavBar from '../navBar/NavBar';
import {postRecipe, getDiets} from '../../actions/index';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import styles from './form.module.css';

const validate = (state) => {
    let error = {};

    if(!state.name) {
        error.name = 'The title of the recipe is required';
    }else if(!/[a-zA-Z]{4}/.test(state.name)){
        error.name = 'The tittle must have only letters and at least 4 characters';
    }
    if(!state.resumen) {
        error.resumen = 'The summary of the recipe is required';
    }else if(state.resumen.length <10 || state.resumen.length >500 ){
        error.resumen = 'The tittle must have between 30 and 500 characters';
    }
    if(!state.puntuacion) {
        error.puntuacion = 'The score of the recipe is required';
    } else  if( isNaN(state.puntuacion) || state.puntuacion < 0 || state.puntuacion>100){
        error.puntuacion='Must be a number between 0 and 100';
    } 

     if(!state.healty) {
        error.healty = 'The health score of the recipe is required';
    }  else if( isNaN(state.healty) || state.healty < 0 || state.healty>100){
        error.healty='Must be a number between 0 and 100';
    }

    if(!state.instrucciones) {
        error.instrucciones = 'The instructions of the recipe is required';
    }else if(state.instrucciones.length <10 ){
        error.instructions = 'The instructions must have more than 30 characters';
    }
    if ( state.image !== "" && !/^(ftp|http|https):\/\/[^ "]+$/.test(state.image)) {
        error.image = "Image must be a URL";
    }
   
    return error;
}

const Form = () => {
    const [input, setInput] = useState({
        name: '',
        resumen: '',
        image: '',
        puntuacion: '',
        healty: '',
        instrucciones: '',
        diets: []
    })

    const dispatch = useDispatch();
    const diets = useSelector(state=> state.diets);
    const history = useHistory();

    const [error, setError] = useState({})

    const handleChange = (e) => {
        setInput({ 
            ...input,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if(input.diets.length === 0 ){
            swal('Please select at least one diet')
        }else {
            dispatch(postRecipe(input))
            setInput({ 
                name: '',
                resumen: '',
                image: '',
                puntuacion: '',
                healty: '',
                instrucciones: '',
                diets: []
            });
            swal({
                title: 'Recipe created successfully',
                icon: 'success'
            });
            history.push('/home');
        }
    }
    const handleSelect = (e) => {
        setInput({
            ...input,
            diets: input.diets.includes(e.target.value) ? input.diets : [...input.diets, e.target.value] 
        });
    }

    const handleDelete = (e, el) => {
        e.preventDefault();
        setInput({
            ...input,
            diets : input.diets.filter( ele => ele !== el)
        })
    }

    useEffect(() => {
        dispatch(getDiets());
        document.getElementById('input-create').disabled = true;
      }, [dispatch]);
    

    return ( 
        <div className={styles.mainForm}>
            <NavBar />
            <form className={styles.containerForm} onSubmit={(e) => handleSubmit(e)}>
            <h1 className={styles.formTitle}>Create a New Recipe</h1>
                <div className={styles.formLabel}>
                    <label for='title'>Title: </label>
                    <input onChange={handleChange} type="text" name="name" required value={input.name} />
                    {error.name  && <span>{error.name}</span>}
                </div>

                <div className={styles.formLabel}>
                    <label for='summary'>Summary: </label>
                    <textarea onChange={handleChange} type="text" name="resumen" required value={input.resumen} />
                    {error.resumen  && <span>{error.resumen}</span>}
                </div>
                <div className={styles.formLabel}>
                    <label for='score'>Score: </label>
                    <input onChange={handleChange} type="number" name="puntuacion" value={input.puntuacion} />
                    {error.puntuacion  && <span>{error.puntuacion}</span>}
                </div>

                <div className={styles.formLabel}>
                    <label for='healthScore'>Health Score: </label>
                    <input onChange={handleChange} type="number" name="healty" value={input.healty} />
                    {error.healty  && <span>{error.healty}</span>}
                </div>

                <div className={styles.formLabel}>
                    <label for='instructions'>Instructions: </label>
                    <textarea onChange={handleChange} type="text" name="instrucciones" value={input.instrucciones} />
                    {error.instrucciones  && <span>{error.instrucciones}</span>}
                </div>

                <div className={styles.formLabel}>
                    <label>Diets: </label>
                    <select onChange={handleSelect} >
                    {
                        diets && diets.map(el => (
                            <option key={el.id} value={el.name}>{el.name}</option>
                        ))
                    }
                    </select>
                    {error.diets  && <span>{error.diets}</span>}
                </div>

                <div className={styles.formSelector}>
                    {
                        input.diets.map( (el, i) => (
                            <div className={styles.selectorDiet} key ={i}>
                                <label>{el}</label>
                                <button  onClick={(e) => handleDelete(e, el)}>X</button>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.formLabel}>
                    <label for='image'>Image: </label>
                    <input onChange={handleChange} type="url" placeholder='https://example.com (Optional)' name="image" value={input.image} />
                    {error.image  && <span>{error.image}</span>}
                </div>
                <div className={styles.formBtn}>
                    <input use id='input-create' disabled={Object.keys(error).length}  type="submit" value='Create!' /> 
                </div>
            </form>
        </div>
     );
}
 
export default Form;