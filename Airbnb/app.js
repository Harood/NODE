const path = require('path');
const dns = require('dns');
const express = require('express');
const storeRouter = require('./routes/storeRouter');
const {hostRouter} = require('./routes/hostRouter');
const { authRouter } = require('./routes/authRouter');
const rootDir = require('./utils/pathutils');
const errorController = require('./controller/error');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (typeof req.isloggedin === 'undefined') {
    req.isloggedin = false;
  }
  res.locals.isloggedin = req.isloggedin;
  next();
});

app.use(storeRouter);
app.use(authRouter);
app.use('/host', (req, res, next) => {
    if (!req.isloggedin) {
        return res.redirect('/login');
    }
    next();});
app.use(hostRouter);

// Serve static files
app.use(express.static(path.join(rootDir, 'public')));

app.use(errorController.get404);


const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://harismasood012:admin123@hariscluster.0xiex7v.mongodb.net/airbnb?appName=HarisCluster';
const MONGO_URI_FALLBACK = process.env.MONGO_URI_FALLBACK;

dns.setServers(['8.8.8.8', '1.1.1.1']);
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

async function connectToDb() {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4
    });
    console.log('Connected to MongoDB (primary URI)');
  } catch (err) {
    const isSrvLookupError = err && err.code === 'ECONNREFUSED' && String(err.hostname || '').startsWith('_mongodb._tcp.');

    if (isSrvLookupError && MONGO_URI_FALLBACK) {
      console.log('SRV DNS lookup failed. Retrying with fallback URI...');
      await mongoose.connect(MONGO_URI_FALLBACK, {
        serverSelectionTimeoutMS: 10000,
        family: 4
      });
      console.log('Connected to MongoDB (fallback URI)');
      return;
    }

    throw err;
  }
}

connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });