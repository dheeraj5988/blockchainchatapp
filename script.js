// Import necessary modules
const socket = io();

// Function to handle MetaMask login
async function loginWithMetaMask() {
    try {
        // Request access to MetaMask accounts
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

        // Check if accounts are available
        if (accounts.length > 0) {
            const userAddress = accounts[0];
            // Use the Ethereum address as the username
            localStorage.setItem('userAddress', userAddress);
            // Redirect to chat room page
            window.location.href = chat.html;
        } else {
            console.log('No accounts found');
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to display user's Ethereum address
function displayUserAddress() {
    if (window.ethereum) {
        window.ethereum
            .request({ method: 'eth_accounts' })
            .then((accounts) => {
                if (accounts.length > 0) {
                    const userAddress = accounts[0];
                    document.getElementById('userAddress').textContent = Your Ethereum Address: ${userAddress};
                } else {
                    console.log('No accounts found');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        console.log('MetaMask extension not detected');
    }
}

// Call the function to display user's Ethereum address when the page loads
displayUserAddress();

// Attach click event listener to the login button
document.getElementById('loginButton').addEventListener('click', loginWithMetaMask);

// Handle form submission to send private chat message
document.getElementById('privateMessageForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const privateMessageInput = document.getElementById('privateMessageInput');
    const recipientAddressInput = document.getElementById('recipientAddressInput');
    const message = privateMessageInput.value.trim();
    const recipient = recipientAddressInput.value.trim();
    
    // Check if sender and recipient addresses are different
    const senderAddress = localStorage.getItem('userAddress');
    if (senderAddress === recipient) {
        alert("You can't send a private message to yourself!");
        return; // Exit the function if sender and recipient addresses are the same
    }

    if (message && recipient) {
        addPrivateMessageToHistory(message); // You might want to adjust how you handle/display these
        socket.emit('private chat message', { message, recipient });
        privateMessageInput.value = '';
        recipientAddressInput.value = '';
    }
});

// Establish WebSocket connection with the backend server
socket.on('connect', () => {
    console.log('Connected to server');
});

// Handle incoming chat messages from the backend server
socket.on('chat message', (message) => {
    addMessageToHistory(message);
});

// Assume there's a similar event for private messages
socket.on('private chat message', (data) => {
    addPrivateMessageToHistory(data.message); // Adjust according to how you differentiate private messages
});

// Function to add message to the chat history
function addMessageToHistory(message) {
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.textContent = message;

    // Get the chat history container
    const messageHistory = document.getElementById('messageHistory');

    // Prepend the new message element to the beginning of the chat history
    // This ensures that the most recent message is always at the top
    messageHistory.prepend(messageElement);
}

// Function to add private message to the private chat history
function addPrivateMessageToHistory(message) {
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.textContent = You: ${message};

    // Get the private chat history container
    const privateMessageHistory = document.getElementById('privateMessageHistory');

    // Prepend the new message element to the beginning of the private chat history
    // This ensures that the most recent message is always at the top
    privateMessageHistory.prepend(messageElement);
}
