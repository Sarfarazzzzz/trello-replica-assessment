# Assessment : Rapid Replication (Trello List)

## 1. Reference Component
* **Application:** Trello (Atlassian)
* **Component:** "List" Interface & Card Composer
* **Rationale:** Selected for its complex interaction model (hover states, focus management) and specific visual hierarchy. This component represents the core user action of the application.

## 2. Tech Stack & Tools
* **Core:** React (Vite)
* **Styling:** Tailwind CSS (v3.4)
* **Icons:** Lucide React
* **Automation:** AI-Assisted Logic Generation

## 3. Features Implemented
Beyond the visual replication, I implemented full **CRUD** functionality to demonstrate complete state management:
* **Create:** Dynamic "Add a card" composer with auto-focus interactions.
* **Read:** Pixel-perfect rendering of the list and card elements.
* **Update:** Inline editing (click any card text to rename it).
* **Delete:** Hover over a card to reveal the trash icon for deletion.

## 4. Workflow Efficiency Report
[cite_start]To meet the strict 3-4 hour timeframe[cite: 6], I utilized the following acceleration strategies:

* **Atomic CSS Architecture:** By utilizing Tailwind CSS, I bypassed standard stylesheet creation. [cite_start]This allowed me to iterate on "Visual Fidelity" [cite: 25] in real-time, matching hex codes and spacing directly in the markup without context switching.
* **AI-Augmented Logic:** I employed AI to scaffold the boilerplate for the CRUD state handlers (`handleAdd`, `handleDelete`, `handleEdit`). This reduced time spent on repetitive logic, allowing me to focus my efforts on refining micro-interactions and edge cases (like `Escape` to cancel).
* [cite_start]**Component Isolation:** I built the solution as a single, self-contained module to ensure clean code structure [cite: 14] and rapid debugging.

## 5. Setup & Run
1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start Development Server:**
    ```bash
    npm run dev
    ```
3.  **View Project:**
    Open `http://localhost:####` in your browser.
