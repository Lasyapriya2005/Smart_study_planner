document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");
  window.calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    events: tasks.map((t) => ({
      title: t.text,
      start: t.date,
      color:
        t.priority === "high"
          ? "red"
          : t.priority === "medium"
          ? "orange"
          : "green",
    })),
  });
  calendar.render();
});

function updateCalendar() {
  calendar.removeAllEvents();
  tasks.forEach((t) => {
    calendar.addEvent({
      title: t.text,
      start: t.date,
      color:
        t.priority === "high"
          ? "red"
          : t.priority === "medium"
          ? "orange"
          : "green",
    });
  });
}
