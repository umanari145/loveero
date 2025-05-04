export interface Item {
  id: string;
  title: string;
  url: string;
  description?: string;
  duration?: string;
  uploadDate?: string;
  tags?: string[];
  videoUrl?: string;
  thumbnailUrl?: string;
}