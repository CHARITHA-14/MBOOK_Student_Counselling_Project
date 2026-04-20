import { useState } from 'react';
import { getCurrentUser } from '../../utils/auth';
import Card from '../../components/Card';
import { FormInput } from '../../components/FormInput';
import { Save } from 'lucide-react';

export default function ParentDetails() {
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    fatherName: user?.father?.name || '',
    fatherPhone: user?.father?.phone || '',
    fatherOccupation: user?.father?.occupation || '',
    fatherQualification: user?.father?.qualification || '',
    fatherAnnualIncome: user?.father?.annualIncome || '',
    motherName: user?.mother?.name || '',
    motherPhone: user?.mother?.phone || '',
    motherOccupation: user?.mother?.occupation || '',
    motherQualification: user?.mother?.qualification || '',
    motherAnnualIncome: user?.mother?.annualIncome || '',
    guardianName: user?.localGuardian?.name || '',
    guardianPhone: user?.localGuardian?.phone || '',
    guardianAddress: user?.localGuardian?.address || '',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Parent / Guardian Details</h1>
        <p className="text-gray-600">Update parent and guardian information</p>
      </div>

      {/* Father Details */}
      <Card title="Father Details">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Father's Name"
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
            />
            <FormInput
              label="Father's Phone"
              type="tel"
              name="fatherPhone"
              value={formData.fatherPhone}
              onChange={handleChange}
            />
            <FormInput
              label="Father's Occupation"
              type="text"
              name="fatherOccupation"
              value={formData.fatherOccupation}
              onChange={handleChange}
            />
            <FormInput
              label="Father's Qualification"
              type="text"
              name="fatherQualification"
              value={formData.fatherQualification}
              onChange={handleChange}
            />
            <FormInput
              label="Father's Annual Income"
              type="number"
              name="fatherAnnualIncome"
              value={formData.fatherAnnualIncome}
              onChange={handleChange}
            />
          </div>
        </form>
      </Card>

      {/* Mother Details */}
      <Card title="Mother Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Mother's Name"
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
          />
          <FormInput
            label="Mother's Phone"
            type="tel"
            name="motherPhone"
            value={formData.motherPhone}
            onChange={handleChange}
          />
          <FormInput
            label="Mother's Occupation"
            type="text"
            name="motherOccupation"
            value={formData.motherOccupation}
            onChange={handleChange}
          />
          <FormInput
            label="Mother's Qualification"
            type="text"
            name="motherQualification"
            value={formData.motherQualification}
            onChange={handleChange}
          />
          <FormInput
            label="Mother's Annual Income"
            type="number"
            name="motherAnnualIncome"
            value={formData.motherAnnualIncome}
            onChange={handleChange}
          />
        </div>
      </Card>

      {/* Local Guardian Details */}
      <Card title="Local Guardian Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Guardian's Name"
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
          />
          <FormInput
            label="Guardian's Phone"
            type="tel"
            name="guardianPhone"
            value={formData.guardianPhone}
            onChange={handleChange}
          />
          <div className="md:col-span-2">
            <FormInput
              label="Guardian's Address"
              type="text"
              name="guardianAddress"
              value={formData.guardianAddress}
              onChange={handleChange}
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Save className="h-5 w-5" />
          <span>{saved ? 'Saved!' : 'Save All Changes'}</span>
        </button>
      </div>
    </div>
  );
}
