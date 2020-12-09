import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { CommentSearchShort } from './CommentSearchShort';

export const Comments = ({ comments, filteredComment }) => {

    const filteredCommentByTimeTag = () => {

        let filtered = comments.filter(
            (comment) => {
                return comment.snippet.topLevelComment.snippet.textOriginal.match(/[0-5][0-9]:[0-5][0-9]/g);
            }
        );

        //Child'dan Parent'a Comments State'e filtre bilgiyi gönderdik
        filteredComment(filtered);
    }

    const filteredCommentByWord = (event) => {
        event.preventDefault();

        let filtered = comments.filter(
            (comment) => {
                return comment.snippet.topLevelComment.snippet.textOriginal.toLowerCase().indexOf(event.target.value.toLocaleLowerCase()) !== - 1;
            }
        );
console.log(filtered);
console.log(filtered.length);
console.log(typeof filtered);
        //Child'dan (Comment.js) Parent'a (Search.js) Comments State'e filtre bilgiyi gönderdik
        filtered.length !== 0 ? filteredComment(filtered) : filteredComment(filtered);
    }

    return (
        <Container>
            <Row>
                <Col>
                    {comments.length > 0 && comments !== undefined ? <CommentSearchShort filteredCommentByTimeTag={filteredCommentByTimeTag} filteredCommentByWord={filteredCommentByWord} /> : ""}
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {
                            comments !== undefined && (comments.map(
                                (item, index) => (<ListGroup.Item key={item.snippet.topLevelComment.id} action href={`https://www.youtube.com/watch?v=${item.snippet.videoId}&lc=${item.snippet.topLevelComment.id}`}>{item.snippet.topLevelComment.snippet.textOriginal}</ListGroup.Item>)
                            ))
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )

}

//Arama metotları
/*const filteredCommentByTimeTag = comments.filter(
    (comment) => {
        return comment.snippet.topLevelComment.snippet.textOriginal.match(/[0-5][0-9]:[0-5][0-9]/g);
    }
);

const filteredCommentByWord = comments.filter(
    (comment) => {
        return comment.snippet.topLevelComment.snippet.textOriginal.toLowerCase().indexOf("searchWord".toLocaleLowerCase()) !== - 1;
    }
);*/

//eski render
/*return (
    <div>
        {
            comments !== undefined && (<div>
                {
                    comments.map(((item, index) => (<div key={item.snippet.topLevelComment.id}><a href={`https://www.youtube.com/watch?v=${item.snippet.videoId}&lc=${item.snippet.topLevelComment.id}`}>{item.snippet.topLevelComment.snippet.textOriginal}</a></div>)))

                }
            </div>)
        }
    </div>
)*/