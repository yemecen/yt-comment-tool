import React from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';

export const Comments = ({ comments }) => {

    const timeToSecond = (time) => {
        let hour,minute,second="0";

        if (time.split(":").length === 2) {
            hour = parseInt("0");
            minute = parseInt(time.split(":")[0]) || 0;
            second = parseInt(time.split(":")[1]) || 0;
        } else {
            hour = parseInt(time.split(":")[0]) || 0 ;
            minute = parseInt(time.split(":")[0]) || 0;
            second = parseInt(time.split(":")[1]) || 0;
        }

        return (hour * 3600) + (minute * 60) + second;
    }

    const timeRegex = (text) => {
        let time = text.match(/[0-5][0-9]:[0-5][0-9]/g);

        return time != null ? timeToSecond(String(time)) : "0";
    }

    return (
        <Container>
            <Row>
                <Col>
                    <ListGroup>
                        {
                            comments !== undefined && (comments.map(
                                (item, index) => (<ListGroup.Item key={item.snippet.topLevelComment.id} action href={`https://www.youtube.com/watch?v=${item.snippet.videoId}&lc=${item.snippet.topLevelComment.id}&t=${timeRegex(item.snippet.topLevelComment.snippet.textOriginal)}`} target="_blank">{item.snippet.topLevelComment.snippet.textOriginal}</ListGroup.Item>)
                            ))
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )

}