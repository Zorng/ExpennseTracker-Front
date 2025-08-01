# Expense Tracker Frontend

A modern, responsive expense tracking application built with React and Vite. Track your expenses, categorize spending, and visualize your financial data with an intuitive dashboard.

## 🚀 Features

- **User Authentication**: Secure login/register with email verification
- **Dashboard**: Visual overview with charts and spending analytics
- **Expense Management**: Create, edit, and delete expense records
- **Categories**: Organize expenses with custom categories and colors
- **Multi-Currency**: Support for USD and KHR (Cambodian Riel)
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Quick Add**: Fast expense entry directly from dashboard
- **Filtering & Search**: Find specific expenses with advanced filters
- **Pagination**: Efficient browsing of large expense lists

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Charts**: Custom SVG-based pie charts
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API server (see backend repository)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ExpennseTracker-Front
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## 🌍 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000/api` | Yes |

### Environment Variable Examples

**Development:**
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

**Production:**
```env
VITE_API_BASE_URL=https://your-backend-api.com/api
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.jsx      # Navigation component
├── features/           # Feature-based modules
│   ├── account/        # Account management features
│   ├── categories/     # Category management
│   ├── dashboard/      # Dashboard components and hooks
│   └── records/        # Expense record management
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Records.jsx     # Records list
│   ├── Login.jsx       # Authentication pages
│   └── ...
├── utils/              # Utility functions
│   └── axios.js        # HTTP client configuration
├── AuthContext.jsx     # Authentication context
├── App.jsx            # Main app component
└── main.jsx           # App entry point
```

## 🔐 Authentication Flow

1. **Registration**: Users register with email verification
2. **Login**: JWT-based authentication
3. **Token Management**: Automatic token handling via Axios interceptors
4. **Protected Routes**: Automatic redirection for unauthenticated users

## 📱 Key Components

### Dashboard
- Monthly expense overview with pie charts
- Quick add expense functionality
- Currency toggle (USD/KHR)
- Top 5 expenses display

### Records Management
- CRUD operations for expense records
- Advanced filtering and search
- Pagination support
- Category-based organization

### User Account
- Email and password updates
- Account deletion
- Email verification management

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set `VITE_API_BASE_URL` in your deployment platform's environment variables.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the repository or contact the development team.

---

**Note**: This is the frontend application. Make sure your backend API server is running and properly configured for the application to function correctly.
