export interface UserProfile {
  username: string;
  avatar: string;
  bio: string;
  stats: {
    rating: number;
    globalRank: number;
    attended: number;
  };
  activity: {
    totalSubmissions: number;
    activeStreak: number;
    maxStreak: number;
  };
}

export interface UserDocument {
  id: string;
  name: string;
  uploadedBy: string;
  uploadedAt: string;
  fileUrl: string;
}
