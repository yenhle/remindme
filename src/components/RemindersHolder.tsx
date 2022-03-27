import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  handleDeleteCompletedRemindersFromList,
  ReminderActionTypes,
} from "../store/actions/remindersActions";
import { rootState } from "../store/reducers";
import { remindersState } from "../store/reducers/remindersReducer";
import Reminder from "./Reminder";
import ReminderInput from "./ReminderInput";

interface IProps {
  currentList: string;
}

interface IState {}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class RemindersHolder extends React.Component<Props, IState> {
  onClearAllCompleted = () => {
    this.props.handleDeleteCompletedRemindersFromList(this.props.currentList);
  };

  render() {
    const { reminders, currentList } = this.props;
    const remindersCount = reminders.reminders.filter(
      (r) => r.for === currentList
    ).length;
    const remindersCompletedCount = reminders.reminders.filter(
      (r) => r.for === currentList && r.completed === true
    ).length;
    
    if (currentList === "") {
      return <div className="main"></div>;
    }
    return (
      <div className="main">
        <div className="reminders-page-holder">
          <div className="reminders-page-title">{currentList}</div>
          <div className="reminders-page-count">{remindersCount}</div>
        </div>
        <div className="reminders-holder">
          {remindersCount ? (
            <ul>
              {reminders.reminders
                .filter((r) => r.for === currentList)
                .map((r) => (
                  <Reminder r={r} key={r.reminder} list={currentList} />
                ))}
            </ul>
          ) : (
            <div className="reminders-empty">All Items Completed</div>
          )}
          <button
            onClick={this.onClearAllCompleted}
            className={
              remindersCompletedCount > 0
                ? "clear-all-reminders-button"
                : "clear-all-reminders-button hidden"
            }
          >
            Clear All Completed
          </button>
        </div>
        <ReminderInput currentList={currentList} />
      </div>
    );
  }
}

interface LinkStateProps {
  reminders: remindersState;
}

interface LinkDispatchProps {
  handleDeleteCompletedRemindersFromList: (list: string) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  reminders: state.reminders,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ReminderActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({
  handleDeleteCompletedRemindersFromList: bindActionCreators(
    handleDeleteCompletedRemindersFromList,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RemindersHolder);