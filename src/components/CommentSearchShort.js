import React from 'react'
import { FaRegClock } from 'react-icons/fa';
import { ButtonToolbar, ButtonGroup, Button, InputGroup, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Mark from 'mark.js';

export const CommentSearchShort = ({ comments, filterComment }) => {

    const filteredCommentByTimeTag = () => {
        
        let instance = new Mark(document.querySelector(".container"));
        instance.markRegExp(/[0-5][0-9]:[0-5][0-9]/);
        
        let filtered = comments.filter(
            (comment) => {
                return comment.snippet.topLevelComment.snippet.textOriginal.match(/[0-5][0-9]:[0-5][0-9]/g);
            }
        );

        filterComment(filtered);
    }

    const filteredCommentByWord = (event) => {
        event.preventDefault();

        let filtered = comments.filter(
            (comment) => {
                return comment.snippet.topLevelComment.snippet.textOriginal.toLowerCase().indexOf(event.target.value.toLocaleLowerCase()) !== - 1;
            }
        );

        filterComment(filtered);
    }

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
