USE SPLITPAL;
CREATE TABLE IF NOT EXISTS SETTLEMENTS (
    id uuid PRIMARY KEY,
    from_user_id uuid NOT NULL,
    to_user_id uuid NOT NULL,
    expense_id uuid NOT NULL,
    group_id uuid NOT NULL,
    amount INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (from_user_id) REFERENCES USERS(id),
    FOREIGN KEY (to_user_id) REFERENCES USERS(id),
    FOREIGN KEY (expense_id) REFERENCES EXPENSES(id),
    FOREIGN KEY (group_id) REFERENCES GROUPS(id)
);

CREATE INDEX IF NOT EXISTS index_user_settlement ON SETTLEMENTS(to_user_id);
CREATE INDEX IF NOT EXISTS index_group_settlement ON SETTLEMENTS(group_id);
CREATE INDEX IF NOT EXISTS index_expense_settlement ON SETTLEMENTS(expense_id);