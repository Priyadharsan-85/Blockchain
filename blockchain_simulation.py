import hashlib
import time

# Block class for basic blockchain simulation
class Block:
    def __init__(self, index, timestamp, data, previous_hash):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.previous_hash = previous_hash
        self.nonce = 0
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        block_string = f"{self.index}{self.timestamp}{self.data}{self.previous_hash}{self.nonce}"
        return hashlib.sha256(block_string.encode()).hexdigest()

    def __str__(self):
        return (f"Block {self.index}:\n"
                f"  Timestamp: {self.timestamp}\n"
                f"  Data: {self.data}\n"
                f"  Previous Hash: {self.previous_hash}\n"
                f"  Hash: {self.hash}\n")

# Create the genesis block
def create_genesis_block():
    return Block(0, time.time(), "Genesis Block", "0")

# Create the next block in the chain
def create_next_block(prev_block, data):
    return Block(prev_block.index + 1, time.time(), data, prev_block.hash)

# Display the blockchain
def display_chain(chain):
    print("\n--- Blockchain State ---")
    for block in chain:
        print(block)

# Validate the blockchain
def is_chain_valid(chain):
    for i in range(1, len(chain)):
        current = chain[i]
        previous = chain[i-1]
        if current.previous_hash != previous.hash:
            return False
        if current.hash != current.calculate_hash():
            return False
    return True

# --- Main simulation ---
blockchain = [create_genesis_block()]
blockchain.append(create_next_block(blockchain[-1], "Block 1 Data"))
blockchain.append(create_next_block(blockchain[-1], "Block 2 Data"))

print("Initial blockchain:")
display_chain(blockchain)
print("Is blockchain valid?", is_chain_valid(blockchain))

# Tamper with Block 1's data
print("\nTampering with Block 1's data...")
blockchain[1].data = "Tampered Data"
blockchain[1].hash = blockchain[1].calculate_hash()

display_chain(blockchain)
print("Is blockchain valid after tampering?", is_chain_valid(blockchain))

# Fix the chain by recalculating hashes
print("\nFixing the chain by recalculating hashes...")
for i in range(1, len(blockchain)):
    blockchain[i].previous_hash = blockchain[i-1].hash
    blockchain[i].hash = blockchain[i].calculate_hash()

display_chain(blockchain)
print("Is blockchain valid after fixing?", is_chain_valid(blockchain))
# --- End of simulation ---
# Each step is explained with print statements above.