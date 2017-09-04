import React, { Component } from 'react';
import Typeography from 'material-ui/Typography';
import Card, {CardContent, CardMedia} from 'material-ui/Card'
import {Avatar} from 'material-ui';
import './Story.css';

class Story extends Component {
  render() {
    const story = this.props.story;

    console.log(story.image);

    return (
      <Card style={{maxWidth: 500, margin: '12px auto'}} className="Story">
        <CardMedia image={story.image} className="Story-image" />
        <CardContent>
          <Typeography type="headline">
            {story.title}
          </Typeography>
          <div className="Story-Author">
            <Avatar src={story.authorPicture} />
            <Typeography type="subheading" color="secondary" className="Story-Author-Name">
              {story.author}
            </Typeography>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default Story;
