# Dotix - Job Scheduler & Automation System

---

## 1. Project Overview

It is a mini **Job Scheduler & Automation System** that allows users to:

- Create background jobs (tasks)
- Store jobs in a database
- Run jobs manually
- Track job status (Pending → Running → Completed)
- Trigger a webhook automatically when a job completes

----

## **Tech Stack**

* **Frontend:** React.js, React Router, Tailwind CSS
* **Backend:** Node.js, Express.js, Sequelize ORM
* **Database:** MySQL (deployed on Railway)
* **Deployment:** Vercel (frontend), Railway (backend)
* **Others:** dotenv for environment variables, fetch API for client-server requests

---

## **Features**

* Create a new job with task name, priority, and optional JSON payload
* List all jobs with filters: **Status** (Pending, Running, Completed) and **Priority** (Low, Medium, High)
* Run jobs directly from the dashboard (status changes from Pending → Running → Completed)
* View detailed job info including payload and timestamps
* Proper loading indicators and error messages on frontend

---

## **Screenshots**

### **Jobs Dashboard**

<img width="960" height="449" alt="image" src="https://github.com/user-attachments/assets/59deb644-8e15-48d4-b2df-620066e0e4c5" />


### **Create Job Page**

![Create Job](./screenshots/create-job.png)

### **Job Detail Page**

![Job Detail](./screenshots/job-detail.png)

> *Screenshots folder: `./screenshots` — add images before submission*

---

## **How to Run Locally**

### **1️⃣ Backend Setup**

1. Clone the repo:

```bash
git clone https://github.com/malleshmudigiri/dotix-jobs-app.git
cd dotix-jobs-app/server
```

2. Install dependencies:

npm install


3. Create a `.env` file in the `backend` folder:

```
DB_HOST=<your-mysql-host>
DB_USER=<your-db-username>
DB_PASSWORD=<your-db-password>
DB_NAME=<your-db-name>
DB_PORT=<your-db-port>
WEBHOOK_URL=<optional-webhook-url>
PORT=3000
```

4. Run backend:

```bash
npm run dev
```

* Runs on `http://localhost:3000`

---

### **2️⃣ Frontend Setup**

1. Navigate to frontend folder:

```bash
cd ../client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `frontend` folder:

```
VITE_BACKEND_URL=http://localhost:3000
```

4. Run frontend:

```bash
npm run dev
```
* Opens at `http://localhost:5173` (Vite default)


---

### **4️⃣ Repository Structure**

```
dotix-jobs-app/
├─ backend/        # Express backend, Sequelize, MySQL
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ config/
│  └─ index.js
├─ frontend/       # React frontend with Tailwind CSS
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ main.jsx
│  └─ vite.config.js
└─ README.md
```

