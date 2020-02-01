const Clarifai = require('clarifai');
      
// Instantiate a new Clarifai app by passing in your API key.
const app = new Clarifai.App({apiKey: '22d572f7d9b24fe78ac0b28ef12d64ac'});

// Predict the contents of an image by passing in a URL.
app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg')
  .then(response => {
    console.log(response.outputs[0].data);
  })
  .catch(err => {
    console.log(err);
  });