import request from '../library/request';
import {RequestParams} from '../types';

export function storyAdd(data: object) {
  return request({
    url: 'stories',
    method: 'post',
    data,
  });
}

export function listStory(params: RequestParams) {
  const {cancelPrevious = true} = params;
  return request({
    url: 'stories',
    method: 'get',
    params,
    cancelPrevious,
  });
}

export function storyUpdate(id: number, data: object) {
  return request({
    url: `stories/${id}`,
    method: 'patch',
    data,
  });
}

export function getStory(id: number) {
  return request({
    url: `stories/${id}`,
    method: 'get',
  });
}

export function deleteStory(id: number) {
  return request({
    url: `stories/${id}`,
    method: 'delete',
  });
}
