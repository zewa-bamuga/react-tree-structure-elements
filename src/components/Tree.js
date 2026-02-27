import React from "react"
import {VscChromeClose, VscIndent, VscEdit, VscEye, VscEyeClosed} from "react-icons/vsc";
import EditTree from "./EditTree";

class Tree extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editForm: false,
            showChildren: true
        }
        this.handleEditSuccess = this.handleEditSuccess.bind(this)
    }

    handleEditSuccess(updatedTree) {
        this.props.onEdit(updatedTree)
        this.setState({editForm: false})
    }

    render() {
        const {tree} = this.props
        const hasChildren = tree.children && tree.children.length > 0

        return (
            <div>
                <div className="tree">
                    {hasChildren && (
                        <button
                            className="toggle-btn"
                            onClick={() => this.setState({showChildren: !this.state.showChildren})}
                        >
                            {this.state.showChildren ? <VscEye/> : <VscEyeClosed/>}
                        </button>
                    )}

                    <VscChromeClose onClick={() => this.props.onDelete(tree.id)} className="delete-icon"/>

                    <VscIndent onClick={() => {
                        this.props.onChildren(tree.id, {name: "Новая вкладка"})
                    }} className="add-icon"/>

                    <VscEdit onClick={() => {
                        this.setState({
                            editForm: !this.state.editForm
                        })
                    }} className="change-icon"/>

                    <h3>{tree.name}</h3>

                    {this.state.editForm &&
                        <EditTree
                            tree={tree}
                            onEdit={this.handleEditSuccess}
                        />
                    }
                </div>

                {hasChildren && this.state.showChildren && (
                    <div className="children">
                        {tree.children.map(child => (
                            <Tree
                                key={child.id}
                                tree={child}
                                onEdit={this.props.onEdit}
                                onChildren={this.props.onChildren}
                                onDelete={this.props.onDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        )
    }
}

export default Tree