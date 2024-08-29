import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let condition = true;
console.log(chalk.bold.rgb(204, 204, 204)(`\n  \t\t <<<============================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<============>>>   ${chalk.bold.hex(`a9999FF`)(`Welcome to \`CodeWithNoor\`- To-do List App`)} <<<===============>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<<============================================>>>\n`));
while (condition) {
    let addTask = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: chalk.green("What do you want to add in your TodoList?"),
        }
    ]);
    if (addTask.todo.trim() !== "") {
        todoList.push(addTask.todo);
        console.log(todoList);
    }
    else {
        console.log("Invalid Todo please write correct one!");
        continue;
    }
    let addMore = await inquirer.prompt({
        name: "addmore",
        type: "confirm",
        message: "Do you want to add more in your TodoList?",
        default: false,
    });
    condition = addMore.addmore;
}
let repeat = true;
while (repeat) {
    let operationAnswer = await inquirer.prompt({
        name: "operation",
        message: "Please Select Option",
        type: "list",
        choices: ["add more", "read", "delete", "update"],
    });
    if (operationAnswer.operation === "add more") {
        let condition = true;
        while (condition) {
            let addTask = await inquirer.prompt([
                {
                    name: "todo",
                    type: "input",
                    message: "What do you want to add in your TodoList?",
                },
            ]);
            if (addTask.todo.trim() == "") {
                todoList.push(addTask.todo);
                console.log(todoList);
            }
            else {
                console.log("Invalid todo please write the correct one!");
                continue;
            }
            let addMore = await inquirer.prompt({
                name: "addmore",
                type: "confirm",
                message: "Do you want to add more in your TodoList?",
                default: false,
            });
            condition = addMore.addmore;
        }
    }
    if (operationAnswer.operation === "read") {
        let readTodo = await inquirer.prompt({
            name: "read",
            type: "confirm",
            message: "Do you want to see your TodoList?",
            default: false,
        });
        if (readTodo.read) {
            todoList.forEach((i) => console.log(i));
        }
    }
    else if (operationAnswer.operation === "delete") {
        let delTodo = await inquirer.prompt({
            name: "delete",
            type: "confirm",
            message: "Do you want to delete any  Todo in your TodoList?",
            default: false,
        });
        if (delTodo.delete) {
            let delchoice = await inquirer.prompt({
                name: "deleteTodo",
                type: "list",
                message: "Choose the item to delete:",
                choices: todoList,
            });
            todoList = todoList.filter((i) => i !== delchoice.deleteTodo);
            console.log("Todo deleted! your remaining TodoList is :");
            todoList.forEach((i) => console.log(i));
        }
    }
    else if (operationAnswer.operation === "update") {
        let updateTodo = await inquirer.prompt({
            name: "update",
            type: "confirm",
            message: "Do you want to update your TodoList?",
            default: false,
        });
        if (updateTodo.update) {
            let update = await inquirer.prompt([
                {
                    name: "updateTodo",
                    type: "list",
                    message: "Choose the item to delete:",
                    choices: todoList,
                },
                {
                    name: "newTodo",
                    type: "input",
                    message: "Enter the new Todo in your TodoList ",
                }
            ]);
            todoList = todoList.map((i) => (i === update.updateTodo ? update.newTodo : i));
            console.log("TodoList updated! Your updated TodoList is:");
            todoList.forEach((i) => console.log(i));
        }
    }
    let repeatAgain = await inquirer.prompt({
        name: "again",
        type: "confirm",
        message: "Do you want to perform again operation?",
        default: false,
    });
    repeat = repeatAgain.again;
}
