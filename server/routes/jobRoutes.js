const express = require("express");
const router = express.Router();
const { createJob, getAllJobs, getJobById, runJob } = require("../controllers/jobController");

router.post("/jobs", createJob);
router.get("/jobs", getAllJobs);
router.get("/jobs/:id", getJobById);
router.post("/run-job/:id", runJob);

module.exports = router;
