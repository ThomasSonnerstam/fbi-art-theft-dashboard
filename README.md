# React + TypeScript + Vite

This app is a simple React application that displays a list of wanted persons from the FBI's Most Wanted API.

## How to run the app

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run dev` to start the development server
4. Add a .env file in the root of the project with the following variables:

```
VITE_FBI_API_KEY=your_api_key
```

## Notes

This app uses TanStack Query to fetch the data from the FBI's Most Wanted API and Mantine for the UI.
TanStack Query is a powerful library for data fetching, caching, and state management in React applications.
