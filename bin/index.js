#! /usr/bin/env node
const shell = require('shelljs');

const COMMANDS_TO_INSTALL = {
    'curl': 'sudo apt install curl -y',
    'git': 'sudo apt install git -y',
    'oh-my-zsh': 'sudo apt install zsh && sh -c \"\$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)\"',
    'gh': 'sudo apt install gh -y',
    'i3': 'sudo apt install i3 -y',
    'tmux': 'sudo apt install tmux -y',
    'asdf': 'git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0 && echo ". $HOME/.asdf/asdf.sh" >> ~/.zshrc && source ~/.zshrc'
};

(async () => {
    const inquirerModule = await import('inquirer');
    const inquirer = inquirerModule.default;

    inquirer.prompt([
        {
            type: 'checkbox',
            name: 'programs-to-install',
            message: 'What programs would you like to install?',
            choices: ['curl', 'git', 'oh-my-zsh', 'gh', 'i3', 'tmux', 'asdf']
        }])
        .then(answers => {
            // console.log(answers['programs-to-install']);
            // should verify if the program is installed
            // if not, install it
            // if it is, move on to the next program
            answers['programs-to-install'].forEach(program => {
                if (program === 'oh-my-zsh') {
                    if (shell.exec('echo $ZSH', {silent: true})) {
                        console.log('Oh-My-Zsh is already installed.');
                        return;
                    } else {
                        console.log('Installing Oh-My-Zsh...');
                        shell.exec(`${COMMANDS_TO_INSTALL['oh-my-zsh']}`);
                        return
                    }
                }
                if(shell.which(program.toLowerCase())) {
                    console.log(`${program} is already installed.`);
                    return;
                }
                console.log(`Installing ${program}...`);
                // install program
                shell.exec(`${COMMANDS_TO_INSTALL[program.toLowerCase()]}`);
            });
        });
})();