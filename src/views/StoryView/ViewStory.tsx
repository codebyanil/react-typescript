import React, { useEffect, useState } from 'react';
import { getStory } from '../../api/story';
import ViewStoryTable from './ViewStoryTable';

interface Props {
  match: any;
}

const ViewStory = ({ match }: Props) => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storyId = match.params.id;
    getStory(storyId)
      .then((response) => {
        setStories(response.data || []);
      }).finally(() => {
        setIsLoading(false);
      });
  }, [match.params.id, setStories]);

  return (
    <div>
      <ViewStoryTable
        stories={stories}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ViewStory;
