#!/usr/bin/env node


import data from './data.js'
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner'
import gradient from 'gradient-string'

const logo = `
██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  
██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  
╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝`

const bye = `

██████  ██    ██ ███████ 
██   ██  ██  ██  ██      
██████    ████   █████   
██   ██    ██    ██      
██████     ██    ███████ 
                   
`


const response = chalk.hex('#749BC2')
const spinner = createSpinner()

const resumeOptions = {
    type: "list",
    name: "resumeOptions",
    message: "What do you want to know.. please select from below",
    choices: [...Object.keys(data), "Exit"]
};

const sleep = (ms = 2100) => new Promise((resolve) => setTimeout(resolve, ms))

console.log(gradient.mind.multiline(logo))


const showResume = async () => {
    const greetings = chalkAnimation.karaoke("\n👋 This is Walid Lamraoui's CV ✨ Please wait a moment.. 🙏 Thank You.", 2)
    spinner.start()
    await sleep()
    spinner.success()
    greetings.stop()
    handleResume();

};

const goodBye = async () => {
    console.log(gradient.mind.multiline(bye))
    const goodBye = chalkAnimation.rainbow("\nThank You for reading my resume 😍🙏\n", 2)
    await sleep(1000)
    goodBye.stop()

}

const handleResume = async () => {

    try {
        const answer = await inquirer.prompt(resumeOptions);
        if (answer.resumeOptions === "Exit") {
            await goodBye()
            return;
        }



        const options = data[answer.resumeOptions];
        if (options) {

            spinner.start()
            await sleep(900)
            spinner.clear()
            spinner.success()
            console.log(response(new inquirer.Separator()));
            options.map((info) => {
                console.log(response(`- ${info}`));
            });
            console.log(response(new inquirer.Separator()));
        }

        const choice = await inquirer.prompt({
            type: "list",
            name: "exitBack",
            message: "Go back or Exit?",
            choices: ["Back", "Exit"]
        });

        if (choice.exitBack === "Back") {
            handleResume();
        } else if (choice.exitBack === "Exit") {
            await goodBye()
            return;
        }
    } catch (err) {
        console.log('Oops,', err);
    }
};



await showResume();
