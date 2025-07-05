import React from 'react';

const EnrollmentConfirmation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-12">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Matrícula Exitosa</h2>
      <p className="text-lg text-gray-700">El estudiante ha sido inscrito correctamente.</p>
    </div>
  );
};

export default EnrollmentConfirmation;
