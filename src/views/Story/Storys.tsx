import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import PageLoading from '../../components/elements/Loading';
import { RequestData, Story } from '../../types';
import { listStory } from '../../api/story';
import TableStory from './TableStory';
import AddStory from './AddStory';
import DeleteStory from './DeleteStory';
import EditStory from './EditStory';

const Storys = () => {
  const [stories, setStories] = useState<Array<Story>>([]);
  const per_page: any = useRef();
  const search: any = useRef();
  const Page = [5, 10, 20, 50];
  const [perpage] = useState(Page);
  const [page, setPage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [currentStory, setCurrentStory] = useState({
    id: null,
    title: '',
    address: '',
    date: '',
    description: '',
  });

  const StoryList = () => {
    const params = {
      per_page: per_page.current.value || null,
      keyword: search.current.value || null,
    };
    listStory(params)
      .then((response: RequestData) => {
        setStories(response.data || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePage = (event: any) => {
    const selected = event.target.value;
    if (selected !== page) {
      setPage(event.target.value);
      StoryList();
    }
  };

  // add story
  function addStory() {
    StoryList();
  }

  // update contact
  function updateStory(id:number, updateStory:any) {
    setIsLoading(false);
    setStories(stories.map((story) => (story.id === id ? updateStory : story)));
    StoryList();
  }

  // delete contact
  function storyDelete(storyId: any) {
    setIsLoading(false);
    setStories(stories.filter((story) => story.id !== storyId));
    StoryList();
  }


  useEffect(() => {
    StoryList();
  }, [isLoading]);

  return (
    <div className="container">
      <MainLayout />
      <div className="panel panel-default">
        <h1>
          <i className="fa fa-book" />
          StoryLists
        </h1>
        <div className="panel-body ">
          <div className="d-flex">
            <h4>
              <button
                type="submit"
                className=" btn btn-primary mr-2"
                data-toggle="modal"
                data-target="#AddStoryModal"
              >
                <i className="fa fa-plus mr-1" />
                Create
              </button>
            </h4>
            <h4>
              <Link
                to="/"
                className="btn btn-primary mr-2 float-right"
              >
                <i className="fa fa-arrow-left" />
                Back
              </Link>
            </h4>
          </div>
          <div className="d-flex justify-content-between">
            <div
              className="d-flex flex-row justify-content-center align-items-center"
            >
              <label className="mr-2">Perpage:</label>
              <select
                ref={per_page}
                onChange={(event) => handlePage(event)}
                className="form-control"
              >
                {perpage.map((page, i) => {
                  return (
                    <option
                      key={i}
                      defaultValue={page}
                    >
                      {page || 10}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group d-flex flex-row float-right w-50">
              <label
                htmlFor="search"
                className="mr-2 mt-2"
              >
                Search:
              </label>
              <input
                type="text"
                className="form-control search-input"
                ref={search}
                onChange={StoryList}
                aria-describedby="search"
                placeholder="search"
              />
            </div>
          </div>
          <PageLoading isLoading={isLoading} />
          {stories && stories.length > 0 ? (
            <div>
              <TableStory
                stories={stories}
                isLoading={isLoading}
                setCurrentStory={setCurrentStory}
                setSelectedStoryId={setSelectedStoryId}
              />
            </div>
          ) : (
            <div className="container-fluid">
              <p
                className=" text-center mb-0 pb-4 border border-light pt-4 bg-white"
              >
                {isLoading ? (<span>loading...</span>) : (
                  <span>No stories available</span>)}
              </p>
            </div>
          )}
        </div>
        <AddStory addStory={addStory} />
        <DeleteStory
          storyId={selectedStoryId}
          storyDelete={storyDelete}
        />
        <EditStory
          story={currentStory}
          updateStory={updateStory}
        />
      </div>
    </div>
  );
};
export default Storys;
