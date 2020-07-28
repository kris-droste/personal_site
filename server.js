const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const multer = require('multer');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/paragraphs', require('./routes/api/paragraphs'));
app.use('/api/works', require('./routes/api/works'));

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './frontend/src/img/',
  filename: function(req, file, cb){
    // cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    cb(null, 'newLandingPage.jpg');
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000
  },
  fileFilter: (req, file, cb) => checkFileType(file, cb)
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}


app.post('/upload', async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('./frontend/src/index', {
        msg: err
      });
    } else if (req.file == undefined) {
      res.render('./frontend/src/index', {
        msg: 'Error: No File Selected!'
      });
    } else {
      res.render('./frontend/src/index', {
        msg: 'File Uploaded!',
        file: `uploads/${req.file.filename}`
      });
    }
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
