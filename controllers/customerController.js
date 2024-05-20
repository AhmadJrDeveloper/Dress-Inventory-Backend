// CustomerController.js
import { db } from "../models/index.js";
const Customer = db.Customers;

const addCustomer = async (req, res) => {
  let info = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    address: req.body.address,
    branch_id : req.body.branch_id
  };

  try {

    const customer = await Customer.create(info);
    res.status(200).json({
      status: "success",
      data: customer,
    });
  } catch (error) {
    console.error("Error creating Customer:", error);
    res.status(500).send(error.message);
  }
};

// 2. get all Customers
const getAllCustomers = async (req, res) => {
  try {
    // Fetch all Customers
    let customer = await Customer.findAll({
      include: [
        { model: db.Branch, as: "branch" },
    ],
    });

    // Check if there are no Customer
    if (customer.length === 0) {
      res.status(404).send({ message: "No Customer in the database" });
      return;
    }

    res.status(200).send(customer);
  } catch (error) {
    console.error("Error fetching Customer:", error);
    res.status(500).send(error.message);
  }
};

// 3. get single Customer
const getOneCustomer = async (req, res) => {
  let id = req.params.id;
  let customer = await Customer.findOne({
    where: { id: id },
    include: [
      { model: db.Branch, as: "branch" },
  ],
  });
  res.status(200).send(customer);
};

const getCustomerByBranchId = async (req, res) => {
  try {
    let branchId = req.params.branch_id; // Assuming branchId is provided in the URL parameters
    let customer = await Customer.findAll({
      where: { branch_id: branchId },
      include: [
        { model: db.Branch, as: "branch" },
        // { model: db.Accessories, as: "accessory"}
      ],
    });

    if (!customer) {
      res.status(404).send({ message: "Dress not found for the specified branch ID" });
      return;
    }

    res.status(200).send(customer);
  } catch (error) {
    console.error("Error fetching customer by branch ID:", error);
    res.status(500).send(error.message);
  }
};

// 4. update Customer
const updateCustomer = async (req, res) => {
  let id = req.params.id;
  const customer = await Customer.update(req.body, { where: { id: id } });
  res.status(200).send(customer);
};

// 5. delete Customer
const deleteCustomer = async (req, res) => {
  let id = req.params.id;
  await Customer.destroy({ where: { id: id } });
  res.status(200).send("Customer deleted");
};

    export { addCustomer, 
        getAllCustomers, 
        getOneCustomer,
        updateCustomer,
        deleteCustomer,getCustomerByBranchId };