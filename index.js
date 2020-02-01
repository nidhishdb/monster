const request = require("request");
const Clarifai = require('clarifai');

// Instantiate a new Clarifai app by passing in your API key.
const app = new Clarifai.App({apiKey: '22d572f7d9b24fe78ac0b28ef12d64ac'});

// Predict the contents of an image by passing in a URL.
app.models.predict(Clarifai.FOOD_MODEL, 'https://img-global.cpcdn.com/recipes/9ca90ea94afd5c1f/1200x630cq70/photo.jpg')
  .then(response => {
    console.log(response.outputs[0].data);
    response.outputs[0].data.concepts.forEach(x => {
        const prob = x.value>0.8?"pretty sure":"not sure tho"
        var options = {
            method: 'POST',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/visualizeNutrition',
            headers: {
              'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
              'x-rapidapi-key': 'a0a8741cf0msha12d055beda218bp13c245jsncbc831ecb799',
              accept: 'text/html',
              'content-type': 'application/x-www-form-urlencoded'
            },
            form: {ingredientList: x.name, servings: '1'}
          };
          
          request(options, function (error, response, body) {
              if (error) throw new Error(error);
          
              console.log(body);
          });    
  });
})

  .catch(err => {
    console.log(err);
  });
