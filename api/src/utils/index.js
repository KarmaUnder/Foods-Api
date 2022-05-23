require('dotenv').config();
const axios=require('axios');
const {Diet,Recipe}=require('../db');
const {API_KEY}=process.env;

const getDbRecipes=async()=>{
    try{
        const dBrecipes=await Recipe.findAll({
            atributes:['id','name','image'],
            include:{
                model:Diet,
                atributes:['name'],
                through:{
                    atributes:[]
                }
            }
        })
        return dBrecipes;
    }catch(err){
        console.log(err);
    }
}

const upperFirst = (str) => {
    return str[0].toUpperCase() + str.substr(1).toLowerCase();
  };

const dataRecipe = (data) => {
    return {
        name:data.title,
        id: data.id,
        diets: data.diets.map( el=> ({name: upperFirst(el)})),
        image: data.image,
        puntuacion: data.spoonacularScore,
        healty:data.healthScore
    }
};

const getApiRecipesHome = async () => {
    try{
        const {data} = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const result = data.results.map( (el) => dataRecipe(el))
        return result;

    } catch (err) {
        console.log(err);
    }
}

const getAllRecipes = async () => {
    
    const dbRecipe = await getDbRecipes();
    const apiRecipe = await getApiRecipesHome();

    return dbRecipe ? dbRecipe.concat(apiRecipe) : apiRecipe;
}

module.exports = {
    getAllRecipes, getDbRecipes, dataRecipe, upperFirst
}