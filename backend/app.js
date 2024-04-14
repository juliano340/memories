const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

require("./db/conn");

const memoryRoutes = require("./routes");
app.use("/memories", memoryRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));