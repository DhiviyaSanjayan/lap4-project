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

// //30 interval
// setInterval(updateTablesRegular, 30000);

// //2 minute interval
// setInterval(updateTablesInfrequent, 180000);
