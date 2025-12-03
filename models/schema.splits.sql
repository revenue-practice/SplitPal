USE DATABASE SPLITPAL;
CREATE TABLE IF NOT EXISTS SPLITS (
    id uuid PRIMARY KEY,
    expense_id uuid UNIQUE NOT NULL,
    receiver_id uuid UNIQUE NOT NULL,
    amount INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (expense_id) REFERENCES EXPENSES(id),
    FOREIGN KEY (receiver_id) REFERENCES USERS(id),
    CONSTRAINT SPLITS_UNIQUE_PAIR UNIQUE(id, expense_id)
);

CREATE INDEX split_by_expense_index ON EXPENSES(expense_id);
CREATE INDEX split_by_receiver_index ON USERS(receiver_id);