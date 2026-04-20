import { useState } from 'react';
import { getCurrentUser } from '../../utils/auth';
import Card from '../../components/Card';
import { FormInput } from '../../components/FormInput';
import { Save } from 'lucide-react';

export default function MentorProfile() {
  const mentor = getCurrentUser();
  const [formData, setFormData] = useState({
    name: mentor?.name || '',
    email: mentor?.email || '',
    phone: mentor?.phone || '',
    department: mentor?.department || '',
    qualification: mentor?.qualification || '',
    experience: mentor?.experience || '',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!mentor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mentor Profile</h1>
        <p className="text-gray-600">Update your profile information</p>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
          <img
            src={mentor.photo || `https://ui-avatars.com/api/?name=${mentor.name}&background=1e40af&color=fff&size=128`}
            alt={mentor.name}
            className="w-32 h-32 rounded-full border-4 border-blue-100"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{mentor.name}</h2>
            <p className="text-gray-600">{mentor.department}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormInput
              label="Phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <FormInput
              label="Department"
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
            <FormInput
              label="Qualification"
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
            <FormInput
              label="Experience"
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>{saved ? 'Saved!' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
