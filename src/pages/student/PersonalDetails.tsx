import { useState } from 'react';
import { getCurrentUser } from '../../utils/auth';
import Card from '../../components/Card';
import { FormInput, FormSelect, FormTextarea } from '../../components/FormInput';
import { Save } from 'lucide-react';

export default function PersonalDetails() {
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    bloodGroup: user?.bloodGroup || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    religion: user?.religion || '',
    nationality: user?.nationality || '',
    category: user?.category || '',
    aadharNumber: user?.aadharNumber || '',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Personal Details</h1>
        <p className="text-gray-600">Update your personal information</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            <FormSelect
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select Gender' },
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
                { value: 'Other', label: 'Other' },
              ]}
            />
            <FormSelect
              label="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select Blood Group' },
                { value: 'A+', label: 'A+' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B-', label: 'B-' },
                { value: 'AB+', label: 'AB+' },
                { value: 'AB-', label: 'AB-' },
                { value: 'O+', label: 'O+' },
                { value: 'O-', label: 'O-' },
              ]}
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
            <FormTextarea
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
            />
            <FormInput
              label="Religion"
              type="text"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
            />
            <FormInput
              label="Nationality"
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            />
            <FormSelect
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select Category' },
                { value: 'General', label: 'General' },
                { value: 'OBC', label: 'OBC' },
                { value: 'SC', label: 'SC' },
                { value: 'ST', label: 'ST' },
                { value: 'EWS', label: 'EWS' },
              ]}
            />
            <FormInput
              label="Aadhar Number"
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012"
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
