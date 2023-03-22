-- migrate:up
ALTER TABLE users ADD profileImage VARCHAR(500) NULL;
ALTER TABLE posts ADD postingImage VARCHAR(500) NULL;

-- migrate:down

