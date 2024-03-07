const PackageModel = require("../model/package.model")

const getAllPackage = async (req, res) => {
    try {
        const package = await PackageModel.find();
          res.status(200).json(package)
      return;
    } catch (err) {
      console.log(err);
      res.status(500).send("have an error on server !");
      return;
    }
  };









  module.exports = { getAllPackage };