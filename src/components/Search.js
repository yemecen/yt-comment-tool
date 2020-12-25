import React, { useState, useEffect } from 'react';
import { Comments } from './Comments';
import { InputGroup, FormControl, Navbar, Alert, Container, Row, Col, Spinner, Badge, Image } from 'react-bootstrap';
import { CommentSearchShort } from './CommentSearchShort';

export const Search = () => {
    const [videoIdInput, setVideoIdInput] = useState("");
    const [comments, setComments] = useState();
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [thumbnails, setThumbnails] = useState("");
    
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

    useEffect(async () => {
        if (comments != null) {
            
            let id = document.getElementById("basic-url").value.split('https://www.youtube.com/watch?v=').length === 2 ? document.getElementById("basic-url").value.split('https://www.youtube.com/watch?v=')[1] : document.getElementById("basic-url").value;
            
            const apiRequest = [
                'https://youtube.googleapis.com/youtube/v3/videos?',
                'part=snippet',
                `id=${id}`,
                `key=${apiKey}`,
            ].join('&');            
           
            const response = await fetch(apiRequest);
            const data = await response.json();            
           
            if(data.items[0] == undefined || data.items[0].snippet == undefined) return; 

            const { url, width, height } = data.items[0].snippet.thumbnails.medium;    
            
            setThumbnails(url);
        }
      
    },[comments])

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
                <Row className="justify-content-md-center">
                    <Col md={{span:4, offset:1}}>
                        <Image src={thumbnails} thumbnail />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {(comments !== undefined && comments.length > 0) && <CommentSearchShort comments={comments} filterComment={filterComment} />}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {filteredData.length > 0
                            ? <Comments comments={filteredData} />
                            : <Comments comments={comments} />
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}