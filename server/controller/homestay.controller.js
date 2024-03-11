const HomeStayModel = require("../model/homestay.model");

const getAllHomeStay = async (req, res) => {
  try {
    const homeStay = await HomeStayModel.find();
    res.status(200).json(homeStay);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send("have an error on server !");
    return;
  }
};



const getIdHomeStay = async (req, res) => {
  const HomeStayId = req.params.id
  try {
    console.log(HomeStayId);


    const homeStayData = await HomeStayModel.findById({_id: HomeStayId})
    console.log(homeStayData);

    if (!homeStayData) {
      return res.status(404).json({message : "HomeStay not found"})
    }
    res.status(200).json(homeStayData)
  } catch (error) {

    res.status(500).json({message:error.message})
  }
 
}




const createHomeStay = async (req, res) => {
  const homeStayData = req.body;
  const newHomeStay = new HomeStayModel(homeStayData);
  // console.log(homeStayData); 

  try {
    const savedHomeStay = await newHomeStay.save();
    res.status(200).json(savedHomeStay);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHomeStay = async (req,res) => {
  try {
    const newHomeStay = await HomeStayModel.findByIdAndUpdate( req.params.id ,req.body, {new:true})
    if (!newHomeStay) {
      return res.status(404).json({message : "HomeStay not found"})
    }
   
    res.status(200).json(newHomeStay)
  } catch (error) {
    res.status(500).json({message : error.message})
  }
}




module.exports = { getAllHomeStay,getIdHomeStay  , createHomeStay , updateHomeStay};
