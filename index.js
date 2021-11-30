let placename = "";
let key = "";
const OPTION_VALUE_BLANK = "";

const PORT = process.env.PORT || 3000;
const express = require('express');
const axios = require('axios');
const { response } = require('express');
const app = express();

app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) =>{
   res.json("Welcome to my api!!!");
});

app.get('/googlegeocode', (req, res) => {

  performGeocodeLookup(req, res);

});

app.get('/googleplaces', (req, res) => {
  performPlacesLookup(req, res);
});

app.listen(PORT, () =>{

    console.log(`Listening on port ${PORT}`);

});

const performGeocodeLookup = (req, res) => {
  key = req.query.key;
  placename = req.query.placename;
  if (!testMeetsQualifications(key))
  {
    return  res.json({
      "error":  "Key and type are missing from request"
    });
  }

  performGeocodeTest(key, placename, req, res);
}

const performGeocodeTest = (key, placename, req, res) => {

  console.log(`Key ${key}`);
  console.log(`Placename ${placename}`);
  if(placename === OPTION_VALUE_BLANK)
  {
    return res.json({"error" : "Missing paramenter placename"});
  }

  axios.get("https://maps.googleapis.com/maps/api/geocode/xml?address=" + placename + "&key=" + key).then(response =>{
    console.log(response["data"]);
    res.send(response["data"]);

  });
}

const performPlacesLookup = (req, res) =>{
  key = req.query.key;
  placename = req.query.placename;
  if (!testMeetsQualifications(key))
  {
    return  res.json({
      "error":  "Key and type are missing from request"
    });
  }

  performPlacesTest(key, placename, req, res);

}

const performPlacesTest = (key, placename, req, res) =>{

  console.log(`Key ${key}`);
  console.log(`Placename ${placename}`);
  if(placename === OPTION_VALUE_BLANK)
  {
    return res.json({"error" : "Missing paramenter placename"});
  }

  axios.get("https://maps.googleapis.com/maps/api/place/textsearch/xml?query=" + placename + "&key=" + key).then(response =>{
    console.log(response["data"]);
    res.send(response["data"]);

  });

}

const testMeetsQualifications = (key) =>{

  return (key != "");

}
