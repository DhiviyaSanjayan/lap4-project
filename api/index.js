require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 3000;

const { updateAllInfo, updateAllInfo2 } = require("./utils/updateAllInfo");

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//30 interval
setInterval(updateAllInfo, 30000)

//2 minute interval
setInterval(updateAllInfo2, 180000)

