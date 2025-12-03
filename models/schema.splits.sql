USE DATABASE SPLITPAL;
CREATE TABLE IF NOT EXISTS SPLITS (
    id uuid PRIMARY KEY,
    expense_id uuid NOT NULL,
    receiver_id uuid NOT NULL,
    amount INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (expense_id) REFERENCES EXPENSES(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES USERS(id) ON DELETE CASCADE,
    CONSTRAINT SPLITS_UNIQUE_PAIR UNIQUE(receiver_id, expense_id)
);

CREATE INDEX index_split_by_expense ON SPLITS(expense_id);
CREATE INDEX index_split_by_receiver ON SPLITS(receiver_id);