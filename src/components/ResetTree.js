import React from "react"
import {VscAdd, VscDebugRestart} from "react-icons/vsc";


class ResetTree extends React.Component {
    render() {
        return (
            <form>
                <button type="button" onClick={() => this.props.onAdd({
                    name: "Вкладка"
                })}><VscAdd className="create-icon"/>
                </button>

                <button type="button" onClick={() => this.props.onDeleteAll()} >
                    <VscDebugRestart className="reset-icon"/>
                </button>
            </form>
        )
    }
}

export default ResetTree