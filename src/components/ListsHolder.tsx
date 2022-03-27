import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ReminderActionTypes } from "../store/actions/remindersActions";
import { rootState } from "../store/reducers";
import { listState } from "../store/reducers/listReducer";
import List from "./List";
import ListInput from "./ListInput";

interface IProps {
  currentList: string;
  updateCurrentList: (newList?: string) => void;
}

interface IState {}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class ListsHolder extends React.Component<Props, IState> {
  render() {
    const { lists, currentList, updateCurrentList } = this.props;
    const numberOfLists = lists.lists.length;
    return (
      <div className="side-bar">
        {/* <div className="search-bar">Search bar here</div> */}
        {numberOfLists ? (
          <>
            <div className="label-my-lists">My Lists</div>
            <div className="lists-holder">
              {lists.lists.map((l) => (
                <List
                  key={l.name}
                  updateCurrentList={updateCurrentList}
                  list={l}
                  currentList={currentList}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="reminders-empty">Create a List First!</div>
        )}
        <ListInput
          updateCurrentList={updateCurrentList}
          currentList={currentList}
        />
      </div>
    );
  }
}

interface LinkStateProps {
  lists: listState;
}

interface LinkDispatchProps {}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  lists: state.lists,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ReminderActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListsHolder);