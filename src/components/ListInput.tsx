import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { handleAddList, ListActionTypes } from "../store/actions/listActions";
import { rootState } from "../store/reducers";

interface IProps {
  updateCurrentList: (newList: string) => void;
  currentList: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

function ListInput({ handleAddList, updateCurrentList }: Props) {
  const [list, setList] = React.useState("");

  const updateList = (e: ChangeEvent<HTMLInputElement>): void => {
    setList(e.target.value);
  };

  const addList = (): void => {
    if (list === "") {
      alert("Please enter a list");
      return;
    }
    handleAddList(list.trim());
    setList("");

    // check if a list is selected
    updateCurrentList(list);
  };

  return (
    <>
      <div className="list-input-wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addList();
          }}
        >
          <input
            onChange={updateList}
            value={list}
            type="text"
            name="list"
            placeholder="Create List"
          />
          <input type="submit" value="+" className={list === "" ? "create-list-button hidden" : "create-list-button"} />
        </form>
      </div>
    </>
  );
}

interface LinkStateProps {}

interface LinkDispatchProps {
  handleAddList: (nameOfList: string) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ListActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({
  handleAddList: bindActionCreators(handleAddList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListInput);