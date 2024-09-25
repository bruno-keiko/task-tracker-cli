const fs = require("fs");
const path = require("path");
const yargs = require("yargs");

const tasksFilePath = path.join(__dirname, "tasks.json");

const loadTasks = () => {
  if (!fs.existsSync(tasksFilePath)) {
    return [];
  }
  const data = fs.readFileSync(tasksFilePath);
  return JSON.parse(data);
};

const saveTasks = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

yargs.command({
  command: "add <task>",
  describe: "Add a new task",
  handler(argv) {
    const tasks = loadTasks();
    tasks.push({ title: argv.task, status: "todo", id: tasks.length + 1 });
    saveTasks(tasks);
    console.log(`Task added: "${argv.task}"`);
  },
});

yargs.command({
  command: "update <id>  <task>",
  describe: "Update a task",
  handler(argv) {
    const tasks = loadTasks();
    tasks.map((task) => {
      return task.id == argv.id ? (task.title = argv.task) : task;
    });
    saveTasks(tasks);
    console.log(`updated: "${argv.id}"`);
  },
});

yargs.command({
  command: "delete <id>",
  describe: "Delete a task",
  handler(argv) {
    const tasks = loadTasks();
    const filtered = tasks.filter((task) => {
      return task.id != argv.id;
    });
    saveTasks(filtered);
    console.log(`deleted: "${argv.id}"`);
  },
});

yargs.command({
  command: "mark-in-progress <id>",
  describe: "Mark in progress a task",
  handler(argv) {
    const tasks = loadTasks();
    tasks.map((task) => {
      return task.id == argv.id ? (task.status = "in-progress") : task;
    });
    saveTasks(tasks);
    console.log(`marked in progress: "${argv.id}"`);
  },
});

yargs.command({
  command: "mark-done <id>",
  describe: "Mark done a task",
  handler(argv) {
    const tasks = loadTasks();
    tasks.map((task) => {
      return task.id == argv.id ? (task.status = "done") : task;
    });
    saveTasks(tasks);
    console.log(`mark done: "${argv.id}"`);
  },
});

yargs.command({
  command: "list [status]",
  describe: "Show task list",
  builder: (yargs) => {
    return yargs.positional("status", {
      describe: "Task status (e.g., all, completed, pending)",
      default: "all",
    });
  },
  handler(argv) {
    const tasks = loadTasks();
    if (argv.status == "all") {
      for (const task of tasks) {
        console.log(task.title);
      }
      return;
    }
    if (tasks.length === 0) {
      console.log("No tasks found.");
      return;
    }
    const filtered = tasks.filter((task) => {
      return task.status == argv.status;
    });
    for (const task of filtered) {
      console.log(task.title);
    }
  },
});

yargs.parse();
