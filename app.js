const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path=require('path');
const { Server } = require('socket.io');
const http = require('http');
const formDataModel = require('./backend/exitmodel');
const generateQRCode = require('./backend/qrcode');
const { authenticateSocket } = require("./middleware/user.auth.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve("./public")));

const server = http.createServer(app);
const io = new Server(server);


// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri);
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");
// });


const exitRouter = require('./routes/khokhaEntryRouter');
const usersRouter = require('./routes/user');
app.use('/', exitRouter);



app.get("/",(req,res)=>{
  return res.sendFile("/public/index.html");
}); 

// app.get('/generate-qr-code/:formDataId', async (req, res) => {
//   try {
//       const formDataId = req.params.formDataId;
//       const qrCodeDataURL = await generateQRCode(formDataId);
//       res.json({ qrCodeDataURL });
//   } catch (error) {
//       console.error('Error generating QR code:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });

io.use((socket, next) => {
  authenticateSocket(socket, next);
});


io.on('connection', (socket) => {
  console.log('A user connected',socket.id);

  socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
  });
}); 



app.listen(port,async () => {
    
    console.log(`Express server listening on ${port}  see docs at /docs`);
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("Connected to MongoDB");
   
});
