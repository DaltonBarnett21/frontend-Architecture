export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImage: string | null;
}

export interface IComment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  createdAt: string;
  user: Pick<IUser, "name" | "username" | "profileImage">;
}

export interface ILike {
  id: string;
  userId: string;
  postId: string;
}

export interface IPost {
  id: string;
  content: string;
  userId: string;
  images: IImage[];
  likes: ILike[];
  videos: IVideo[];
  comments: IComment[];
  user: Pick<IUser, "profileImage" | "username" | "name">;
  _count: {
    shares: number;
    likes: number;
    comments: number;
  };
  createdAt: Date;
}

export interface IImage {
  id: string;
  imageId: string;
  postId: string;
  userId: string;
}

export interface IVideo {
  id: string;
  videoId: string;
  postId: string;
  userId: string;
}
