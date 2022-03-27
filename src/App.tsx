// import React from 'react';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <div className="Banner"/>
//       <header className="App-header">
//         <div className="Reminder-square"/>
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// const greet = require("greet-by-time");
// const hour = new Date().getHours();
// greet.morningGreetings = ["Good morning", "Rise and shine"];
// greet.dayGreetings = ["Good afternoon", "Hello", "Hi"];
// greet.eveningGreetings = ["Good evening", "Good night"];
// export default App;

import React from "react";
import { connect } from "react-redux";
import { rootState } from "./store/reducers";
import "./App.css";
import { remindersState } from "./store/reducers/remindersReducer";
import { ReminderActionTypes } from "./store/actions/remindersActions";
import { ThunkDispatch } from "redux-thunk";
import { listState } from "./store/reducers/listReducer";
import RemindersHolder from "./components/RemindersHolder";
import ListsHolder from "./components/ListsHolder";
import Greeting from "./greeting";




interface IProps {}

interface IState {
  currentList: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class App extends React.Component<Props, IState> {
  state: IState = {
    currentList: "",
  };

  componentDidMount() {
    let defaultList = "";
    if (this.props.lists.lists.length > 0) {
      defaultList = this.props.lists.lists[0].name;
    }

    this.setState({
      currentList: defaultList,
    });
  }

  updateCurrentList = (newList?: string): void => {
    const { currentList } = this.state;
    const { lists } = this.props;

    // for ListInput and List
    if (newList) {
      this.setState({
        currentList: newList,
      });
    } else {
      const defaultList = lists.lists.filter((l) => l.name !== currentList);
      if (defaultList[0]) {
        this.setState({
          currentList: defaultList[0].name,
        });
      } else {
        this.setState({
          currentList: "",
        });
      }
    }
  };
  

  render() {
    const { currentList } = this.state;
    return (
      
      <div className="App">
        <Greeting name="Chau" showTime={true}/>
        {/* <h1>Good morning Chau!</h1> */}

            <div className="main-holder">

                <ListsHolder
                  currentList={currentList}
                  updateCurrentList={this.updateCurrentList}
                />
                <RemindersHolder currentList={currentList} />

        </div>
      </div>
    );
  }
}

interface LinkStateProps {
  reminders: remindersState;
  lists: listState;
}

interface LinkDispatchProps {}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  reminders: state.reminders,
  lists: state.lists,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ReminderActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
