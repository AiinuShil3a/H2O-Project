const PackageModel = require("../model/package.model");

const getAllPackage = async (req, res) => {
  try {
    const package = await PackageModel.find();
    res.status(200).json(package);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send("have an error on server !");
    return;
  }
};


const searchByTypePackage = async (req, res) => {
  const type_package = req.params.type_package;
  try {
    const PackageType = await PackageModel.findOne({ type_package });
    if (!PackageType) {
      return res.status(404).send("Not Found Package name : " + type_package);
    }
    res.status(200).json({ PackageType });
  } catch (err) {
    console.log(err);
    res.status(500).send("have an error on server");
  }
};

const getByIdPackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const package = await PackageModel.findById({ _id: packagetId });
    if (!package) {
      res.status(404).json({ message: "Product not found" });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllPackage, searchByTypePackage,  getByIdPackage};
