import React, { useEffect, useState, useRef } from 'react';
import { StarIcon, ThumbsUpIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const Reviews = ({ accommodationId, vertical = false }) => {
  const [reviews, setReviews] = useState([]);
  const [filterOption, setFilterOption] = useState('recent');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);
  const loadingRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/reviews?accommodationId=${accommodationId}`);
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [accommodationId]);

  const loadMoreReviews = () => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (vertical && loadingRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreReviews();
        }
      }, { threshold: 0.5 });
      observerRef.current.observe(loadingRef.current);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [vertical]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (vertical) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <StarIcon size={20} className="text-yellow-500 fill-yellow-500 mr-2" />
            4.92 · {reviews.length} reviews
          </h2>
          <div className="relative">
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>
        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <img
                    src={review.avatar}
                    alt={`${review.name}'s avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{review.name}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          size={16}
                          className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{review.content}</p>
                  <button className="mt-3 flex items-center text-sm text-gray-500 hover:text-gray-700">
                    <ThumbsUpIcon size={14} className="mr-1" />
                    Helpful
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div ref={loadingRef} className="text-center py-4">
            {loading && <span className="text-gray-500">Loading more reviews...</span>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <StarIcon size={20} className="text-yellow-500 fill-yellow-500 mr-2" />
          4.92 · {reviews.length} reviews
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 z-10"
        >
          <ChevronLeftIcon size={20} />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 pb-6 scrollbar-hide relative scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review) => (
            <div key={review.id} className="flex-none w-[350px] bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <img
                    src={review.avatar}
                    alt={`${review.name}'s avatar`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '';
                    }}
                  />
                </div>
                <div className="ml-3 flex-1">
                  <div className="font-medium">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      size={16}
                      className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-3 text-gray-600 line-clamp-4">{review.content}</div>
              <div className="mt-4 flex items-center">
                <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <ThumbsUpIcon size={14} className="mr-1" />
                  Helpful
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 z-10"
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>
      <div className="mt-6 text-center">
        <button className="border border-gray-300 rounded-lg px-6 py-2 text-gray-700 hover:bg-gray-50 font-medium text-sm">
          Show all {reviews.length} reviews
        </button>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Reviews;
