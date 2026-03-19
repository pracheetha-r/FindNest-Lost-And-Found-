# FindNest: Project Documentation & Overview

**FindNest** is an intelligent, digital lost-and-found registry designed to seamlessly and securely reunite individuals with their misplaced belongings. 

---

## 1. Page Breakdown & Functions

1. **Landing Page (`/`)**
   - **Function**: The gateway to the application. It provides an overview of the platform's features (such as intelligent matching and secure claims) and includes the Login/Sign-up authentication forms.
2. **Dashboard (`/dashboard`)**
   - **Function**: The user's main control center. It displays vital statistics (Items Reported, Match Rates), a feed of recent platform activity, and quick-action buttons to instantly report or browse items.
3. **Report Item (`/report`)**
   - **Function**: A comprehensive form where users can log either a "Lost" or "Found" item. It captures images, categories, dates, specific locations, and descriptive details needed for the matching engine.
4. **Browse Items (`/browse`)**
   - **Function**: A searchable, filterable directory of all active registry items. Users can filter by status (Lost/Found), Category, or sort by Newest/Match Score.
5. **Match Details (`/match/:id`)**
   - **Function**: The analytical core. When a user views an item, the system calculates a **Similarity Index (Match %)** comparing the item's parameters to what the user reported. It provides a diagnostic checklist (location, date, category) to confirm the match.
6. **Claim Item (`/claim`)**
   - **Function**: A rigorous security check. Before retrieving an item, users must answer specific verification questions (e.g., "What was inside the bag?") and upload proof of identity to prevent fraudulent claims.
7. **Chat / Secure Comms (`/chat`)**
   - **Function**: A built-in messaging interface that allows the claimant to communicate directly with the finder or campus security. It includes a "Handover Status" tracker to manage the physical retrieval of the item.

---

## 2. Advantages & Unique Selling Points (How it Stands Out)

Traditional lost-and-found systems are either physical cardboard boxes or chaotic, unorganized social media groups. FindNest stands out by bringing enterprise-level organization to the process:

- **AI-Powered Matching**: Instead of endlessly scrolling, the system automatically correlates lost reports with found reports and calculates a Match Score.
- **Robust Security**: The integrated Claim Verification process ensures items are returned to their *actual* owners, significantly reducing theft or opportunistic claims.
- **End-to-End Workflow**: It handles the entire lifecycle: Reporting $\rightarrow$ Matching $\rightarrow$ Verification $\rightarrow$ Handover Coordination.
- **Classic Chic Design**: The highly professional, minimal UI builds immense trust. It feels like a secure registry rather than an informal bulletin board.

---

## 3. Detailed Tech Stack

Currently, the application is built as a highly responsive, modern Front-end SPA (Single Page Application):

- **Core Library**: **React 19**
- **Build Tool**: **Vite 7.2.4** (Extremely fast hot-module replacement and optimized builds).
- **Routing**: **React Router v7** (Declarative routing for all the application pages).
- **Styling**: **Tailwind CSS v4** (Utility-first CSS framework configured for a formal "slate" aesthetic).
- **Icons**: **Lucide-React** (Crisp, highly professional vector icons that replaced all legacy emojis).
- **Language**: **TypeScript** (Ensures strict type-safety, reducing runtime bugs).

---

## 4. Future Scope & Potential Additions

To elevate FindNest from a front-end prototype to a production-ready system, the following features can be added:

### Backend & Database Integration
- **Persistent Storage**: Integrate Node.js/Express with a PostgreSQL or MongoDB database to store users, items, and chat histories securely.
- **WebSockets**: Implement real-time WebSocket connections (e.g., Socket.io) for live chatting on the Secure Comms page.

### Advanced Machine Learning
- **Image Recognition**: Automatically analyze uploaded photos to identify the item's color, brand, and type to pre-fill the report form.
- **Automated Alerts**: Send an SMS or Push Notification to a user immediately when an item matching their "Lost" report enters the system.

### Page Enhancements
- **Interactive Maps (Geolocation)**: Integate Google Maps or Mapbox API on the `Report Item` and `Match Analysis` pages so users can drop exact pins where items were lost or found.
- **Admin & Security Portal**: A completely separate dashboard for Campus Security or Administrators to oversee all active claims, intervene in disputes, and securely finalize handovers via QR Code scanning.
