const express = require('express');

const router = express.Router();

const Task =
require('../models/Task');

/* Get Tasks */

router.get('/tasks/:userId',
async(req,res)=>{

    try{

        const tasks =
        await Task.find({

            userId:req.params.userId

        }).sort({ createdAt:-1 });

        res.json(tasks);

    }catch(err){

        console.log(err);
    }
});

/* Add Task */

router.post('/addTask',

async(req,res)=>{

    try{

        console.log(req.body);

        const { userId, task }
        = req.body;

        const newTask =
        new Task({

            userId,
            task
        });

        const savedTask =
        await newTask.save();

        console.log(savedTask);

        res.json(savedTask);

    }catch(err){

        console.log(err);

        res.status(500).json({

            message:"Server Error"
        });
    }
});

/* Delete */

router.delete('/deleteTask/:id',
async(req,res)=>{

    try{

        await Task.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:"Deleted"
        });

    }catch(err){

        console.log(err);
    }
});

/* Complete */

router.put('/completeTask/:id',
async(req,res)=>{

    try{

        const task =
        await Task.findById(req.params.id);

        task.completed =
        !task.completed;

        await task.save();

        res.json(task);

    }catch(err){

        console.log(err);
    }
});

/* Edit */

router.put('/editTask/:id',
async(req,res)=>{

    try{

        await Task.findByIdAndUpdate(

            req.params.id,

            {
                task:req.body.task
            }
        );

        res.json({
            message:"Updated"
        });

    }catch(err){

        console.log(err);
    }
});

module.exports = router;