"use client";
import React, { useEffect, useState } from "react";
import { Comment, PostPageProps } from "@/types";
import Modal from "@/components/modal/Modal";

export default function PostPage({ params }: { params: { id: string } }) {
  const [posts, setPosts] = useState<PostPageProps | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const getPosts = async () => {
    try {
      setLoading(true);
      const api = await fetch(`/api/getPosts/${params.id}`);
      const api2 = await fetch(`/api/comment/post/${params.id}`);
      const res = await api.json();
      const res2 = await api2.json();

      setPosts(res);
      setPostComments(res2?.comments);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getPostComments = async () => {
    try {
      setCommentsLoading(true);
      const api = await fetch(`/api/comment/post/${params.id}`);
      const res = await api.json();

      setPostComments(res?.comments);
      setCommentsLoading(false);
    } catch (error) {
      console.log(error);
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPosts();
      getPostComments();
    }
  }, [params]);

  return (
    <>
      <Modal
        posts={posts}
        postComments={postComments}
        commentsLoading={commentsLoading}
        loading={loading}
        getPostComments={getPostComments}
      />
    </>
  );
}
