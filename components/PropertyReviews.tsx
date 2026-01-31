'use client';

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ThumbsUp, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  is_verified: boolean;
  landlord_response?: string;
  helpful_count: number;
  created_at: string;
}

interface PropertyReviewsProps {
  propertyId: string;
  userRole?: string;
  userId?: string;
}

export default function PropertyReviews({ propertyId, userRole, userId }: PropertyReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ rating: 5, title: '', comment: '' });
  const router = useRouter();

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId]);

  const loadReviews = async () => {
    try {
      const res = await fetch(`/api/properties/${propertyId}/reviews`);
      const data = await res.json();
      if (res.ok) {
        setReviews(data.reviews || []);
        setAverageRating(data.averageRating || 0);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      router.push('/auth/login');
      return;
    }

    try {
      const res = await fetch(`/api/properties/${propertyId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ rating: 5, title: '', comment: '' });
        loadReviews();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };

  const handleHelpful = async (reviewId: string) => {
    try {
      await fetch(`/api/properties/${propertyId}/reviews/${reviewId}/helpful`, {
        method: 'POST',
      });
      loadReviews();
    } catch (error) {
      console.error('Error marking helpful:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-black mb-2">Reviews & Ratings</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-bold text-black ml-2">{averageRating.toFixed(1)}</span>
            <span className="text-gray-600">({reviews.length} reviews)</span>
          </div>
        </div>
        {userRole === 'visitor' && userId && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-all"
          >
            Write a Review
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmitReview} className="mb-6 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
          <h4 className="font-bold text-black mb-4">Write Your Review</h4>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= formData.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none"
              placeholder="Brief summary of your experience"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none"
              placeholder="Share your experience with this property..."
            />
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-all"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-2 bg-gray-200 text-black rounded-lg font-medium hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>No reviews yet. Be the first to review this property!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-black">{review.userName}</span>
                      {review.is_verified && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-2">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="font-semibold text-black mb-2">{review.title}</h4>
              <p className="text-gray-700 mb-3">{review.comment}</p>
              {review.landlord_response && (
                <div className="ml-4 pl-4 border-l-4 border-gray-300 bg-gray-50 p-3 rounded-lg mb-3">
                  <p className="text-sm font-semibold text-black mb-1">Landlord Response:</p>
                  <p className="text-sm text-gray-700">{review.landlord_response}</p>
                </div>
              )}
              <button
                onClick={() => handleHelpful(review.id)}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpful_count})</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
