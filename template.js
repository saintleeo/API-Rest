const fsPromise = require('fs').promises;
const path = require('path');

const createAllDirectory = async () => {
  try {
    await fsPromise.mkdir('templates/', { recursive: true });
    await fsPromise.mkdir('src/config/', { recursive: true });
    await fsPromise.mkdir('src/controllers/', { recursive: true });
    await fsPromise.mkdir('src/database/seeders/', { recursive: true });
    await fsPromise.mkdir('src/middlewares/', { recursive: true });
    await fsPromise.mkdir('src/models/', { recursive: true });
    await fsPromise.mkdir('src/routes/', { recursive: true });
    await fsPromise.mkdir('uploads/', { recursive: true });
    console.log("Todas as pastas foram criadas com sucesso");
  } catch (err) {
    console.log(err + "!");
  }
  return;
}

const createAllFiles = async () => {
  try {
    const environment = new Uint8Array(Buffer.from(`# ENV
APP_NAME=Example
NODE_ENV=development
PORT=3333
APP_URL=http://localhost:3333

# DATABASE
DB_CONNECTION=sqlite
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DATABASE=database.sqlite

# KEYS
PRIVATE_KEY=
PUBLIC_KEY=

# MAIL
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASSWORD=

# AWS PRODUCTION
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=
    `));

    const gitignoreFromUploads = new Uint8Array(Buffer.from(`# Ignore everything in this directory
*
# Except this file
!.gitignore
    `));

    const gitignoreDefault = new Uint8Array(Buffer.from(`node_modules/
.DS_Store
*.sqlite
*.png
*.jpg
.env
.idea
id_rsa_priv.pem
    `));

    const dotEnvFile = new Uint8Array(Buffer.from(`module.exports = function configDotenv() {
  const result = require('dotenv').config();
  if (result.error) { throw result.error; }
}
    `));

    const sequelizeFile = new Uint8Array(Buffer.from(`const { Sequelize } = require("sequelize");

const sequelize = (process.env.DB_CONNECTION === 'sqlite')?
  new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_HOST + process.env.DB_DATABASE
  })
  :
  new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_CONNECTION,
        models: [__dirname + "/../models"]
    }
  );
module.exports = sequelize;

//require('../models/');

for (mod in sequelize.models) {
  if (sequelize.models[mod].associate instanceof Function) {
    sequelize.models[mod].associate(sequelize.models);
  }
}
    `));

    const seedFile = new Uint8Array(Buffer.from(`require('../../config/dotenv')();
require('../../config/sequelize');

//const seedModel = require('./Model');

(async () => {
  try {
    //await seedModel();

  } catch(err) { console.log(err) }
})();
`))
    const migrateFile = new Uint8Array(Buffer.from(`require('../config/dotenv')();
const sequelize = require('../config/sequelize');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Connection has been established successfully.');
  }
  catch (error) { console.log(error) };
})();
    `));
    const appFile = new Uint8Array(Buffer.from(`const express = require('express');
require('./src/config/dotenv')();
//require('./src/config/sequelize');

const app = express();
const port = process.env.PORT;
//const cors = require('cors');
//const routes = require('./src/routes/routes');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(routes);


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(\`\${process.env.APP_NAME} app listening at http://localhost:\${port}\`);
});
    `));

    await fsPromise.writeFile('.env.example', environment);
    await fsPromise.writeFile('.gitignore', gitignoreDefault);
    await fsPromise.writeFile('uploads/.gitignore', gitignoreFromUploads);
    await fsPromise.writeFile('src/config/dotenv.js', dotEnvFile);
    await fsPromise.writeFile('src/config/sequelize.js', sequelizeFile);
    await fsPromise.writeFile('src/database/migrate.js', migrateFile);
    await fsPromise.writeFile('templates/.gitkeep', '\n', 'utf8');
    await fsPromise.writeFile('src/controllers/.gitkeep', '\n', 'utf8');
    await fsPromise.writeFile('src/database/seeders/seeder.js', seedFile);
    await fsPromise.writeFile('src/middlewares/.gitkeep', '\n', 'utf8');
    await fsPromise.writeFile('src/models/.gitkeep', '\n', 'utf8');
    await fsPromise.writeFile('src/routes/routes.js', '\n', 'utf8');
    await fsPromise.writeFile('server.js', appFile);
    console.log("Todos os arquivos foram criados");
  } catch (err) {
    console.log(err + "!");
  }
  return
}
(async () => {
  await createAllDirectory();
  await createAllFiles();
  try {
    await fsPromise.unlink(path.join(__dirname, "template.js"));
  } catch (err) {
    console.log(err + "!");
  }
})();

