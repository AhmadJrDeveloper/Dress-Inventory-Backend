// branchController.js
import { db } from "../models/index.js";

const Branch = db.Branch;



// 1. Create new branch
const addBranch = async (req, res) => {
    let info = {
        name: req.body.name,
        
    };
    
    try {
        
      
        const branch = await Branch.create(info);
        res.status(200).send(branch);
    } catch (error) {
        console.error("Error creating branch:", error);
        res.status(500).send(error.message);
    }
};



// 2. get all branchs
const getAllBranches = async (req, res) => {
    let branch = await Branch.findAll({});
    res.status(200).send(branch);
}

// 3. get single branch
const getOneBranch = async (req, res) => {
    let id = req.params.id;
    let branch = await Branch.findOne({ where: { id: id } });
    res.status(200).send(branch);
}

// 4. update branch
const updateBranch = async (req, res) => {
    
    let id = req.params.id;
    const branch = await Branch.update(req.body, { where: { id: id } });
    res.status(200).send(branch);
}

// 5. delete branch
const deleteBranch = async (req, res) => {
    let id = req.params.id;
    await Branch.destroy({ where: { id: id } });
    res.status(200).send('branch deleted');
}

export {
    addBranch,
    getAllBranches,
    getOneBranch,
    updateBranch,
    deleteBranch
};