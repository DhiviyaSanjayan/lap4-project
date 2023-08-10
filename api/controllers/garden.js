const Garden = require("../models/Garden.js");


async function index(req, res) {
  const user_id = req.tokenObj.user_id;
  try {
    const gardens = await Garden.getAll();
    res.status(200).json(gardens);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function show(req, res) {
  const user_id = req.tokenObj.user_id;
  try {
    const id = parseInt(req.params.id);
    const garden = await Garden.getOneById(id);
    res.status(200).json(garden);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function create(req, res) {
  const user_id = req.tokenObj.user_id;
  try {
    const garden = await Garden.create(req.body);
    res.status(201).json(garden);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function update(req, res) {
  const user_id = req.tokenObj.user_id;
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const garden = await Garden.getOneById(id);
    const result = await garden.update(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function destroy(req, res) {
  const user_id = req.tokenObj.user_id;
    try {
      const id = parseInt(req.params.id);
      const garden = await Garden.getOneById(id);
      const deletionResult = await garden.destroy();
  
      if (deletionResult.deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Garden not found." });
      }
    } catch (err) {
      console.error("Error during deletion:", err);
      res.status(500).json({ error: err.message });
    }
  }

module.exports = {
  index,
  show,
  update,
  create,
  destroy,
};