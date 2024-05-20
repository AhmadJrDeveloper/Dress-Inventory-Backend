// branchController.js
import { db } from "../models/index.js";

const Laundry = db.Laundries;



// 1. Create new bill
const addLaundry = async (req, res) => {
    let info = {
        land_id : req.body.land_id,
        dress_id : req.body.dress_id,
        branch_id : req.body.branch_id,
        cost: req.body.cost,
        start_date : req.body.start_date,
        end_date : req.body.end_date
        
    };
    
    try {
        
      
        const laundry = await Laundry.create(info);
        res.status(200).send(laundry);
    } catch (error) {
        console.error("Error creating laundry:", error);
        res.status(500).send(error.message);
    }
};



// 2. get all bills
const getAllLaundries = async (req, res) => {
    try {
      // Fetch all users
      let laundries = await Laundry.findAll({
        include: [{ model: db.Dresses, as: "dress" },{ model: db.Branch, as: "branch" },{ model: db.Lands, as: "land" }],
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


  const getLaundryByBranchId = async (req, res) => {
    try {
      let branchId = req.params.branch_id;
      let laund = await Laundry.findAll({
        where: { branch_id: branchId },
        include: [{ model: db.Dresses, as: "dress" },{ model: db.Branch, as: "branch" },{ model: db.Lands, as: "land" }],

      });
  
      if (!laund) {
        res.status(404).send({ message: "laund not found for the specified branch ID" });
        return;
      }
  
      res.status(200).send(laund);
    } catch (error) {
      console.error("Error fetching laund by branch ID:", error);
      res.status(500).send(error.message);
    }
  };

  
  // 3. get single User
  const getOneLaundry = async (req, res) => {
    let id = req.params.id;
    let laundries = await Laundry.findOne({
      where: { id: id },
      include: [{ model: db.Dresses, as: "dress" },{ model: db.Branch, as: "branch" },{ model: db.Lands, as: "land" }],
    });
    res.status(200).send(laundries);
  };
  

// 4. update bill
const updateLaundry = async (req, res) => {
    
    let id = req.params.id;
    const laundry = await Laundry.update(req.body, { where: { id: id } });
    res.status(200).send(laundry);
}

// 5. delete branch
const deleteLaundry = async (req, res) => {
    let id = req.params.id;
    await Laundry.destroy({ where: { id: id } });
    res.status(200).send('laundry deleted');
}

export {
    addLaundry,
    getAllLaundries,
    getOneLaundry,
    updateLaundry,
    deleteLaundry,
    getLaundryByBranchId
};