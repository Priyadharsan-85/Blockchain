import hashlib
import time

# Block class for mining simulation (Proof-of-Work)
class Block:
    def __init__(self, index, data, previous_hash):
        self.index = index
        self.timestamp = time.time()
        self.data = data
        self.previous_hash = previous_hash
        self.nonce = 0
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        block_string = f"{self.index}{self.timestamp}{self.data}{self.previous_hash}{self.nonce}"
        return hashlib.sha256(block_string.encode()).hexdigest()

    def mine_block(self, difficulty):
        prefix = '0' * difficulty
        attempts = 0
        start_time = time.time()
        # Try different nonces until hash meets difficulty
        while not self.hash.startswith(prefix):
            self.nonce += 1
            self.hash = self.calculate_hash()
            attempts += 1
        end_time = time.time()
        print("==============================")
        print(f"Block mined! Hash: {self.hash}")
        print(f"Nonce attempts: {attempts}")
        print(f"Time taken: {end_time - start_time:.4f} seconds")
        print("==============================\nMining complete.")

# --- Main mining simulation ---
difficulty = 4  # Number of leading zeros required in hash
block = Block(1, "Mining simulation data", "0")
print(f"Mining block with difficulty {difficulty}...")
block.mine_block(difficulty)
# Each step is explained with print statements above.
