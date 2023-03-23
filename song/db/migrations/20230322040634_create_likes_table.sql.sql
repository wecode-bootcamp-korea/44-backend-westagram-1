-- migrate:up
CREATE TABLE IF NOT EXISTS likes (
  id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY UNIQUE,
  user_id INT NOT NULL REFERENCES users(id) UNIQUE,
  post_id INT  NOT NULL REFERENCES posts(id) UNIQUE,
  create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT likes_user_id FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT likes_post_id FOREIGN KEY (post_id) REFERENCES posts(id),
  ALTER TABLE likes MODIFY COLUMN CONSTRAINT uq_likes UNIQUE(user_id, post_id);
);

-- migrate:down
DROP TABLE likes;
