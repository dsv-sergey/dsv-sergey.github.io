import React from 'react';
import { connect } from 'react-redux'
import { Table, Input } from 'semantic-ui-react'



const PopupExampleHtml = (props) => {
    
    const toggleDone = key => {
        this.setState({
            tasks: this.state.tasks.map(el => ({
                ...el,
                done: el.id === key ? !el.done : el.done
            }))
        });
    };

    // const TaskItem = (props) => (
    //     <Table.Row>
    //         <Table.Cell>
    //             <Input type="checkbox" checked={props.done} onClick={() => {
    //                 toggleDone(props.id)
    //             }} />
    //         </Table.Cell>
    //         <Table.Cell>
    //             {props.title}
    //         </Table.Cell>
    //         <Table.Cell>
    //             {props.priority}
    //         </Table.Cell>
    //         <Table.Cell>
    //             {props.date}
    //         </Table.Cell>
    //     </Table.Row>
    // )
    
    return (
        <Table.Row>
            <Table.Cell>
                <Input type="checkbox" checked={props.done} onClick={() => {
                    toggleDone(props.id)
                }} />
            </Table.Cell>
            <Table.Cell>
                {props.title}
            </Table.Cell>
            <Table.Cell>
                {props.priority}
            </Table.Cell>
            <Table.Cell>
                {props.date}
            </Table.Cell>
        </Table.Row>
)}

const mapStateToProps = state => ({
    taskList: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(PopupExampleHtml);