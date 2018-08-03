import React from 'react';
import TaskItem from './TaskItem';
import { Table, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

const TasksList = (props) => (
    <Table className="TasksList" inverted>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Done</Table.HeaderCell>
                <Table.HeaderCell>
                    Title
                    <Icon name='sort' />
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Priority
                    <Icon name='sort' />
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Date
                    <Icon name='sort' />
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <TaskItem />
            {/* {this.props.tasks.map((el, index) => <TaskItem key={el.id} {...el}/>)} */}
        </Table.Body>
    </Table>
);

const mapStateToProps = state => ({
    tasks: state.tasks
});

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);