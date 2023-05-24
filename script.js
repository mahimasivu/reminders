const reminderForm = document.getElementById('reminder-form');
const reminderTable = document.getElementById('reminder-table');

reminderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(reminderForm);
  const reminder = {
    title: formData.get('title'),
    description: formData.get('description'),
    date: new Date(formData.get('date')),
  };

  fetch('/reminders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reminder),
  })
    .then((response) => response.json())
    .then((reminder) => {
      console.log('Reminder created:', reminder);
      reminderForm.reset();
    })
    .catch((error) => console.error(error));
});

fetch('/reminders')
  .then((response) => response.json())
  .then((reminders) => {
    reminders.forEach((reminder) => {
      const row = reminderTable.insertRow();
      row.insertCell().textContent = reminder.title;
      row.insertCell().textContent = reminder.description;
      row.insertCell().textContent = reminder.date;
    });
  })
  .catch((error) => console.error(error));
