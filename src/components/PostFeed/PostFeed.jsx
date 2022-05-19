import React from 'react';
import PostCard from "../../components/PostCard/PostCard";
import Loading from "../Loader/Loader";
import {Card, Segment, Dimmer, Image} from 'semantic-ui-react';

export default function PostFeed({posts, numPhotosCol, isProfile, loading, addLike, removeLike}){
    console.log("PostFeed's", posts)
    const postcards = Object.keys(posts).map((post) => {
        return (
        <PostCard 
        post={posts[post]}
        user={posts.user}
        addLike={addLike}
        removeLike={removeLike}
        isProfile={isProfile}
        key={posts[post]._id}
        />
        )
    })
    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable>
        {loading ? (
            <Segment>
                <Dimmer active inverted>
                    <Loading size="small">
                        Loading
                    </Loading>
                </Dimmer>
                <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            </Segment>
        ) : null}
        {postcards}
        </Card.Group>
    )
}