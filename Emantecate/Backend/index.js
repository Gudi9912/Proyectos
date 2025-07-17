const express = require('express');
const cors = require('cors');

const app = express();
const EmantecateRoutes = require('./Routes/Emantecate.routes');

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use('/api/Emantecate', EmantecateRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
