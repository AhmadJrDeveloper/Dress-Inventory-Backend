import { db } from "../models/index.js";

const Sell = db.Sells;
const SellAccessories = db.SellAccessories; // Add this line



// 1. Create new sell
const addSell = async (req, res) => {
  const { amount, customer_id, 
    date, user_id, dress_id, branch_id, 
    sell_accessories } = req.body;

  try {
    // Create the sell
    const sell = await Sell.create({
      amount,
      customer_id,
      date,
      user_id,
      dress_id,
      branch_id,
    });

    // If there are sell accessories, create them
    if (sell_accessories && sell_accessories.length > 0) {
      await Promise.all(
        sell_accessories.map(async (sellAccessory) => {
          await SellAccessories.create({
            sell_id: sell.id,
            accessory_id: sellAccessory.accessory_id,
            dress_id: sellAccessory.dress_id,
          });
        })
      );
    }

    res.status(200).json({ success: true, sell });
  } catch (error) {
    console.error('Error adding sell:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getAllSells = async (req, res) => {
    try {
      // Fetch all dresses
      let sell = await Sell.findAll({
        include: [
            { model: db.Users, as: "user" },
            { model: db.Dresses, as: "dress"},
            {model: db.Branch, as: "branch"},
            {model: db.Customers, as: "customer"}
        ],
      });
  
      // Check if there are no users
      if (sell.length === 0) {
        res.status(404).send({ message: "No Dresses in the database" });
        return;
      }
  
      res.status(200).send(sell);
    } catch (error) {
      console.error("Error fetching sells:", error);
      res.status(500).send(error.message);
    }
  };
  

  const getSellByBranchId = async (req, res) => {
    try {
      let branchId = req.params.branch_id;
      let sell = await Sell.findAll({
        where: { branch_id: branchId },
        include: [
          { model: db.Users, as: "user" },
            { model: db.Dresses, as: "dress"},
            {model: db.Branch, as: "branch"},
            {model: db.Customers, as: "customer"}
        ],
      });
  
      if (!sell) {
        res.status(404).send({ message: "sell not found for the specified branch ID" });
        return;
      }
  
      res.status(200).send(sell);
    } catch (error) {
      console.error("Error fetching sell by branch ID:", error);
      res.status(500).send(error.message);
    }
  };


  const getOneSell = async (req, res) => {
    let id = req.params.id;
    let sell = await Sell.findOne({
      where: { id: id },
      include: [
            { model: db.Users, as: "user" },
            { model: db.Dresses, as: "dress"},
            { model: db.Branch, as: "branch"},
            { model: db.Customers, as: "customer"}
    ],
    });
    res.status(200).send(sell);
  };

// 4. update dress
const updateSell = async (req, res) => {
    let id = req.params.id;
    const sell = await Sell.update(req.body, { where: { id: id } });
    res.status(200).send(sell);
  };
  
  // 5. delete dress
  const deleteSell = async (req, res) => {
    const sellId = req.params.id;
  
    try {
      // Find the sell with the given ID
      const sell = await Sell.findByPk(sellId);
  
      // Check if the sell exists
      if (!sell) {
        res.status(404).send("Sell not found");
        return;
      }
  
      // Delete associated SellAccessories first
      await SellAccessories.destroy({ where: { sell_id: sellId } });
  
      // Now delete the Sell
      await Sell.destroy({ where: { id: sellId } });
  
      res.status(200).send("Sell and associated accessories deleted");
    } catch (error) {
      console.error("Error deleting sell:", error);
      res.status(500).send("Internal Server Error");
    }
  };

export { addSell, 
    getAllSells,
    getOneSell,
    updateSell,
    deleteSell,
    getSellByBranchId
}