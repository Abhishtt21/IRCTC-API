const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const sequelize = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/v1',authRoutes);
app.use('/api/v1',trainRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync({force:true}).then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.log(err);
});
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});
