# 📋 Task Manager

> **Full-Stack Task Management Application** built with **Java 21, Spring Boot 3.3.2, Angular, and MySQL**.

Task Manager is a modern web application designed to manage tasks efficiently through a secure and user-friendly interface.

The application provides a complete task management workflow including authentication, task creation, modification, deletion, validation, task status management, database persistence, and REST API communication between the Angular frontend and Spring Boot backend.

---

## 🚀 Project Overview

The goal of this project is to develop a complete **Task Management System** following modern full-stack development practices.

The application is divided into two main parts:

* 🎨 **Frontend** — Angular
* ⚙️ **Backend** — Java 21 + Spring Boot
* 🗄️ **Database** — MySQL
* 🔐 **Security** — Spring Security + JWT
* 🔄 **Database Migration** — Flyway
* 📮 **API Testing** — Postman
* 📊 **Export** — Excel / PDF

---

# 🛠️ Technologies

## Backend

| Technology             | Usage                          |
| ---------------------- | ------------------------------ |
| ☕ Java 21              | Programming language           |
| 🌱 Spring Boot 3.3.2   | Backend framework              |
| 🌐 Spring Web          | REST API                       |
| 🗄️ Spring Data JPA    | Database access                |
| 🔐 Spring Security     | Authentication & authorization |
| ✅ Spring Validation    | Request validation             |
| 🔑 JWT                 | Authentication tokens          |
| 🐬 MySQL               | Relational database            |
| 🔄 Flyway              | Database migrations            |
| 🧩 MapStruct           | DTO mapping                    |
| 🏷️ Lombok             | Reduce boilerplate code        |
| 📊 Apache POI          | Excel export                   |
| 📄 OpenPDF             | PDF generation                 |
| 🧪 JUnit / Spring Test | Testing                        |
| 📮 Postman             | API testing                    |

## Frontend

| Technology  | Usage                  |
| ----------- | ---------------------- |
| 🅰️ Angular | Frontend framework     |
| TypeScript  | Programming language   |
| HTML5       | Application structure  |
| CSS3        | Styling                |
| HTTP Client | REST API communication |

## Database

* MySQL
* MySQL Workbench
* JPA / Hibernate
* Flyway

---

# ✨ Main Features

## 🔐 Authentication & Security

* User registration
* User login
* JWT authentication
* Secure REST APIs
* Password encryption
* Role-based authorization
* Protected routes

## 📋 Task Management

Users can:

* Create a task
* Display tasks
* Update a task
* Delete a task
* Change task status
* Set task priority
* Set a due date
* Add task descriptions
* Filter tasks
* Search tasks

## 📊 Dashboard

The dashboard provides an overview of:

* Total tasks
* Pending tasks
* Tasks in progress
* Completed tasks
* High-priority tasks
* Task statistics

## ✅ Validation

The application uses **Spring Validation** to validate incoming requests.

Example validations:

* Required fields
* Minimum / maximum length
* Valid email format
* Valid task title
* Valid task status
* Valid priority
* Valid dates

Example:

```java
@NotBlank(message = "Task title is required")
@Size(min = 3, max = 100)
private String title;
```

---

# 🏗️ Application Architecture

The project follows a layered architecture:

```text
Angular Frontend
       │
       │ HTTP / REST API
       ▼
Spring Boot Backend
       │
       ├── Controller
       │
       ├── Service
       │
       ├── Repository
       │
       ├── Entity
       │
       ├── DTO
       │
       ├── Mapper
       │
       └── Security
              │
              ▼
           MySQL
```

---

# 📂 Backend Architecture

Recommended backend structure:

```text
src/
└── main/
    ├── java/
    │   └── com/tasks/
    │       ├── config/
    │       ├── controller/
    │       ├── dto/
    │       ├── entity/
    │       ├── exception/
    │       ├── mapper/
    │       ├── repository/
    │       ├── security/
    │       ├── service/
    │       └── TaskManagerApplication.java
    │
    └── resources/
        ├── db/
        │   └── migration/
        ├── application.properties
        └── application.yml
```

---

# 🗃️ Database

The application uses **MySQL** as its relational database.

Database management and visualization can be done using **MySQL Workbench**.

Example database:

```text
task_manager
│
├── users
│
├── roles
│
└── tasks
```

Example Task entity:

```text
Task
├── id
├── title
├── description
├── status
├── priority
├── dueDate
├── createdAt
├── updatedAt
└── user
```

---

# 🔄 Database Migration with Flyway

Flyway is used to manage database schema changes.

Migration files can be organized as:

```text
db/
└── migration/
    ├── V1__create_users_table.sql
    ├── V2__create_tasks_table.sql
    ├── V3__create_roles_table.sql
    └── V4__insert_initial_data.sql
```

This makes database changes:

* Versioned
* Reproducible
* Trackable
* Easier to deploy

---

# 🔐 JWT Authentication Flow

The authentication process follows this workflow:

```text
User
 │
 │ Login
 ▼
Angular
 │
 │ POST /api/auth/login
 ▼
Spring Security
 │
 │ Validate credentials
 ▼
Authentication Service
 │
 │ Generate JWT
 ▼
Angular
 │
 │ Store token
 ▼
Protected API
```

For protected requests:

```text
Angular
   │
   │ Authorization: Bearer <JWT>
   ▼
Spring Security
   │
   │ Validate JWT
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Database
```

---

# 🌐 REST API

The backend exposes REST APIs consumed by the Angular frontend.

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

## Tasks

```http
GET    /api/tasks
GET    /api/tasks/{id}
POST   /api/tasks
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}
```

## Example Request

```json
{
  "title": "Complete Spring Boot API",
  "description": "Implement the task management REST API",
  "status": "TODO",
  "priority": "HIGH",
  "dueDate": "2026-08-30"
}
```

---

# 📮 API Testing with Postman

The REST APIs can be tested using **Postman**.

Recommended Postman collection:

```text
Task Manager API
│
├── Authentication
│   ├── Register
│   └── Login
│
├── Tasks
│   ├── Get All Tasks
│   ├── Get Task By ID
│   ├── Create Task
│   ├── Update Task
│   └── Delete Task
│
└── Users
    ├── Get Users
    └── Get User By ID
```

You can add the exported Postman collection to the repository:

```text
postman/
└── Task-Manager-API.postman_collection.json
```

---

# 📸 Screenshots

## 🔐 Login

<img width="935" height="509" alt="Inscription" src="https://github.com/user-attachments/assets/532288d0-f122-446f-8fba-83a982b69f80" />

## 📊 Dashboard

<img width="944" height="517" alt="Dashboard" src="https://github.com/user-attachments/assets/a2539496-f056-4d1f-988f-f27b083ac0d6" />

## 📋 Task Management

<img width="947" height="508" alt="Tareas" src="https://github.com/user-attachments/assets/7497c6aa-2ea6-4adb-9092-5749f678238d" />


## 📁 Project Management

<img width="944" height="506" alt="Proyectos" src="https://github.com/user-attachments/assets/428cf8ea-30aa-4a07-990e-a3c2addf64fa" />

## 📅 Calendar

<img width="940" height="514" alt="Calendario" src="https://github.com/user-attachments/assets/e70ef6ed-6ce9-4601-b2e5-b0c13b547b16" />

## 🔔 Notifications

<img width="948" height="508" alt="Notification" src="https://github.com/user-attachments/assets/76aacf21-910b-4697-b330-9826872c8fee" />

> Replace these image paths with your real screenshots.

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/task-manager.git
```

```bash
cd task-manager
```

---

# 2️⃣ Configure MySQL

Create the database using MySQL Workbench:

```sql
CREATE DATABASE task_manager;
```

Then configure your Spring Boot application.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/task_manager
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=validate

spring.flyway.enabled=true
```

> Never commit real database passwords or JWT secrets to GitHub.

---

# 3️⃣ Start the Backend

Go to the backend directory:

```bash
cd task-manager-BackEnd
```

Run the application with Maven:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

The backend will be available at:

```text
http://localhost:8080
```

---

# 4️⃣ Start the Angular Frontend

Go to the frontend directory:

```bash
cd task-manager-FrontEnd
```

Install dependencies:

```bash
npm install
```

Start Angular:

```bash
ng serve
```

The frontend will normally be available at:

```text
http://localhost:4200
```

---

# 🔗 Frontend / Backend Communication

Angular communicates with Spring Boot through HTTP requests.

```text
Angular
http://localhost:4200
       │
       │ HTTP
       ▼
Spring Boot
http://localhost:8080
       │
       ▼
MySQL
```

Example Angular service:

```typescript
getTasks() {
  return this.http.get<Task[]>('http://localhost:8080/api/tasks');
}
```

---

# 🧪 Validation & Error Handling

The backend uses:

```text
spring-boot-starter-validation
```

to validate API requests.

The application can handle common errors such as:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

A centralized exception handling mechanism can be implemented using:

```java
@RestControllerAdvice
```

---

# 📊 Export Features

The backend includes:

## Excel Export

Apache POI is used to generate Excel documents.

```text
Task List
    ↓
Apache POI
    ↓
Excel (.xlsx)
```

## PDF Export

OpenPDF is used for PDF generation.

```text
Task List
    ↓
OpenPDF
    ↓
PDF (.pdf)
```

---

# 🧩 Maven Dependencies

Main dependencies used by the backend:

```xml
Spring Web
Spring Data JPA
Spring Security
Spring Validation
MySQL Connector
Flyway
Lombok
MapStruct
Apache POI
OpenPDF
JJWT
Spring Boot Test
Spring Security Test
```

---

# 🛡️ Security

Security is based on:

* Spring Security
* JWT
* Password hashing
* Authentication filters
* Authorization rules
* Protected endpoints

Example:

```text
Authentication
       ↓
JWT Token
       ↓
Authorization Header
       ↓
Spring Security Filter
       ↓
Protected Controller
```

---

# 🧪 Testing

The project includes Spring Boot testing dependencies.

Run tests with:

```bash
mvn test
```

Or on Windows:

```bash
mvnw.cmd test
```

---

# 📦 Build the Backend

Create the production JAR:

```bash
mvn clean package
```

Then run:

```bash
java -jar target/task-manager-BackEnd-0.0.1-SNAPSHOT.jar
```

---

# 🌱 Git Workflow

Recommended workflow for this project:

```bash
git status
```

```bash
git add .
```

```bash
git commit -m "feat: implement task management application"
```

```bash
git push origin main
```

For future features:

```bash
git checkout -b feature/task-management
```

```bash
git add .
git commit -m "feat: add task CRUD operations"
git push origin feature/task-management
```

---

# 📁 Complete Project Structure

```text
task-manager/
│
├── task-manager-BackEnd/
│   ├── src/
│   ├── pom.xml
│   └── README.md
│
├── task-manager-FrontEnd/
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── README.md
│
├── postman/
│   └── Task-Manager-API.postman_collection.json
│
├── screenshots/
│   ├── login.png
│   ├── dashboard.png
│   ├── tasks.png
│   ├── task-form.png
│   ├── users.png
│   └── postman.png
│
├── .gitignore
└── README.md
```

---

# 🚀 Development Roadmap

* [x] Spring Boot backend initialization
* [x] Java 21 configuration
* [x] MySQL database configuration
* [x] Spring Data JPA
* [x] Spring Validation
* [x] Spring Security
* [x] JWT authentication
* [x] Flyway migrations
* [x] Task CRUD API
* [x] Angular frontend
* [x] REST API integration
* [x] Postman API testing
* [x] Excel export
* [x] PDF export
* [ ] Advanced dashboard
* [ ] Advanced task filtering
* [ ] Notifications
* [ ] Docker deployment
* [ ] CI/CD

---

# 🎯 Learning Objectives

This project demonstrates practical knowledge of:

* Full-Stack Web Development
* Java 21
* Spring Boot
* REST API development
* Spring Data JPA
* Hibernate
* Spring Security
* JWT Authentication
* Bean Validation
* DTO architecture
* MapStruct
* MySQL
* Flyway migrations
* Angular
* HTTP communication
* Postman
* Git & GitHub
* Excel/PDF document generation

---

# 👨‍💻 Author

**Mohamed Chaabi**

Full-Stack Developer

### Technologies

```text
Java 21
Spring Boot
Spring Security
Angular
TypeScript
MySQL
JPA / Hibernate
JWT
Flyway
Postman
Git / GitHub
```

---

# 📄 License

This project is developed for educational and portfolio purposes.
