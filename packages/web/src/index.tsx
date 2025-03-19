import { createRoot } from 'react-dom/client';
import { App } from './App';

if (module.hot) {
  // accept all the modules which need to updated for fast refresh
  module.hot.accept();
}
const domNode = document.getElementById('root');
const root = createRoot(domNode!);
root.render(<App />);
