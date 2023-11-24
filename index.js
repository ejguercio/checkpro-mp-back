const server = require('./src/server')
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})
