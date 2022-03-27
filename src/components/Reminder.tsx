import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  handleDeleteReminder,
  handleEditReminder,
  handleSetReminder,
  ReminderActionTypes,
} from "../store/actions/remindersActions";
import { rootState } from "../store/reducers";
import { IReminder } from "../store/reducers/remindersReducer";

interface IProps {
  r: IReminder;
  list: string;
}

interface IState {
  edit: boolean;
  newReminder: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Reminder extends React.Component<Props, IState> {
  wrapper: React.RefObject<HTMLDivElement>;
  input: React.RefObject<HTMLInputElement>;
  constructor(props: Props) {
    super(props);
    this.wrapper = React.createRef<HTMLDivElement>();
    this.input = React.createRef<HTMLInputElement>();
  }

  state: IState = {
    edit: false,
    newReminder: "",
  };

  componentWillUnmount() {
    this.removeListeners();
  }

  setReminder = () => {
    this.props.handleSetReminder(this.props.r, this.props.list);
    
  };

  deleteReminder = () => {
    this.props.handleDeleteReminder(this.props.r);
  };

  editReminder = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({ newReminder: value });
  };

  onEditReminder = (): void => {
    this.setState({
      edit: true,
      newReminder: this.props.r.reminder,
    });

    document.addEventListener("click", this.handleClickOutside);
    document.addEventListener("keydown", this.escChar);
    this.forceUpdate(this.focusOnInput);
  };

  focusOnInput = () => {
    const node = this.input.current;
    if (node) {
      node.focus();
    }
  };

  onSaveReminder = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    this.props.handleEditReminder(
      this.state.newReminder,
      this.props.r.reminder,
      this.props.list
    );

    if (e) {
      this.setDefaultState();
    }
  };

  handleClickOutside = (e: MouseEvent) => {
    if (this.wrapper && !this.wrapper.current?.contains(e.target as Node)) {
      if (this.state.newReminder !== this.props.r.reminder) {
        this.onSaveReminder();
      } else {
        this.setDefaultState();
      }
      this.removeListeners();
    }
  };

  escChar = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      this.removeListeners();
      this.setDefaultState();
    }
  };

  setDefaultState = (): void => {
    this.setState({
      edit: false,
      newReminder: "",
    });
  };

  removeListeners = (): void => {
    document.removeEventListener("keydown", this.escChar);
    document.removeEventListener("click", this.handleClickOutside);
  };

  render() {
    const { r } = this.props;
    const { edit } = this.state;

    return (
      <>
        <li>
          <div className="vertical-align">
            <div className="round">
              <input
                type="checkbox"
                onChange={() => this.setReminder()}
                checked={r.completed}
                id={r.reminder}
              />
              <label htmlFor={r.reminder}></label>
            </div>
          </div>
          <div className="reminder-wrapper" ref={this.wrapper}>
            {edit ? (
              <div className="reminder-input-wrapper">
                <form onSubmit={this.onSaveReminder}>
                  <input
                    type="text"
                    value={this.state.newReminder}
                    onChange={this.editReminder}
                    ref={this.input}
                    autoComplete="off"
                  />
                </form>
                <button className="cross" onClick={this.deleteReminder} />
              </div>
            ) : (
              <>
                <div
                  className="reminder-name"
                  onDoubleClick={this.onEditReminder}
                >
                  {r.reminder}
                </div>
              </>
            )}
          </div>
        </li>
      </>
    );
  }
}

interface LinkStateProps {}

interface LinkDispatchProps {
  handleSetReminder: (reminder: IReminder, list: string) => void;
  handleDeleteReminder: (reminder: IReminder) => void;
  handleEditReminder: (
    newReminder: string,
    oldReminder: string,
    list: string
  ) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ReminderActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({
  handleSetReminder: bindActionCreators(handleSetReminder, dispatch),
  handleDeleteReminder: bindActionCreators(handleDeleteReminder, dispatch),
  handleEditReminder: bindActionCreators(handleEditReminder, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);