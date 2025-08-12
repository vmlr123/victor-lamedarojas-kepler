// Create footer and add copyright information

// Create a footer element and append it to the body
let createFooter = document.createElement("footer");
document.body.appendChild(createFooter);
// Get the current year and add it to the footer
let today = new Date();
let thisYear = today.getFullYear();
let footer = document.querySelector("footer");
let copyright = document.createElement("p");
copyright.innerHTML = "&copy; Victor Lameda Rojas " + thisYear;
footer.appendChild(copyright);

// Select skills section and add skills to the list

let skills = ["HTML", "CSS", "JavaScript", "GitHub"];
let skillsSection = document.getElementById("Skills");
let skillsList = skillsSection.querySelector("ul");
// Go through each skill and create a list item for it
for (skill of skills) {
  let li = document.createElement("li");
  li.innerText = skill;
  skillsList.appendChild(li);
}

// Select the message form and add functionality to submit messages

// Select needed elements
const messageForm = document.getElementsByName("leave_message")[0];
let messageSection = document.getElementById("messages");
let messageList = messageSection.querySelector("ul");
// Hide the message section if there are no messages
if (messageList.childElementCount === 0) {
  messageSection.style.display = "none";
}

// Add event listener to the message form to handle submission
messageForm.addEventListener("submit", (event) => {
  // Stops reloading from happening when the form is submitted
  event.preventDefault();
  // Get the values from the form and log them to the console
  let userName = event.target.usersName.value;
  let userEmail = event.target.usersEmail.value;
  let userMessage = event.target.usersMessage.value;
  console.log(userName, userEmail, userMessage);
  // Reset the form fields after submission
  event.target.reset();
  // Create a new message entry and add it to the message list
  let messageSection = document.getElementById("messages");
  let messageList = messageSection.querySelector("ul");
  let newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href="mailto: ${userEmail}"> ${userName} </a> <br/> <span>${userMessage}</span> <br/>`;

  // Add edit button to the new message entry
  let editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.type = "button";
  editButton.addEventListener("click", () => {
    let entry = editButton.parentNode;
    let message = entry.querySelector("span");
    let newMessage = prompt("Edit your message:", message.innerText);
    if (newMessage) {
      message.innerText = newMessage;
    }
  });
  newMessage.appendChild(editButton);

  // Add remove button to the new message entry
  let removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.type = "button";
  removeButton.addEventListener("click", () => {
    let entry = removeButton.parentNode;
    entry.remove();
    if (messageList.childElementCount === 0) {
      messageSection.style.display = "none";
    }
  });
  newMessage.appendChild(removeButton);

  // Append the new message to the message list
  messageList.appendChild(newMessage);

  // Show the message section if it was hidden
  messageSection.style.display = "block";
});

// Fetch projects from GitHub and display them in the Projects section

async function getProjects() {
  try {
    // Fetch repositories from GitHub API
    const response = await fetch("https://api.github.com/users/vmlr123/repos");
    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      // If not, throw an error with the status code
      throw new Error(response.status);
    }
    // Parse the JSON response
    const repositories = await response.json();
    // Select the Projects section and its list
    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector("ul");
    console.log(repositories);

    // List of unwanted repositories to filter out
    const unwantedRepositories = [
      "git_test",
      "testingduck",
      "CSC256PublicGitRemote",
      "csc256publicgitremoteclone",
      "hello-world",
      "CSC_120_Tic_Tac_Toe",
    ];

    // Go through each repository and create a list item for it
    for (const repository of repositories) {
      // Create a list item (and a link) for each repository
      const project = document.createElement("li");
      const projectLink = document.createElement("a");
      // Set the text to the repository name obtained from the API
      projectLink.innerText = repository.name;
      // Set the link to the repository URL obtained from the API
      projectLink.href = repository.html_url;
      // Set the target to open the link in a new tab
      projectLink.target = "_blank";
      // Set rel attribute to prevent security issues when opening in a new tab
      projectLink.rel = "noopener noreferrer";
      // Append the link to the list item
      project.appendChild(projectLink);
      // Check if the repository is not in the unwanted list
      if (!unwantedRepositories.includes(repository.name)) {
        // If it's not unwanted, append the list item to the project list
        projectList.appendChild(project);
      }
    }
  } catch (error) {
    // If there's an error fetching the repositories, log it and display an error message
    console.error("Error fetching repositories:", error);
    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector("ul");
    const errorMessage = document.createElement("li");
    // Set the text of the error message
    errorMessage.innerText = `Error fetching repositories: ${error}`;
    // Style the error message
    errorMessage.style.backgroundColor = "#000000a4";
    errorMessage.style.borderRadius = "1rem";
    errorMessage.style.padding = "1em";
    errorMessage.style.margin = "0.5em";
    errorMessage.style.fontSize = "1.5em";
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "20px";
    // Append the error message to the project list
    projectList.appendChild(errorMessage);
  }
}
// Call the async function to fetch and display projects
getProjects();
