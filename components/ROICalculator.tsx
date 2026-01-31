"use client"
import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Percent } from 'lucide-react';

export default function ROICalculator() {
  const [monthlyRent, setMonthlyRent] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [annualExpenses, setAnnualExpenses] = useState('');
  const [downPayment, setDownPayment] = useState('');

  const calculateROI = () => {
    const rent = parseFloat(monthlyRent) || 0;
    const value = parseFloat(propertyValue) || 0;
    const expenses = parseFloat(annualExpenses) || 0;
    const down = parseFloat(downPayment) || 0;

    if (rent === 0 || value === 0) return null;

    const annualIncome = rent * 12;
    const netIncome = annualIncome - expenses;
    const roi = down > 0 ? (netIncome / down) * 100 : (netIncome / value) * 100;
    const capRate = (netIncome / value) * 100;
    const cashOnCash = down > 0 ? (netIncome / down) * 100 : 0;

    return {
      annualIncome,
      netIncome,
      roi: roi.toFixed(2),
      capRate: capRate.toFixed(2),
      cashOnCash: cashOnCash.toFixed(2),
    };
  };

  const results = calculateROI();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="w-6 h-6 text-black" />
        <h3 className="text-2xl font-bold text-black">ROI Calculator</h3>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Monthly Rent (₹)
          </label>
          <input
            type="number"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none"
            placeholder="50000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Property Value (₹)
          </label>
          <input
            type="number"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none"
            placeholder="5000000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Annual Expenses (₹)
          </label>
          <input
            type="number"
            value={annualExpenses}
            onChange={(e) => setAnnualExpenses(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none"
            placeholder="50000"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Down Payment (₹) - Optional
          </label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none"
            placeholder="1000000"
          />
        </div>
      </div>

      {results && (
        <div className="bg-gradient-to-br from-black to-gray-900 rounded-xl p-6 text-white">
          <h4 className="text-lg font-bold mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Investment Returns</span>
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-300">Annual Income</div>
              <div className="text-2xl font-bold">₹{results.annualIncome.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-300">Net Income</div>
              <div className="text-2xl font-bold">₹{results.netIncome.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-300 flex items-center space-x-1">
                <Percent className="w-4 h-4" />
                <span>ROI</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">{results.roi}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-300 flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>Cap Rate</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{results.capRate}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
