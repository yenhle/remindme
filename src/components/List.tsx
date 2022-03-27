import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  handleDeleteList,
  handleEditList,
  ListActionTypes,
} from "../store/actions/listActions";
import {
  handleDeleteRemindersFromList,
  handleEditListForReminders,
} from "../store/actions/remindersActions";
import { rootState } from "../store/reducers";
import { IList, listState } from "../store/reducers/listReducer";
import { remindersState } from "../store/reducers/remindersReducer";

interface IProps {
  updateCurrentList: (newList?: string) => void;
  list: IList;
  currentList: string;
}

interface IState {
  edit: boolean;
  newList: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class List extends React.Component<Props, IState> {
  wrapper: React.RefObject<HTMLDivElement>;
  input: React.RefObject<HTMLInputElement>;
  button: React.RefObject<HTMLButtonElement>;
  constructor(props: Props) {
    super(props);
    this.wrapper = React.createRef<HTMLDivElement>();
    this.input = React.createRef<HTMLInputElement>();
    this.button = React.createRef<HTMLButtonElement>();
  }

  state: IState = {
    edit: false,
    newList: "",
  };

  componentWillUnmount() {
    this.removeListeners();
  }

  handleClickOnList = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (this.button && !this.button.current?.contains(e.target as Node)) {
      // not the delete button
      this.props.updateCurrentList(this.props.list.name);
    }
  };

  deleteList = () => {
    // update the current list
    this.props.updateCurrentList();
    // delete list from store
    this.props.handleDeleteList(this.props.list);
    // delete reminders from that list!
    this.props.handleDeleteRemindersFromList(this.props.list.name);
  };

  onEditList = (): void => {
    this.setState((prev) => ({
      edit: !prev.edit,
      newList: this.props.list.name,
    }));

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

  handleClickOutside = (e: MouseEvent) => {
    if (this.wrapper && !this.wrapper.current?.contains(e.target as Node)) {
      if (this.state.newList !== this.props.list.name) {
        this.onSaveList();
      } else {
        this.setDefaultState();
      }
      this.removeListeners();
    }
  };

  editList = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({ newList: value });
  };

  onSaveList = (e?: React.FormEvent<HTMLFormElement>): void => {
    if (e) e.preventDefault();

    // change list fo reminders
    this.props.handleEditListForReminders(
      this.state.newList,
      this.props.list.name
    );
    // save list to store
    this.props.handleEditList(this.state.newList, this.props.list.name);
    // update default list
    this.props.updateCurrentList(this.state.newList);
    // setstate
    if (e) {
      this.setDefaultState();
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
      newList: "",
    });
  };

  removeListeners = (): void => {
    document.removeEventListener("keydown", this.escChar);
    document.removeEventListener("click", this.handleClickOutside);
  };

  render() {
    const { currentList, list, reminders } = this.props;
    return (
      <>
        <div
          ref={this.wrapper}
          className={
            currentList === list.name ? "list-holder active" : "list-holder"
          }
          onClick={this.handleClickOnList}
        >
          {this.state.edit ? (
            <div className="list-name">
              <form onSubmit={this.onSaveList}>
                <input
                  type="text"
                  value={this.state.newList}
                  onChange={this.editList}
                  ref={this.input}
                  autoComplete="off"
                />
              </form>
              <button
                ref={this.button}
                className="cross"
                onClick={this.deleteList}
              />
            </div>
          ) : (
            <div
              className="list-name vertical-align"
              onDoubleClick={this.onEditList}
            >
              {list.name}
            </div>
          )}
          <div className="vertical-align">
            {reminders.reminders.filter((r) => r.for === list.name).length}
          </div>
        </div>
      </>
    );
  }
}

interface LinkStateProps {
  reminders: remindersState;
  lists: listState;
}

interface LinkDispatchProps {
  handleDeleteList: (list: IList) => void;
  handleDeleteRemindersFromList: (list: string) => void;
  handleEditList: (newList: string, oldList: string) => void;
  handleEditListForReminders: (newList: string, oldList: string) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  reminders: state.reminders,
  lists: state.lists,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ListActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({
  handleDeleteList: bindActionCreators(handleDeleteList, dispatch),
  handleDeleteRemindersFromList: bindActionCreators(
    handleDeleteRemindersFromList,
    dispatch
  ),
  handleEditList: bindActionCreators(handleEditList, dispatch),
  handleEditListForReminders: bindActionCreators(
    handleEditListForReminders,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);