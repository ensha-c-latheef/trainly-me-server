const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Workout = require("../models/Workout.model")



//GET - list all workouts
  router.get("/", (req, res, next) => {
    Workout.find().sort({createdAt: -1})
      .then(allWorkouts => res.json(allWorkouts))
      .catch(err => res.json(err));
    });

  //GET - get a single workout

  router.get("/:workoutId",(req,res,next)=>{
    const { workoutId } = req.params;
 
    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    // Each Project document has a `tasks` array holding `_id`s of Task documents
    // We use .populate() method to get swap the `_id`s for the actual Task documents
    Workout.findById(workoutId)
      // .populate('tasks')
      .then(workout => res.status(200).json(workout))
      .catch(error => res.json(error));
  })

  //POST - a new workout
  router.post("/",(req,res,next)=>{
    const {title, load, reps} = req.body
    Workout.create({ title, load, reps })
    .then(response => res.json(response))
    .catch(err => res.json(err));  
  })

//DELETE - delete a workout
  router.delete("/:workoutId",(req,res,next)=>{
    const { workoutId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Workout.findByIdAndDelete(workoutId)
      .then(() => res.json({ message: `Workout with ${workoutId} is removed successfully.` }))
      .catch(error => res.json(error));
  })

//PUT/PATCH - edit/update a workout
  router.put("/:workoutId",(req,res,next)=>{
    const { workoutId } = req.params;
 
    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    Workout.findByIdAndUpdate(workoutId, req.body, { new: true })
      .then((updatedWorkout) => res.json(updatedWorkout))
      .catch(error => res.json(error));
  })


  module.exports = router;  
  