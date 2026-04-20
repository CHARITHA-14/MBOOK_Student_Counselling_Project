import { getCurrentUser } from '../../utils/auth';
import Card from '../../components/Card';
import { FormInput } from '../../components/FormInput';
import { Save } from 'lucide-react';
import { useState } from 'react';

export default function PreviousEducation() {
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    classXInstitution: user?.previousEducation?.classX?.institution || '',
    classXBoard: user?.previousEducation?.classX?.board || '',
    classXYear: user?.previousEducation?.classX?.year || '',
    classXPercentage: user?.previousEducation?.classX?.percentage || '',
    classXIIInstitution: user?.previousEducation?.classXII?.institution || '',
    classXIIBoard: user?.previousEducation?.classXII?.board || '',
    classXIIYear: user?.previousEducation?.classXII?.year || '',
    classXIIPercentage: user?.previousEducation?.classXII?.percentage || '',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Previous Education</h1>
        <p className="text-gray-600">Enter your previous academic qualifications</p>
      </div>

      <Card title="Class X Details">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Institution"
              type="text"
              name="classXInstitution"
              value={formData.classXInstitution}
              onChange={handleChange}
            />
            <FormInput
              label="Board"
              type="text"
              name="classXBoard"
              value={formData.classXBoard}
              onChange={handleChange}
            />
            <FormInput
              label="Year"
              type="number"
              name="classXYear"
              value={formData.classXYear}
              onChange={handleChange}
            />
            <FormInput
              label="Percentage"
              type="number"
              name="classXPercentage"
              value={formData.classXPercentage}
              onChange={handleChange}
              step="0.01"
            />
          </div>
        </form>
      </Card>

      <Card title="Class XII / Diploma Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Institution"
            type="text"
            name="classXIIInstitution"
            value={formData.classXIIInstitution}
            onChange={handleChange}
          />
          <FormInput
            label="Board"
            type="text"
            name="classXIIBoard"
            value={formData.classXIIBoard}
            onChange={handleChange}
          />
          <FormInput
            label="Year"
            type="number"
            name="classXIIYear"
            value={formData.classXIIYear}
            onChange={handleChange}
          />
          <FormInput
            label="Percentage"
            type="number"
            name="classXIIPercentage"
            value={formData.classXIIPercentage}
            onChange={handleChange}
            step="0.01"
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Save className="h-5 w-5" />
          <span>{saved ? 'Saved!' : 'Save Changes'}</span>
        </button>
      </div>
    </div>
  );
}
