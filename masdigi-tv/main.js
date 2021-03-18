const express = require('express')
const app = express()
const ip = 'localhost'
const port = 3000
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors')
const multer = require('multer');
const path = require('path');
const galeriPath = path.join(__dirname,'public/galeri')
const configFile = path.join(__dirname,'config.json')
const publicPath = path.join(__dirname,'public')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, galeriPath);
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = function(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(publicPath))
app.use(cors())

function listImgs() {
  return fs.readdirSync(galeriPath).map(file => { return { 'name': file, 'link': `http://${ip}:${port}/galeri/${file}` } })
}

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.get('/debug', (req, res) => {
  res.send({
    'work_dir': __dirname,
    'tes': path.join(__dirname, 'ha')
  })
})

app.get('/read', (req, res) => {

  let config = JSON.parse(fs.readFileSync(configFile));
  let stats = fs.statSync(configFile);

  config.galeri = listImgs()

  res.send({ 'version': stats.mtimeMs, 'data': config })

})

app.post('/write', (req, res) => {
  let config = req.body.config;
  console.log(config);
  fs.writeFileSync(configFile, JSON.stringify(config));
  res.send('ok')
})

app.post('/galeri/delete', (req, res) => {
  let file = req.body.file;

  try {
    fs.unlinkSync(`${galeriPath}/${file}`);    
  } catch (error) {
    res.send('error')    
  }

  res.send('ok')
})

app.post('/galeri/upload', (req, res) => {

  let upload = multer({ storage: storage, fileFilter: imageFilter }).single('file');

  upload(req, res, function (err) {

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    else if (!req.file) {
      return res.send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError) {
      return res.send(err);
    }
    else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send('ok');
  });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
