import React from "react";
import { Segment, Header } from "semantic-ui-react";
import { connect } from 'react-redux';

import AddTask from "./components/AddTask";
import TasksFilter from "./components/FilterForm";
import TasksList from "./components/TaskList";

class App extends React.Component {
    // static defaultProps = {
    //     showDone: true
    //   };

    render() { return <div className="ui column center page">
                     <Segment inverted>
                         <Header as="h2" inverted color="grey">
                             Todo List 
                                ({this.props.state.showDone
                                 ? "show done"
                                 : "do not show done"})
                         </Header>
                     </Segment>
                     <Segment inverted>
                         <AddTask />
                     </Segment>
                     <Segment inverted>
                         <TasksFilter />
                     </Segment>
                     <TasksList />
                 </div>
    }
}
export default connect(
    (state) => ({
        state
      }),
      dispatch => ({})
) (App);
// import api from "./api";

// class App extends Component {
//     state = {
//         tasks: [],
//         showDone: false
//     };

//     componentDidMount = (props, state) => {
//         api.getTasks().then(list =>
//             this.props.tasks
//         );
//     };

//     addTask = data => {
//         api.addTask(data).then(task =>
//             this.props.tasks
//         );
//     };

//     toggleDone = key => {
//         this.setState({
//             tasks: this.state.tasks.map(el => ({
//                 ...el,
//                 done: el.id === key ? !el.done : el.done
//             }))
//         });
//     };

//     toggleShowDone = () =>
//         this.setState(state => ({
//             showDone: !state.showDone
//         }));

//     filterTasks = () => {
//         let tasks = this.state.tasks;
//         if (!this.state.showDone) {
//             tasks = tasks.filter(el => !el.done);
//         }
//         return tasks;
//     };

//     render() {
//         return (
//             <div>
//                 <div className="ui column center page">
//                     <Segment inverted>
//                         <Header as="h2" inverted color="grey">
//                             Todo List ({this.state.showDone
//                                 ? "show done"
//                                 : "do not show done"})
//                         </Header>
//                     </Segment>
//                     <Segment inverted>
//                         <AddTask addTask={this.addTask} />
//                     </Segment>
//                     <Segment inverted>
//                         <TasksFilter
//                             toggleShowDone={this.toggleShowDone}
//                             showChecked={this.state.showDone}
//                         />
//                     </Segment>
//                     <TasksList
//                         tasks={this.props.tasks}
//                     />
//                 </div>
//             </div>
//         );
//     }
// }

// const mapStateToProps = state => ({
//     tasks: state.tasks
// });

// const mapDispatchToProps = (dispatch) => ({
//     api,

// });



// export default connect(mapStateToProps, mapDispatchToProps)(App);
