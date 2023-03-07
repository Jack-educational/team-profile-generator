// Import required modules
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const render = require('htmlRenderer');
const { Manager, Engineer, Intern } = require('classes');

// Define an empty array to store team member objects
const teamMembers = [];

// Define a function to prompt the user for information about the team manager
function promptManager() {
    console.log('Please enter information about the team manager:');
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: "What is the manager's name?",
                validate: (input) => input.trim() !== '',
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the manager's employee ID?",
                validate: (input) => input.trim() !== '' && !isNaN(parseInt(input)),
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the manager's email address?",
                validate: (input) => input.trim() !== '' && input.includes('@'),
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: "What is the manager's office number?",
                validate: (input) => input.trim() !== '' && !isNaN(parseInt(input)),
            },
        ])
        .then((answers) => {
            // Create a new Manager object and add it to the teamMembers array
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            teamMembers.push(manager);

            // Prompt the user for the next step
            promptNextStep();
        });
}

// Define a function to prompt the user for the next step
function promptNextStep() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'nextStep',
            message: 'What would you like to do next?',
            choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
        }, ])
        .then((answers) => {
            switch (answers.nextStep) {
                case 'Add an engineer':
                    promptEngineer();
                    break;
                case 'Add an intern':
                    promptIntern();
                    break;
                case 'Finish building the team':
                    // Generate the HTML file and write it to disk
                    const html = render(teamMembers);
                    const outputPath = path.join(__dirname, 'output', 'team.html');
                    fs.writeFile(outputPath, html, (err) => {
                        if (err) throw err;
                        console.log(`Successfully wrote HTML to ${outputPath}`);
                    });
                    break;
                default:
                    console.log('Invalid choice');
            }
        });
}

// Define a function to prompt the user for information about an engineer
function promptEngineer() {
    console.log('Please enter information about the engineer:');
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: "What is the engineer's name?",
                validate: (input) => input.trim() !== '',
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the engineer's employee ID?",
                validate: (input) => input.trim() !== '' && !isNaN(parseInt(input)),
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the engineer's email address?",
                validate: (input) => input.trim() !== '' && input.includes('@'),
            },
            {
                type: 'input',
                name: 'github',
                message: "What is the engineer's GitHub username?",
                validate: (input) => input.trim() !== '',
            },
        ])
        .then((answers) => {
            // Create a new Engineer object and add it to the teamMembers array
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            teamMembers.push(engineer);

            // Prompt the user for the next step
            promptNextStep();
        });
}

// Define a function to prompt the user for information about an intern

function promptIntern() {
    console.log("Please enter information about the intern:");
    inquirer
        .prompt([{
                type: 'input',
                name: 'name',
                message: "What is the intern's name?",
                validate: (input) => input.trim() !== '',
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the intern's employee ID?",
                validate: (input) => input.trim() !== '' && !isNaN(parseInt(input)),
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the intern's email address?",
                validate: (input) => input.trim() !== '' && input.includes('@'),
            },
            {
                type: 'input',
                name: 'school',
                message: "What is the intern's school?",
                validate: (input) => input.trim() !== '',
            },
        ])
        .then((answers) => {
            // Create a new Intern object and add it to the teamMembers array
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            teamMembers.push(intern);

            // Prompt the user for the next step
            promptNextStep();
        });
}


// Call the promptManager function to start the application 

promptManager();