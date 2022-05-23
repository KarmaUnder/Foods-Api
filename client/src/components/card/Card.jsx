import React from 'react';
import styles from './card.module.css';

const Card = ({name, image, diets, healty}) => {
    return (  
        <div className={styles.cardContainer}>
            <div className={styles.image}>
                <img src={image} alt='Not found' />
            </div>
            <div className={styles.content}>
                <h4 className={styles.cardTitle}>{name}</h4>
                <h5 className={styles.diets}>
                {
                    diets.map( (el, i) => <span key={i} >{el.name+(' ')}</span> )
                }
                </h5>
                <h6 className={styles.healty}>Healt Score: {healty}</h6>
            </div>
        </div>
    );
}
 
export default Card;