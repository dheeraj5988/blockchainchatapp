https://dheeraj5988.github.io/blockchainchatapp/index.html

# blockchainchatapp
Creating blockchain based chatting app for hackathon 
# Private Messaging and Verification Project

This project provides a secure and decentralized solution for sending private messages and verifying addresses before initiating transactions on the blockchain. It utilizes various cryptographic techniques such as RSA encryption for message privacy and ZK-SNARKs for address verification, ensuring data integrity and confidentiality. The project integrates with MetaMask, a popular Ethereum wallet browser extension, to enable seamless interaction with the Ethereum blockchain.

## Use Case

The main use case of this project is to enable users to send private messages to each other to confirm the correctness of the recipient's address before initiating a transaction on the blockchain. By encrypting messages using the recipient's public key and verifying the address using ZK-SNARKs, users can securely communicate and validate transaction details without relying on centralized intermediaries.

## Features

- **RSA Encryption**: Messages are encrypted using RSA encryption, ensuring confidentiality between sender and recipient.
- **ZK-SNARK Verification**: Addresses are verified using Zero-Knowledge Succinct Non-Interactive Argument of Knowledge (ZK-SNARKs), providing a trustless and efficient method for confirming transaction details.
- **MetaMask Integration**: The project integrates with MetaMask, allowing users to interact with the Ethereum blockchain and sign transactions securely.
- **Decentralized Architecture**: Built on decentralized principles, leveraging blockchain technology to eliminate single points of failure and enhance security.

## Getting Started

Follow these steps to set up and use the project:

1. **Clone the Repository**: Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/dheeraj5988/blockchainchatapp.git
   ```

2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies using npm or yarn:

   ```bash
   cd private-messaging-project
   npm install
   ```

3. **Set Up Ethereum Node**: Set up an Ethereum node or use a service like Infura to connect to the Ethereum blockchain.

4. **Install MetaMask**: Install the MetaMask browser extension from the official website and create or import an Ethereum wallet.

5. **Start the Application**: Start the application by running the following command:

   ```bash
   npm start
   ```

6. **Interact with the Application**: Access the application through a web browser and connect MetaMask to interact with the Ethereum blockchain. Start sending private messages to confirm transaction details with other users.

## Contributing

Contributions are welcome! If you have any ideas for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

*Disclaimer: This project is for educational purposes only and should not be used in production without proper security audits and testing.*
