import { db } from "../models/index.js";

const RentLog = db.RentLog;



const getBranchIdForRent = async (rentId) => {
  try {
    const rent = await db.Rents.findOne({
      where: { id: rentId },
      include: [
        {
          model: db.Branch,
          as: "branch",
          attributes: ["id"], // Only include the id (branch_id) in the result
        },
      ],
    });

    return rent.branch ? rent.branch.id : null;
  } catch (error) {
    console.error("Error fetching branch_id for rent_id:", error);
    throw error;
  }
};



// 1. Create new rent
const addRentLog = async (req) => {
  let info = {
      rent_id: req.body.rent_id,
      branch_id: await getBranchIdForRent(req.body.rent_id),
  };

  try {
      const rentLog = await RentLog.create(info);
      return rentLog;  // Return the created rent log
  } catch (error) {
      console.error("Error adding rentlog:", error);
      throw error;
  }
};

const getAllRentLogs = async (req, res) => {
  try {
    // Fetch all rents with additional associations
    let rentlog = await RentLog.findAll({
      include: [
        {
          model: db.Rents,
          as: "rent",
          include: [
            { model: db.Dresses, as: "dress" },
            { model: db.Users, as: "user" },
            { model: db.Branch, as: "branch" },
          ],
        },
      ],
    });

    // Check if there are no rents
    if (rentlog.length === 0) {
      res.status(404).send({ message: "No RentLog in the database" });
      return;
    }

    res.status(200).send(rentlog);
  } catch (error) {
    console.error("Error fetching Rents:", error);
    res.status(500).send(error.message);
  }
};
const getRentLogByBranchId = async (req, res) => {
  try {
    let branchId = req.params.branch_id; // Assuming branchId is provided in the URL parameters
    let rentLog = await RentLog.findAll({
      where: { branch_id: branchId },
      include: [
        {
          model: db.Branch,
          as: "branch",
        },
        {
          model: db.Rents,
          as: "rent",
          include: [
            { model: db.Dresses, as: "dress" },
            { model: db.Users, as: "user" },
            { model: db.Customers, as: "customer" },

          ],
        },
      ],
    });

    if (!rentLog || rentLog.length === 0) {
      res.status(404).send({ message: "Rent log not found for the specified branch ID" });
      return;
    }

    res.status(200).send(rentLog);
  } catch (error) {
    console.error("Error fetching rent log by branch ID:", error);
    res.status(500).send(error.message);
  }
};



  const getOneRentLog = async (req, res) => {
    try{
    let id = req.params.id;
    let rentLog = await RentLog.findOne({
      where: { id: id },
      include: [
            { model: db.Rents, as: "rent" },
            
    ],
    });
    
    res.status(200).send(rentLog);
}
catch (error){
    console.error(error);
    res.status(500).send(error);

}
  };

// 4. update rent
const updateRentLog = async (req, res) => {
    let id = req.params.id;
    const rentLog = await RentLog.update(req.body, { where: { id: id } });
    res.status(200).send(rentLog);
  };
  
  // 5. delete rent
  const deleteRentLog = async (req, res) => {
    let id = req.params.id;
    try {
        // Check if the ID is available
        const rentToDelete = await RentLog.findOne({ where: { id: id } });
        
        if (!rentToDelete) {
            // If ID is not found, send a 404 status
            res.status(404).send("RentLog not found");
            return;
        }

        // If ID is found, proceed with deletion
        await RentLog.destroy({ where: { id: id } });
        res.status(200).send("RentLog deleted");
    } catch (err) {
        res.status(500).send(err);
    }
};

export { addRentLog, 
    getAllRentLogs,
    getOneRentLog,
    updateRentLog,
    deleteRentLog,
    getRentLogByBranchId
}