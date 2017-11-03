import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import TaskList from './TaskList'
import TaskForm from "./TaskForm";

class PluralTodo extends Component {

    static navigationOptions = {
        title: 'Todo List'
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            todos: [
                {
                    task: 'Learn React Native'
                },
                {
                    task: 'Learn Redux'
                },
            ],
        };
        console.ignoredYellowBox = ['Remote debugger'];
    }

    onAddTask = (task) => {
        console.log('Adding task: ', task);
        this.props.navigation.goBack(null);
        this.state.todos.push({ task });
        this.setState({ todos: this.state.todos });
    };

    onCancelAddTask = () => {
        console.log('Cancelled adding task');
        this.props.navigation.goBack(null);
    };

    onAddStarted = () => {
        this.props.navigation.navigate('TaskForm',
            { onCancel: this.onCancelAddTask,
                onAdd: this.onAddTask });
    };

    onTaskDone = (todo) => {
        console.log('Todo was completed: ', todo.task);
        const filteredTodos =
            this.state.todos.filter((filterTodo) => {`
            return filterTodo !== todo;`
        });

        this.setState({ todos: filteredTodos });
    };


    render() {
        return <TaskList
            onAddStarted={this.onAddStarted}
            onDone={this.onTaskDone}
            todos={this.state.todos} />
    }
}

const AppNav = StackNavigator({
    Home: { screen: PluralTodo },
    TaskForm: { screen: TaskForm }
});

export default class App extends React.Component {
    render() {
        return <AppNav />;
    }
}
