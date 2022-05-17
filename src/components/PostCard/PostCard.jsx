import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

function PostCard(props) { 
    return (
        <Card>
        <Image src={props.photoUrl} wrapped ui={false} />
        <Card.Content>
            <Card.Header></Card.Header>
            <Card.Meta>
                <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
                {props.caption}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <button>
            <Icon name='like' />
        </button>
        </Card.Content>
        </Card>    
        );
}

export default PostCard;