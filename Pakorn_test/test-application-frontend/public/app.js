const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

// Fetch and display users
function fetchUsers() {
    fetch(`${window.env.API_URL}/users`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(users => {
            userList.innerHTML = ''; // Clear the list before appending new users
            users.forEach(user => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${user.name} (${user.email})</span>
                    <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
                `;
                userList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            alert('Failed to load users. Please check the console for details.');
        });
}

// Add a new user
userForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value; // Get password input

    // Check if the fields are not empty
    if (name && email) {
        fetch(`${window.env.API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }), // Include password
        })
        .then(response => {
            if (response.ok) {
                return fetchUsers(); // Refresh the user list
            } else {
                throw new Error(`Failed to add user: ${response.statusText}`);
            }
        })
        .then(() => {
            userForm.reset(); // Clear the form
        })
        .catch(error => {
            console.error('Error adding user:', error);
            alert('Failed to add user. Please check the console for details.');
        });
    } else {
        console.error('Name and email must be provided');
        alert('Please fill in both name and email fields.');
    }
});

// Delete a user
function deleteUser(id) {
    fetch(`${window.env.API_URL}/users/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            fetchUsers(); // Refresh the user list
        } else {
            throw new Error(`Failed to delete user: ${response.statusText}`);
        }
    })
    .catch(error => {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please check the console for details.');
    });
}

// Initial fetch
fetchUsers();
