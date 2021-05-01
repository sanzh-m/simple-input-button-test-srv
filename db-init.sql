BEGIN;
    CREATE TABLE users("name" text primary key);
    INSERT INTO users VALUES ('Sanzhar'),
                             ('Babar'),
                             ('Rheaa'),
                             ('David'),
                             ('Alice'),
                             ('Bob'),
                             ('Carl'),
                             ('Denice'),
                             ('Elisabeth');
COMMIT;