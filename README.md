Modern JavaScript SPA
This is a frontend development project where I took a plain old vanilla JavaScript app and refactored it into a proper modern Single Page Application. The goal was to learn how real-world JS projects are structured — with modules, routing, async data fetching, testing, and a build tool.


What This Project Does
The app loads data from a public API (JSONPlaceholder) and displays users and their posts. You can navigate between pages without any full page reload — it feels like a real app. Everything is built with plain JavaScript, no React or Vue involved.


What I Learned Building This
ES6 Modules — Instead of dumping everything into one giant script file, the code is split into separate files. Each file handles one thing — routing, API calls, utility functions, or a single page. They talk to each other using import and export.
Client-Side Routing — When you click a link, the browser doesn't reload the page. Instead, JavaScript catches that click, updates the URL using the History API, and swaps only the content area. I built this router from scratch using a Router class.
Async / Await — All the data fetching uses async/await instead of messy .then() chains. I also added proper error handling so the app doesn't just crash if the network is slow or something fails. There's even a timeout after 8 seconds and an automatic retry if the first request fails.
Jest Unit Tests — The utility functions (things like truncate, escapeHtml, getInitials) are all tested using Jest. There are 19 tests total. You can run them anytime and see them all pass.
Vite — This is the build tool. It starts a super fast dev server while you're coding and can bundle everything into optimised files ready for deployment.


Folder Structure
modern-spa/
├── index.html              ← The one HTML file. Just a shell.
├── src/
│   ├── main.js             ← Where the app starts
│   ├── modules/
│   │   ├── router.js       ← Handles page navigation
│   │   └── api.js          ← All the fetch/API logic
│   ├── pages/              ← Each page is its own file
│   ├── utils/
│   │   └── helpers.js      ← Small reusable functions
│   └── styles/
│       └── main.css        ← All the styling
└── tests/
    └── helpers.test.js     ← Unit tests for helper functions


How to Run It
Make sure you have Node.js installed. Then open a terminal in this folder and run:
bash# Install everything first
npm install


# Start the dev server
npm run dev
Open http://localhost:3000 in your browser and you're good to go.
bash# Run the tests
npm test


# Build for production
npm run build


Tech Used

JavaScript (ES6+)
Vite
Jest
JSONPlaceholder (free fake REST API for testing)
