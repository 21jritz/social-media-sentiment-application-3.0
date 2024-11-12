import React from 'react';
import { Post } from '../../types';
import { formatDistance } from 'date-fns';

interface RecentPostsProps {
  posts: Post[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  return (
    <div className="col-span-full bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="border-b pb-4">
            <p className="text-gray-800">{post.text}</p>
            <p className="text-sm text-gray-500 mt-2">
              {formatDistance(new Date(post.created_at), new Date(), { addSuffix: true })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;