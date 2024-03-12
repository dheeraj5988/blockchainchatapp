// Example code for message encryption using RSA
const crypto = require('crypto');

// Generate RSA key pairs for sender and recipient
const senderKeyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});
const recipientKeyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

// Encrypt message using recipient's public key
const message = 'Hello, world!';
const encryptedMessage = crypto.publicEncrypt(
    recipientKeyPair.publicKey,
    Buffer.from(message, 'utf8')
);

// Decrypt message using recipient's private key
const decryptedMessage = crypto.privateDecrypt(
    recipientKeyPair.privateKey,
    encryptedMessage
);

console.log('Decrypted message:', decryptedMessage.toString('utf8'));

// Example code for data integrity using Merkle tree and ZK-SNARKs
const snarkjs = require('snarkjs');
const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');

// Generate Merkle tree from chat messages
const chatMessages = ['Message 1', 'Message 2', 'Message 3'];
const leaves = chatMessages.map(msg => SHA256(msg));
const tree = new MerkleTree(leaves, SHA256);

// Generate ZK-SNARK proof for a specific message
const proof = snarkjs.groth16.fullProve(
    { message: SHA256('Message 1') }, // Statement to prove
    './circuit.wasm', // Compiled circuit
    './proving_key.json' // Proving key
);

// Verify ZK-SNARK proof
const isValid = snarkjs.groth16.verify(
    './verification_key.json', // Verification key
    [tree.getRoot().toString('hex'), proof.pi_a, proof.pi_b, proof.pi_c] // Proof
);

console.log('ZK-SNARK proof is valid:', isValid);
