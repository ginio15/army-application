# Army Registry System / Σύστημα Πρωτοκόλλου

A comprehensive bilingual (Greek/English) document registry application designed for military administrative operations. This application provides a complete offline solution for managing incoming and outgoing documents across different categories including common, signals, and confidential communications.

![Main Interface](https://github.com/user-attachments/assets/b913a8f9-b4dd-4722-98c3-bd053c96be30)

## 🌟 Features

### Document Categories
- **Common Documents** (ΚΟΙΝΑ ΕΓΓΡΑΦΑ)
  - Incoming (ΕΙΣΕΡΧΟΜΕΝΑ)
  - Outgoing (ΕΞΕΡΧΟΜΕΝΑ)
- **Signals** (ΣΗΜΑΤΑ)
  - Incoming (ΕΙΣΕΡΧΟΜΕΝΑ)
  - Outgoing (ΕΞΕΡΧΟΜΕΝΑ)
- **Confidential Documents** (ΑΠΟΡΡΗΤΑ ΕΓΓΡΑΦΑ)
  - Incoming (ΕΙΣΕΡΧΟΜΕΝΑ)
  - Outgoing (ΕΞΕΡΧΟΜΕΝΑ)

### Core Functionality
- ✅ **Bilingual Interface** - Full Greek and English language support
- ✅ **Offline Operation** - Uses IndexedDB for local data storage
- ✅ **Document Registration** - Create new document entries with automatic protocol numbering
- ✅ **Office Management** - Assign documents to multiple offices/departments
- ✅ **Protocol Numbering** - Automatic sequential numbering by category and year
- ✅ **Draft Numbering** - Separate numbering for outgoing documents
- ✅ **Comprehensive Listing** - View all registrations with filtering and pagination
- ✅ **Data Export Ready** - Structured data storage for future export capabilities
- ✅ **Responsive Design** - Works on desktop and mobile devices

### Office/Department Support
The system supports the following Greek military offices:
- 1ο ΓΡΑΦΕΙΟ (1st Office)
- 2ο ΓΡΑΦΕΙΟ (2nd Office)
- 3ο ΓΡΑΦΕΙΟ (3rd Office)
- 4ο ΓΡΑΦΕΙΟ (4th Office)
- ΓΔΥ (General Data Office)
- ΓΡΑΦΕΙΟ ΔΟΣΟΛΗΨΕΩΝ (Transactions Office)
- ΣΥΝΔΕΣΜΟΣ ΤΘ (TH Unit)
- ΤΜΗΜΑ ΠΟΛΙΤΙΚΟΥ ΠΡΟΣ. (Civil Personnel Department)

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ginio15/army-application.git
   cd army-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to access the application.

### Production Build

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🎯 Usage Guide

### Creating a New Registration

1. **Select Document Category**: Choose from the six available document types on the home screen
2. **Fill Document Details**:
   - **Issuer** (ΕΚΔΟΤΗΣ): The originating authority
   - **Reference Number** (φ): Document reference number
   - **Document Date** (ΗΜΕΡ. Φ): Date of the original document
   - **Subject** (ΘΕΜΑ): Brief description of the document content
   - **Entry Date** (ΗΜΕΡ. ΕΙΣΟΔΟΥ): Date of entry into the system
   - **Recipient** (ΠΑΡΑΛΗΠΤΗΣ): For outgoing documents only
   - **SIC Code**: For signals documents only

3. **Select Offices**: Choose one or more offices that should receive/handle the document
4. **Confirm**: Review and save the registration

### Viewing Registrations

- Click **"ΣΥΝΟΛΟ ΕΓΓΡΑΦΩΝ"** (VIEW TOTALS) from the home screen
- Use filters to narrow down results by:
  - **Month** (YYYY-MM format)
  - **Category** (Document type)
- Navigate through pages using pagination controls
- Delete registrations using the delete button (🗑️)

### Language Switching

- Use the **"EN"/"ΕΛ"** button in the top navigation to switch between English and Greek
- All interface elements and labels will update dynamically

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: IndexedDB (browser-native)

### Key Services
- **DatabaseService**: Handles all data operations, protocol numbering, and IndexedDB management
- **TranslationService**: Manages bilingual content and language switching
- **Automatic Protocol Numbering**: 
  - Common/Confidential documents: Start from 40001 each year
  - Signals: Start from 1 each year
  - Draft numbers: Sequential for outgoing documents

### Data Structure
Each registration includes:
- Unique ID and timestamps
- Category classification
- Protocol and draft numbers
- Document metadata (issuer, subject, dates)
- Associated offices
- Soft delete capability

### Browser Storage
- **IndexedDB**: Primary data storage for registrations and counters
- **LocalStorage**: Language preferences and session data
- **Automatic Seeding**: Generates ~500 sample records for testing

## 🛠️ Development

### Project Structure
```
src/
├── components/           # React components
│   ├── HomePage.tsx     # Main category selection
│   ├── RegistrationForm.tsx # Document form
│   ├── OfficeSelection.tsx  # Office assignment
│   ├── TotalRegistrations.tsx # Data listing
│   └── ConfirmationScreen.tsx # Success confirmation
├── services/
│   ├── DatabaseService.ts    # Data management
│   └── TranslationService.ts # i18n support
├── types/
│   └── index.ts         # TypeScript definitions
└── App.tsx              # Main application component
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting with React and TypeScript rules
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🔧 Configuration

### Environment Setup
The application works entirely offline and requires no external APIs or environment variables.

### Customization Points
- **Office Lists**: Modify in `src/types/index.ts`
- **Translation Keys**: Update in `src/services/TranslationService.ts`
- **Protocol Numbering**: Adjust logic in `DatabaseService.ts`
- **Document Categories**: Update type definitions and UI components

## 📱 Browser Support

- **Chrome**: 63+ (IndexedDB support required)
- **Firefox**: 60+
- **Safari**: 13+
- **Edge**: 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain bilingual support for all user-facing text
- Test with sample data before committing
- Ensure responsive design compatibility

## 📋 Known Issues

- Some TypeScript strict mode warnings (non-breaking)
- ESLint warnings for unused variables in development build
- Protocol number counter resets require manual intervention

## 🔮 Future Enhancements

- [ ] Data export to Excel/PDF formats
- [ ] Advanced search and filtering
- [ ] Backup and restore functionality
- [ ] User authentication and permissions
- [ ] Network synchronization capabilities
- [ ] Document attachment support
- [ ] Advanced reporting dashboard

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support and questions:
- Create an issue on GitHub
- Check existing documentation in the code comments
- Review the TypeScript definitions for API details

## 🏗️ Built With

- [React](https://reactjs.org/) - Frontend framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) - Client-side storage

---

**Σύστημα Πρωτοκόλλου** - A modern, offline-capable document registry system built for military administrative efficiency.
