import express from "express";
import Meter from "../models/mongo/meter";

const router = express.Router();

// ✅ CREATE a new meter
router.post("/", async (req, res) => {
  try {
    const { name, location, number } = req.body;
    const meter = new Meter({ name, location, number });
    await meter.save();
    res.status(201).json(meter);
  } catch (error) {
    res.status(500).json({ message: "Error creating meter", error });
  }
});

// ✅ READ all meters
router.get("/", async (req, res) => {
  try {
    const meters = await Meter.find();
    res.json(meters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meters", error });
  }
});

// ✅ READ single meter by ID
router.get("/:id", async (req, res) => {
  try {
    const meter = await Meter.findById(req.params.id);
    if (!meter) return res.status(404).json({ message: "Meter not found" });
    res.json(meter);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meter", error });
  }
});

// ✅ UPDATE a meter
router.put("/:id", async (req, res) => {
  try {
    const updatedMeter = await Meter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMeter) return res.status(404).json({ message: "Meter not found" });
    res.json(updatedMeter);
  } catch (error) {
    res.status(500).json({ message: "Error updating meter", error });
  }
});

// ✅ DELETE a meter
router.delete("/:id", async (req, res) => {
  try {
    const deletedMeter = await Meter.findByIdAndDelete(req.params.id);
    if (!deletedMeter) return res.status(404).json({ message: "Meter not found" });
    res.json({ message: "Meter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting meter", error });
  }
});

export default router;
