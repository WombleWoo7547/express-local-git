// @ts-check

// @ts-ignore
const express = require("express");
// @ts-ignore
const cors = require("cors");
// @ts-ignore
const volleyball = require("volleyball");
const auth = require('./auth');
import config from "./config.js";

const app = express();
app.use(cors());
app.use(volleyball());
app.use(express.json());

app.use('/auth', auth);

app.get('/', (req, res, next) => {
	res.json({
		msg: '🤣🤣🤣🏆🏆😁😁👍👍🚀🚀🌍🌍👋👋😺😺😂😂😃😃🔐🔐🔑🔑🔒🔒'
	});
});

app.listen(config.PORT, () => {
	console.log(`Listening at port ${config.PORT}`);
});
