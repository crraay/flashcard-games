import { Injectable } from '@angular/core';
import { Sentence, Story } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private sentences: Sentence[] = [
    { id: 's1', text: 'Toad wants a toast' },
    { id: 's2', text: 'He needs oats' },
    { id: 's3', text: 'Goat grows oats' },
    { id: 's4', text: 'Toad gets his coat' },
    { id: 's5', text: 'Snow blows on the road' },
    { id: 's6', text: 'A mole wants a home' },
    { id: 's7', text: 'He digs a hole' },
    { id: 's8', text: 'Cole is on a rope' },
    { id: 's9', text: 'The mole finds a bone' },
    { id: 's10', text: 'It is a night' },
    { id: 's11', text: 'Dwight lies in a bed' },
    { id: 's12', text: 'I want some pie' },
    { id: 's13', text: 'The lights are bright' },
    { id: 's14', text: 'Five rats fight for the pie' }
  ];

  private stories: Story[] = [
    {
      id: 'story-oats-for-toast',
      name: 'Oats for toast',
      description: 'Review story: oa and ow words',
      sentenceIds: ['s1', 's2', 's3', 's4', 's5']
    },
    {
      id: 'story-the-mole',
      name: 'The mole',
      description: 'Review story: o and oe words',
      sentenceIds: ['s6', 's7', 's8', 's9']
    },
    {
      id: 'story-the-pie',
      name: 'The pie',
      description: 'Review story: i and ie words',
      sentenceIds: ['s10', 's11', 's12', 's13', 's14']
    }
  ];

  getAllStories(): Story[] {
    return this.stories.map(story => ({ ...story, sentenceIds: [...story.sentenceIds] }));
  }

  getStoryById(id: string): Story | undefined {
    const story = this.stories.find(s => s.id === id);
    if (!story) {
      return undefined;
    }
    return { ...story, sentenceIds: [...story.sentenceIds] };
  }

  getSentencesByStoryId(storyId: string): Sentence[] {
    const story = this.stories.find(s => s.id === storyId);
    if (!story) {
      return [];
    }

    return story.sentenceIds
      .map(id => this.sentences.find(sentence => sentence.id === id))
      .filter((sentence): sentence is Sentence => sentence !== undefined)
      .map(sentence => ({ ...sentence }));
  }
}
