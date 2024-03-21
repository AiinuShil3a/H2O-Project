const PackageModel = require("../model/package.model");

const getAllPackage = async (req, res) => {
  try {
    const package = await PackageModel.find();
    res.status(200).json(package);
  } catch (err) {
    console.log(err);
    res.status(500).send("have an error on server !");
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
    const package = await PackageModel.findById({ _id: packageId });
    if (!package) {
      res.status(404).json({ message: "Product not found" });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPackage = async (req, res) => {
  const package = req.body;
  const newPackage = new PackageModel(package);
  console.log(package);
  try {
    const package = await newPackage.save();
    res.status(201).json(package);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByPricePackage = async (req, res) => {
  try {
    const price = req.params.price;
    const PackagePrice = await PackageModel.findById({ price });
    if (!PackagePrice) {
      res.status(404).json({ message: "Not found package price" });
    }
    res.json(PackagePrice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePackage = async (req, res) => {
  const id = req.params.id;
  const date = req.body;
  try {
    const updatePackage = await PackageModel.findByIdAndUpdate(id, date, {
      new: true,
    });
    if (!updatePackage) {
      res.status(404).json({ message: "Package Not Found" });
    }
    res.status(201).json({ message: "Package Updated!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePackage = async (req, res) => {
  const id = req.params.id;
  try {
    const package = await PackageModel.findByIdAndDelete({ _id: id });
    if (!package) {
      res.status(404).json({ message: "Package NOt Found" });
    }
    res.status(200).json(package);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchPackage = async (req, res) => {
  const name = req.query.name_package;
  const type = req.query.type_package ;
  const detail = req.query.detail_package ;
  try {
    const data = await PackageModel.find({
      $or: [
        { name_package: { $regex: `${name}` } },
        { type_package: { $regex: `${type}` } },
        { detail_package: { $regex: `${detail}` } },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllPackage,
  searchByTypePackage,
  getByIdPackage,
  createPackage,
  getByPricePackage,
  updatePackage,
  deletePackage,
  searchPackage,
};
