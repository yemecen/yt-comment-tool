import React, { useState } from 'react';
import { Comments } from './Comments';
import { InputGroup, FormControl, Navbar, Alert, Container, Row, Col, Spinner, Badge } from 'react-bootstrap';
import { CommentSearchShort } from './CommentSearchShort';

export const Search = () => {
    const [videoIdInput, setVideoIdInput] = useState("");
    const [comments, setComments] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const apiKey = process.env.REACT_APP_API_TOKEN;

    const filterComment = (comments) => {
        setFilteredData(comments);
    }

    const onChange = (event) => {

        event.preventDefault();

        setIsLoading(true);

        setVideoIdInput(event.target.value);

        const videoId = event.target.value.split('https://www.youtube.com/watch?v=').length === 2 ? event.target.value.split('https://www.youtube.com/watch?v=')[1] : event.target.value;

        getAllPagesComments(videoId, '').then((ytData) => { setComments(ytData); setIsLoading(false); });

    }

    const getOnePageComment = async (videoId, pageToken) => {
        const url = [
            'https://www.googleapis.com/youtube/v3/commentThreads?',
            'part=snippet,replies',
            'maxResults=100',
            `videoId=${videoId}`,
            `key=${apiKey}`,
            `pageToken=${pageToken}`,
        ].join('&');

        const response = await fetch(url);
        const json = await response.json();
        return json;
    };

    const getAllPagesComments = (videoId, pageToken) => {
        // get the comments for the first page by making simple API call
        return getOnePageComment(videoId, pageToken)
            .then((result) => {
                const comments = result.items;

                // Base case: this is the last page
                if (!result.nextPageToken) return comments;

                // Recursive step: get the rest of the pages, then concat it
                return getAllPagesComments(videoId, result.nextPageToken)
                    .then(restOfVideoIds => comments.concat(restOfVideoIds));
            });
    };

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Navbar bg="light" expand="lg">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon3" >
                                        https://www.youtube.com/watch?v=
                            </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="basic-url" aria-describedby="basic-addon3" placeholder="Video ID..." onChange={onChange} />
                            </InputGroup>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {videoIdInput &&
                            <Alert variant="info">
                                <b>Video ID :</b> {videoIdInput} {' '} <b>Comment Count :</b> {comments && <Badge variant="primary"> {comments.length} </Badge>}
                            </Alert>}

                        {isLoading && (
                            <>
                                <Spinner animation="grow" variant="primary" />
                                <Spinner animation="grow" variant="secondary" />
                                <Spinner animation="grow" variant="success" />
                            </>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                    { (comments !== undefined && comments.length > 0 ) && <CommentSearchShort comments={comments} filterComment={filterComment}/> }
                    </Col>
                </Row>
                <Row>
                    <Col>                    
                    {filteredData.length > 0
                        ? <Comments comments={filteredData}/>
                        : <Comments comments={comments}/>
                    }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

//import JSONPretty from 'react-json-pretty';
//import 'react-json-pretty/themes/monikai.css';
//eski
{/*<input onChange={onChange} type="text" name="videoId" value={videoIdInput} placeholder="veri girişi yapınız..." />*/ }
{/*<JSONPretty id="json-pretty" data={comments} ></JSONPretty>*/ }