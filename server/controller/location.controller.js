const LocationModel = require("../model/location.model");

const getAllLocation = async (req, res) => {
    try {
      const location = await LocationModel.find();
      res.status(200).json(location);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).send("have an error on server !");
      return;
    }
  };

const createLocation = async (req, res) => {
    const location = req.body;
    const newLocation = new LocationModel(location);
    console.log(location);
    try {
      const location = await newLocation.save();
      res.status(201).json(location);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    getAllLocation,
    createLocation
  };
  