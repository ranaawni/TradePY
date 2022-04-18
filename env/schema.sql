DROP TABLE IF EXISTS trades;

CREATE TABLE trades(
    trade_id INTEGER PRIMARY KEY AUTOINCREMENT,
    client TEXT NOT NULL,
    instrument TEXT NOT NULL,
    quantity INT NOT NULL,
    direction TEXT NOT NULL
);
