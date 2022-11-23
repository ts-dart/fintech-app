import Provider from './context/provider';
import Router from './router';

function App() {
  return (
    <Provider>
      <Router/>
    </Provider>
  );
}

export default App;
