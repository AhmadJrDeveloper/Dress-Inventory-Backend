// branchController.js
import { db } from "../models/index.js";

const Land = db.Lands;



// 1. Create new bill
const addLand = async (req, res) => {
    let info = {
        name : req.body.name,
        branch_id : req.body.branch_id,
        
    };
    
    try {
        
      
        const laundry = await Land.create(info);
        res.status(200).send(laundry);
    } catch (error) {
        console.error("Error creating laundry:", error);
        res.status(500).send(error.message);
    }
};

const getLandByBranchId = async (req, res) => {
  try {
    let branchId = req.params.branch_id; // Assuming branchId is provided in the URL parameters
    let land = await Land.findAll({
      where: { branch_id: branchId },
      include: [
        { model: db.Branch, as: "branch" },
      ],
    });

    if (!land) {
      res.status(404).send({ message: "land not found for the specified branch ID" });
      return;
    }

    res.status(200).send(land);
  } catch (error) {
    console.error("Error fetching dress by branch ID:", error);
    res.status(500).send(error.message);
  }
};


// 2. get all bills
const getAllLands = async (req, res) => {
    try {
      // Fetch all users
      let laundries = await Land.findAll({
        include: [{ model: db.Branch, as: "branch" }],
      });
  
      // Check if there are no users
      if (laundries.length === 0) {
        res.status(404).send({ message: "No laundries in the database" });
        return;
      }
      
      res.status(200).send(laundries);
    } catch (error) {
      console.error("Error fetching laundries:", error);
      res.status(500).send(error.message);
    }
  };
  
  // 3. get single User
  const getOneLand = async (req, res) => {
    let id = req.params.id;
    let laundries = await Land.findOne({
      where: { id: id },
      include: [{ model: db.Branch, as: "branch" }],
    });
    res.status(200).send(laundries);
  };
  

// 4. update bill
const updateLand = async (req, res) => {
    
    let id = req.params.id;
    const laundry = await Land.update(req.body, { where: { id: id } });
    res.status(200).send(laundry);
}

// 5. delete branch
const deleteLand = async (req, res) => {
    let id = req.params.id;
    await Land.destroy({ where: { id: id } });
    res.status(200).send('laundry deleted');
}

export {
    addLand,
    getAllLands,
    getOneLand,
    updateLand,
    deleteLand,
    getLandByBranchId
};