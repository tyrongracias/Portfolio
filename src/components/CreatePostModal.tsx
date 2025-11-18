import { useState } from 'react';
import { XIcon, ImageIcon, VideoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from '@/components/ui/label';
import { useFeedStore } from '../stores/feedStore';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { addPost } = useFeedStore();

  const handleSubmit = () => {
    if (content.trim()) {
      addPost({
        id: Date.now().toString(),
        userId: '1',
        userName: 'John Doe',
        userAvatar: 'https://placehold.co/100x100',
        timestamp: 'Just now',
        content,
        image: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
        likes: 0,
        comments: 0,
        shares: 0,
      });
      setContent('');
      setSelectedFile(null);
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-popover text-popover-foreground border-border max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-h4 text-foreground">Create New Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="post-content" className="text-small text-muted-foreground">
              What's on your mind?
            </Label>
            <Textarea
              id="post-content"
              placeholder="Share your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-32 bg-background border-border text-foreground placeholder:text-muted-foreground rounded-input resize-none"
            />
          </div>

          {selectedFile && (
            <div className="relative">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-full rounded-lg object-cover max-h-96"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 text-foreground hover:bg-background hover:text-error"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <Label
              htmlFor="image-upload"
              className="flex items-center space-x-2 cursor-pointer text-foreground hover:text-primary transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
              <span className="text-small">Add Image</span>
            </Label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <Label
              htmlFor="video-upload"
              className="flex items-center space-x-2 cursor-pointer text-foreground hover:text-primary transition-colors"
            >
              <VideoIcon className="w-5 h-5" />
              <span className="text-small">Add VideoIcon</span>
            </Label>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            className="bg-secondary text-secondary-foreground border-border hover:bg-muted rounded-badge"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-badge"
            onClick={handleSubmit}
            disabled={!content.trim()}
          >
            Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
