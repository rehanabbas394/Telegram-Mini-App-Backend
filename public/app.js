document.addEventListener("DOMContentLoaded", function() {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
  
    userForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;

      try {
        const response = await fetch('http://localhost:3000', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email })
        });
        if (response.ok) {
          loadUsers();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    async function loadUsers() {
      try {
        const response = await fetch('http://localhost:3000');
        const users = await response.json();
        userList.innerHTML = '';
        users.forEach(user => {
          const li = document.createElement('li');
          li.textContent = `${user.username} (${user.email})`;
          userList.appendChild(li);
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    loadUsers();
  });

