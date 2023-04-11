const express = require('express');
const app = express();
const { Joke, Op } = require('./db');
//const {Op} = require('sequelize');

app.set("json spaces", "\t");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {
  if (req.query){
    try{
      const jokes = await Joke.findAll({
        where: {
          tags: {
            [Op.substring]:req.query.tags ?? "",
          },
          joke: {
            [Op.substring]:req.query.joke ?? "",
          }
        },
      });
    res.send(jokes);
  } catch (error) {
    console.error(error);
    next(error)
  }
  return;
  }
try {
  const jokes = await Joke.findAll();
  res.send(jokes);
} catch (error) {
  console.error(error);
  next(error);
}
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
