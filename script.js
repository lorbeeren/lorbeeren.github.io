// Command definitions
const commands = {
    help: {
        description: "Display available commands",
        output: null // Will be generated dynamically
    },
    about: {
        description: "About Me",
        output: "Hi! I'm Lorbeeren, a software engineer passionate about building great user experiences."
    },
    education: {
        description: "My Education",
        output: "Computer Science Graduate with focus on Software Engineering and Web Technologies."
    },
    skills: {
        description: "My Tech Skills",
        output: "JavaScript/TypeScript, React, Node.js, Python, SQL, AWS, and more."
    },
    projects: {
        description: "My Tech Projects",
        output: "Visit my GitHub profile to see my latest projects and contributions."
    },
    contact: {
        description: "Contact Me",
        output: "Email: laurel@example.com\nGitHub: @laurel\nLinkedIn: /in/laurel"
    },
    blog: {
        description: "Visit my Blog",
        output: "Redirecting to blog..."
    },
    clear: {
        description: "Clear terminal",
        output: ""
    }
};

// DOM Elements
const terminal = document.getElementById('terminal');
const output = document.getElementById('output');
const input = document.getElementById('terminal-input');

// Initialize
function init() {
    input.focus();
    generateHelpOutput();

    // Event listeners
    input.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', () => input.focus());
}

// Generate help command output
function generateHelpOutput() {
    const helpGrid = document.createElement('div');
    helpGrid.className = 'help-grid';

    // Commands column
    const commandsCol = document.createElement('div');
    Object.keys(commands).forEach(cmd => {
        const cmdElement = document.createElement('div');
        cmdElement.className = 'help-command';
        cmdElement.textContent = cmd;
        cmdElement.onclick = () => handleCommand(cmd);
        commandsCol.appendChild(cmdElement);
    });

    // Descriptions column
    const descriptionsCol = document.createElement('div');
    Object.values(commands).forEach((cmd, index) => {
        const descElement = document.createElement('div');
        descElement.className = 'help-description';
        if (index === 0) {
            descElement.style.visibility = 'hidden';
        }
        descElement.textContent = cmd.description;
        descriptionsCol.appendChild(descElement);
    });

    helpGrid.appendChild(commandsCol);
    helpGrid.appendChild(descriptionsCol);
    commands.help.output = helpGrid.outerHTML;
}

// Handle command execution
function handleCommand(cmd) {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add command to output
    addToOutput(`λ :: ~> ${cmd}`, 'command-line');

    if (trimmedCmd === 'clear') {
        clearOutput();
        return;
    }

    if (trimmedCmd in commands) {
        if (trimmedCmd === 'help') {
            addToOutput(commands[trimmedCmd].output, 'response', true);
        } else {
            addToOutput(commands[trimmedCmd].output, 'response');
        }
    } else if (trimmedCmd !== '') {
        addToOutput(`Command not found: ${cmd}. Type 'help' to see available commands.`, 'response');
    }

    // Clear input and scroll to bottom
    input.value = '';
    scrollToBottom();
}

// Add content to output
function addToOutput(content, className, isHTML = false) {
    const element = document.createElement('div');
    element.className = `${className} fade-in`;
    
    if (isHTML) {
        element.innerHTML = content;
    } else {
        element.textContent = content;
    }
    
    output.appendChild(element);
}

// Clear the output
function clearOutput() {
    output.innerHTML = '';
    input.value = '';
}

// Scroll to bottom of output
function scrollToBottom() {
    output.scrollTop = output.scrollHeight;
}

// Handle keyboard input
function handleKeyDown(e) {
    if (e.key === 'Enter') {
        handleCommand(input.value);
    }
}

// Initialize the terminal
init();
