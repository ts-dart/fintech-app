import Provider from './context/provider';
import Router from './router';

function App() {
  return (
    <Provider>
      {alert('A instancia permanece inativa quando não esta sendo usada, isso pode causar atraso no carregamento das informações.')}
      {alert('Nome de usuário: admin senha: admin se não quiser fazer cadastro')}
      <Router/>
    </Provider>
  );
}

export default App;
