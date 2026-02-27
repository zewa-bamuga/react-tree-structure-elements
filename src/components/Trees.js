import React from "react"
import Tree from "./Tree";

class Trees extends React.Component {
    render() {
        if (this.props.trees.length > 0)
            return (
                <div>
                    {this.props.trees.map((el) => (
                        <Tree
                            onEdit={this.props.onEdit}
                            onChildren={this.props.onChildren}
                            onDelete={this.props.onDelete}
                            key={el.id} tree={el}/>
                    ))}
                </div>
            )
        else
            return (
                <div>
                    <h3>Деревьев нет, но вы держитесь</h3>
                </div>
            )
    }

}

export default Trees