import React from "react"

class EditTree extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.tree ? props.tree.name : ""
        }
    }

    handleSubmit = () => {
        const updatedTree = {
            id: this.props.tree.id,
            name: this.state.name
        }
        this.props.onEdit(updatedTree)
    }

    render() {
        return (
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    placeholder="Вкладка"
                    value={this.state.name}
                    onChange={(e) => this.setState({name: e.target.value})}
                    autoFocus
                />
                <button type="button" onClick={this.handleSubmit}>
                    Изменить
                </button>
            </form>
        )
    }
}

export default EditTree