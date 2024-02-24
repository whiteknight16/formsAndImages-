require("dotenv");
const app = require("./app");
port = process.env.PORT || 4001;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
