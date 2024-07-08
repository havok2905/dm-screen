import sqlite3 from 'sqlite3';

import { DBSOURCE } from '../constants';

const createAdventureSQL = `CREATE TABLE adventures (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  system TEXT NOT NULL,
  notes TEXT,
  createdat INTEGER,
  updatedat INTEGER
);`;

const createAdventureCreatureSQL = `CREATE TABLE adventurecreatures (
  id TEXT NOT NULL PRIMARY KEY,
  adventureid TEXT NOT NULL,
  name TEXT NOT NULL,
  image TEXT,
  content TEXT,
  metadata TEXT,
  createdat INTEGER,
  updatedat INTEGER,
  FOREIGN KEY(adventureid) REFERENCES adventures(id)
);`;

const createAdventureHandoutSQL = `CREATE TABLE adventurehandouts (
  id TEXT NOT NULL PRIMARY KEY,
  adventureid TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  createdat INTEGER,
  updatedat INTEGER,
  FOREIGN KEY(adventureid) REFERENCES adventures(id)
);`;

const createAdventureItemSQL = `CREATE TABLE adventureitems (
  id TEXT NOT NULL PRIMARY KEY,
  adventureid TEXT NOT NULL,
  name TEXT NOT NULL,
  image TEXT,
  content TEXT,
  metadata TEXT,
  createdat INTEGER,
  updatedat INTEGER,
  FOREIGN KEY(adventureid) REFERENCES adventures(id)
);`;

const database = new sqlite3.Database(DBSOURCE, (error) => {
  if (error) {
    console.log(error);
    throw error;
  } else{
    console.log('Connected to the SQLite database.')
    database.run(createAdventureSQL, (error) => {
      console.log(error);
      database.run(createAdventureCreatureSQL, (error) => {
        console.log(error);
        database.run(createAdventureHandoutSQL, (error) => {
          console.log(error);
          database.run(createAdventureItemSQL, (error) => {
            console.log(error);
          });
        })
      })
    });
  }
});
