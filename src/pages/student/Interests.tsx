import { useState } from 'react';
import { getCurrentUser } from '../../utils/auth';
import Card from '../../components/Card';
import { FormTextarea } from '../../components/FormInput';
import { Save } from 'lucide-react';

export default function Interests() {
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    interests: Array.isArray(user?.interests) ? user.interests.join(', ') : user?.interests || '',
    strengths: Array.isArray(user?.strengths) ? user.strengths.join(', ') : user?.strengths || '',
    weaknesses: Array.isArray(user?.weaknesses) ? user.weaknesses.join(', ') : user?.weaknesses || '',
    achievements: Array.isArray(user?.achievements) ? user.achievements.join(', ') : user?.achievements || '',
    healthInformation: user?.healthInformation || '',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Interests & Personal Insights</h1>
        <p className="text-gray-600">Share your interests, strengths, and personal information</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormTextarea
            label="Interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            rows={3}
            placeholder="e.g., Programming, Web Development, Machine Learning"
          />
          <FormTextarea
            label="Strengths"
            name="strengths"
            value={formData.strengths}
            onChange={handleChange}
            rows={3}
            placeholder="e.g., Problem Solving, Team Work, Communication"
          />
          <FormTextarea
            label="Weaknesses"
            name="weaknesses"
            value={formData.weaknesses}
            onChange={handleChange}
            rows={3}
            placeholder="e.g., Time Management, Public Speaking"
          />
          <FormTextarea
            label="Achievements"
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            rows={3}
            placeholder="e.g., Hackathon Winner 2023, Best Project Award"
          />
          <FormTextarea
            label="Health Information"
            name="healthInformation"
            value={formData.healthInformation}
            onChange={handleChange}
            rows={3}
            placeholder="Any health-related information"
          />
          <div className="flex justify-end">
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
