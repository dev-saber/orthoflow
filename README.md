# README

# ℹ️ Project Overview

Orthoflow is a comprehensive SaaS platform dedicated to dentists to manage their cabinets. It is built using React for the client-side and Laravel for the server-side. The application manages various aspects of a dental facility, including user authentication, patient management, appointment scheduling, stock inventory, billing, and medical history tracking. The client-side leverages modern React features and libraries, while the server-side utilizes Laravel's robust framework to handle API requests and data management.

# 👨‍💻 Technology Stack & Packages

- **📂 client**: React app
- **📂 server**: Laravel app

| Front-End Technologies | Utility |
| --- | --- |
| ReactJS | JavaScript library for building user interfaces |
| TailwindCSS | CSS framework for styling web interfaces |
| Axios | HTTP client for making API requests |
| Formik | Form library for handling form validations and submissions |
| Framer Motion | Animation library for React components |
| React Router Dom | React package for DOM rendering |
| Yup | JavaScript schema builder for form validation |
| Chart.js | A simple and flexible JavaScript charting library |
| Redux Toolkit | Simplified Redux state management |

| Back-End Technologies | Utility |
| --- | --- |
| Laravel | PHP framework for building the app API |

# 📁 Client Folder Structure

The **`📁client`** folder is structured to organize the React application efficiently. Here is a general overview:

- `📁src`
    - `components` : contains reusable react components.
    - `data`: contains data-related logic and state management.
    - `hooks` : contains custom react hooks.
    - `middlewares` : contains handlers of pages access permissions.
    - `pages` : contains components representing the different routes.

# 💻 **Repository Use Requirements**

### Requirements:

- Node js & npm
- Laravel ≤ 10
- PHP ≤ 8.1
- Composer

### **Setup Instructions**

1. Clone the repository:
    
    ```bash
    git clone https://github.com/dev-saber/orthoflow.git
    cd orthoflow
    ```
    
2. Install client-side dependencies:
    
    ```bash
    cd client
    npm install
    ```
    
3. Install server-side dependencies:
    
    ```bash
    cd server
    composer install
    ```
    
4. Set up environment variables:
    
    Copy `.env.example` to `.env` and configure the necessary environment variables.
    
    ```powershell
    cp .env.example .env
    ```
    
5. Run the development server:
    - For client:
        
        ```bash
        cd client
        npm run dev
        ```
        
    - For server:
        
        ```bash
        cd server
        php artisan serve
        ```