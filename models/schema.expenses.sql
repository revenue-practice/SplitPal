USE DATABASE SPLITPAL;
CREATE TABLE IF NOT EXISTS EXPENSES (
    id uuid PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    group_id uuid UNIQUE NOT NULL,
    payer_id uuid UNIQUE NOT NULL,
    total_amount INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (group_id) REFERENCES GROUPS(id),
    FOREIGN KEY (payer_id) REFERENCES USERS(id),
    CONSTRAINT EXPENSES_UNIQUE_PAIR UNIQUE(id, group_id)
);

CREATE INDEX expenses_by_group_index ON EXPENSES(group_id);
CREATE INDEX expenses_by_payer_index ON EXPENSES(payer_id);