const customerRoutes = require("../routes/customer.route");
const addressRoutes = require("../routes/address.route");

module.exports = function (app) {
  app.use('/api/v1/',[
  customerRoutes,
  addressRoutes
])
};
