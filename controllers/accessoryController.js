// branchController.js
import { db } from "../models/index.js";

const Accessory = db.Accessories;



// 1. Create new branch
const addAccessory = async (req, res) => {
    let info = {
        name: req.body.name,
        price: req.body.price
        
    };
    
    try {
        
      
        const accessory = await Accessory.create(info);
        res.status(200).send(accessory);
    } catch (error) {
        console.error("Error creating branch:", error);
        res.status(500).send(error.message);
    }
};



// 2. get all branchs
const getAllAccessories = async (req, res) => {
    let accessory = await Accessory.findAll({});
    res.status(200).send(accessory);
}

// 3. get single branch
const getOneAccessory = async (req, res) => {
    let id = req.params.id;
    let accessory = await Accessory.findOne({ where: { id: id } });
    res.status(200).send(accessory);
}

// 4. update branch
const updateAccessory = async (req, res) => {
    
    let id = req.params.id;
    const accessory = await Accessory.update(req.body, { where: { id: id } });
    res.status(200).send(accessory);
}

// 5. delete branch
const deleteAccessory = async (req, res) => {
    let id = req.params.id;
    await Accessory.destroy({ where: { id: id } });
    res.status(200).send('accessory deleted');
}

export {
    addAccessory,
    getAllAccessories,
    getOneAccessory,
    updateAccessory,
    deleteAccessory
};