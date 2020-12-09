import React from 'react'
import { FaRegClock } from 'react-icons/fa';
import { ButtonToolbar, ButtonGroup, Button, InputGroup, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';


export const CommentSearchShort = ({ filteredCommentByTimeTag, filteredCommentByWord }) => {

    return (

        <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
            <ButtonGroup className="mr-2" aria-label="First group">
                <OverlayTrigger
                    overlay={
                        <Tooltip id={'tooltip-top'}>
                            Time tag filter
                       </Tooltip>
                    }>
                    <Button variant="secondary" onClick={filteredCommentByTimeTag}><FaRegClock /></Button>
                </OverlayTrigger>
            </ButtonGroup>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="btnGroupAddon" >Search Comment</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    type="text"
                    placeholder="..."
                    onChange={filteredCommentByWord}
                />
            </InputGroup>
        </ButtonToolbar>

    )
}
