import { db } from "../models/index.js";
import {addRentLog} from './rentLogController.js'

const Rent = db.Rents;
const RentAccessories = db.RentAccessories; // Add this line




// 1. Create new rent
const addRent = async (req, res) => {
  const { amount, amount_payed, amount_returning, 
      customer_id, start_date, end_date, user_id, dress_id, branch_id, 
      rent_accessories } = req.body;

  try {
      // Create the rent
      const rent = await Rent.create({
          amount, 
          amount_payed,
          amount_returning, 
          customer_id, 
          start_date, 
          end_date, 
          user_id,
          dress_id,
          branch_id,
      });

      // If there are rent accessories, create them
      if (rent_accessories && rent_accessories.length > 0) {
          await Promise.all(
              rent_accessories.map(async (rentAccessory) => {
                  await RentAccessories.create({
                      rent_id: rent.id,
                      accessory_id: rentAccessory.accessory_id,
                      dress_id: rentAccessory.dress_id,
                  });
              })
          );
      }

      // Call addRentLog with the newly created rent's ID
      const rentLog = await addRentLog({ body: { rent_id: rent.id } });

      res.status(200).json({ success: true, rent, rentLog });  // Send the response after both rent and rent log are created
  } catch (error) {
      console.error('Error adding rent:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getAllRents = async (req, res) => {
    try {
      // Fetch all rents
      let rent = await Rent.findAll({
        include: [
            { model: db.Users, as: "user" },
            { model: db.Dresses, as: "dress"},
            { model: db.Branch, as: "branch"},
            {model: db.Customers, as: "customer"}

        ],
      });
  
      // Check if there are no rents
      if (rent.length === 0) {
        res.status(404).send({ message: "No Rents in the database" });
        return;
      }
  
      res.status(200).send(rent);
    } catch (error) {
      console.error("Error fetching Rents:", error);
      res.status(500).send(error.message);
    }
  };

  const getOneRent = async (req, res) => {
    try{
    let id = req.params.id;
    let rent = await Rent.findOne({
      where: { id: id },
      include: [
            { model: db.Users, as: "user" },
            { model: db.Dresses, as: "dress"},
            { model: db.Branch, as: "branch"}
    ],
    });
    
    res.status(200).send(rent);
}
catch (error){
    console.error(error);
    res.status(500).send(error);

}
  };

// 4. update rent
const updateRent = async (req, res) => {
    let id = req.params.id;
    const rent = await Rent.update(req.body, { where: { id: id } });
    res.status(200).send(rent);
  };
  
  // 5. delete rent
  const deleteRent = async (req, res) => {
    let id = req.params.id;
    try {
        // Check if the ID is available
        const rentToDelete = await Rent.findOne({ where: { id: id } });
        
        if (!rentToDelete) {
            // If ID is not found, send a 404 status
            res.status(404).send("Rent not found");
            return;
        }

        // If ID is found, proceed with deletion
        await Rent.destroy({ where: { id: id } });
        res.status(200).send("Rent deleted");
    } catch (err) {
        res.status(500).send(err);
    }
};


export { addRent, 
    getAllRents,
    getOneRent,
    updateRent,
    deleteRent
}