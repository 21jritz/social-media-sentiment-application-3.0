import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { MessageSquare, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';

const CustomerFeedback: React.FC = () => {
  const sentimentData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [{
      data: [65, 20, 15],
      backgroundColor: [
        'rgba(16, 185, 129, 0.6)',
        'rgba(59, 130, 246, 0.6)',
        'rgba(239, 68, 68, 0.6)'
      ]
    }]
  };

  const feedbackCategories = [
    { label: 'Product Quality', positive: 85, total: 120 },
    { label: 'Customer Service', positive: 45, total: 60 },
    { label: 'User Experience', positive: 92, total: 150 },
    { label: 'Price Value', positive: 68, total: 100 }
  ];

  const recentFeedback = [
    {
      id: 1,
      text: "The new feature is amazing! Really improved my workflow.",
      sentiment: 'positive',
      date: '2h ago'
    },
    {
      id: 2,
      text: "Having issues with the latest update. Please fix.",
      sentiment: 'negative',
      date: '4h ago'
    },
    {
      id: 3,
      text: "Good product but could use some improvements.",
      sentiment: 'neutral',
      date: '6h ago'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <h3 className="text-lg font-semibold mb-4">Feedback Categories</h3>
          <div className="space-y-4">
            {feedbackCategories.map(({ label, positive, total }) => (
              <div key={label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{label}</span>
                  <span>{Math.round((positive / total) * 100)}% Positive</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(positive / total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Overall Sentiment</h3>
          <Doughnut data={sentimentData} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Feedback</h3>
        <div className="space-y-4">
          {recentFeedback.map(feedback => (
            <div
              key={feedback.id}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              {feedback.sentiment === 'positive' && (
                <ThumbsUp className="w-5 h-5 text-green-500 mt-1" />
              )}
              {feedback.sentiment === 'negative' && (
                <ThumbsDown className="w-5 h-5 text-red-500 mt-1" />
              )}
              {feedback.sentiment === 'neutral' && (
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
              )}
              <div className="flex-1">
                <p className="text-gray-800">{feedback.text}</p>
                <p className="text-sm text-gray-500 mt-1">{feedback.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;