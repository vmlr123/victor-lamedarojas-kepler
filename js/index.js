let createFooter = document.createElement("footer");
document.body.appendChild(createFooter);

let today = new Date();
let thisYear = today.getFullYear();
let footer = document.querySelector("footer");
let copyright = document.createElement("p");
copyright.innerHTML = "&copy; Victor Lameda Rojas " + thisYear;
footer.appendChild(copyright);

let skills = ["HTML", "CSS", "JavaScript", "GitHub"];
let skillsSection = document.getElementById("Skills");
let skillsList = skillsSection.querySelector("ul");

for (skill of skills) {
  let li = document.createElement("li");
  li.innerText = skill;
  skillsList.appendChild(li);
}

const messageForm = document.getElementsByName("leave_message")[0];

let messageSection = document.getElementById("messages");
let messageList = messageSection.querySelector("ul");
if (messageList.childElementCount === 0) {
  messageSection.style.display = "none";
}

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let userName = event.target.usersName.value;
  let userEmail = event.target.usersEmail.value;
  let userMessage = event.target.usersMessage.value;
  console.log(userName, userEmail, userMessage);
  event.target.reset();
  let messageSection = document.getElementById("messages");
  let messageList = messageSection.querySelector("ul");
  let newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href="mailto: ${userEmail}"> ${userName} </a> <br/> <span>${userMessage}</span> <br/>`;

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
  messageList.appendChild(newMessage);

  messageSection.style.display = "block";
});

async function getProjects() {
  try {
    const response = await fetch("https://api.github.com/users/vmlr123/repos");
    if (!response.ok) {
      throw new Error(response.status);
    }
    const repositories = await response.json();
    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector("ul");
    console.log(repositories);

    const unwantedRepositories = [
      "git_test",
      "testingduck",
      "CSC256PublicGitRemote",
      "csc256publicgitremoteclone",
      "hello-world",
      "CSC_120_Tic_Tac_Toe",
    ];

    for (const repository of repositories) {
      const project = document.createElement("li");
      const projectLink = document.createElement("a");
      projectLink.innerText = repository.name;
      projectLink.href = repository.html_url;
      projectLink.target = "_blank";
      projectLink.rel = "noopener noreferrer";
      project.appendChild(projectLink);
      if (!unwantedRepositories.includes(repository.name)) {
        projectList.appendChild(project);
      }
    }
  } catch (error) {
    console.error("Error fetching repositories:", error);
  }
}
const repositories = getProjects();
