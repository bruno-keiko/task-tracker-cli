# Task tracker is a project used to track and manage your tasks.
Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/projects/task-tracker).
## To run on your local machine:

1. Cloe this repository:
   Open your termial and write:

```
git clone https://github.com/bruno-keiko/task-tracker-cli
```

2. Go to task-tracker-cli workspace:

```
cd task_tracker
```

3. Install dependencies

```
npm install
```

4. link this npm package to use globally

```
npm link
```

you can add tasks, for example:

```
# Adding a new task

task-cli add "Buy groceries"

# Output: Task added successfully (ID: 1)

# Updating and deleting tasks

task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done

task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks

task-cli list

# Listing tasks by status

task-cli list done
task-cli list todo
task-cli list in-progress
```
