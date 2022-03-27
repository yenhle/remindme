import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  handleAddReminder,
  ReminderActionTypes,
} from "../store/actions/remindersActions";
import { rootState } from "../store/reducers";
// import { useDispatch } from "react-redux";
// import { handleAddReminder } from "../store/actions/remindersActions";

interface IProps {
  currentList: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

function ReminderInput({ handleAddReminder, currentList }: Props) {
  const [reminder, setReminder] = React.useState("");

  const updateReminder = (e: ChangeEvent<HTMLInputElement>): void => {
    setReminder(e.target.value);
  };

  const addReminder = (): void => {
    if (!currentList) {
      alert("Please create a list first");
      return;
    }

    if (reminder === "") {
      alert("Please enter a reminder");
      return;
    }
    handleAddReminder(reminder.trim(), currentList);
    setReminder("");
  };

  return (
    <>
      <div className="reminder-new-input-wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addReminder();
          }}
        >
          <input
            onChange={updateReminder}
            value={reminder}
            type="text"
            name="reminder"
            placeholder="Create Reminder"
          />
          {/* <input type="submit" value="Create Reminder" /> */}
          <input
            type="submit"
            value="+"
            className={
              reminder === ""
                ? "create-reminder-button hidden"
                : "create-reminder-button"
            }
          />
        </form>
      </div>
    </>
  );
}

interface LinkStateProps {}

interface LinkDispatchProps {
  handleAddReminder: (reminder: string, forList: string) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ReminderActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({
  handleAddReminder: bindActionCreators(handleAddReminder, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReminderInput);