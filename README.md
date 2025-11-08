# PathFinder AI 🧠✨

PathFinder AI is a full-stack MERN application designed to make learning any subject simple and visual. It transforms complex topics into interactive, AI-generated mind maps and provides clear, detailed explanations, helping users build a deeper understanding faster.

This project is deployed with a modern stack:

  * **Frontend:** Live on **Vercel**
  * **Backend:** Live on **Render**

### 🟢 Live Demo Links

  * **Frontend (Vercel):** `https://path-finder-plqgbc3i9-khadija-ismails-projects.vercel.app`
  * **Backend (Render):** `https://pathfinder-291l.onrender.com`

-----

## 🎯 SDG Alignment: Goal 4 (Quality Education)

This project is built to directly address **Sustainable Development Goal 4: Quality Education**, which aims to "ensure inclusive and equitable quality education and promote lifelong learning opportunities for all."

PathFinder AI targets this goal by:

  * **Target 4.3 (Equitable Access):** Providing a powerful **Free Tier** (`Access Plan`) that makes the core learning tools available to everyone, regardless of their financial status.
  * **Target 4.5 (Inclusivity):** Catering to diverse learning styles. The highly **visual mind-map format** is ideal for visual learners, while the detailed **text explanations** support traditional learners. This breaks down the "wall of text" that can be a barrier for students with learning disabilities or non-native speakers.
  * **Target 4.4 (Skills for Employment):** By making complex topics accessible, the app empowers self-directed learners to acquire knowledge and skills for employment, technical, and vocational pursuits.

-----

## ✨ Key Features

  * **AI Mind Map Generation:** Enter any topic (e.g., "The French Revolution") and receive an interactive mind map showing the core concepts and their relationships.
  * **Detailed AI Explanations:** Alongside every map, get a comprehensive, beginner-friendly text explanation of the entire topic.
  * **Full User Authentication:** Secure sign-up, login, and protected routes using JSON Web Tokens (JWT).
  * **Save & Load Maps:** Users can save their generated maps and explanations to a personal dashboard and reload them at any time.
  * **Freemium Model:** A clear two-tier system:
      * **Free Plan:** Access to map generation, explanations, and saving a limited number of maps.
      * **Premium Plan:** Unlimited maps, unlimited saves, and access to future advanced AI tools (like "Explain Deeper" or "Translate").
  * **Payment Integration:** A secure and seamless upgrade path using **Paystack** for subscription management.
  * **Fully Responsive:** A mobile-first design that works beautifully on both desktop and mobile devices, including a toggleable sidebar.

-----

## 💻 Tech Stack

This project uses the MERN stack and a modern ecosystem of tools:

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **React.js** | Core UI library |
| | **React Router** | Client-side routing |
| | **Vite** | Frontend tooling (fast build) |
| | **React Flow** | Rendering interactive graphs/mind maps |
| | **Tailwind CSS** | Utility-first CSS styling |
| | **shadcn/ui** | Re-usable, accessible UI components |
| | **Axios** | Making API requests |
| **Backend** | **Node.js** | JavaScript runtime |
| | **Express.js** | Server framework |
| | **MongoDB** | NoSQL database (with Mongoose) |
| | **JWT** | Secure user authentication |
| **AI & Payments** | **Google Gemini API**| Generating map data & explanations |
| | **Paystack** | Handling premium subscriptions |
| **Deployment** | **Vercel** | Hosting the static frontend |
| | **Render** | Hosting the Node.js backend & DB |

-----

## 🚀 Getting Started Locally

To run this project on your local machine:

### Prerequisites

  * Node.js
  * MongoDB Atlas Account (for `MONGO_URI`)
  * Google AI Studio Account (for `GEMINI_API_KEY`)
  * Paystack Account (for `PAYSTACK_SECRET_KEY`)

### 1\. Clone the Repository

```bash
git clone https://github.com/Deeja-ish/pathFinder.git
cd pathfinder-ai
```

### 2\. Backend Setup

```bash
# Navigate to the backend
cd backend

# Install dependencies
npm install

# Create a .env file and add your keys
touch .env
```

Your `backend/.env` file should look like this:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
GEMINI_API_KEY=your_gemini_api_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

### 3\. Frontend Setup

```bash
# Navigate to the frontend from the root
cd frontend

# Install dependencies
npm install

# Vercel handles env variables, but for local dev
# you can create a .env.local file
touch .env.local
```

Your `frontend/.env.local` file should look like this:

```
VITE_API_URL=http://localhost:5001
```

### 4\. Run the Application

1.  **Run the Backend:** (In your `backend` terminal)
    ```bash
    node server.js
    ```
2.  **Run the Frontend:** (In your `frontend` terminal)
    ```bash
    npm run dev
    ```

Open `http://localhost:5173` in your browser.

-----

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.