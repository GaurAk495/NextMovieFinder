# Movie Explorer

A modern, responsive web application built with React and Vite for exploring movies and TV shows. This application provides a rich user interface for discovering trending movies, searching through an extensive database of films, and getting detailed information about movies, TV shows, and cast members.

## Features

- 🎬 Browse trending movies and TV shows
- 🔍 Advanced search functionality
- 📱 Responsive design for all devices
- 🎭 Detailed cast information
- 📺 TV show exploration
- 🎥 Movie details including videos and images
- 📊 Genre-based filtering
- ⚡ Fast and optimized performance

## Tech Stack

- **Frontend Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Custom store implementation
- **API Integration:** Custom API clients for movies, TV shows, and people
- **UI Components:** Custom components with Shadcn UI

## Project Structure

```
src/
├── api/          # API client implementations
├── components/   # Reusable UI components
├── dao/          # Data access layer
├── lib/          # Utility functions
├── pages/        # Main page components
└── store/        # State management
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Development

The project uses several modern development tools and practices:

- **HMR (Hot Module Replacement)** for fast development
- **ESLint** for code quality
- **Tailwind CSS** for styling
- **Component-based architecture** for maintainability

## Components

- **MovieCard:** Displays individual movie information
- **TrendingSection:** Shows trending movies and content
- **SearchBar:** Enables movie and TV show search
- **Pagination:** Handles result pagination
- **CastIndividualPage:** Displays detailed cast member information
- **MoviePage:** Comprehensive movie details view
- **TvExplorePage:** TV show browsing and information

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
