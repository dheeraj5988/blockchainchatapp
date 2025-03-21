// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Check if we're on the chat page
  const isChatPage = document.querySelector(".chat-page")

  if (isChatPage) {
    initChatPage()
  } else {
    // We're on the index page
    // Current year for footer
    document.getElementById("currentYear").textContent = new Date().getFullYear()
  }
})

// Initialize the chat page
function initChatPage() {
  // Get DOM elements
  const messagesContainer = document.getElementById("messagesContainer")
  const messageInput = document.getElementById("messageInput")
  const sendMessageBtn = document.getElementById("sendMessageBtn")
  const sidebarUserAddress = document.getElementById("sidebarUserAddress")
  const currentContactName = document.getElementById("currentContactName")
  const currentContactAddress = document.getElementById("currentContactAddress")
  const contacts = document.querySelectorAll(".contact")
  const sidebarMenuBtn = document.getElementById("sidebarMenuBtn")
  const sidebar = document.querySelector(".sidebar")

  // Check if user is logged in
  const userAddress = localStorage.getItem("userAddress")
  if (!userAddress) {
    window.location.href = "index.html"
    return
  }

  // Display user address
  sidebarUserAddress.textContent = formatAddress(userAddress)

  // Mock messages for demo
  const mockMessages = [
    {
      id: "1",
      sender: "0x1234...5678",
      content: "Hey there! How's it going?",
      timestamp: Date.now() - 3600000,
      isMine: false,
    },
    {
      id: "2",
      sender: userAddress,
      content: "Hi Alice! I'm good, just checking out this new decentralized chat app.",
      timestamp: Date.now() - 3500000,
      isMine: true,
    },
    {
      id: "3",
      sender: "0x1234...5678",
      content: "It's pretty cool, right? I love how everything is encrypted and stored on the blockchain.",
      timestamp: Date.now() - 3400000,
      isMine: false,
    },
    {
      id: "4",
      sender: userAddress,
      content: "No more worrying about data breaches or companies selling our chat data.",
      timestamp: Date.now() - 3300000,
      isMine: true,
    },
    {
      id: "5",
      sender: "0x1234...5678",
      content: "Exactly. Plus, the P2P architecture means no central point of failure.",
      timestamp: Date.now() - 3200000,
      isMine: false,
    },
  ]

  // Load messages
  loadMessages(mockMessages)

  // Auto-resize textarea
  messageInput.addEventListener("input", function () {
    this.style.height = "auto"
    this.style.height = this.scrollHeight + "px"
  })

  // Send message on button click
  sendMessageBtn.addEventListener("click", sendMessage)

  // Send message on Enter key (but allow Shift+Enter for new line)
  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  })

  // Contact click handler
  contacts.forEach((contact) => {
    contact.addEventListener("click", function () {
      // Remove active class from all contacts
      contacts.forEach((c) => c.classList.remove("active"))
      // Add active class to clicked contact
      this.classList.add("active")

      // Update current contact info
      const name = this.getAttribute("data-name")
      const address = this.getAttribute("data-address")
      currentContactName.textContent = name
      currentContactAddress.textContent = address

      // Clear messages and load new ones
      messagesContainer.innerHTML = ""
      loadMessages(mockMessages)
    })
  })

  // Mobile menu toggle
  if (sidebarMenuBtn) {
    sidebarMenuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open")
    })
  }

  // Function to send a message
  function sendMessage() {
    const content = messageInput.value.trim()
    if (!content) return

    // Create new message
    const message = {
      id: Date.now().toString(),
      sender: userAddress,
      content: content,
      timestamp: Date.now(),
      isMine: true,
    }

    // Add message to UI
    addMessageToUI(message)

    // Clear input
    messageInput.value = ""
    messageInput.style.height = "auto"

    // Simulate response after 1 second
    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        sender: currentContactAddress.textContent,
        content: "Thanks for your message! This is a simulated response for the demo.",
        timestamp: Date.now(),
        isMine: false,
      }
      addMessageToUI(response)
    }, 1000)
  }

  // Function to load messages
  function loadMessages(messages) {
    messages.forEach((message) => {
      addMessageToUI(message)
    })
  }

  // Function to add a message to the UI
  function addMessageToUI(message) {
    const messageEl = document.createElement("div")
    messageEl.className = `message ${message.isMine ? "sent" : "received"}`

    const messageContent = document.createElement("div")
    messageContent.className = "message-content"
    messageContent.textContent = message.content

    const messageTime = document.createElement("div")
    messageTime.className = "message-time"
    messageTime.textContent = formatTime(message.timestamp)

    messageEl.appendChild(messageContent)
    messageEl.appendChild(messageTime)

    messagesContainer.appendChild(messageEl)

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }
}

// Format time (e.g., "10:30 AM")
function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

// Format address (e.g., "0x1234...5678")
function formatAddress(address) {
  if (!address) return ""
  return address.substring(0, 6) + "..." + address.substring(address.length - 4)
}

// Function to initialize Web3
async function initWeb3() {
  // Check if MetaMask is installed
  if (window.ethereum) {
    // Modern dapp browsers...
    window.web3 = new Web3(window.ethereum)
    try {
      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" })
      // Accounts now exposed
      const accounts = await window.ethereum.request({ method: "eth_accounts" })
      const userAddress = accounts[0]
      // Display user's Ethereum address
      if (document.getElementById("userAddress")) {
        document.getElementById("userAddress").textContent = `Logged in as: ${formatAddress(userAddress)}`
      }
      // Store address in localStorage
      localStorage.setItem("userAddress", userAddress)
      // Redirect to chat room page
      window.location.href = "chat.html"
    } catch (error) {
      console.error(error)
      alert("You need to allow access to MetaMask to log in.")
    }
  } else {
    alert("Please install MetaMask to use this feature.")
    window.open("https://metamask.io/download/", "_blank")
  }
}

