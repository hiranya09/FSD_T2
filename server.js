const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const path = require('path');

const app = express();

/* Middleware */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

/* Static Files */

app.use(express.static(
    path.join(__dirname,'public')
));

/* MongoDB */

mongoose.connect(
    'mongodb://127.0.0.1:27017/taskmanager'
)

.then(()=>{

    console.log(`
==================================
 MongoDB Connected Successfully
==================================
`);
})

.catch((err)=>{

    console.log(err);
});

/* Routes */

const authRoutes =
require('./routes/authRoutes');

const taskRoutes =
require('./routes/taskRoutes');

app.use('/api', authRoutes);

app.use('/api', taskRoutes);

/* Default */

app.get('/', (req,res)=>{

    res.sendFile(
        path.join(
            __dirname,
            'public',
            'register.html'
        )
    );
});

/* Server */

const PORT = 3000;

app.listen(PORT, ()=>{

    console.log(`
==================================
 🚀 TASK MANAGER STARTED
==================================

🌐 Open:
http://localhost:${PORT}/register.html

==================================
`);
});