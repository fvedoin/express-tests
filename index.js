const app = require("./src/app");
const sequelize = require("./src/config/database");

sequelize.sync();

app.listen(3333, () => console.log("Server started at 3333"));
