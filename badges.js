// Example: simple badge system
let badges = {
  streak: false,
  taskMaster: false,
};

function updateBadges() {
  const completedTasks = tasks.filter((t) => t.completed).length;
  badges.streak = completedTasks > 0; // earned if you have at least 1 completed task
  badges.taskMaster = completedTasks >= 10; // earned after 10 tasks
  displayBadges();
}

function displayBadges() {
  const badgeContainer = document.getElementById("badge-container");
  badgeContainer.innerHTML = "";
  if (badges.streak) badgeContainer.innerHTML += "🎖 Streak Keeper ";
  if (badges.taskMaster) badgeContainer.innerHTML += "🏆 Task Master ";
}

// Call updateBadges() after adding/completing tasks
