# EndlessBoard

EndlessBoard is a Progressive Web App (PWA) for creating, sharing, and searching custom climbing wall routes. Users can register, log in, build their own boulder problems, like others' routes, and manage their own profile and creations. The app is built with Angular, Firebase, and Three.js for interactive wall visualization.

## Features

- User registration and authentication (Google Firebase)
- Build custom climbing routes with an interactive wall editor (Three.js)
- Search and filter public routes by title and grade
- Like/unlike routes (with offline support via IndexedDB)
- User profile page to manage your routes and update your username
- Responsive, mobile-friendly UI
- PWA support: installable, offline-ready, and fast

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Angular CLI](https://angular.dev/tools/cli) (`npm install -g @angular/cli`)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/gyenesmate/endlessboard.git
   cd endlessboard/endless-board-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```
   Open [http://localhost:4200/](http://localhost:4200/) in your browser.

### Building for Production

```sh
npm run build
```
The build output will be in the `dist/` directory.

### Running Unit Tests

```sh
npm test
```

## Project Structure

- `endless-board-app/src/app` – Main Angular application code
- `endless-board-app/src/app/shared` – Shared components, models, and utilities
- `endless-board-app/src/app/services` – Angular services (authentication, user, route, IndexedDB)
- `endless-board-app/src/app/pages` – Feature pages (login, register, profile, builder, search)
- `endless-board-app/public` – Static assets and PWA manifest

## Usage

- Register or log in with your email
- Build a new route using the route builder
- Search for and like routes created by others
- Manage your own routes and profile

## Contributing

Contributions are welcome! Please fork the repository and submit a merge request.

## License

This project is for educational purposes.

---

For more details, see `endless-board-app/README.md`.