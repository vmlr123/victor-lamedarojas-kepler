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
