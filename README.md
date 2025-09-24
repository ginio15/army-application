# Complete Offline Registry Application

## Overview

This project implements a bilingual (Greek/English) offline registry system designed for efficient management of various document types used in the Hellenic Armed Forces. While the current implementation is a web-based prototype, it is built with the architecture in mind for a future portable Windows desktop application. The system handles different categories of incoming and outgoing registrations, each with specific data fields, and features a robust numbering system for protocols and drafts.

## Features

*   **Bilingual Interface**: Supports both Greek and English languages throughout the application.
*   **Dynamic Registration Forms**: Tailored forms for six distinct categories:
    *   ΚΟΙΝΑ ΕΙΣΕΡΧΟΜΕΝΑ / Common Incoming
    *   ΚΟΙΝΑ ΕΞΕΡΧΟΜΕΝΑ / Common Outgoing
    *   ΣΗΜΑΤΑ ΕΙΣΕΡΧΟΜΕΝΑ / Signals Incoming
    *   ΣΗΜΑΤΑ ΕΞΕΡΧΟΜΕΝΑ / Signals Outgoing
    *   ΑΠΟΡΡΗΤΑ ΕΙΣΕΡΧΟΜΕΝΑ / Confidential Incoming
    *   ΑΠΟΡΡΗΤΑ ΕΞΕΡΧΟΜΕΝΑ / Confidential Outgoing
*   **Complex Numbering System**:
    *   **Protocol Numbers**: Auto-generated based on category, resetting annually.
    *   **Draft Numbers**: Auto-generated for outgoing entries, incrementing continuously.
*   **Office Selection**: Multi-select functionality for assigning registrations to various offices.
*   **Total Registrations View**: A comprehensive page to view all entries, apply filters, and pagination (100 entries per page).
*   **Soft Delete**: Registrations can be soft-deleted, preserving an audit trail and their assigned numbers.
*   **Data Integrity**: Logs creation timestamps and user information for all entries; no editing of past registrations.
*   **Intuitive UI/UX**: Professional blue-gray color palette, large accessible buttons, inline validation, and auto-filled date fields.
*   **Offline Capability**: Utilizes IndexedDB for client-side data persistence, ensuring full offline functionality.

## Technical Stack

### Frontend
*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
*   **IndexedDB**: For client-side, offline data persistence.

### Backend (Planned for Desktop Version)
*   **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+.
*   **SQLite**: A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.

### Packaging (Planned for Desktop Version)
*   **PyInstaller**: To package Python applications as stand-alone executables.
*   **Electron**: An alternative for packaging the web application into a desktop executable.

## Getting Started

To get a local copy up and running for development, follow these steps.

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd complete-offline-registry-application
    ```
2.  Install NPM dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

    The application will open in your default browser at `http://127.0.0.1:5173` (or a similar port).

## Usage


1.  **Home Panel**: Select a registration category from the main screen.
2.  **Registration Form**: Fill in the required details. Fields are dynamic based on the selected category. Dates are auto-filled to today's date.
3.  **Office Selection**: Choose one or more offices to assign the registration to.
4.  **Confirmation**: Review the generated Protocol and/or Draft numbers and confirm the registration.
5.  **View Totals**: Navigate to the "Total Registrations" page to view all entries, apply filters, and manage soft deletions.
6.  **Language Toggle**: Use the button in the header to switch between Greek and English.

## Deployment

The current web version of this application is deployed on Bolt Hosting. You can access it here: [https://complete-offline-reg-95ft.bolt.host](https://complete-offline-reg-95ft.bolt.host)

## Future Development (Desktop Application)

The ultimate goal for this project is a portable Windows 10 Enterprise application that runs without admin rights. This would involve:

*   **Backend Integration**: Implementing the FastAPI backend with an SQLite database (WAL mode enabled).
*   **Data Storage**: Ensuring data is stored at `C:\RegistryApp\data\app.db` with a fallback to the current working directory.
*   **Packaging**: Using PyInstaller or Electron to create a single, self-contained executable (`RegistryApp.exe`).
*   **Auto-launch**: Configuring the application to auto-launch a browser to `http://127.0.0.1:8733` on startup.
*   **Archiving**: Implementing the monthly archiving feature to move old records to `/archive/YYYY-MM.db`.

## License

This project is open-source and available under the MIT License. See the `LICENSE` file for more details.
