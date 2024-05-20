// branchController.js
import { db } from "../models/index.js";

const Account = db.Accounts;



// 1. Create new bill
const addBill = async (req, res) => {
    let info = {
        incomes: req.body.incomes,
        expenses: req.body.expenses,
        date: req.body.date,
        description: req.body.description,
        branch_id: req.body.branch_id
        
    };
    
    try {
        
      
        const bill = await Account.create(info);
        res.status(200).send(bill);
    } catch (error) {
        console.error("Error creating bill:", error);
        res.status(500).send(error.message);
    }
};



// 2. get all bills
const getAllBills = async (req, res) => {
    try {
      // Fetch all users
      let bills = await Account.findAll({
        include: [{ model: db.Branch, as: "branch" }],
      });
  
      // Check if there are no users
      if (bills.length === 0) {
        res.status(404).send({ message: "No bills in the database" });
        return;
      }
  
      res.status(200).send(bills);
    } catch (error) {
      console.error("Error fetching bills:", error);
      res.status(500).send(error.message);
    }
  };
  
  // 3. get single User
  const getOneBill = async (req, res) => {
    let id = req.params.id;
    let bill = await Account.findOne({
      where: { id: id },
      include: [{ model: db.Branch, as: "branch" }],
    });
    res.status(200).send(bill);
  };
  

// 4. update bill
const updateBill = async (req, res) => {
    
    let id = req.params.id;
    const bill = await Account.update(req.body, { where: { id: id } });
    res.status(200).send(bill);
}

// 5. delete branch
const deleteBill = async (req, res) => {
    let id = req.params.id;
    await Account.destroy({ where: { id: id } });
    res.status(200).send('bill deleted');
}

export {
    addBill,
    getAllBills,
    getOneBill,
    updateBill,
    deleteBill
};