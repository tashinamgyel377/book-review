import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../../components/ui/dialog';

const UserProfile: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  // Load saved profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedAvatar = localStorage.getItem('userAvatar');

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setUsername(parsed.username || '');
      setEmail(parsed.email || '');
      setBio(parsed.bio || '');
    } else {
      // Set default if nothing is saved
      setUsername('Namgyel');
      setEmail('namgyel@gmail.com');
      setBio('');
    }

    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        const avatarUrl = e.target?.result as string;
        setAvatar(avatarUrl);
        localStorage.setItem('userAvatar', avatarUrl); // Save to localStorage
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleUpdate = () => {
    const updatedProfile = { username, email, bio };
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    toast.success('Profile updated successfully!');
  };

  const confirmDelete = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userAvatar');
    toast.success('User profile deleted.');
    setShowDialog(false);
    setTimeout(() => navigate('/sign-up'), 1500);
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1464926562/photo/blue-pink-color-powder-explosion-on-white-background.jpg?s=612x612&w=0&k=20&c=ei1cR_McEaeKSg6Wu7_nHyWusrEzuts56-DBNPslhgk=')"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-purple-900/60 z-0" />

      <div className="relative z-10 bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-xl w-[400px] flex flex-col space-y-4">
        <h2 className="text-center text-2xl font-semibold text-indigo-700">My Profile</h2>

        {/* Avatar Upload */}
        <div className="flex justify-center">
          <label className="cursor-pointer relative">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <div className="w-20 h-20 rounded-full border border-gray-300 flex items-center justify-center text-sm text-gray-500 bg-white shadow">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <img
                  src={`https://ui-avatars.com/api/?name=${username || 'User'}&background=random`}
                  alt="Default Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              )}
            </div>
          </label>
        </div>

        <p className="text-center text-sm text-gray-600">Click image to change avatar</p>

        {/* Username */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Bio</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={3}
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-2">
          <button
            onClick={handleUpdate}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-1/2 mr-2"
          >
            Update
          </button>
          <button
            onClick={() => setShowDialog(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-1/2 ml-2"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Delete Profile</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your profile? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2 pt-4">
            <button
              onClick={() => setShowDialog(false)}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Confirm
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
