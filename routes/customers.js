const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
	const customers = await Customer.find().sort("name");
	res.send(customers);
});

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = new Customer({
		name: req.body.name,
		phone: req.body.phone,
		isGold: req.body.isGold
	});
	await customer.save();

	res.send(customer);
});

router.put("/:id", async (req, res) => {
	// Validate
	// If invalid, return 400 - Bad request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			phone: req.body.phone,
			isGold: req.body.isGold
		},
		{ new: true }
	);

	// If genre does not exist, return 404
	if (!customer)
		return res.status(404).send("The genre with given ID was not found");

	// Return the updated genre
	res.send(customer);
});

router.delete("/:id", async (req, res) => {
	const customer = await Customer.findOneAndRemove(req.params.id);

	// Not existing, return 404
	if (!customer)
		return res.status(404).send("The genre with given ID was not found");

	// Return the same genre
	res.send(customer);
});

router.get("/:id", async (req, res) => {
	const customer = await Customer.findById(req.params.id);

	if (!customer)
		return res.status(404).send("The genre with given ID was not found");

	res.send(customer);
});

module.exports = router;
