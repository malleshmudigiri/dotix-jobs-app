const sequelize = require("../config/sequelize");
const Job = require("../models/Job");

const WEBHOOK_URL = process.env.WEBHOOK_URL || ""; 

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to Railway MySQL");
    await sequelize.sync();
    console.log("Models synced");
  } catch (err) {
    console.error("DB connection failed:", err);
  }
})();



exports.createJob = async (req, res) => {
  try {
    const { taskName, priority, payload } = req.body;

    const job = await Job.create({
      taskName,
      priority,
      payload,
      status: "pending"
    });

    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getAllJobs = async (req, res) => {
  try {
    const where = {};
    if (req.query.status) where.status = req.query.status;
    if (req.query.priority) where.priority = req.query.priority;

    const jobs = await Job.findAll({
      where,
      order: [["createdAt", "DESC"]]
    });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};


exports.getJobById = async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json(job);
};


exports.runJob = async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found" });

  if (["running", "completed"].includes(job.status)) {
    return res.status(400).json({ error: "Cannot rerun this job" });
  }

  await job.update({ status: "running" });
  res.json({ message: "Job started" });

  setTimeout(async () => {
    await job.update({ status: "completed" });

    if (WEBHOOK_URL) {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          taskName: job.taskName,
          status: "completed",
          priority: job.priority,
          payload: job.payload,
          completedAt: new Date()
        })
      });
    }
  }, 3000);
};
