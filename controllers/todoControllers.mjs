import Todo from "../models/todo.mjs";

// Get all todos for the logged-in user
export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error });
  }
};

// Add a new todo
export const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const todo = await Todo.create({
      title,
      description,
      user: req.user._id,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Failed to add todo", error });
  }
};

// Delete a todo by ID
export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const dbTodo = await Todo.findById(todoId);

    if (!dbTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (String(dbTodo.user) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this todo" });
    }

    await dbTodo.deleteOne();
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo", error });
  }
};
