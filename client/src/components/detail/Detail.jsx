import React,{useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getDetail} from '../../actions/index';
import styles from './detail.module.css';
import NavBar from '../navBar/NavBar';
import gif from '../../images/git.gif';

const Detail = (props) => {
    const {id} = props.match.params;

    const recipe = useSelector(state => state.detail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch, id])
    

    return ( 
        <div className={styles.mainContainer}>
            <NavBar />
            {
                Object.keys(recipe).length > 0 ? (
                <div className={styles.detailContainer}>
                    <h3 className={styles.detailTitle}>{recipe.name}</h3>
                    <div className={styles.detailDescription}>
                        <div className={styles.detailLeft}>
                            <img src={recipe.image} alt='' width="200px" height="200px" />
                            <h5>Diet's types: {recipe.diets.map(el => el.name ).join(', ')}</h5>
                            <h5>Score: {recipe.puntuacion}</h5>
                            <h5>Health Score: {recipe.healty}</h5>
                        </div>
                        <div className={styles.detailRigth}>
                            <h5>Summary: </h5>
                            <p dangerouslySetInnerHTML={{__html: recipe.resumen}} />
                            <h5> Instrunctions: </h5>
                            <p dangerouslySetInnerHTML={{__html: recipe.instrucciones || '<p>None</p>'}} />
                        </div>
                    </div> 
                </div>
                ): <div>
                        <img src={gif} alt="loading" />
                        <p>Loading...</p> 
                    </div>
            }
        </div>
     );
}
 
export default Detail;