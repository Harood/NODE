const path = require('path');
const express = require('express');
const storeRouter = require('./routes/storeRouter');
const {hostRouter} = require('./routes/hostRouter');
const rootDir = require('./utils/pathutils');
const errorController = require('./controller/error');
const MongoConnect = require('./utils/databaseutil');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(storeRouter);
app.use(hostRouter);

// Serve static files
app.use(express.static(path.join(rootDir, 'public')));

app.use(errorController.get404);


const PORT = 3000;
MongoConnect(() => {
  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
});