const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo } = req.body;

    // Only admin can assign tasks to other users
    if (
      assignedTo &&
      req.user.role !== "admin" &&
      assignedTo !== req.user.id
    ) {
      return res.status(403).json({
        message: "Only admin can assign tasks to other users",
      });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      assignedTo: assignedTo || req.user.id,
      createdBy: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TASKS (pagination + role filtering)
exports.getTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    let filter = {};

    // Non-admins only see their assigned tasks
    if (req.user.role !== "admin") {
      filter.assignedTo = req.user._id;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Task.countDocuments(filter);

    res.json({
      tasks,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE TASK
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isAdmin = req.user.role === "admin";
    const isAssigned =
      task.assignedTo &&
      task.assignedTo._id.toString() === req.user._id.toString();

    const isCreator =
      task.createdBy &&
      task.createdBy._id.toString() === req.user._id.toString();

    if (!isAdmin && !isAssigned && !isCreator) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Admin can update anything
    // User can update only their assigned task
    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Prevent non-admins from reassigning
    if (
      req.body.assignedTo &&
      req.user.role !== "admin" &&
      req.body.assignedTo !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Only admin can reassign tasks" });
    }

    Object.assign(task, req.body);

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Admin can delete all, users only their own
    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
