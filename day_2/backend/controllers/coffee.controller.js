const Coffee = require("../models/Coffee.model");

exports.getAllCoffees = async (req, res) => {
  try {
    const { query } = req.query;

    if (query) {
      const coffees = await Coffee.find({
        $or: [{ name: query }, { category: query }],
      });

      return res.status(200).json(coffees);
    }

    const coffees = await Coffee.find();
    return res.status(200).json(coffees);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving coffees" });
  }
};

exports.getAllCoffeesBySearch = async (req, res) => {
  try {
    const { search } = req.params;

    const coffees = await Coffee.find({ name: search });
    return res.status(200).json(coffees);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving coffees" });
  }
};

exports.getCoffeeById = async (req, res) => {
  try {
    const coffee = await Coffee.findById(req.params.id);
    return res.status(200).json(coffee);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving coffee" });
  }
};

exports.addCoffee = async (req, res) => {
  try {
    const coffee = await Coffee.create(req.body);
    return res.status(201).json(coffee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding coffee" });
  }
};

exports.updateCoffee = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, price, category, image, description } = req.body;
    const query = { _id: id };
    const coffee = await Coffee.findById(query);

    if (!coffee) {
      return res.status(404).json({ message: "Coffee not found" });
    }

    coffee.name = name ?? coffee.name;
    coffee.price = price ?? coffee.price;
    coffee.category = category ?? coffee.category;
    coffee.image = image ?? coffee.image;
    coffee.description = description ?? coffee.description;

    await coffee.save();

    return res.status(200).json(coffee);
  } catch (error) {
    res.status(500).json({ message: "Error updating coffee" });
  }
};

exports.deleteCoffee = async (req, res) => {
  try {
    const coffee = await Coffee.findByIdAndDelete(req.params.id);
    return res.status(200).json(coffee);
  } catch (error) {
    res.status(500).json({ message: "Error deleting coffee" });
  }
};
