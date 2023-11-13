// front end App.js
import AppRouter from './routes/AppRouter';
//import '../src/App.css';

function App() {
  // system login
  return (
    <div className='App'>
      <AppRouter /> {/* Render the Login component here. */}
    </div>
  );
}

export default App;
