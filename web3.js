// Web3 Integration for Blockchain Chat App

// Check if MetaMask is installed
function isMetaMaskInstalled() {
  return typeof window !== "undefined" && !!window.ethereum
}

// Connect to MetaMask
async function connectWallet() {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed")
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    return accounts[0]
  } catch (error) {
    console.error("Error connecting to MetaMask:", error)
    throw error
  }
}

// Get current account
async function getCurrentAccount() {
  if (!isMetaMaskInstalled()) {
    return null
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    })

    return accounts[0] || null
  } catch (error) {
    console.error("Error getting current account:", error)
    return null
  }
}

// Listen for account changes
function listenForAccountChanges(callback) {
  if (!isMetaMaskInstalled()) {
    return () => {}
  }

  const handleAccountsChanged = (accounts) => {
    callback(accounts[0] || null)
  }

  window.ethereum.request({ method: "eth_accounts" }).then(handleAccountsChanged).catch(console.error)

  window.ethereum.on("accountsChanged", handleAccountsChanged)

  // Return cleanup function
  return () => {
    window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
  }
}

// Send encrypted message to blockchain (mock implementation)
async function sendEncryptedMessage(recipientAddress, message) {
  // In a real implementation, this would:
  // 1. Get recipient's public key
  // 2. Encrypt the message with that key
  // 3. Store the encrypted message on IPFS or similar
  // 4. Record the IPFS hash on the blockchain

  console.log(`Sending encrypted message to ${recipientAddress}: ${message}`)

  // Mock successful transaction
  return {
    success: true,
    txHash: "0x" + Math.random().toString(16).substring(2, 42),
    timestamp: Date.now(),
  }
}

// Retrieve messages from blockchain (mock implementation)
async function getMessagesFromBlockchain(contactAddress) {
  // In a real implementation, this would:
  // 1. Query the blockchain for message records between current user and contact
  // 2. Retrieve the encrypted messages from IPFS
  // 3. Decrypt the messages with user's private key

  console.log(`Getting messages for contact: ${contactAddress}`)

  // Mock delay to simulate blockchain query
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock messages
  return [
    {
      id: "1",
      sender: contactAddress,
      content: "Hey there! How's it going?",
      timestamp: Date.now() - 3600000,
    },
    {
      id: "2",
      sender: await getCurrentAccount(),
      content: "Hi! I'm good, just checking out this new decentralized chat app.",
      timestamp: Date.now() - 3500000,
    },
    {
      id: "3",
      sender: contactAddress,
      content: "It's pretty cool, right? I love how everything is encrypted and stored on the blockchain.",
      timestamp: Date.now() - 3400000,
    },
  ]
}

// Export functions
window.blockchainChat = {
  isMetaMaskInstalled,
  connectWallet,
  getCurrentAccount,
  listenForAccountChanges,
  sendEncryptedMessage,
  getMessagesFromBlockchain,
}

