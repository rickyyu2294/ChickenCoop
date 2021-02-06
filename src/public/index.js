'use strict';

import Header from './components/header.js'

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <button onClick={() => this.setState({ liked: true }) }>
          Like
        </button>
      </div>
      
    );
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<Home />, domContainer);