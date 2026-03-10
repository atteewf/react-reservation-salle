# React Room Booking App

## Preview

> _(Add screenshots here)_

## Description

A full-featured **Room Booking App** built with **React**, demonstrating:

- Role-based access control (**Admin** / **User**)
- Global state management with **Context API**
- Persistent data with **localStorage**
- Monthly booking table with **conflict detection**
- Responsive design — weekly view on mobile
- Unit tests with **Jest + React Testing Library**

This project is designed to be **readable and understandable by recruiters** while showing practical React skills across state management, component architecture, and testing.

---

## Features

- **User login**: Connect with an existing account or create a new one
- **Room booking**: Reserve a room by slot — morning, afternoon, or full day
- **Conflict detection**: Displays an error if a slot is already taken
- **Monthly table**: Color-coded overview 🟢 free / 🔴 reserved, with tooltip showing the booker's name
- **Mobile view**: Weekly navigation instead of full month
- **Admin panel**: Full CRUD for users, rooms and reservations

---

## Tech Stack

- React 19
- Hooks: `useState`, `useEffect`, `useContext`
- Context API for global state
- localStorage for data persistence
- Plain CSS with custom properties for theming and responsive layout
- Jest + React Testing Library for unit tests

---

## Folder Structure

```
src/
├── Admin/
│   ├── AdminPanel.jsx
│   ├── LoginAdmin.jsx
│   ├── SupReservation.jsx
│   ├── SupSalle.jsx
│   └── SupUtilisateur.jsx
├── components/
│   └── Tableau.jsx
├── Context/
│   └── ReservationContext.jsx
├── reservation/
│   ├── ReservationForm.jsx
│   └── NewUtilisateur.jsx
├── styles/
│   └── App.css
├── __tests__/
└── App.jsx
```

---

## How to Run

1. Clone the repository:

```bash
git clone https://github.com/atteewf/reservationsalle.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

Open http://localhost:3000 in your browser.

---

## Demo Credentials

| Role  | Username                             | Password |
| ----- | ------------------------------------ | -------- |
| Admin | `Admin`                              | `1234`   |
| User  | _(create an account on first visit)_ | —        |

---

## Tests

```bash
npm test
```

| File                 | Tests | What is covered                                              |
| -------------------- | ----- | ------------------------------------------------------------ |
| `ReservationContext` | 3     | Add reservation, cascade delete on room removal, slot update |
| `ReservationForm`    | 3     | Empty fields, successful booking, morning slot conflict      |
| `getSemaine`         | 2     | Returns 7 days, handles month change                         |
| `LoginAdmin`         | 2     | Valid credentials, invalid credentials                       |

---

## Future Improvements

- Replace localStorage with a real REST API or Firebase
- Add JWT-based authentication
- Handle leap years in the booking table
- Email notifications on new reservations

---

## Author

**Atteewf** – React Developer Portfolio Ready

---

## Contact

LinkedIn: https://www.linkedin.com/in/seb-oll-0188133a4/  
Email: ateeew@gmail.com
