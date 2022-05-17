import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

function PostCard({post, user}) { 
    return (
        <Card key={user._id}>
        <Card.Content textAlign='left'>
            <Image
                floated='left'
                size='large'
                avatar
                src={user.photoUrl ? user.photoUrl : 'https://react.semantic-ui.com/images/wireframe/square-image.png'}
            />
        <Card.Header floated="right">{user.username}</Card.Header>
        </Card.Content>
            <Image src={post.photoUrl} wrapped ui={false} />
            <Card.Content>
            <Card.Description>
                {post.caption}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Icon name='like' /> {post.likes.length} Likes
        </Card.Content>
        </Card>    
        );
}

export default PostCard;