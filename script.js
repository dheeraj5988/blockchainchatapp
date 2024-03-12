// JavaScript (script.js)

// Function to handle MetaMask login
async function loginWithMetaMask() {
    try {
        // Request access to MetaMask accounts
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

        // Check if accounts are available
        if (accounts.length > 0) {
            const userAddress = accounts[0];
            // Use the Ethereum address as the username
            localStorage.setItem('username', userAddress);
            // Redirect to chat room page
            window.location.href = `chat.html`;
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
                    document.getElementById('userAddress').textContent = `Your Ethereum Address: ${userAddress}`;
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


// Establish WebSocket connection with the backend server
const socket = io();

// Send a chat message
socket.emit('chat message', 'Hello, world!');

// Handle incoming chat messages from the backend server
socket.on('chat message', (message) => {
    console.log('Received message:', message);
    // Process the received message
});
