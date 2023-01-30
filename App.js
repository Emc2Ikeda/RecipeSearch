import React from 'react';
import Search from './components/Search';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Search />
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <h1>Grocery Search</h1>
//       <header className="App-header">

//         {/* todo: use API URL in project */}
//         <a
//           className="API-link"
//           href="https://www.edamam.com/#!/Recipe_Search/get_api_recipes_v2"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
