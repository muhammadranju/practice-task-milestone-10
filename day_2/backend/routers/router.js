const router = require("express").Router();

const coffeeController = require("../controllers/coffee.controller");

router.route("/coffees").get(coffeeController.getAllCoffees);

router
  .route("/coffees/search/:search")
  .get(coffeeController.getAllCoffeesBySearch);

router.route("/coffees/:id").get(coffeeController.getCoffeeById);
router.route("/coffees").post(coffeeController.addCoffee);
router.route("/coffees/:id").put(coffeeController.updateCoffee);
router.route("/coffees/:id").delete(coffeeController.deleteCoffee);

module.exports = router;
