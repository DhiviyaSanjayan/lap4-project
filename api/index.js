require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 3000;

const {
  updateTablesRegular,
  updateTablesInfrequent,
} = require("./utils/updateTables");

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//5sec interval
setInterval(updateTablesRegular, 5000);

//30 sec interval
setInterval(updateTablesInfrequent, 30000);
