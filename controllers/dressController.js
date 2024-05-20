import { db } from "../models/index.js";

const Dress = db.Dresses;

const getCurrentBranchCounter = async (branchId) => {
  try {
    const branch = await db.Branch.findByPk(branchId);

    if (branch) {
      return branch.counter || 0;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error getting current branch counter:", error);
    return 0;
  }
};

const updateBranchCounter = async (branchId) => {
  try {
    const [rowCount, _] = await db.Branch.update(
      { counter: db.sequelize.literal('counter + 1') },
      { where: { id: branchId } }
    );

    if (rowCount > 0) {
      const updatedBranch = await db.Branch.findByPk(branchId);
      return updatedBranch.counter || 0;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error updating branch counter:", error);
    return 0;
  }
};

const generateBranchCode = (branchName, counter) => {
  const formattedCounter = counter.toString().padStart(3, '0');
  return `${branchName.toUpperCase()}_${formattedCounter}`;
};

// ...

const addDress = async (req, res) => {
  try {
    const branchId = req.body.branch_id;

    const branch = await db.Branch.findByPk(branchId);

    if (!branch) {
      res.status(404).send({ message: "Branch not found" });
      return;
    }

    // Fetch the maximum counter for the specified branch
    const maxCounterResult = await Dress.max('counter', {
      where: { branch_id: branchId },
    });

    // Calculate the new counter based on the maximum counter or default to 0
    const currentCounter = maxCounterResult !== null ? maxCounterResult : 0;

    // Log the current counter for debugging
    console.log("Current Counter:", currentCounter);

    // Increment the counter for the new dress
    const updatedCounter = currentCounter + 1;

    // Log the updated counter for debugging
    console.log("Updated Counter:", updatedCounter);

    // Generate branch code based on the updated counter and branch name
    const branchCode = generateBranchCode(branch.name, updatedCounter);

    // Log the generated branch code for debugging
    console.log("Generated Branch Code:", branchCode);

    const info = {
      name: req.body.name,
      type: req.body.type,
      size: req.body.size,
      price: req.body.price,
      notes: req.body.notes,
      dress_status: req.body.dress_status,
      rent_counter: req.body.rent_counter,
      branch_id: branchId,
      code: branchCode,
      counter: updatedCounter, // Store the counter in the Dress table
    };

    const dress = await Dress.create(info);
    res.status(200).send(dress);
  } catch (error) {
    console.error("Error adding dress:", error);
    res.status(500).send(error.message);
  }
};

// ...


const getAllDresses = async (req, res) => {
  try {
    let dresses = await Dress.findAll({
      include: [
        { model: db.Branch, as: "branch" },
        // { model: db.Accessories, as: "accessory"}
      ],
    });

    if (dresses.length === 0) {
      res.status(404).send({ message: "No Dresses in the database" });
      return;
    }

    res.status(200).send(dresses);
  } catch (error) {
    console.error("Error fetching dresses:", error);
    res.status(500).send(error.message);
  }
};

const getDressById = async (req, res) => {
  try {
    let id = req.params.id;
    let dress = await Dress.findOne({
      where: { id: id }
    });

    if (dress) {
      res.status(200).json(dress);
    } else {
      res.status(404).json({ message: "Dress not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDressByBranchId = async (req, res) => {
  try {
    let branchId = req.params.branch_id;
    let dress = await Dress.findAll({
      where: { branch_id: branchId },
      include: [
        { model: db.Branch, as: "branch" },
        // { model: db.Accessories, as: "accessory"}
      ],
    });

    if (!dress) {
      res.status(404).send({ message: "Dress not found for the specified branch ID" });
      return;
    }

    res.status(200).send(dress);
  } catch (error) {
    console.error("Error fetching dress by branch ID:", error);
    res.status(500).send(error.message);
  }
};

const updateDress = async (req, res) => {
  let id = req.params.id;
  const dress = await Dress.update(req.body, { where: { id: id } });
  res.status(200).send(dress);
};

const deleteDress = async (req, res) => {
  let id = req.params.id;
  await Dress.destroy({ where: { id: id } });
  res.status(200).send("Dress deleted");
};

export {
  addDress,
  getAllDresses,
  getDressByBranchId,
  updateDress,
  deleteDress,
  getDressById
};
