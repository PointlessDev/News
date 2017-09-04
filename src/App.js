import React, { Component } from 'react';
import Slide from "material-ui/transitions/Slide"
import Header from "./Header";
import Story from "./Story";
import "./App.css";
import {generateStories, generateStory} from './StoryGen';
import Loading from "./Loading";

const stories = generateStories(3);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };

    stories.then(s => {
      this.setState({
        stories: s.map((s, i) => this.makeStoryElement(s, i, false))
      })
    });
  }

  addStory = async () => {
    const story = await generateStory();
    this.setState({
      stories: this.state.stories.concat(this.makeStoryElement(story))
    });
  };

  makeStoryElement(storyData, index, animate) {
    index = typeof index === 'undefined'? this.state.stories.length : index;

    if(animate === false)
      return <Story story={storyData} key={index} />;
    return (
      <Slide direction="left" key={index} in>
        <Story story={storyData} />
      </Slide>
    );
  }

  addStoryTimer = () => {
    this.addStory();
    setTimeout(this.addStoryTimer, Math.floor((Math.random() * 5000) + 5000));
  };

  componentDidMount() {
    setTimeout(this.addStoryTimer(), 4000);
  }

  render() {
    return (
      <div className="App-wrapper">
        <Header />
        <div className="App-feed">
          {this.state.stories.reverse()}
        </div>
        {this.state.stories.length ? null : (<Loading />)}
      </div>
    );
  }
}

export default App;
