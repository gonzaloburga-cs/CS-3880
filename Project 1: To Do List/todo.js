const inquirer = require('inquirer');
const fs = require('fs');

const FILE_PATH = './todolist.json';
let todoList = [];

function loadTodoList() {
    try{
        if (fs.existsSync(FILE_PATH)) {
            const data = fs.readFileSync(FILE_PATH, 'utf8');
            todoList = JSON.parse(data);
        }
    } catch (error) {
        console.log("Error loading to-do list:", error.message);
        todoList = [];
    }
}

function saveTodoList() {
    try {
        const data = JSON.stringify(todoList, null, 2);
        fs.writeFileSync(FILE_PATH, data, 'utf8');
    } catch (error) {
        console.log("Error saving to-do list:", error.message);
    }
}

function addMultipleTasks(...tasks) {
    tasks.forEach(task => {
        todoList.push(`[] ${task}`);
    });
    saveTodoList();
}

//Main Menu Prompt on launch
async function mainMenu() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'action',
            message: 'Would you like to: \n(a) View To Do List\n(b) Add items to list\n(c) Check off an item\n(d) Remove an item\n(e) Quit\n'
        }
    ]);

    if(answers.action === 'a') {
        viewTodoList();
        await mainMenu();
    
    } else if (answers.action === 'b') {
        await addItem();
        await mainMenu();
    
    } else if (answers.action === 'c') {
        await markItemCompleted();
        await mainMenu();   
    
    } else if (answers.action === 'd') {
        await removeItem();
        await mainMenu();

    } else if (answers.action === 'e') {
        console.log("Exiting the application. Goodbye!");
        return;

    } else {
        console.log("Invalid option. Please choose a, b, c, d, or e.");
        saveTodoList();
        await mainMenu();
    }

}


// Function to view the to-do list when 'a' is selected
function viewTodoList() {
    if(todoList.length === 0) {
        console.log("Sorry, you don't have anything on your list yet!");
    } else {
        console.log("\nTo-Do List:");
        todoList.forEach((item, index) => {
            console.log(` ${item}`);
        });
        console.log();
    }
}

// Function to add an item to the to-do list when 'b' is selected
async function addItem() {
    const answers = await inquirer.prompt([
        {
        type: 'input',
        name: 'newItem',
        message: 'Please enter the new list items. Type "done" when finished:'
        }
    ]);

    if (answers.newItem.trim().toLowerCase() === 'done') {
        saveTodoList();
        return;
    } else {
        todoList.push(`[] ${answers.newItem.trim()}`);
        await addItem(); 
    }
}

// Function to mark an item as completed when 'c' is selected
async function markItemCompleted() {
    if(todoList.length === 0) {
        console.log("Sorry, you don't have anything on your list yet!");
        return;
    }

    console.log("Please enter the number of the item you have finished:");
    todoList.forEach((item, index) => { 
        console.log(` ${index + 1}. ${item}`);

    });

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'itemIndex',
            message: 'Item number:',
        }
    ]);

    const index = parseInt(answers.itemIndex) - 1;
    if (index >= 0 && index < todoList.length) {
        todoList[index] = todoList[index].replace(/\[\s?\]/, "[x]");
        saveTodoList();
    } else {
        console.log("Invalid item number.");
    }
}

// Function to remove an item from the to-do list when 'd' is selected
async function removeItem() {
    if(todoList.length === 0) {
        console.log("Sorry, you don't have anything on your list yet!");
        return;
    }

    console.log("Please enter the number of the item you would like to remove:");
    todoList.forEach((item, index) => {
        console.log(` ${index + 1}. ${item}`);
    });

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'itemIndex',
            message: 'Item number:',
            
        }
    ]);

    const index = parseInt(answers.itemIndex) - 1;
    if (index >= 0 && index < todoList.length) {
        todoList.splice(index, 1);
        saveTodoList();
    } else {
        console.log("Invalid item number.");
    }
    
}
loadTodoList(); // Load existing to-do when application states
mainMenu(); // Start application
