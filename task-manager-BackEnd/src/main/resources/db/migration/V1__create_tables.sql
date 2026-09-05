-- 1. Table Users
CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(50) NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       role VARCHAR(20) NOT NULL DEFAULT 'DEVELOPER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- Mot de passe en clair pour tous : "Password123!"
-- Hash BCrypt correspondant (généré une seule fois, valable pour tous les inserts) :
-- $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

INSERT INTO users (name, email, password, role, date_creation) VALUES
                                                                   ('Alice Manager', 'alice.manager@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'MANAGER', NOW()),
                                                                   ('Bruno Manager', 'bruno.manager@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'MANAGER', NOW()),
                                                                   ('Carla Developer', 'carla.dev@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'DEVELOPER', NOW()),
                                                                   ('David Developer', 'david.dev@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'DEVELOPER', NOW()),
                                                                   ('Eva User', 'eva.user@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', NOW()),
                                                                   ('Farid User', 'farid.user@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER', NOW());

-- 2. Table Projects
CREATE TABLE projects (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          title VARCHAR(100) NOT NULL,
                          description VARCHAR(500),
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          user_id BIGINT NOT NULL,
                          CONSTRAINT fk_projects_owner FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Table Tasks
CREATE TABLE tasks (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       title VARCHAR(150) NOT NULL,
                       description TEXT,
                       status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
                       due_date DATE,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       project_id BIGINT NOT NULL,
                       assigned_user_id BIGINT,
                       CONSTRAINT fk_tasks_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
                       CONSTRAINT fk_tasks_assigned_user FOREIGN KEY (assigned_user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Table Comments
CREATE TABLE comments (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          content TEXT NOT NULL,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          task_id BIGINT NOT NULL,
                          user_id BIGINT NOT NULL,
                          CONSTRAINT fk_comments_task FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
                          CONSTRAINT fk_comments_author FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;