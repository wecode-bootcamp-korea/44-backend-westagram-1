-- migrate:up
CREATE TABLE likes (
  id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY UNIQUE,
  user_id INT NOT NULL REFERENCES users(id),
  post_id INT  NOT NULL REFERENCES posts(id),
  create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT likes_user_id FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT likes_post_id FOREIGN KEY (post_id) REFERENCES posts(id),
  CONSTRAINT likes_ukey_user_id_post_id UNIQUE (user_id, post_id)

);

-- migrate:down
DROP TABLE likes;
