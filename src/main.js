// src/main.js
// ============================================
//  APP ENTRY POINT
//  This is the ONLY file loaded by index.html.
//  It imports everything and boots the app.
// ============================================

import { Router } from './modules/router.js';

// Import all page modules (lazy — they're async functions)
import Home       from './pages/Home.js';
import About      from './pages/About.js';
import Users      from './pages/Users.js';
import UserDetail from './pages/UserDetail.js';
import Posts      from './pages/Posts.js';
import NotFound   from './pages/NotFound.js';

// ---- Define Routes ----
// Each route maps a URL path to a page function.
// :id is a dynamic segment — passed as params to the page.

const routes = [
  { path: '/',            page: Home       },
  { path: '/about',       page: About      },
  { path: '/users',       page: Users      },
  { path: '/users/:id',   page: UserDetail },
  { path: '/posts',       page: Posts      },
  { path: '/404',         page: NotFound   }, // catch-all — must be last
];

// ---- Boot the Router ----
const router = new Router(routes);
router.init(); // Renders the page matching the current URL
