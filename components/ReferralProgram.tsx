'use client';

import React, { useState, useEffect } from 'react';
import { Gift, Users, Copy, Check, Share2, TrendingUp } from 'lucide-react';

export default function ReferralProgram() {
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralLink, setReferralLink] = useState<string>('');
  const [referrals, setReferrals] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReferralData();
  }, []);

  const loadReferralData = async () => {
    try {
      setLoading(true);
      const [codeRes, referralsRes] = await Promise.all([
        fetch('/api/referrals/generate', { method: 'POST' }),
        fetch('/api/referrals'),
      ]);

      if (codeRes.ok) {
        const codeData = await codeRes.json();
        setReferralCode(codeData.referral_code);
        setReferralLink(codeData.referral_link);
      }

      if (referralsRes.ok) {
        const referralsData = await referralsRes.json();
        setReferrals(referralsData);
      }
    } catch (error) {
      console.error('Error loading referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const totalRewards = referrals
    .filter((r) => r.reward_given)
    .reduce((sum, r) => sum + (r.reward_amount || 0), 0);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading referral program...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white">
          <Gift className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-black">Referral Program</h3>
          <p className="text-sm text-gray-600">Earn ₹500 for each successful referral</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="w-5 h-5 text-black" />
            <span className="text-sm text-gray-600">Total Referrals</span>
          </div>
          <div className="text-3xl font-bold text-black">{referrals.length}</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-5 h-5 text-black" />
            <span className="text-sm text-gray-600">Total Rewards</span>
          </div>
          <div className="text-3xl font-bold text-black">₹{totalRewards}</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <Gift className="w-5 h-5 text-black" />
            <span className="text-sm text-gray-600">Pending Rewards</span>
          </div>
          <div className="text-3xl font-bold text-black">
            ₹{referrals.filter((r) => !r.reward_given).length * 500}
          </div>
        </div>
      </div>

      {referralCode && (
        <div className="bg-gradient-to-r from-black to-gray-900 rounded-xl p-6 text-white mb-6">
          <h4 className="font-bold text-lg mb-4 flex items-center">
            <Share2 className="w-5 h-5 mr-2" />
            Your Referral Code
          </h4>
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-1 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg font-mono text-lg">
              {referralCode}
            </div>
            <button
              onClick={() => handleCopy(referralCode)}
              className="px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center space-x-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg text-sm break-all">
              {referralLink}
            </div>
            <button
              onClick={() => handleCopy(referralLink)}
              className="px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center space-x-2"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div>
        <h4 className="font-bold text-lg text-black mb-4">Referral History</h4>
        {referrals.length === 0 ? (
          <div className="text-center py-8 text-gray-600 bg-gray-50 rounded-xl border-2 border-gray-200">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No referrals yet. Share your code to start earning!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {referrals.map((referral) => (
              <div
                key={referral.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-gray-200"
              >
                <div>
                  <p className="font-semibold text-black">{referral.referredUserName}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(referral.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-black">₹{referral.reward_amount || 500}</p>
                  <p
                    className={`text-xs font-medium ${
                      referral.reward_given ? 'text-green-600' : 'text-yellow-600'
                    }`}
                  >
                    {referral.reward_given ? 'Rewarded' : 'Pending'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
