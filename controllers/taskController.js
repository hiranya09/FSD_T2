const Task = require('../models/Task');

exports.getTasks = async(req,res)=>{

    const tasks =
    await Task.find({
        userId:req.params.userId
    });

    res.json(tasks);
};

exports.addTask = async(req,res)=>{

    const {userId,task} = req.body;

    const newTask =
    new Task({
        userId,
        task
    });

    await newTask.save();

    res.json(newTask);
};

exports.deleteTask = async(req,res)=>{

    await Task.findByIdAndDelete(
        req.params.id
    );

    res.json({
        message:"Task Deleted"
    });
};

exports.updateTask = async(req,res)=>{

    await Task.findByIdAndUpdate(

        req.params.id,

        req.body
    );

    res.json({
        message:"Task Updated"
    });
};