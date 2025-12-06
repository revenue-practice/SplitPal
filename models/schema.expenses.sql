USE DATABASE SPLITPAL;
CREATE TABLE IF NOT EXISTS EXPENSES (
    id uuid PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    group_id uuid NOT NULL,
    payer_id uuid NOT NULL,
    total_amount INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (group_id) REFERENCES GROUPS(id) ON DELETE CASCADE,
    FOREIGN KEY (payer_id) REFERENCES USERS(id) ON DELETE CASCADE,
);

CREATE INDEX IF NOT EXISTS index_expense_group ON EXPENSES(group_id);
CREATE INDEX IF NOT EXISTS index_expense_payer ON EXPENSES(payer_id);