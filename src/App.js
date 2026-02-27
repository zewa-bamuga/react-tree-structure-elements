import React from "react"
import Header from "./components/Header";
import Trees from "./components/Trees";
import ResetTree from "./components/ResetTree";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            trees: []
        }
        this.addTree = this.addTree.bind(this)
        this.addChildren = this.addChildren.bind(this)
        this.editTree = this.editTree.bind(this)
        this.deleteTree = this.deleteTree.bind(this)
        this.deleteAll = this.deleteAll.bind(this)
    }

    render() {
        return (
            <div className="app-container">
                <Header title="Древовидный список"></Header>
                <main>
                    <Trees trees={this.state.trees} onEdit={this.editTree} onChildren={this.addChildren}
                           onDelete={this.deleteTree}/>
                </main>
                <aside>
                    <ResetTree onAdd={this.addTree} onDeleteAll={this.deleteAll}/>
                </aside>
            </div>
        )
    }

    addTree(tree) {
        const id = Date.now() + Math.floor(Math.random() * 1000)
        this.setState({trees: [...this.state.trees, {id, ...tree}]})
    }

    addChildren(parentId, tree) {
        const children_id = Date.now() + Math.floor(Math.random() * 1000)
        const newChild = {id: children_id, name: tree.name}

        const updateTree = (nodes) => {
            return nodes.map(node => {
                if (node.id === parentId) {
                    return {
                        ...node,
                        children: [...(node.children || []), newChild]
                    }

                }
                if (node.children && node.children.length > 0) {
                    return {
                        ...node,
                        children: updateTree(node.children)
                    }
                }
                return node
            })
        }
        this.setState({
            trees: updateTree(this.state.trees)
        })
    }

    editTree(updatedTree) {
        const updateTreeRecursively = (nodes) => {
            return nodes.map(node => {
                if (node.id === updatedTree.id) {
                    return {
                        ...updatedTree,
                        children: node.children
                    }
                }
                if (node.children && node.children.length > 0) {
                    return {
                        ...node,
                        children: updateTreeRecursively(node.children)
                    }
                }
                return node
            })
        }
        this.setState({
            trees: updateTreeRecursively(this.state.trees)
        })
    }

    deleteTree(id) {
        const deleteNodeRecursively = (nodes) => {
            return nodes.filter(node => {
                if (node.id === id) {
                    return false
                }
                if (node.children && node.children.length > 0) {
                    node.children = deleteNodeRecursively(node.children)
                }
                return true;
            })
        }

        this.setState({
            trees: deleteNodeRecursively(this.state.trees)
        })
    }

    deleteAll() {
        this.setState({
            trees: []
        })
    }
}

export default App;
