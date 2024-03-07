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

const searchByNamePackage = async (req, res) => {
  const name = req.params.name;
  try {
    const NamePackage = await PackageModel.findOne({ name });
    if (!NamePackage) {
      return res.status(404).send("Not Found Package name : " + name);
    }
    res.status(200).json({ NamePackage });
  } catch (err) {
    console.log(err);
    res.status(500).send("have an error on server");
  }
};

// const getByIdPackage = async (req, res) => {
//   try {
//     const packagetId = req.params.id;
//     const packaget = await PackageModel.findById({ _id: packagetId });
//     if (!packaget) {
//       res.status(404).json({ message: "Product not found" });
//     }
//     res.json(packaget);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = { getAllPackage, searchByNamePackage,  };
