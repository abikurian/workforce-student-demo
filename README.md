# QuickStaff Campus — Two-Sided Event Staffing Platform
### "Wizard of Oz" Interactive Prototype for Academic Demonstrations

A split-screen, high-fidelity interactive prototype created to demonstrate a two-sided event staffing marketplace to university professors. The app demonstrates instantaneous bidirectional state synchronization between an **Employer Web Console** (Left Panel) and a **Simulated Student Worker Mobile App** (Right Panel) without requiring a backend.

---

## 🌟 Key Features

### 1. Global State Management (React Top-Level Architecture)
- Both views are synchronized instantaneously in React state inside [`src/App.jsx`](file:///d:/Project/workforce-student-demo/src/App.jsx).
- **`gigs`**: Initialized with default `{ id: 1, title: 'Catering Staff', wage: '₹500/shift', status: 'open' }`.
- **`applications`**: Tracks candidate shift applications `{ gigId, status: 'applied' | 'accepted' }`.

### 2. Left Panel: Employer Web Console (Desktop Admin Dashboard)
- **Palette**: Modern Slate & Indigo theme.
- **KPI Summary**: Live metric cards showing Total Gigs, Action Needed (Pending Applicants), and Filled Shifts.
- **Post a Gig Form**: 
  - Dynamic input for Job Title and Wage (₹).
  - 1-click demo template presets (e.g. *Stage Setup Crew ₹800*, *Event Photography ₹1,500*, *Registration Desk ₹600*).
  - Submit button broadcasts new gigs directly into the worker mobile feed.
- **Active Gigs Table**:
  - Lists all posted gigs with status badges (`Open` / `Filled`).
  - Displays animated notification badges when a worker applies.
  - Green **`[Accept Applicant]`** button instantly dispatches and locks in the candidate.

### 3. Right Panel: Worker Mobile App Simulator
- Rendered in a fixed 380px container styled with rounded corners (`rounded-[48px]`), physical side buttons, realistic notch/dynamic island, and status bar (5G, battery, clock).
- **Live Feed**: Smooth CSS slide-in transitions (`animate-slide-in`) whenever new jobs are posted.
- **Interactive Shift Actions**:
  - Unapplied gigs display a blue **`[Apply Now]`** button.
  - Clicking changes the button into a disabled **`[Applied - Awaiting Employer Acceptance]`** state.
  - When the employer accepts the applicant on the left, the card immediately updates to a glowing green **`[Shift Confirmed - GPS Check-in Ready]`** button.
- **Simulated GPS Geofence Check-in**:
  - Clicking the confirmed shift button launches a simulated location check-in modal demonstrating campus auditorium geofence verification and attendance logging.

### 4. Demo Polish
- Prominent Indian Rupee (**₹**) typography throughout.
- Real-time toast activity ticker displaying live event updates.
- 1-Click Presentation Run button for smooth classroom presentations.
- Reset Demo button to instantly revert to the initial state.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Run Locally
```bash
# Install dependencies (if not already installed)
npm install

# Start Vite development server
npm run dev
```

Then open the local URL (typically `http://localhost:5173`) in your browser to view the split-screen prototype.

### Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in `/dist`.

