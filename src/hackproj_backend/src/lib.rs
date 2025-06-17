use candid::{CandidType, Deserialize};
use ic_cdk::{query, update, export_candid};
use std::collections::HashMap;
use std::cell::RefCell;

type User = String;

#[derive(CandidType, Deserialize, Clone, Default)]
struct Bill {
    total_amount: u64,
    participants: Vec<User>,
    payments: HashMap<User, u64>, // Change to store payment amounts
}

// ✅ Use thread-local storage to persist state
thread_local! {
    static BILL: RefCell<Option<Bill>> = RefCell::new(None);
}

#[update]
fn create_bill(total_amount: u64, participants: Vec<User>) -> String {
    if participants.is_empty() {
        return "Error: No participants provided".to_string();
    }

    let split_amount = total_amount / (participants.len() as u64);
    let mut payments = HashMap::new();

    for participant in &participants {
        payments.insert(participant.clone(), 0); // Initialize payments to 0
    }

    let bill = Bill {
        total_amount,
        participants: participants.clone(),
        payments,
    };

    BILL.with(|b| *b.borrow_mut() = Some(bill.clone()));

    format!("Bill created! Each person pays: {} tokens", split_amount)
}

#[update]
fn pay_bill(user: User, amount: u64) -> String {
    BILL.with(|b| {
        let mut bill = b.borrow_mut();
        if let Some(ref mut bill_data) = *bill {
            if let Some(payment) = bill_data.payments.get_mut(&user) {
                *payment += amount; // Update the payment amount
                return format!("Payment of {} tokens successful for {}", amount, user);
            }
            return "Error: User not found in bill".to_string();
        }
        "Error: No active bill found".to_string()
    })
}

#[query]
fn check_status() -> String {
    BILL.with(|b| {
        let bill = b.borrow();
        if let Some(bill_data) = &*bill {
            let unpaid: Vec<&User> = bill_data
                .payments
                .iter()
                .filter(|(_, &paid)| paid < bill_data.total_amount / (bill_data.participants.len() as u64))
                .map(|(user, _)| user)
                .collect();

            if unpaid.is_empty() {
                "All payments completed!".to_string()
            } else {
                format!("Pending payments from: {:?}", unpaid)
            }
        } else {
            "Error: No active bill found".to_string()
        }
    })
}

export_candid!();