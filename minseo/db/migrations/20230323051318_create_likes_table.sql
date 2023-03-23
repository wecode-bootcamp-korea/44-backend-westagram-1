-- migrate:up
CREATE TABLE likes
(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  user_id INT NOT NULL ,
  post_id INT NOT NULL ,
  CONSTRAINT likes_users_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT likes_posts_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id),
  CONSTRAINT likes_uesrs_posts_unique UNIQUE KEY(user_id,post_id)
);
-- migrate:down

