import random
# --- PoW, PoS, DPoS consensus demo ---

# Mock objects for validators
pow_validators = [
    {"name": "Miner1", "power": random.randint(1, 100)},
    {"name": "Miner2", "power": random.randint(1, 100)},
    {"name": "Miner3", "power": random.randint(1, 100)}
]
pos_validators = [
    {"name": "Staker1", "stake": random.randint(1, 100)},
    {"name": "Staker2", "stake": random.randint(1, 100)},
    {"name": "Staker3", "stake": random.randint(1, 100)}
]
dpos_candidates = [
    {"name": "Delegate1", "votes": 0},
    {"name": "Delegate2", "votes": 0},
    {"name": "Delegate3", "votes": 0}
]
voters = ["VoterA", "VoterB", "VoterC"]

# --- PoW: Select validator with highest power ---
pow_winner = max(pow_validators, key=lambda x: x["power"])
print(f"[PoW] Consensus Method: Proof of Work")
print(f"[PoW] Validators: {pow_validators}")
print(f"[PoW] Selected Validator: {pow_winner['name']} (Power: {pow_winner['power']})")
print("[PoW] Explanation: The miner with the highest computational power is most likely to mine the next block. This simulates the competitive nature of PoW where more power increases the chance of selection.\n")

# --- PoS: Select validator with highest stake ---
pos_winner = max(pos_validators, key=lambda x: x["stake"])
print(f"[PoS] Consensus Method: Proof of Stake")
print(f"[PoS] Validators: {pos_validators}")
print(f"[PoS] Selected Validator: {pos_winner['name']} (Stake: {pos_winner['stake']})")
print("[PoS] Explanation: The staker with the highest stake has the highest chance to validate the next block. This simulates PoS where more stake increases the chance of selection.\n")

# --- DPoS: Voters vote for delegates, top-voted delegate is randomly chosen if tie ---
for voter in voters:
    vote = random.choice(dpos_candidates)
    vote["votes"] += 1
max_votes = max(d["votes"] for d in dpos_candidates)
top_delegates = [d for d in dpos_candidates if d["votes"] == max_votes]
import random as _random
dpos_winner = _random.choice(top_delegates)

print(f"[DPoS] Consensus Method: Delegated Proof of Stake")
print(f"[DPoS] Delegates: {dpos_candidates}")
print(f"[DPoS] Selected Validator: {dpos_winner['name']} (Votes: {dpos_winner['votes']})")
print("[DPoS] Explanation: Delegates are chosen by votes from token holders; if there is a tie, one is randomly selected among the top-voted delegates. This simulates DPoS where voting determines the validator.\n")
# --- End of consensus demo ---
# Each step is explained with print statements above.
