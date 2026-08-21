# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Backend API configuration

You can point the UI to your backend by setting the environment variable `REACT_APP_API_BASE_URL`.

- Create a `.env` file in the project root (same folder as `package.json`).
- Add your API base URL, for example:

```
REACT_APP_API_BASE_URL=https://your-backend.example.com/api/v1
```

Notes:
- Environment variables must be prefixed with `REACT_APP_` to be exposed to the browser when using Create React App.
- After changing `.env`, stop and restart `npm start` so the variable is picked up.
- If `REACT_APP_API_BASE_URL` is not set, the app defaults to `http://localhost:8090/api/v1` for development.

Where it's used:
- All API calls are centralized in `src/model/apiService.jsx`, which reads `process.env.REACT_APP_API_BASE_URL` and appends the endpoint paths (e.g., `/customers/getAllCustomers`).

If you share your backend base URL(s) and any specific endpoint paths, we can validate them and wire up any differences quickly.

## Backend endpoints used by the UI

All requests are made to `${REACT_APP_API_BASE_URL}<endpoint>` with a Basic Authorization header.

Headers (added automatically in code):
- Authorization: `Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==`
- Content-Type: `application/json` (on POST/PUT/DELETE with body)

Replace {id} with the entity identifier as expected by your backend. Full URLs example when `REACT_APP_API_BASE_URL=http://localhost:8090/api/v1`.

Dashboard

- GET   /dashboard/gatAll       → http://localhost:8090//api/v1/dashboard

Customers
- GET    /customers/getAllCustomers → http://localhost:8090/api/v1/customers/getAllCustomers
- POST   /customers/createNew       → http://localhost:8090/api/v1/customers/createNew
- PUT    /customers/updateCustomer/{id} → http://localhost:8090/api/v1/customers/updateCustomer/{id}
- DELETE /customers/deleteCustomer/{id} → http://localhost:8090/api/v1/customers/deleteCustomer/{id}

Appointments (Booking)
- GET  /booking/getAllBookings → http://localhost:8090/api/v1/booking/getAllBookings
- POST /booking/createNew      → http://localhost:8090/api/v1/booking/createNew

Services
- GET    /services/getAllServices → http://localhost:8090/api/v1/services/getAllServices
- POST   /services/createNew      → http://localhost:8090/api/v1/services/createNew
- PUT    /services/updateService/{id} → http://localhost:8090/api/v1/services/updateService/{id}
- DELETE /services/deleteService/{id} → http://localhost:8090/api/v1/services/deleteService/{id}

Staff
- GET    /staff/getAllStaff → http://localhost:8090/api/v1/staff/getAllStaff
- POST   /staff/createNew   → http://localhost:8090/api/v1/staff/createNew
- PUT    /staff/updateStaff/{id} → http://localhost:8090/api/v1/staff/updateStaff/{id}
- DELETE /staff/deleteStaff/{id} → http://localhost:8090/api/v1/staff/deleteStaff/{id}

Notes
- If your backend requires cookies (e.g., JSESSIONID), let us know. We can enable `credentials: 'include'` on fetch and you’ll need to allow credentials via CORS on the backend.
- If you use a different auth scheme (e.g., Bearer tokens), share the details so we can adjust the headers.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
