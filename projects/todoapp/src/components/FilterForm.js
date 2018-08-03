import React from 'react';
import { Form, Input, Header, Divider } from 'semantic-ui-react'

export default (props) => (
    <Form inverted label='Filter'>
        <Header inverted as='h3' color='grey'>
            Filter:
        </Header>
        <Divider inverted />
        <Form.Group widths='equal'>
            <Form.Checkbox checked={props.showChecked} onClick={props.toggleShowDone} label='Show completed'/>
            <Form.Input
            placeholder='Date From'
            name='date'
            type='date'
            />
            <Form.Input
            placeholder='Date To'
            name='date'
            type='date'
            />
        </Form.Group>
        <Input fluid size='small' icon='search' placeholder='Text search (title + description)' />
    </Form>
    )