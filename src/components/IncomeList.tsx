import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { updateIncomeAsync, deleteIncomeAsync } from '../store/incomeSlice';
import type { Income } from '../types';
import EditModal from './EditModal';
import toast from 'react-hot-toast';

const IncomeList = ({ incomes }: { incomes: Income[] }) => {
  const dispatch = useDispatch();
  const [editingIncome, setEditingIncome] = useState<Income | null>(null);

  const handleEdit = (income: Income) => {
    setEditingIncome(income);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
      dispatch(deleteIncomeAsync(id));
    }
  };

  const handleUpdate = (updatedIncome: Income) => {
    if (editingIncome?._id) {
      dispatch(updateIncomeAsync({ id: editingIncome._id, income: updatedIncome }));
      setEditingIncome(null);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {incomes.map((income) => (
              <tr key={income._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {new Date(income.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{income.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {income.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                  +${income.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(income)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-4"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => income._id && handleDelete(income._id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditModal
        isOpen={!!editingIncome}
        onClose={() => setEditingIncome(null)}
        onSubmit={handleUpdate}
        initialData={editingIncome}
        type="income"
      />
    </>
  );
};

export default IncomeList;